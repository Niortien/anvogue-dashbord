export interface Article {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  categoryId: string;
  collectionId: string;
  image: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  variants: ArticleVariant[];
}

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
  name: string;
  description: string;
 type : string; // 'clothing', 'accessories', etc.
}

export interface Collection {

  nom: string;
  description: string;
  saison:string
 

}

export interface Client{
    id: String,
    nom: String,
    prenom: String,
    nomUtilisateur: String,
    email: String,
    phone: String,
    password: String,
    genre:  String,
    adresse:  String,
    date_naissance: String,
    avatar: String
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