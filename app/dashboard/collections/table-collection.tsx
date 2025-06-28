import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Collection } from '@/lib/types';
import { getAllCollections } from '@/service-anvogue/collection/collection.action';
import ActionsCollection from './actions-collection';
import EditCollection from './edit-collection';
import DeleteCollection from './delete-collection';

const getSeasonColor = (saison?: string) => {
  switch (saison) {
    case 'PRINTEMPS': return 'bg-green-200 text-green-800';
    case 'ÉTÉ': return 'bg-yellow-200 text-yellow-800';
    case 'AUTOMNE': return 'bg-orange-200 text-orange-800';
    case 'HIVER': return 'bg-blue-200 text-blue-800';
    case 'TOUTES_SAISONS': return 'bg-gray-200 text-gray-800';
    default: return 'bg-muted text-muted-foreground';
  }
}

interface Props {
}
export default async function TableCollection({ }: Props) {
  const collections: Collection[] = await getAllCollections()
 
//  await new Promise((resolve) => setTimeout(() => resolve(""), 5000))

  return (
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
        {collections.map((collection) => (
          <TableRow key={collection.id}>
            <TableCell>{collection.nom}</TableCell>
            <TableCell className="max-w-xs truncate">{collection.description}</TableCell>
            <TableCell>
              <Badge className={getSeasonColor(collection.saison)}>{collection.saison?.replaceAll("_", " ").toUpperCase()}</Badge>
            </TableCell>
            <TableCell>
              
              <EditCollection collection={collection} />
              <DeleteCollection collection={collection} />
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
