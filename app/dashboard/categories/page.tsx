import { Suspense } from "react";
import TableCategorie from "./table-categorie";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import PlaceholderCollection from "./placeholder-collection";
import AddCategorie from "./add-categorie";
import SearchCategorie from "./search-categorie";
import { loadSearchParams } from "./searchParams";
import type { SearchParams } from 'nuqs/server'

interface PageProps {
  searchParams: Promise<SearchParams>
}

export default async function CategoriesPage({ searchParams }: PageProps) {

  const { categorie } = await loadSearchParams(searchParams)
  console.log(categorie)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Organisez vos articles par categories</p>
        </div>
        <AddCategorie />
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen size={20} /> Liste des Categories
              {/* ({filteredCollections.length}) */}
            </CardTitle>
            <SearchCategorie />
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<PlaceholderCollection />}>
            <TableCategorie categorie={categorie} />
          </Suspense>
        </CardContent>
      </Card>
    </div>

  );
}