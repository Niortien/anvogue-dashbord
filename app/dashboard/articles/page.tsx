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
  const responseArticle = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article`
  );
  //Fetch de categorie
  const reponseCategorie = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categorie`
  );
  //Fetch de collection
  const reponseCollection = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collection`
  );

  //Récuperation et convertion des données sous forme JSON;
  
  const collection: Collection[] = await reponseCollection.json();
  const categorie: Category[] = await reponseCategorie.json();
  const article: ArticleResponse = await responseArticle.json();
  console.log(article);
  return (
    <div className="space-y-6">
      <ArticleContent
        article={article}
        categorie={categorie}
        collection={collection}
      />
    </div>
  );
}
