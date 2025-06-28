import { Article, Category, Collection } from "@/lib/types";
import ArticleContent from "./ArticleContent";
type ArticleResponse = {
  data: Article[];
  total: number;
  page: number;
  limit: number;
};

export default async function ArticlesPage() {
  //Fetch d'article
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article`);
   const repons = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categorie`)
    const repon = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collection`)
    const collection: Collection[] = await repon.json()
const categorie: Category[] = await repons.json()
const article: ArticleResponse = await response.json();
console.log(article);
  return (
      <div className="space-y-6">
      <ArticleContent article={article} categorie={categorie} collection={collection} />
      </div>
  );
}