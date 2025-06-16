"use server"
import { BASE_URL } from "../../base-url"

const utlisateurApi={
    //Route permettant de récuperer tous les utiisateurs
    getAll:{
        endpoint: () => `${BASE_URL}/utilisateur`,
        method:"GET"
    },
    //Route permettant de récuperer un utiisateur spécifiquement à travers son id
    detail:{
         endpoint: (utilisateurID:string) => `${BASE_URL}/utilisateur/${utilisateurID}`,
        method:"GET"
    },
    //Route permettant de mettre à jour un utiisateur spécifiquement à travers son id
    update:{
         endpoint: (utilisateurID:string) => `${BASE_URL}/utilisateur/${utilisateurID}`,
        method:"PATCH"
    },
        //Route permettant de supprimer un utiisateur spécifiquement à travers son id
    delete:{
         endpoint: (utilisateurID:string) => `${BASE_URL}/utilisateur/${utilisateurID}`,
        method:"DELETE"
    }
}
