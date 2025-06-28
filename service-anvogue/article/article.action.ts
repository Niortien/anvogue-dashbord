"use server";

import {
  createArticleSchema,
  updateArticleSchema,
  CreateArticleSchema,
  UpdateArticleSchema,
} from "./article.shema";
import { BASE_URL } from "../base-url";
import { Article } from "@/lib/types";

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
    endpoint: (id: string) => `${BASE_URL}/article/${id}`,
    method: "GET",
  },
  update: {
    endpoint: (id: string) => `${BASE_URL}/article/${id}`,
    method: "PATCH",
  },
  delete: {
    endpoint: (id: string) => `${BASE_URL}/article/${id}`,
    method: "DELETE",
  },
};

export const createArticle = async (body: CreateArticleSchema) => {
  try {
    const parsed = createArticleSchema.safeParse(body);
    if (!parsed.success) {
      return { success: false, error: "Erreur de validation" };
    }
    const data = parsed.data;

    const formData = new FormData();
    formData.append("nom", data.nom);
    formData.append("categorie_id", data.categorie_id);
    formData.append("prix", data.prix.toString());

    formData.append(
      "infos",
      JSON.stringify(
        Array.isArray(data.infos)
          ? data.infos.filter(
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

    if (data.description) formData.append("description", data.description);
    if (data.collection_id) formData.append("collection_id", data.collection_id);
    if (data.image instanceof File) formData.append("image", data.image);
    if (typeof data.quantite === "number") formData.append("quantite", data.quantite.toString());
    if (typeof data.estEnPromotion === "boolean") formData.append("estEnPromotion", data.estEnPromotion.toString());
    if (typeof data.prixPromotion === "number") formData.append("prixPromotion", data.prixPromotion.toString());
    if (data.genre) formData.append("genre", data.genre);

    const response = await fetch(ArticleAPI.create.endpoint, {
      method: ArticleAPI.create.method,
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
};

// GET ALL ARTICLES ACTION - CORRECTION PRINCIPALE
export const getAllArticles = async (query?: { page?: number; limit?: number; [key: string]: any }): Promise<{ 
  success: boolean; 
  data?: Article[]; 
  pagination?: { total: number; page: number; limit: number }; 
  error?: string 
}> => {
  try {
    let url = ArticleAPI.getAll.endpoint();
    
    // Ajouter les paramètres de query si fournis
    if (query && Object.keys(query).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
      url += `?${searchParams.toString()}`;
    }

    const response = await fetch(url, {
      method: ArticleAPI.getAll.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Important pour les server actions
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Erreur ${response.status}`;
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = typeof errorData.message === "string" 
          ? errorData.message 
          : errorData.message?.[0] || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      return { success: false, error: errorMessage };
    }

    const responseData = await response.json();
    
    // Gestion du format paginé
    if (responseData && typeof responseData === 'object' && 'data' in responseData) {
      // Format paginé: { data: [], total: 0, page: 1, limit: 10 }
      const { data, total, page, limit } = responseData;
      
      if (!Array.isArray(data)) {
        return { 
          success: false, 
          error: "Format de données invalide dans la réponse paginée" 
        };
      }

      return { 
        success: true, 
        data: data,
        pagination: { total, page, limit }
      };
    }
    
    // Format simple: []
    if (Array.isArray(responseData)) {
      return { success: true, data: responseData };
    }

    return { 
      success: false, 
      error: "Format de réponse invalide" 
    };
    
  } catch (error) {
    console.error('Erreur dans getAllArticles:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erreur de connexion" 
    };
  }
};

// GET ONE ARTICLE ACTION
export const getOneArticle = async (id: string) => {
  try {
    if (!id || id.trim() === '') {
      return { success: false, error: "ID requis" };
    }

    const response = await fetch(ArticleAPI.getOne.endpoint(id), {
      method: ArticleAPI.getOne.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Erreur ${response.status}`;
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = typeof errorData.message === "string" 
          ? errorData.message 
          : errorData.message?.[0] || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      return { success: false, error: errorMessage };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
    
  } catch (error) {
    console.error('Erreur dans getOneArticle:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erreur de connexion" 
    };
  }
};

// DELETE ARTICLE ACTION
export const deleteArticle = async (id: string) => {
  try {
    if (!id || id.trim() === '') {
      return { success: false, error: "ID requis" };
    }

    const response = await fetch(ArticleAPI.delete.endpoint(id), {
      method: ArticleAPI.delete.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Erreur ${response.status}`;
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = typeof errorData.message === "string" 
          ? errorData.message 
          : errorData.message?.[0] || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      return { success: false, error: errorMessage };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
    
  } catch (error) {
    console.error('Erreur dans deleteArticle:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erreur de connexion" 
    };
  }
};

// UPDATE ARTICLE ACTION
export const updateArticle = async (id: string, body: UpdateArticleSchema) => {
  try {
    if (!id || id.trim() === '') {
      return { success: false, error: "ID requis" };
    }

    const { data, success } = updateArticleSchema.safeParse(body);
    if (!success) {
      return { success: false, error: "Erreur de validation" };
    }
    
    const formData = new FormData();

    if (data.nom) formData.append("nom", data.nom);
    if (data.description) formData.append("description", data.description);
    if (data.categorie_id) formData.append("categorie_id", data.categorie_id);
    if (data.collection_id) formData.append("collection_id", data.collection_id);

    formData.append(
      "infos",
      JSON.stringify(
        Array.isArray(data.infos)
          ? data.infos.filter(i => typeof i === "object" && i !== null)
          : []
      )
    );

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    if (typeof data.quantite === "number") {
      formData.append("quantite", data.quantite.toString());
    }

    if (typeof data.prix === "number") {
      formData.append("prix", data.prix.toString());
    }

    if (typeof data.estEnPromotion === "boolean") {
      formData.append("estEnPromotion", data.estEnPromotion.toString());
    }

    if (typeof data.prixPromotion === "number" && !isNaN(data.prixPromotion)) {
      formData.append("prixPromotion", data.prixPromotion.toString());
    }

    if (data.genre) {
      formData.append("genre", data.genre);
    }

    const response = await fetch(ArticleAPI.update.endpoint(id), {
      method: ArticleAPI.update.method,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Erreur ${response.status}`;
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = typeof errorData.message === "string" 
          ? errorData.message 
          : errorData.message?.[0] || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      return { success: false, error: errorMessage };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
    
  } catch (error) {
    console.error('Erreur dans updateArticle:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erreur de connexion" 
    };
  }
};