"use server";

import { createArticleSchema, updateArticleSchema, CreateArticleSchema, UpdateArticleSchema } from "./article.shema";
import { BASE_URL } from "../base-url";

const ArticleAPI = {
  create: {
    endpoint: `${BASE_URL}/article`,
    method: "POST",
  },
  getAll: {
    endpoint: () => `${BASE_URL}/article`,
    method: "GET",
  },
  getOne: {
    endpoint: (id: number) => `${BASE_URL}/article/${id}`,
    method: "GET",
  },
  update: {
    endpoint: (id: number) => `${BASE_URL}/article/${id}`,
    method: "PATCH",
  },
  delete: {
    endpoint: (id: number) => `${BASE_URL}/article/${id}`,
    method: "DELETE",
  },
};

// CREATE
export const createArticle = async (body: CreateArticleSchema) => {
  const parsed = createArticleSchema.safeParse(body);
  if (!parsed.success) {
    return { success: false, error: "Erreur de validation" };
  }

  const data = parsed.data;
  const formData = new FormData();

  formData.append("nom", data.nom);
  formData.append("categorie_id", data.categorie_id);
  formData.append("infos", JSON.stringify(data.infos));
  formData.append("prix", data.prix.toString());

  if (data.description) formData.append("description", data.description);
  if (data.collection_id) formData.append("collection_id", data.collection_id);
  if (data.image) formData.append("image", data.image);
  if (data.quantite) formData.append("quantite", data.quantite.toString());
  if (data.estEnPromotion !== undefined) formData.append("estEnPromotion", data.estEnPromotion.toString());
  if (data.prixPromotion !== undefined) formData.append("prixPromotion", data.prixPromotion.toString());
  if (data.genre) formData.append("genre", data.genre);

  const response = await fetch(ArticleAPI.create.endpoint, {
    method: ArticleAPI.create.method,
    body: formData,
  });

  const responseData = await response.json();

  if (!response.ok) {
    return { success: false, error: responseData.message?.[0] ?? responseData.message };
  }

  return { success: true, data: responseData };
};

// GET ALL
export const getAllArticles = async () => {
  const response = await fetch(ArticleAPI.getAll.endpoint(), { method: ArticleAPI.getAll.method });
  if (!response.ok) return [];
  return await response.json();
};

// GET ONE
export const getOneArticle = async (id: number) => {
  const response = await fetch(ArticleAPI.getOne.endpoint(id), { method: ArticleAPI.getOne.method });
  const responseData = await response.json();
  if (!response.ok) {
    return { success: false, error: responseData.message?.[0] ?? responseData.message };
  }
  return { success: true, data: responseData };
};

// DELETE
export const deleteArticle = async (id: number) => {
  const response = await fetch(ArticleAPI.delete.endpoint(id), { method: ArticleAPI.delete.method });
  const responseData = await response.json();
  if (!response.ok) {
    return { success: false, error: responseData.message?.[0] ?? responseData.message };
  }
  return { success: true, data: responseData };
};

// UPDATE
export const updateArticle = async (id: number, body: UpdateArticleSchema) => {
  const parsed = updateArticleSchema.safeParse(body);
  if (!parsed.success) {
    return { success: false, error: "Erreur de validation" };
  }

  const data = parsed.data;
  const formData = new FormData();

  if (data.nom) formData.append("nom", data.nom);
  if (data.description) formData.append("description", data.description);
  if (data.categorie_id) formData.append("categorie_id", data.categorie_id);
  if (data.collection_id) formData.append("collection_id", data.collection_id);
  if (data.infos) formData.append("infos", JSON.stringify(data.infos));
  if (data.image) formData.append("image", data.image);
  if (data.quantite !== undefined) formData.append("quantite", data.quantite.toString());
  if (data.prix !== undefined) formData.append("prix", data.prix.toString());
  if (data.estEnPromotion !== undefined) formData.append("estEnPromotion", data.estEnPromotion.toString());
  if (data.prixPromotion !== undefined) formData.append("prixPromotion", data.prixPromotion.toString());
  if (data.genre) formData.append("genre", data.genre);

  const response = await fetch(ArticleAPI.update.endpoint(id), {
    method: ArticleAPI.update.method,
    body: formData,
  });

  const responseData = await response.json();
  if (!response.ok) {
    return { success: false, error: responseData.message?.[0] ?? responseData.message };
  }
  return { success: true, data: responseData };
};
