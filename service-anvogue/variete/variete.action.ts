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
  if (!parsed.success) {
    return { success: false, error: "Erreur de validation" };
  }

  const data = parsed.data;
  const formData = new FormData();

  formData.append("couleur", data.couleur);
  formData.append("article_id", data.article_id);

  // Ajout des images (FileList ou tableau de fichiers)
  if (data.images && data.images.length > 0) {
    const files = Array.from(data.images );
    files.forEach((file) => {
      formData.append("images", file);
    });
  }

  // Ajout des tailles (tableau d'objets)
  if (data.tailles) {
    formData.append("tailles", JSON.stringify(data.tailles));
  }

  const response = await fetch(VarieteAPI.create.endpoint, {
    method: VarieteAPI.create.method,
    body: formData,
  });

  const responseData = await response.json();

  if (!response.ok) {
    return { success: false, error: responseData.message?.[0] ?? responseData.message };
  }

  return { success: true, data: responseData };
};

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
  if (data.images && data.images.length > 0) {
    const files = Array.from(data.images);
    files.forEach((file) => {
      formData.append("images", file);
    });
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