import {z } from "zod"

export const utilisateurSchema=z.object({

    nomComplet:z.string({
        message:"Entrez votre nom complet(nom +prenom)"
    }),
    nomutilisateur:z.string({
        message:"Entrez votre nom d'utilisateur"
    }),

    emai:z.string().email({
        message:"Entrez votre email"
    }),
    //TODO:je dois plus travailler sur la sécurité du password
     password:z.string().min(8,{
        message:"Entrez votre mot de passe"
    }),

role:z.string({
        message:"sélectionnez votre rôle d'utilisateur"
    }),

    date_naissance:z.string().date(
    "sélectionnez votre date de naissance"
    ),

    genre:z.string({
        message:"sélectionnez votre genre "
    }),
    avatar: z
        .instanceof(File)
        .refine((file) => file.size > 0, 'La photo est requise')
        .refine((file) => file.size <= 10 * 1024 * 1024, 'La taille de la photo ne doit pas dépasser 10 Mo')
        .refine((file) => ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(file.type), 'Format de photo non supporté (JPEG, PNG, GIF uniquement)')
        .optional(),
})

export type UtilisateurSchema = z.infer<typeof utilisateurSchema>;