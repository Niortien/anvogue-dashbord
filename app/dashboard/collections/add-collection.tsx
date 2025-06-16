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
import { CreateCollectionSchema } from '@/service-anvogue/collection/collection.schema';
import { createCollection } from '@/service-anvogue/collection/collection.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const saisons = ['PRINTEMPS', 'ÉTÉ', 'AUTOMNE', 'HIVER', 'TOUTES_SAISONS'];

export default function AddCollection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCollectionSchema>();

  const handleAdd = () => {
    reset();
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: CreateCollectionSchema) => {
    try {
      const result = await createCollection(data);
      if (result.success && result.data) {
        toast.success("Collection créée avec succès");
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
          <Plus size={20} className="mr-2" /> Nouvelle Collection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Nouvelle collection
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
            <Select onValueChange={(val) => setValue('saison', val)}>
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
            <Button type="submit">
              {isSubmitting ? 'En cours...' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
