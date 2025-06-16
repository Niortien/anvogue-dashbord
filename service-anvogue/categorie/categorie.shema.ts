import { z } from "zod";

// Enum des types de catégorie
export const CategorieTypeEnum = z.enum([
  "VETEMENT",
  "CHAUSSURE",
  "ALIMENT",
  "MONTRE",
]);

// ✅ Schéma pour la création
export const createCategorieSchema = z.object({
  nom: z.string({
    required_error: "Le nom est requis",
  }).min(1, "Le nom est requis"),

  description: z.string({
    required_error: "La description est requise",
  }).min(1, "La description est requise"),

  type: CategorieTypeEnum.default("VETEMENT"),
});

export type CreateCategorieSchema = z.infer<typeof createCategorieSchema>;

// ✅ Schéma pour la mise à jour
export const updateCategorieSchema = z.object({
  nom: z.string().optional(),

  description: z.string().optional(),

  type: CategorieTypeEnum.optional(),
});

export type UpdateCategorieSchema = z.infer<typeof updateCategorieSchema>;
