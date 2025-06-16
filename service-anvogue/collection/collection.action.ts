"use server";

import { createCollectionSchema, updateCollectionSchema, CreateCollectionSchema, UpdateCollectionSchema } from "./collection.schema";
import { BASE_URL } from "../base-url";

const CollectionAPI = {
  create: {
    endpoint: `${BASE_URL}/collection`,
    method: "POST",
  },
  getAll: {
    endpoint: () => `${BASE_URL}/collection`,
    method: "GET",
  },
  getOne: {
    endpoint: (collectionID: string) => `${BASE_URL}/collection/${collectionID}`,
    method: "GET",
  },
  update: {
    endpoint: (collectionID: string) => `${BASE_URL}/collection/${collectionID}`,
    method: "PATCH",
  },
  delete: {
    endpoint: (collectionID: string) => `${BASE_URL}/collection/${collectionID}`,
    method: "DELETE",
  },
};

// CREATE COLLECTION
export const createCollection = async (body: CreateCollectionSchema) => {
  const { data, success } = createCollectionSchema.safeParse(body);
  if (!success) {
    return { success: false, error: "Erreur de validation" };
  }

  //Transformation des données en FormData
  const formData = new FormData();
  formData.append("nom", data.nom);
  if (data.description) formData.append("description", data.description);
  if (data.saison) formData.append("saison", data.saison);


  // Ici, comme il n’y a pas de fichier, on peut envoyer en JSON
  const response = await fetch(CollectionAPI.create.endpoint, {
    method: CollectionAPI.create.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error:
        typeof responseData.message === "string"
          ? responseData.message
          : responseData.message[0],
    };
  }

  return { success: true, data: responseData };
};

// GET ALL COLLECTIONS
export const getAllCollections = async () => {

  const response = await fetch(CollectionAPI.getAll.endpoint(), {
    method: CollectionAPI.getAll.method,
  });

  if (!response.ok) return [];

  const responseData = await response.json();
  return responseData;
};

// GET ONE COLLECTION
export const getOneCollection = async (collectionID: string) => {
  const response = await fetch(CollectionAPI.getOne.endpoint(collectionID), {
    method: CollectionAPI.getOne.method,
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error:
        typeof responseData.message === "string"
          ? responseData.message
          : responseData.message[0],
    };
  }

  return { success: true, data: responseData };
};

// UPDATE COLLECTION
export const updateCollection = async (collectionID: string, body: UpdateCollectionSchema) => {
  const { data, success } = updateCollectionSchema.safeParse(body);
  if (!success) {
    return { success: false, error: "Erreur de validation" };
  }

  const response = await fetch(CollectionAPI.update.endpoint(collectionID), {
    method: CollectionAPI.update.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error:
        typeof responseData.message === "string"
          ? responseData.message
          : responseData.message[0],
    };
  }

  return { success: true, data: responseData };
};

// DELETE COLLECTION
export const deleteCollection = async (collectionID: string) => {
  const response = await fetch(CollectionAPI.delete.endpoint(collectionID), {
    method: CollectionAPI.delete.method,
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error:
        typeof responseData.message === "string"
          ? responseData.message
          : responseData.message[0],
    };
  }

  return { success: true, data: responseData };
};
