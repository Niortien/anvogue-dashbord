"use server";

import { BASE_URL } from "../../base-url";
import { createVarieteSchema, CreateVarieteSchema, updateVarieteSchema, UpdateVarieteSchema } from "./variete.schema";

// Endpoint configuration
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

// CREATE VARIETE
export const createVariete = async (body: CreateVarieteSchema) => {
  const { success, data, error } = createVarieteSchema.safeParse(body);

  if (!success) {
    return {
      success: false,
      error: "Erreur de validation",
    };
  }
  

  const response = await fetch(VarieteAPI.create.endpoint, {
    method: VarieteAPI.create.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: typeof responseData.message === "string"
        ? responseData.message
        : responseData.message[0],
    };
  }

  return {
    success: true,
    data: responseData,
  };
};

// GET ALL VARIETES
export const getAllVariete = async () => {
  const response = await fetch(VarieteAPI.getAll.endpoint(), {
    method: VarieteAPI.getAll.method,
  });

  const responseData = await response.json();

  if (!response.ok) return [];

  return responseData;
};

// GET ONE VARIETE
export const getOneVariete = async (id: string) => {
  const response = await fetch(VarieteAPI.getOne.endpoint(id), {
    method: VarieteAPI.getOne.method,
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: typeof responseData.message === "string"
        ? responseData.message
        : responseData.message[0],
    };
  }

  return {
    success: true,
    data: responseData,
  };
};

// UPDATE VARIETE
export const updateVariete = async (id: string, body: UpdateVarieteSchema) => {
  const { success, data } = updateVarieteSchema.safeParse(body);

  if (!success) {
    return {
      success: false,
      error: "Erreur de validation",
    };
  }

  const response = await fetch(VarieteAPI.update.endpoint(id), {
    method: VarieteAPI.update.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: typeof responseData.message === "string"
        ? responseData.message
        : responseData.message[0],
    };
  }

  return {
    success: true,
    data: responseData,
  };
};

// DELETE VARIETE
export const deleteVariete = async (id: string) => {
  const response = await fetch(VarieteAPI.delete.endpoint(id), {
    method: VarieteAPI.delete.method,
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: typeof responseData.message === "string"
        ? responseData.message
        : responseData.message[0],
    };
  }

  return {
    success: true,
    data: responseData,
  };
};
