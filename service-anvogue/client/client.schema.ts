import { Avatar } from "@radix-ui/react-avatar";
import {z} from "zod"
export const clientSchema=z.object({
    nom:z.string(
        {message:"Vous devez entrer votre nom"}
    ),
     prenom:z.string(
        {message:"Vous devez entrer votre prenom"}
    ),
     nomUtilisateur:z.string(
        {message:"Vous devez entrer votre nom d'utilisateur"}
    ),
    email:z.string().email(
        {message:"Vous devez entrer votre email"}
    ),
     phone:z.string(
        {message:"Vous devez entrer votre numero de téléphone"}
    ),
     password:z.string().min(8,
        {message:"Vous devez entrer votre mot de passe"}
    ),
    genre:z.string(
        {message:"Vous devez entrer votre genre"}
    ),
    adresse:z.string(
        {message:"Vous devez entrer votre adresse"}
    ),
    date_naissance: z.date({ required_error: "Vous devez entrer votre date de naissance" }),
    Avatar: z
        .instanceof(File)
        .refine((file) => file.size > 0, 'La photo est requise')
        .refine((file) => file.size <= 10 * 1024 * 1024, 'La taille de la photo ne doit pas dépasser 10 Mo')
        .refine((file) => ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(file.type), 'Format de photo non supporté (JPEG, PNG, GIF uniquement)')
        .optional(),
});




export type ClientSchema=z.infer<typeof clientSchema>