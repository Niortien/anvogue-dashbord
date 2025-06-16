"use client";

import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Tags, Filter } from 'lucide-react';
import { articles } from '@/lib/mock-data';
import { Category } from '@/lib/types';
import { toast } from 'sonner';
import React from 'react';
import { CreateCategorieSchema, UpdateCategorieSchema, createCategorieSchema, updateCategorieSchema } from '@/service-anvogue/categorie/categorie.shema';
import { createCategorie, deleteCategorie, updateCategorie } from '@/service-anvogue/categorie/categorie.action';

interface CategorieContentProps {
  categorie: CreateCategorieSchema[];
}

const CategorieContent = ({ categorie }: CategorieContentProps) => {
  // Fix 1: Initialize state after hydration to avoid mismatch
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Fix 2: Set initial data after hydration
  useEffect(() => {
    setCategories(categorie);
    setIsHydrated(true);
  }, [categorie]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategorieSchema | UpdateCategorieSchema>({
    resolver: zodResolver(editingCategory ? updateCategorieSchema : createCategorieSchema),
    defaultValues: {
      
      nom: '',
      description: '',
      type: 'VETEMENT',
    },
  });

  const filteredCategories = useMemo(() => {
    // Fix 3: Only filter after hydration to avoid server/client mismatch
    if (!isHydrated) return [];
    
    return categories.filter(category => {
      const nom = category.nom || '';
      const description = category.description || '';
      const matchesSearch =
        nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [categories, searchTerm, statusFilter, isHydrated]);

  const getArticleCount = (categoryId: string) => {
    return articles.filter(article => article.categoryId === categoryId).length;
  };

  const handleDelete = async (id: string) => {
    const articleCount = getArticleCount(id);
    if (articleCount > 0) {
      toast.error(`Impossible de supprimer cette catégorie car elle contient ${articleCount} article(s)`);
      return;
    }

    const result = await deleteCategorie(id);
    if (!result.success) {
      toast.error("Une erreur s'est produite lors de la suppression de la catégorie");
      return;
    }

    try {
      setCategories(prev => prev.filter(category => category.id !== id));
      toast.success("Catégorie supprimée avec succès");
    } catch (error) {
      console.error('Delete error:', error);
      toast.error("Une erreur inattendue s'est produite");
    }
  };

 const handleEdit = (category: Category) => {
  setEditingCategory(category);
  reset({
    nom: category.nom || '',
    description: category.description || '',
    type: category.type as "VETEMENT" | "CHAUSSURE" | "ALIMENT" | "MONTRE",
  });
  setIsDialogOpen(true);
};


  const handleAdd = () => {
    setEditingCategory(null);
    reset({
      nom: '',
      description: '',
      type: 'VETEMENT',
    });
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: CreateCategorieSchema | UpdateCategorieSchema) => {
    try {
      if (editingCategory) {
        const result = await updateCategorie(editingCategory.id, data as UpdateCategorieSchema);
        if (result.success) {
          setCategories(prev =>
            prev.map(category =>
              category.id === editingCategory.id ? { ...category, ...data } : category
            )
          );
          toast.success("Catégorie modifiée avec succès");
        } else {
          toast.error(result.error || "Erreur lors de la modification");
          return;
        }
      } else {
        const result = await createCategorie(data as CreateCategorieSchema);
        if (result.success && result.data) {
          setCategories(prev => [...prev, result.data]);
          toast.success("Catégorie créée avec succès");
        } else {
          toast.error(result.error || "Erreur lors de la création de la catégorie");
          return;
        }
      }

      setIsDialogOpen(false);
      setEditingCategory(null);
      reset();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error("Une erreur inattendue s'est produite");
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingCategory(null);
      reset({
        nom: '',
        description: '',
        type: 'VETEMENT',
      });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
  };

  // Fix 4: Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des catégories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tags className="h-5 w-5" />
            Gestion des Catégories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom ou description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
              {(searchTerm || statusFilter) && (
                <Button variant="outline" onClick={clearFilters}>
                  Effacer
                </Button>
              )}
              <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                <DialogTrigger asChild>
                  <Button onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle Catégorie
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom de la catégorie</Label>
                      <Input
                        id="nom"
                        {...register('nom')}
                        placeholder="Ex: Vêtements d'été"
                      />
                      {errors.nom && (
                        <p className="text-sm text-destructive">{errors.nom.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        {...register('description')}
                        placeholder="Description de la catégorie..."
                        rows={3}
                      />
                      {errors.description && (
                        <p className="text-sm text-destructive">{errors.description.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select  onValueChange={(value) => setValue('type', value as any)} defaultValue="VETEMENT" >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent className='bg-red-50'>
                          <SelectItem value="VETEMENT">Vêtement</SelectItem>
                          <SelectItem value="CHAUSSURE">Chaussure</SelectItem>
                          <SelectItem value="ALIMENT">Aliment</SelectItem>
                          <SelectItem value="MONTRE">Montre</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.type && (
                        <p className="text-sm text-destructive">{errors.type.message}</p>
                      )}
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleDialogClose(false)}
                      >
                        Annuler
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'En cours...' : editingCategory ? 'Modifier' : 'Créer'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {searchTerm || statusFilter ? 'Aucune catégorie trouvée avec ces filtres' : 'Aucune catégorie disponible'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.nom}</TableCell>
                    <TableCell className="max-w-xs truncate">{category.description || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{category.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getArticleCount(category.id || '')} article(s)
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">
                        Actif
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(category as Category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-white text-black">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Supprimer la catégorie</AlertDialogTitle>
                              <AlertDialogDescription className=" text-black">
                                Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(category.id || '')}
                                className="bg-red text-destructive-foreground hover:bg-red/90"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategorieContent;