"use server";

import { createVarieteSchema, updateVarieteSchema, CreateVarieteSchema, UpdateVarieteSchema } from "./variete.schema";
import { BASE_URL } from "../base-url";

const VarieteAPI = {
  create: {
    endpoint: `${BASE_URL}/variete`,
    method: "POST",
  },
  getAll: {
    endpoint: () => `${BASE_URL}/variete`,
    method: "GET",
  },
  getOne: {
    endpoint: (id: string) => `${BASE_URL}/variete/${id}`,
    method: "GET",
  },
  update: {
    endpoint: (id: string) => `${BASE_URL}/variete/${id}`,
    method: "PATCH",
  },
  delete: {
    endpoint: (id: string) => `${BASE_URL}/variete/${id}`,
    method: "DELETE",
  },
};

// CREATE
export const createVariete = async (body: CreateVarieteSchema) => {
  const parsed = createVarieteSchema.safeParse(body);
  try {
      const parsed = createVarieteSchema.safeParse(body);
      if (!parsed.success) {
        return { success: false, error: "Erreur de validation" };
      }
      const data = parsed.data;
  
      const formData = new FormData();
      formData.append("couleur", data.couleur);
      formData.append("article_id", data.article_id);

  if (data.image instanceof File) formData.append("image", data.image);
      formData.append(
        "tailles",
        JSON.stringify(
          Array.isArray(data.tailles)
            ? data.tailles.filter(
                (i) =>
                  i &&
                  typeof i === "object" &&
                  i.taille &&
                  i.taille.trim() !== "" &&
                  typeof i.quantite === "number" &&
                  !isNaN(i.quantite) &&
                  typeof i.prix === "number" &&
                  !isNaN(i.prix)
              )
            : []
        )
      );
  
      
  
      const response = await fetch(VarieteAPI.create.endpoint, {
        method: VarieteAPI.create.method,
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          return {
            success: false,
            error:
              typeof errorData.message === "string"
                ? errorData.message
                : errorData.message?.[0] || `Erreur ${response.status}`,
          };
        } catch {
          return { success: false, error: errorText || `Erreur ${response.status}` };
        }
      }
  
      const responseData = await response.json();
      return { success: true, data: responseData };
    } catch (error) {
      console.error("Erreur dans createArticle:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      };
    }
}


// GET ALL
export const getAllVarietes = async () => {
  const response = await fetch(VarieteAPI.getAll.endpoint(), { method: VarieteAPI.getAll.method });
  if (!response.ok) return [];
  return await response.json();
};

// GET ONE
export const getOneVariete = async (id: string) => {
  const response = await fetch(VarieteAPI.getOne.endpoint(id), { method: VarieteAPI.getOne.method });
  const responseData = await response.json();
  if (!response.ok) {
    return { success: false, error: responseData.message?.[0] ?? responseData.message };
  }
  return { success: true, data: responseData };
};

// DELETE
export const deleteVariete = async (id: string) => {
  const response = await fetch(VarieteAPI.delete.endpoint(id), { method: VarieteAPI.delete.method });
  const responseData = await response.json();
  if (!response.ok) {
    return { success: false, error: responseData.message?.[0] ?? responseData.message };
  }
  return { success: true, data: responseData };
};

// UPDATE
export const updateVariete = async (id: string, body: UpdateVarieteSchema) => {
  const parsed = updateVarieteSchema.safeParse(body);
  if (!parsed.success) {
    return { success: false, error: "Erreur de validation" };
  }

  const data = parsed.data;
  const formData = new FormData();

  if (typeof data.couleur === "string") {
  formData.append("couleur", data.couleur);
}
 if (data.image instanceof File) {
      formData.append("image", data.image);
    }
  if (data.tailles) {
    formData.append("tailles", JSON.stringify(data.tailles));
  }
  if (data.article_id) {
    formData.append("article_id", data.article_id);
  }

  const response = await fetch(VarieteAPI.update.endpoint(id), {
    method: VarieteAPI.update.method,
    body: formData,
  });

  const responseData = await response.json();
  if (!response.ok) {
    return { success: false, error: responseData.message?.[0] ?? responseData.message };
  }
  return { success: true, data: responseData };
};