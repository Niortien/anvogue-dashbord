import { Category } from "@/lib/types";
import CategorieContent from "./CategorieContent";


export default async function CategoriesPage() {

  const reponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categorie`)
  const categorie: Category[] = await reponse.json()

  return (
    <div>
      <CategorieContent categorie={categorie} />
    </div>
  );
}