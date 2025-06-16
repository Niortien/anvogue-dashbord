'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Plus } from 'lucide-react';
import { createCategorie } from '@/service-anvogue/categorie/categorie.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CreateCategorieSchema } from '@/service-anvogue/categorie/categorie.shema';

export default function AddCategorie() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategorieSchema>();

  const handleAdd = () => {
    reset();
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: CreateCategorieSchema) => {
    try {
      const result = await createCategorie(data);
      if (result.success && result.data) {
        toast.success("Categorie créée avec succès");
      } else {
        toast.error(result.error || "Erreur lors de la création");
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
        <Button onClick={handleAdd}>
          <Plus size={20} className="mr-2" /> Nouvelle Categorie
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Nouvelle Categorie
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
              {isSubmitting ? 'En cours...' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
