import { Collection } from "@/lib/types";
import CollectionContent from "./CollectionContent";

export default async function CollectionsPage() {
  
 const reponse=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collection`)
  const collection:Collection[]=await reponse.json()
  return (
   <div>
    <CollectionContent collection={collection}  />
   </div>
  );
}