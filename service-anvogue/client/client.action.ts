"use server"
import { BASE_URL } from "../../base-url"

const clientApi={
    //Route permettant de récuperer tous les cleints
    getAll:{
        endpoint: () => `${BASE_URL}/client`,
        method:"GET"
    },
    //Route permettant de récuperer un client spécifiquement à travers son id
    detail:{
         endpoint: (clientID:string) => `${BASE_URL}/client/${clientID}`,
        method:"GET"
    },
    //Route permettant de mettre à jour un client spécifiquement à travers son id
    update:{
         endpoint: (clientID:string) => `${BASE_URL}/client/${clientID}`,
        method:"PATCH"
    },
        //Route permettant de supprimer un client spécifiquement à travers son id
    delete:{
         endpoint: (clientID:string) => `${BASE_URL}/client/${clientID}`,
        method:"DELETE"
    }
}
