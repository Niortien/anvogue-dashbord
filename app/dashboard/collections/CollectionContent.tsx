'use client';

import { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, FolderOpen } from 'lucide-react';

import { Collection } from '@/lib/types';
import { CreateCollectionSchema, UpdateCollectionSchema } from '@/service-anvogue/collection/collection.schema';
import { createCollection, deleteCollection, updateCollection } from '@/service-anvogue/collection/collection.action';
import { toast } from 'sonner';

const saisons = ['PRINTEMPS', 'ÉTÉ', 'AUTOMNE', 'HIVER', 'TOUTES_SAISONS'];

const CollectionContent = ({ collection }: { collection: Collection[] }) => {
  const [collections, setCollections] = useState<Collection[]>(collection);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
console.log(collections);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCollectionSchema | UpdateCollectionSchema>();

  const getSeasonColor = (saison?: string) => {
    switch (saison) {
      case 'PRINTEMPS': return 'bg-green-200 text-green-800';
      case 'ÉTÉ': return 'bg-yellow-200 text-yellow-800';
      case 'AUTOMNE': return 'bg-orange-200 text-orange-800';
      case 'HIVER': return 'bg-blue-200 text-blue-800';
      case 'TOUTES_SAISONS': return 'bg-gray-200 text-gray-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredCollections = collections.filter(collection =>
    collection.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteCollection(id);
      if (result.success) {
        setCollections(prev => prev.filter(c => c.id !== id));
        toast.success("Collection supprimée avec succès");
      } else {
        toast.error(result.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      toast.error("Une erreur inattendue s'est produite");
    }
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setValue('nom', collection.nom || '');
    setValue('description', collection.description || '');
    setValue('saison', collection.saison || '');
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingCollection(null);
    reset();
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: CreateCollectionSchema | UpdateCollectionSchema) => {
    try {
      if (editingCollection) {
        const result = await updateCollection(editingCollection.id, data as UpdateCollectionSchema);
        if (result.success) {
          setCollections(prev => prev.map(c => c.id === editingCollection.id ? { ...c, ...data } : c));
          toast.success("Collection modifiée avec succès");
        } else {
          toast.error(result.error || "Erreur lors de la modification");
          return;
        }
      } else {
        const result = await createCollection(data as CreateCollectionSchema);
        if (result.success && result.data) {
          setCollections(prev => [...prev, result.data]);
          toast.success("Collection créée avec succès");
        } else {
          toast.error(result.error || "Erreur lors de la création");
          return;
        }
      }
      setIsDialogOpen(false);
      setEditingCollection(null);
      reset();
    } catch {
      toast.error("Une erreur inattendue s'est produite");
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingCollection(null);
      reset();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
            <p className="text-gray-600 mt-1">Organisez vos articles par collections</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
                <Plus size={20} className="mr-2" /> Nouvelle Collection
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCollection ? 'Modifier la collection' : 'Nouvelle collection'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4 bg-white">
                <div>
                  <Label htmlFor="nom">Nom</Label>
                  <Input id="nom" {...register('nom', { required: 'Le nom est obligatoire' })} />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" {...register('description')} />
                </div>

                <div>
                  <Label htmlFor="saison">Saison</Label>
                  <Select onValueChange={(val) => setValue('saison', val)} defaultValue={editingCollection?.saison || ''}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une saison" />
                    </SelectTrigger>
                    <SelectContent>
                      {saisons.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {isSubmitting ? 'En cours...' : (editingCollection ? 'Modifier' : 'Créer')}
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
                <FolderOpen size={20} /> Liste des Collections ({filteredCollections.length})
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Saison</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCollections.map((collection) => (
                  <TableRow key={collection.id}>
                    <TableCell>{collection.nom}</TableCell>
                    <TableCell className="max-w-xs truncate">{collection.description}</TableCell>
                    <TableCell>
                      <Badge className={getSeasonColor(collection.saison)}>{collection.saison}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(collection)}>
                          <Edit size={16} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(collection.id)} className="text-red-600 hover:text-red-700">
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
      </div>
    </DashboardLayout>
  );
};

export default CollectionContent;