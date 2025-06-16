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
import { Plus, Search, Edit, Trash2, Palette } from 'lucide-react';
import { varieties as initialVarieties } from '@/lib/mock-data';
import { Variety } from '@/lib/types';

export default function VarietiesPage() {
  const [varieties, setVarieties] = useState<Variety[]>(initialVarieties);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVariety, setEditingVariety] = useState<Variety | null>(null);

  const filteredVarieties = varieties.filter(variety =>
    variety.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    variety.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setVarieties(varieties.filter(variety => variety.id !== id));
  };

  const handleEdit = (variety: Variety) => {
    setEditingVariety(variety);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingVariety(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const varietyData: Partial<Variety> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      color: formData.get('color') as string,
    };

    if (editingVariety) {
      setVarieties(varieties.map(variety => 
        variety.id === editingVariety.id 
          ? { ...variety, ...varietyData }
          : variety
      ));
    } else {
      const newVariety: Variety = {
        ...varietyData as Variety,
        id: Date.now().toString(),
        createdAt: new Date(),
        isActive: true,
      };
      setVarieties([...varieties, newVariety]);
    }

    setIsDialogOpen(false);
    setEditingVariety(null);
  };

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Variétés</h1>
            <p className="text-gray-600 mt-1">Gérez les variétés de vos articles</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
                <Plus size={20} className="mr-2" />
                Nouvelle Variété
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingVariety ? 'Modifier la variété' : 'Nouvelle variété'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingVariety?.name}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingVariety?.description}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="color">Couleur (Hex)</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="color"
                      name="color"
                      type="color"
                      defaultValue={editingVariety?.color}
                      className="w-20"
                      required
                    />
                    <Input
                      type="text"
                      defaultValue={editingVariety?.color}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
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
                    {editingVariety ? 'Modifier' : 'Créer'}
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
                <Palette size={20} />
                Liste des Variétés ({filteredVarieties.length})
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Rechercher une variété..."
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
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Couleur</TableHead>
                  <TableHead>Date de création</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVarieties.map((variety) => (
                  <TableRow key={variety.id}>
                    <TableCell className="font-medium">{variety.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{variety.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: variety.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{variety.color}</span>
                      </div>
                    </TableCell>
                    <TableCell>{variety.createdAt.toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>
                      <Badge variant={variety.isActive ? 'default' : 'secondary'}>
                        {variety.isActive ? 'Actif' : 'Inactif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(variety)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(variety.id)}
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
      </div>
  );
}