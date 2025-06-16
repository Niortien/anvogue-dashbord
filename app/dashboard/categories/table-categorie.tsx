import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllCategorie } from '@/service-anvogue/categorie/categorie.action';
import { Category } from '@/lib/types';
import EditCategorie from './edit-categorie';
import DeleteCategorie from './delete-categorie';


export default async function TableCategorie({ categorie }: { categorie: string }) {
  const categories: Category[] = await getAllCategorie();

  return (
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
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.nom}</TableCell>
            <TableCell className="max-w-xs truncate">{category.description || '-'}</TableCell>
            <TableCell>
              <Badge variant="secondary">{category.type}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline">
                {category?.articles?.length} article(s)
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant="default">
                Actif
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <EditCategorie categorie={category} />
                <DeleteCategorie categorie={category} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
