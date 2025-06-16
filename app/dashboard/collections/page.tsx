import { Suspense } from "react";
import TableCollection from "./table-collection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FolderOpen } from "lucide-react";
import PlaceholderCollection from "./placeholder-collection";
import AddCollection from "./add-collection";

export default async function CollectionsPage() {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
          <p className="text-gray-600 mt-1">Organisez vos articles par collections</p>
        </div>
        <AddCollection />
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen size={20} /> Liste des Collections
              {/* ({filteredCollections.length}) */}
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input placeholder="Rechercher..."
                // value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-10 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<PlaceholderCollection />}>
            <TableCollection />
          </Suspense>
        </CardContent>
      </Card>
    </div>

  );
}