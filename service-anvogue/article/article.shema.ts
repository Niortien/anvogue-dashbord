import { z } from "zod";

// Enum à définir manuellement ou à importer depuis Prisma si disponible
export const Genre = z.enum(["HOMME", "FEMME"]); // Exemple, à adapter

export const createArticleSchema = z.object({
  nom: z.string({
    required_error: "Le nom est requis",
    invalid_type_error: "Le nom doit être une chaîne de caractères"
  }).min(1, "Le nom est requis"),

  description: z.string().optional(),

  categorie_id: z.string({
    required_error: "L'identifiant de la catégorie est requis"
  }),

  collection_id: z.string({message:"L'identifiant de la collection doit être un UUID"}).optional(),

  infos: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return undefined;
        }
      }
      return val;
    },
    z.record(z.any(), {
      required_error: "Les informations de l'article sont requises"
    })
  ),

  image: z
        .instanceof(File)
        .refine((file) => file.size > 0, 'La photo est requise')
        .refine((file) => file.size <= 10 * 1024 * 1024, 'La taille de la photo ne doit pas dépasser 10 Mo')
        .refine((file) => ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(file.type), 'Format de photo non supporté (JPEG, PNG, GIF uniquement)')
        .optional(),

  quantite: z.preprocess(
    (val) => (val === '' || val === undefined ? undefined : Number(val)),
    z.number({ invalid_type_error: "La quantité doit être un nombre" }).optional()
  ),

  prix: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: "Le prix est requis",
      invalid_type_error: "Le prix doit être un nombre"
    })
  ),

  estEnPromotion: z.preprocess(
    (val) => (val === "true" || val === true),
    z.boolean().optional()
  ),

  prixPromotion: z.preprocess(
    (val) => (val === '' || val === undefined ? undefined : Number(val)),
    z.number({ invalid_type_error: "Le prix promotionnel doit être un nombre" }).optional()
  ),

  genre: z.string().optional(),
});

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;


export const updateArticleSchema = z.object({
  nom: z.string().optional(),

  description: z.string().optional(),

  categorie_id: z.string().optional(),

  collection_id: z.string().optional(),

  infos: z
    .preprocess(
      (val) => {
        if (typeof val === "string") {
          try {
            return JSON.parse(val);
          } catch {
            return undefined;
          }
        }
        return val;
      },
      z.record(z.any()).optional()
    ),

  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'La photo est requise')
    .refine((file) => file.size <= 10 * 1024 * 1024, 'La taille de la photo ne doit pas dépasser 10 Mo')
    .refine(
      (file) => ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(file.type),
      'Format de photo non supporté (JPEG, PNG, GIF uniquement)'
    )
    .optional(),

  quantite: z.preprocess(
    (val) => (val === '' || val === undefined ? undefined : Number(val)),
    z.number().optional()
  ),

  prix: z.preprocess(
    (val) => (val === '' || val === undefined ? undefined : Number(val)),
    z.number().optional()
  ),

  estEnPromotion: z.preprocess(
    (val) => val === "true" || val === true,
    z.boolean().optional()
  ),

  prixPromotion: z.preprocess(
    (val) => (val === '' || val === undefined ? undefined : Number(val)),
    z.number().optional()
  ),

  genre: Genre.optional(),
});

export type UpdateArticleSchema = z.infer<typeof updateArticleSchema>;