'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/app/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Edit, Trash2, Eye, Heart, Package, Palette } from 'lucide-react';
import { articles as initialArticles, categories, collections, attributeTemplates } from '@/lib/mock-data';
import { Article, ArticleVariant, VariantAttribute } from '@/lib/types';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVariantDialogOpen, setIsVariantDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [selectedArticleForVariant, setSelectedArticleForVariant] = useState<Article | null>(null);
  const [editingVariant, setEditingVariant] = useState<ArticleVariant | null>(null);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Non défini';
  };

  const getCollectionName = (collectionId: string) => {
    const collection = collections.find(c => c.id === collectionId);
    return collection?.name || 'Non défini';
  };

  const getTotalStock = (article: Article) => {
    return article.variants.reduce((total, variant) => total + variant.stock, 0);
  };

  const getVariantCount = (article: Article) => {
    return article.variants.length;
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setIsDialogOpen(true);
  };

  const handleAddArticle = () => {
    setEditingArticle(null);
    setIsDialogOpen(true);
  };

  const handleAddVariant = (article: Article) => {
    setSelectedArticleForVariant(article);
    setEditingVariant(null);
    setIsVariantDialogOpen(true);
  };

  const handleEditVariant = (article: Article, variant: ArticleVariant) => {
    setSelectedArticleForVariant(article);
    setEditingVariant(variant);
    setIsVariantDialogOpen(true);
  };

  const handleDeleteVariant = (articleId: string, variantId: string) => {
    setArticles(articles.map(article => 
      article.id === articleId 
        ? { ...article, variants: article.variants.filter(v => v.id !== variantId) }
        : article
    ));
  };

  const handleSubmitArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const articleData: Partial<Article> = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      basePrice: parseFloat(formData.get('basePrice') as string),
      categoryId: formData.get('categoryId') as string,
      collectionId: formData.get('collectionId') as string,
      image: formData.get('image') as string,
    };

    if (editingArticle) {
      setArticles(articles.map(article => 
        article.id === editingArticle.id 
          ? { ...article, ...articleData, updatedAt: new Date() }
          : article
      ));
    } else {
      const newArticle: Article = {
        ...articleData as Article,
        id: Date.now().toString(),
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        variants: [],
      };
      setArticles([...articles, newArticle]);
    }

    setIsDialogOpen(false);
    setEditingArticle(null);
  };

  const handleSubmitVariant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const attributes: VariantAttribute[] = [];
    
    // Récupérer les attributs du formulaire
    attributeTemplates.forEach(template => {
      const value = formData.get(`attribute_${template.id}`) as string;
      if (value) {
        const attribute: VariantAttribute = {
          id: `attr_${Date.now()}_${template.id}`,
          name: template.name,
          value: value,
          type: template.type,
        };
        
        if (template.type === 'color') {
          // Ajouter la couleur hex si c'est une couleur
          const colorMap: { [key: string]: string } = {
            'Rouge': '#FF0000',
            'Bleu': '#0000FF',
            'Vert': '#00FF00',
            'Noir': '#000000',
            'Blanc': '#FFFFFF',
            'Jaune': '#FFFF00',
            'Rose': '#FFC0CB',
            'Violet': '#800080',
          };
          attribute.hexColor = colorMap[value] || '#000000';
        }
        
        attributes.push(attribute);
      }
    });

    const variantData: Partial<ArticleVariant> = {
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string),
      attributes: attributes,
      image: formData.get('image') as string || undefined,
      isDefault: formData.get('isDefault') === 'on',
    };

    if (editingVariant && selectedArticleForVariant) {
      setArticles(articles.map(article => 
        article.id === selectedArticleForVariant.id 
          ? {
              ...article,
              variants: article.variants.map(variant =>
                variant.id === editingVariant.id
                  ? { ...variant, ...variantData, updatedAt: new Date() }
                  : variant
              )
            }
          : article
      ));
    } else if (selectedArticleForVariant) {
      const newVariant: ArticleVariant = {
        ...variantData as ArticleVariant,
        id: `variant_${Date.now()}`,
        articleId: selectedArticleForVariant.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };
      
      setArticles(articles.map(article => 
        article.id === selectedArticleForVariant.id 
          ? { ...article, variants: [...article.variants, newVariant] }
          : article
      ));
    }

    setIsVariantDialogOpen(false);
    setEditingVariant(null);
    setSelectedArticleForVariant(null);
  };

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Articles & Variantes</h1>
            <p className="text-gray-600 mt-1">Gérez votre catalogue d&apos;articles et leurs variantes</p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddArticle} className="bg-blue-600 hover:bg-blue-700">
                  <Plus size={20} className="mr-2" />
                  Nouvel Article
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitArticle} className="space-y-4 px-4 bg-white border-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Titre</Label>
                      <Input
                        id="title"
                        name="title"
                        defaultValue={editingArticle?.title}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="basePrice">Prix de base (€)</Label>
                      <Input
                        id="basePrice"
                        name="basePrice"
                        type="number"
                        step="0.01"
                        defaultValue={editingArticle?.basePrice}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={editingArticle?.description}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="categoryId">Catégorie</Label>
                      <Select name="categoryId" defaultValue={editingArticle?.categoryId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="collectionId">Collection</Label>
                      <Select name="collectionId" defaultValue={editingArticle?.collectionId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          {collections.map(collection => (
                            <SelectItem key={collection.id} value={collection.id}>
                              {collection.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">URL de l&apos;image</Label>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      defaultValue={editingArticle?.image}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      {editingArticle ? 'Modifier' : 'Créer'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isVariantDialogOpen} onOpenChange={setIsVariantDialogOpen}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingVariant ? 'Modifier la variante' : 'Nouvelle variante'}
                    {selectedArticleForVariant && (
                      <span className="text-sm text-gray-500 block">
                        pour {selectedArticleForVariant.title}
                      </span>
                    )}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitVariant} className="space-y-4 bg-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom de la variante</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={editingVariant?.name}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sku">SKU</Label>
                      <Input
                        id="sku"
                        name="sku"
                        defaultValue={editingVariant?.sku}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Prix (€)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        defaultValue={editingVariant?.price}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        name="stock"
                        type="number"
                        defaultValue={editingVariant?.stock}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <input
                        type="checkbox"
                        id="isDefault"
                        name="isDefault"
                        defaultChecked={editingVariant?.isDefault}
                        className="rounded"
                      />
                      <Label htmlFor="isDefault">Variante par défaut</Label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">URL de l&apos;image (optionnel)</Label>
                    <Input
                      id="image"
                      name="image"
                      type="url"
                      defaultValue={editingVariant?.image}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Attributs de la variante</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {attributeTemplates.map(template => (
                        <div key={template.id}>
                          <Label htmlFor={`attribute_${template.id}`}>
                            {template.name} {template.isRequired && '*'}
                          </Label>
                          <Select 
                            name={`attribute_${template.id}`}
                            defaultValue={editingVariant?.attributes.find(a => a.name === template.name)?.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={`Sélectionner ${template.name.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {template.values.map(value => (
                                <SelectItem key={value} value={value}>
                                  <div className="flex items-center space-x-2">
                                    {template.type === 'color' && (
                                      <div 
                                        className="w-4 h-4 rounded-full border"
                                        style={{ 
                                          backgroundColor: {
                                            'Rouge': '#FF0000',
                                            'Bleu': '#0000FF',
                                            'Vert': '#00FF00',
                                            'Noir': '#000000',
                                            'Blanc': '#FFFFFF',
                                            'Jaune': '#FFFF00',
                                            'Rose': '#FFC0CB',
                                            'Violet': '#800080',
                                          }[value] || '#000000'
                                        }}
                                      />
                                    )}
                                    <span>{value}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsVariantDialogOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      {editingVariant ? 'Modifier' : 'Créer'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Liste des Articles ({filteredArticles.length})</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article</TableHead>
                  <TableHead>Prix de base</TableHead>
                  <TableHead>Stock total</TableHead>
                  <TableHead>Variantes</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Collection</TableHead>
                  <TableHead>Likes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-medium">{article.title}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {article.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{article.basePrice}€</TableCell>
                    <TableCell>
                      <Badge variant={getTotalStock(article) > 10 ? 'default' : 'destructive'}>
                        {getTotalStock(article)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Palette size={12} />
                          <span>{getVariantCount(article)}</span>
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddVariant(article)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryName(article.categoryId)}</TableCell>
                    <TableCell>{getCollectionName(article.collectionId)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-red-600">
                        <Heart size={16} fill="currentColor" />
                        <span>{article.likes}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditArticle(article)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteArticle(article.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Détail des variantes */}
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            article.variants.length > 0 && (
              <Card key={`variants-${article.id}`}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package size={20} />
                    <span>Variantes de {article.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {article.variants.map((variant) => (
                      <div key={variant.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{variant.name}</h4>
                          {variant.isDefault && (
                            <Badge variant="default" className="text-xs">Par défaut</Badge>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">SKU:</span>
                            <span className="font-mono">{variant.sku}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Prix:</span>
                            <span className="font-medium">{variant.price}€</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Stock:</span>
                            <Badge variant={variant.stock > 10 ? 'default' : 'destructive'}>
                              {variant.stock}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h5 className="text-xs font-medium text-gray-700">Attributs:</h5>
                          <div className="flex flex-wrap gap-1">
                            {variant.attributes.map((attr) => (
                              <Badge key={attr.id} variant="outline" className="text-xs">
                                <div className="flex items-center space-x-1">
                                  {attr.type === 'color' && attr.hexColor && (
                                    <div 
                                      className="w-3 h-3 rounded-full border"
                                      style={{ backgroundColor: attr.hexColor }}
                                    />
                                  )}
                                  <span>{attr.name}: {attr.value}</span>
                                </div>
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditVariant(article, variant)}
                            className="flex-1"
                          >
                            <Edit size={14} className="mr-1" />
                            Modifier
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteVariant(article.id, variant.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>
  );
}