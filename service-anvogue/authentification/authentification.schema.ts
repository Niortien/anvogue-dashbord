import { z } from "zod";

// Données permettant la connexion d'un utilisateur

export const connexionUtilisateurSchema=z.object({
      email: z.string().email({
        message: "Vous devez entrer un email"
    }),
    password: z.string().min(8, {
        message: "Vous devez utiliser un mot de passe d'au moins 8 caractères"
    }),
})

export type ConnexionUtilisateurSchema = z.infer<typeof connexionUtilisateurSchema>



// Données permettant la connexion du client

export const connexionClientSchema=z.object({
      email: z.string().email({
        message: "Vous devez entrer un email"
    }),
    password: z.string().min(8, {
        message: "Vous devez utiliser un mot de passe d'au moins 8 caractères"
    }),
})

export type ConnexionClientSchema = z.infer<typeof connexionClientSchema>




// Données permettant l'inscription de l'utilisateur
export const inscriptionUtilisateurSchema=z.object({

    nomComplet:z.string({
        message:"Entrez votre nom complet(nom +prenom)"
    }),
    nomUtilisateur:z.string({
        message:"Entrez votre nom d'utilisateur"
    }),

    email:z.string().email({
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

export type InscriptionUtilisateurSchema = z.infer<typeof inscriptionUtilisateurSchema>;

// Données permettant l'inscription du client

export const inscriptionClientSchema=z.object({
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
    date_naissance:z.string().date(
        "Vous devez entrer votre date de naissance"
    ),
    avatar: z
        .instanceof(File)
        .refine((file) => file.size > 0, 'La photo est requise')
        .refine((file) => file.size <= 10 * 1024 * 1024, 'La taille de la photo ne doit pas dépasser 10 Mo')
        .refine((file) => ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(file.type), 'Format de photo non supporté (JPEG, PNG, GIF uniquement)')
        .optional(),
});




export type InscriptionClientSchema=z.infer<typeof inscriptionClientSchema>



