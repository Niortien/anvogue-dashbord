import { z } from "zod";

// ✅ Type pour une taille avec quantité et prix
const tailleSchema = z.object({
  taille: z.string({
    required_error: "La taille est requise",
  }),
  quantite: z.number({
    required_error: "La quantité est requise",
    invalid_type_error: "La quantité doit être un nombre",
  }),
  prix: z.number({
    required_error: "Le prix est requis",
    invalid_type_error: "Le prix doit être un nombre",
  }),
});

// ✅ Schéma de création
export const createVarieteSchema = z.object({
  couleur: z.string({
    required_error: "La couleur est requise",
  }),

  tailles: z
    .preprocess((val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return undefined;
        }
      }
      return val;
    }, z.array(tailleSchema, {
      required_error: "La liste des tailles est requise",
    })),

  images: z
    .array(z.string().min(1, "Le chemin de l'image ne peut pas être vide"), {
      required_error: "Les images sont requises",
    }),

  article_id: z.string({
    required_error: "L'identifiant de l'article est requis",
  }),
});

export type CreateVarieteSchema = z.infer<typeof createVarieteSchema>;

// ✅ Schéma de mise à jour (tous les champs optionnels)
export const updateVarieteSchema = z.object({
  couleur: z.string().optional(),

  tailles: z
    .preprocess((val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return undefined;
        }
      }
      return val;
    }, z.array(tailleSchema).optional()),

  images: z.array(z.string()).optional(),

  article_id: z.string().optional(),
});


export type UpdateVarieteSchema = z.infer<typeof updateVarieteSchema>;
