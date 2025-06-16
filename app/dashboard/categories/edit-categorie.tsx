'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Edit } from 'lucide-react';
import { updateCategorie } from '@/service-anvogue/categorie/categorie.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CreateCategorieSchema } from '@/service-anvogue/categorie/categorie.shema';
import { Category } from '@/lib/types';

interface EditCategorieProps {
  categorie: Category;
}
export default function EditCategorie({ categorie }: EditCategorieProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategorieSchema>({
    defaultValues: {
      nom: categorie.nom,
      description: categorie.description,
      type: categorie.type as "VETEMENT" | "CHAUSSURE" | "ALIMENT" | "MONTRE",
    },
  });

  const handleEdit = () => {
    reset();
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: CreateCategorieSchema) => {
    try {
      const result = await updateCategorie(categorie.id, data);
      if (result.success && result.data) {
        toast.success("Categorie modifiée avec succès");
      } else {
        toast.error(result.error || "Erreur lors de la modification");
        return;
      }
      setIsDialogOpen(false);
      reset();
    } catch {
      toast.error("Une erreur inattendue s'est produite");
    } finally {
      router.refresh()
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      reset();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEdit()}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Supprimer la Categorie
          </DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.
          </DialogDescription>
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
            <Select onValueChange={(value) => setValue('type', value as any)} defaultValue="VETEMENT" >
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
              {isSubmitting ? 'En cours...' : 'Modifier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
