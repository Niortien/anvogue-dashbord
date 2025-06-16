"use client"
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQueryState, parseAsString } from 'nuqs'

export default function SearchCategorie() {
  const [categorie, setCategorie] = useQueryState('categorie', parseAsString)

  const handleSearch = (value: string) => {
    setCategorie(value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <Input placeholder="Rechercher..."
        value={categorie ?? ""} onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 w-64" />
    </div>

  );
}