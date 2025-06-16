"use client"

import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Collection } from '@/lib/types';

interface Props {
  collection: Collection;
}
export default function ActionsCollection({ collection }: Props) {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={() => {}}>
        <Edit size={16} />
      </Button>
      <Button variant="outline" size="sm" onClick={() => {}} className="text-red-600 hover:text-red-700">
        <Trash2 size={16} />
      </Button>
    </div>
  );
};
