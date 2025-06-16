export interface ArticleVariant {
  id: string;
  articleId: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: VariantAttribute[];
  image?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface VariantAttribute {
  id: string;
  name: string;
  value: string;
  type: 'color' | 'size' | 'material' | 'style' | 'custom';
  displayValue?: string;
  hexColor?: string; // Pour les couleurs
}

export interface Category {
  id: string;
  nom: string;
  description: string;
  type: string; // 'clothing', 'accessories', etc.
}

export interface Collection {
  id: string;
  nom: string;
  description: string;
  saison: string


}

export interface Article {
  id: string;
  reference: string;
  nom: string;
  description?: string;
  infos: Record<string, any>; // ou un type spécifique si connu
  status: string;
  image?: string;
  quantite?: number;
  prix: number;
  genre: string;
  estEnPromotion?: boolean;
  prixPromotion?: number;

  // Relations
  // categorie: Categorie;
  categorie_id: string;

  collection?: Collection;
  collection_id?: string;

  // varietes: Variete[];
  // notes: Note[];
  // favoris: Favoris[];

  createdAt: Date;
  updatedAt: Date;
}

// Définition du type pour les tailles
export type TailleVariete = {
  taille: string;
  quantite: number;
  prix: number;
};

// Interface TypeScript pour Variete
export interface Variete {
  id: string;
  reference: string;
  couleur: string;
  tailles?: TailleVariete[]; // correspond au champ JSON
  images: string[];

  // Relation avec Article
  article: {
    id: string;
    nom: string; // tu peux ajouter d'autres champs nécessaires, ou importer l'interface Article complète si besoin
  };
  article_id: string;
}

export interface DashboardStats {
  totalArticles: number;
  totalVariants: number;
  totalClients: number;
  totalSales: number;
  totalRevenue: number;
  monthlyGrowth: number;
  popularArticles: Article[];
}

export interface SalesData {
  month: string;
  sales: number;
  revenue: number;
}

export interface CategoryStats {
  name: string;
  count: number;
  percentage: number;
}

export interface AttributeTemplate {
  id: string;
  name: string;
  type: 'color' | 'size' | 'material' | 'style' | 'custom';
  values: string[];
  isRequired: boolean;
}