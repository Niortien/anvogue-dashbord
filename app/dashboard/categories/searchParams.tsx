import { parseAsString, createLoader } from 'nuqs/server'

export const categorieSearchParams = {
    categorie: parseAsString.withDefault(''),
}

export const loadSearchParams = createLoader(categorieSearchParams)  