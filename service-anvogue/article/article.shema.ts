import { z } from "zod";

export const Genre = z.enum(["HOMME", "FEMME"]);

// Schéma pour une taille (TailleDto)
const tailleSchema = z.object({
  taille: z.string().optional(),
  quantite: z.number().optional(),
  prix: z.number().optional(),
});

// Schéma principal de création d'article (CreateArticleDto)
export const createArticleSchema = z.object({
  nom: z.string({
    required_error: "Le nom est requis",
    invalid_type_error: "Le nom doit être une chaîne de caractères",
  }).min(1, "Le nom est requis"),

  description: z.string().optional(),

  categorie_id: z.string({
    required_error: "L'identifiant de la catégorie est requis",
  }).uuid("La catégorie doit être un UUID"),

  collection_id: z.string().uuid("La collection doit être un UUID").optional(),

  infos: z.array(tailleSchema).optional(),

  image: z
    .any()
    .refine(
      (file) =>
        !file || file instanceof File || typeof file === "string",
      { message: "L'image doit être un fichier ou une URL" }
    )
    .optional(),

  quantite: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z.number({ invalid_type_error: "La quantité doit être un nombre" }).optional()
  ),

  prix: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: "Le prix est requis",
      invalid_type_error: "Le prix doit être un nombre",
    })
  ),

  estEnPromotion: z.preprocess(
    (val) => val === "true" || val === true,
    z.boolean().optional()
  ),

  prixPromotion: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z
      .number({
        invalid_type_error: "Le prix promotionnel doit être un nombre",
      })
      .optional()
  ),

  genre: Genre.optional(),
});

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;

// Pour la mise à jour, tous les champs sont optionnels
export const updateArticleSchema = createArticleSchema.partial();
export type UpdateArticleSchema = z.infer<typeof updateArticleSchema>;
