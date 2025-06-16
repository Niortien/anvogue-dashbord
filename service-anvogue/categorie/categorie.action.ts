"use server";

import {
  CreateCategorieSchema,
  createCategorieSchema,
  updateCategorieSchema,
  UpdateCategorieSchema,
} from "./categorie.shema";
import { BASE_URL } from "../base-url";

const CategorieAPI = {
  create: {
    endpoint: `${BASE_URL}/categorie`,
    method: "POST",
  },
  getAll: {
    endpoint: () => `${BASE_URL}/categorie`,
    method: "GET",
  },
  getOne: {
    endpoint: (categorieID: string) => `${BASE_URL}/categorie/${categorieID}`,
    method: "GET",
  },
  update: {
    endpoint: (categorieID: string) => `${BASE_URL}/categorie/${categorieID}`,
    method: "PATCH",
  },
  delete: {
    endpoint: (categorieID: string) => `${BASE_URL}/categorie/${categorieID}`,
    method: "DELETE",
  },
};

// Helper function to format Zod errors
const formatZodErrors = (errors: any[]) => {
  return errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
};

// Helper function to handle API responses
const handleApiResponse = async (response: Response) => {
  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = typeof responseData.message === "string"
      ? responseData.message
      : Array.isArray(responseData.message)
        ? responseData.message[0]
        : `Erreur ${response.status}: ${response.statusText}`;

    return {
      success: false,
      error: errorMessage,
    };
  }

  return {
    success: true,
    data: responseData,
  };
};

// ✅ CREATE
export const createCategorie = async (body: CreateCategorieSchema) => {
  try {
    const validationResult = createCategorieSchema.safeParse(body);

    if (!validationResult.success) {
      return {
        success: false,
        error: formatZodErrors(validationResult.error.errors),
      };
    }

    const { data } = validationResult;

    const response = await fetch(CategorieAPI.create.endpoint, {
      method: CategorieAPI.create.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Create categorie error:', error);
    return {
      success: false,
      error: "Une erreur inattendue s'est produite lors de la création",
    };
  }
};

// ✅ GET ALL
export const getAllCategorie = async () => {
  try {
    const response = await fetch(CategorieAPI.getAll.endpoint(), {
      method: CategorieAPI.getAll.method,
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Get all categories error:', error);
    return [];
  }
};

// ✅ GET ONE
export const getOneCategorie = async (categorieID: string) => {
  try {
    if (!categorieID) {
      return {
        success: false,
        error: "ID de catégorie requis",
      };
    }

    const response = await fetch(CategorieAPI.getOne.endpoint(categorieID), {
      method: CategorieAPI.getOne.method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Get one categorie error:', error);
    return {
      success: false,
      error: "Une erreur inattendue s'est produite lors de la récupération",
    };
  }
};

// ✅ UPDATE
export const updateCategorie = async (
  categorieID: string,
  body: UpdateCategorieSchema
) => {
  try {
    if (!categorieID) {
      return {
        success: false,
        error: "ID de catégorie requis",
      };
    }

    const validationResult = updateCategorieSchema.safeParse(body);

    if (!validationResult.success) {
      return {
        success: false,
        error: formatZodErrors(validationResult.error.errors),
      };
    }

    const { data } = validationResult;

    const response = await fetch(CategorieAPI.update.endpoint(categorieID), {
      method: CategorieAPI.update.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Update categorie error:', error);
    return {
      success: false,
      error: "Une erreur inattendue s'est produite lors de la mise à jour",
    };
  }
};

// ✅ DELETE
export const deleteCategorie = async (categorieID: string) => {
  try {
    if (!categorieID) {
      return {
        success: false,
        error: "ID de catégorie requis",
      };
    }

    const response = await fetch(CategorieAPI.delete.endpoint(categorieID), {
      method: CategorieAPI.delete.method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Delete categorie error:', error);
    return {
      success: false,
      error: "Une erreur inattendue s'est produite lors de la suppression",
    };
  }
};