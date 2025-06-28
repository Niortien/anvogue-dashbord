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
import { Edit, Plus } from 'lucide-react';
import { CreateCollectionSchema, updateCollectionSchema } from '@/service-anvogue/collection/collection.schema';
import { createCollection, updateCollection } from '@/service-anvogue/collection/collection.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Collection } from '@/lib/types';

const saisons = ['PRINTEMPS', 'ÉTÉ', 'AUTOMNE', 'HIVER', 'TOUTES_SAISONS'];
interface EditCollectionProps {
    collection: Collection;
  }
export default function EditCollection({ collection }: EditCollectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCollectionSchema>();

  
  const handleEdit = () => {
     reset();
     setIsDialogOpen(true);
   };
 
   const onSubmit = async (data: CreateCollectionSchema) => {
     try {
       const result = await updateCollection(collection.id, data);
       if (result.success && result.data) {
         toast.success("Collection modifiée avec succès");
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
        onClick={() => handleEdit()}>
          <Edit className="h-4 w-4" />
          
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
            <Input id="nom" {...register('nom')} />
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
              {isSubmitting ? 'En cours...' : 'Modifier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
