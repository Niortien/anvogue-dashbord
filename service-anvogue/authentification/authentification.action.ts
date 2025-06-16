"use server";

import { BASE_URL } from "../../base-url";
import { connexionClientSchema, ConnexionClientSchema, connexionUtilisateurSchema, ConnexionUtilisateurSchema, inscriptionClientSchema, InscriptionClientSchema, inscriptionUtilisateurSchema, InscriptionUtilisateurSchema } from "./authentification.schema";


const AuthUtilisateurAPI = {
    inscription: {
        endpoint: `${BASE_URL}/auth/inscription`,
        method: "POST",
    },
    connexion: {
        endpoint: `${BASE_URL}/auth/connexion`,
        method: "POST",
    },
    profile: {
        endpoint: `${BASE_URL}/auth/profile`,
        method: "GET",
    }
}

const AuthClientAPI = {
    inscription: {
        endpoint: `${BASE_URL}/auth/signin`,
        method: "POST",
    },
    connexion: {
        endpoint: `${BASE_URL}/auth/login`,
        method: "POST",
    },
    profile: {
        endpoint: `${BASE_URL}/auth/profile`,
        method: "GET",
    }
}



//SECTION UTILISATEUR

//FONCTION INSCRIPTION DE L'UTILISATEUR
export const inscription = async (body: InscriptionUtilisateurSchema) => {
    // Validation des données
    const { data, success, error } = inscriptionUtilisateurSchema.safeParse(body)
    if (!success) {
        return {
            success: false,
            error: "Erreur de validation"
        };
    }
    // Transformation des données en FormData
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("role", data.role);
    formData.append("genre", data.genre);
    formData.append("password", data.password);
    formData.append("nomComplet", data.nomComplet);
    formData.append("nomUtilisateur", data.nomUtilisateur);
    formData.append("date_naissance", new Date(data.date_naissance).toISOString());

    if (data.avatar) {
        formData.append("image", data.avatar);
    }

    // Requête
    const response = await fetch(AuthUtilisateurAPI.inscription.endpoint, {
        method: AuthUtilisateurAPI.inscription.method,
        body: formData
    });

    // Récupération des données de la réponse
    const responseData = await response.json();

    if (!response.ok) {
        return {
            success: false,
            error: typeof responseData.message === "string" ? responseData.message : responseData.message[0]
        };
    }

    return {
        success: true,
        data: responseData
    };

}

// FONCTION  DE CONNEXION

export const connexion = async (body: ConnexionUtilisateurSchema) => {

    // Validation des données
    const { data, success, error } = connexionUtilisateurSchema.safeParse(body)
    if (!success) {
        return {
            success: false,
            error: "Erreur de validation"
        };
    }
    // Requête
    const response = await fetch(AuthUtilisateurAPI.connexion.endpoint, {
        method: AuthUtilisateurAPI.connexion.method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    // Récupération des données de la réponse
    const responseData = await response.json();

    if (!response.ok) {
        return {
            success: false,
            error: typeof responseData.message === "string" ? responseData.message : responseData.message[0]
        };
    }

    return {
        success: true,
        data: responseData
    };
}
export const profileUtilisateur = async (token: string) => {
    // Requête
    const response = await fetch(AuthUtilisateurAPI.profile.endpoint, {
        method: AuthUtilisateurAPI.profile.method,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    // Récupération des données de la réponse
    const responseData = await response.json();

    if (!response.ok) {
        return {
            success: false,
            error: typeof responseData.message === "string" ? responseData.message : responseData.message[0]
        };
    }

    return {
        success: true,
        data: responseData
    };
}


//SECTION DU CLIENT


//FONCTION INSCRIPTION DU CLIENT

export const signin = async (body: InscriptionClientSchema) => {
    // Validation des données
    const { data, success, error } = inscriptionClientSchema.safeParse(body)
    if (!success) {
        return {
            success: false,
            error: "Erreur de validation"
        };
    }
    // Transformation des données en FormData
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("nom", data.nom);
    formData.append("prenom", data.genre);
    formData.append("nomUtilisateur", data.nomUtilisateur);
    formData.append("genre", data.genre);
     formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("adresse", data.adresse);
    
    formData.append("date_naissance", new Date(data.date_naissance).toISOString());

    if (data.avatar) {
        formData.append("image", data.avatar);
    }

    // Requête
    const response = await fetch(AuthClientAPI.inscription.endpoint, {
        method: AuthClientAPI.inscription.method,
        body: formData
    });

    // Récupération des données de la réponse
    const responseData = await response.json();

    if (!response.ok) {
        return {
            success: false,
            error: typeof responseData.message === "string" ? responseData.message : responseData.message[0]
        };
    }

    return {
        success: true,
        data: responseData
    };

}


export const login = async (body: ConnexionClientSchema) => {

    // Validation des données
    const { data, success, error } = connexionClientSchema.safeParse(body)
    if (!success) {
        return {
            success: false,
            error: "Erreur de validation"
        };
    }
    // Requête
    const response = await fetch(AuthClientAPI.connexion.endpoint, {
        method: AuthClientAPI.connexion.method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    // Récupération des données de la réponse
    const responseData = await response.json();

    if (!response.ok) {
        return {
            success: false,
            error: typeof responseData.message === "string" ? responseData.message : responseData.message[0]
        };
    }

    return {
        success: true,
        data: responseData
    };
}

export const profileClient = async (token: string) => {
    // Requête
    const response = await fetch(AuthClientAPI.profile.endpoint, {
        method: AuthClientAPI.profile.method,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    // Récupération des données de la réponse
    const responseData = await response.json();

    if (!response.ok) {
        return {
            success: false,
            error: typeof responseData.message === "string" ? responseData.message : responseData.message[0]
        };
    }

    return {
        success: true,
        data: responseData
    };
}

//Profil Utilisateur






