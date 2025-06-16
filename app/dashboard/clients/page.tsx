import { Client } from "@/Type/client";
import ClientContent from "./ClientContent";


export default async function  ClientsPage() {
  const reponse=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client`)
  const client:Client[]=await reponse.json()

  return (
   <div>
    <ClientContent
     client={client}
     />
   </div>
  );
}