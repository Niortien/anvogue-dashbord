"use client";

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
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
import { CreateCategorieSchema, UpdateCategorieSchema } from '@/service-anvogue/categorie/categorie.shema';
import { createCategorie, deleteCategorie, updateCategorie } from '@/service-anvogue/categorie/categorie.action';



interface CategorieContentProps {
  categorie: CreateCategorieSchema[];
}

const CategorieContent = ({ categorie }: CategorieContentProps) => {
  const [categories, setCategories] = useState<CreateCategorieSchema[]>(categorie);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategorieSchema | UpdateCategorieSchema>();

  const filteredCategories = useMemo(() => {
    return categories.filter(category => {
      const nom = category.nom || '';
      const description = category.description || '';
      const matchesSearch =
        nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());

      // const matchesStatus =
      //   !statusFilter ||
      //   (statusFilter === 'active' && category.isActive) ||
      //   (statusFilter === 'inactive' && !category.isActive);

      return matchesSearch ;
    });
  }, [categories, searchTerm, statusFilter]);

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
    setValue('nom', category.nom || '');
    setValue('description', category.description || '');
    setValue('type', category.type || 'VETEMENT');
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    reset();
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
      reset();
    }
  };

  // const toggleCategoryStatus = (category: Category) => {
  //   setCategories(prev =>
  //     prev.map(cat =>
  //       cat.id === category.id ? { ...cat, isActive: !cat.isActive } : cat
  //     )
  //   );
  //   toast.success(`Catégorie ${!category.isActive ? 'activée' : 'désactivée'} avec succès`);
  // };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
  };
  


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Catégories</h1>
            <p className="text-gray-600 mt-1">Classez vos articles par catégories</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
                <Plus size={20} className="mr-2" />
                Nouvelle Catégorie
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom *</Label>
                  <Input
                    id="name"
                    {...register('nom', { required: 'Le nom est obligatoire' })}
                    className={errors.nom ? 'border-red-500' : ''}
                  />
                  {errors.nom && (
                    <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register('description', { required: 'La description est obligatoire' })}
                    rows={3}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="isActive">Statut</Label>
                  <Select 
                    // onValueChange={(val) => setValue('isActive', val === 'true')} 
                    // defaultValue={editingCategory?.isActive !== undefined ? editingCategory.isActive.toString() : 'true'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDialogClose(false)}
                    disabled={isSubmitting}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'En cours...' : (editingCategory ? 'Modifier' : 'Créer')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Tags size={20} />
                Liste des Catégories ({filteredCategories.length})
              </CardTitle>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Rechercher une catégorie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <Filter size={16} className="mr-2" />
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actives</SelectItem>
                    <SelectItem value="inactive">Inactives</SelectItem>
                  </SelectContent>
                </Select>
                {(searchTerm || statusFilter) && (
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Effacer
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredCategories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm || statusFilter ? 
                  "Aucune catégorie ne correspond aux critères de recherche" : 
                  "Aucune catégorie créée pour le moment"
                }
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Nb d&apos;articles</TableHead>
                    <TableHead>Date de création</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.nom}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {category.description || <span className="text-gray-400 italic">Aucune description</span>}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {getArticleCount(category.id)} articles
                        </Badge>
                      </TableCell>
                      {/* <TableCell>
                        {category.createdAt?.toLocaleDateString('fr-FR') || 'N/A'}
                      </TableCell> */}
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          // onClick={() => toggleCategoryStatus(category)}
                          className="p-0 h-auto"
                        >
                          {/* <Badge 
                            variant={category.isActive ? 'default' : 'secondary'}
                            className={category.isActive ? 
                              'bg-green-100 text-green-800 border-green-200 hover:bg-green-200' : 
                              'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
                            }
                          >
                            {category.isActive ? 'Active' : 'Inactive'}
                          </Badge> */}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(category)}
                          >
                            <Edit size={16} />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer la catégorie "{category.nom}" ? 
                                  {getArticleCount(category.id) > 0 && (
                                    <span className="text-red-600 font-medium">
                                      <br />Cette catégorie contient {getArticleCount(category.id)} article(s) et ne peut pas être supprimée.
                                    </span>
                                  )}
                                  {getArticleCount(category.id) === 0 && (
                                    <span><br />Cette action est irréversible.</span>
                                  )}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(category.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                  disabled={getArticleCount(category.id) > 0}
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CategorieContent;