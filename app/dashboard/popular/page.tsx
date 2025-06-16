'use client';

import { DashboardLayout } from '@/app/dashboard/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, TrendingUp } from 'lucide-react';
import { articles, categories, varieties, collections } from '@/lib/mock-data';

interface Variety {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface Collection {
  id: string;
  name: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  likes: number;
  categoryId: string;
  varietyId: string;
  collectionId: string;
}

export default function PopularPage() {
  // Vérification des données et initialisation avec des tableaux vides si undefined
  const safeArticles: Article[] = Array.isArray(articles) ? articles : [];
  const safeCategories: Category[] = Array.isArray(categories) ? categories : [];
  const safeVarieties: Variety[] = Array.isArray(varieties) ? varieties : [];
  const safeCollections: Collection[] = Array.isArray(collections) ? collections : [];

  const popularArticles = [...safeArticles].sort((a, b) => b.likes - a.likes);
  const topArticles = popularArticles.slice(0, 10);

  const getCategoryName = (categoryId: string) => {
    const category = safeCategories.find(c => c.id === categoryId);
    return category?.name || 'Non défini';
  };

  const getVarietyName = (varietyId: string) => {
    const variety = safeVarieties.find(v => v.id === varietyId);
    return variety?.name || 'Non défini';
  };

  const getCollectionName = (collectionId: string) => {
    const collection = safeCollections.find(c => c.id === collectionId);
    return collection?.name || 'Non défini';
  };

  const totalLikes = safeArticles.reduce((sum, article) => sum + article.likes, 0);
  const averageLikes = safeArticles.length > 0 ? Math.round(totalLikes / safeArticles.length) : 0;
  const mostLikedArticle = popularArticles[0];

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Articles Populaires</h1>
            <p className="text-gray-600 mt-1">Découvrez les articles les plus appréciés</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total des Likes</p>
                  <p className="text-2xl font-bold text-gray-900">{totalLikes.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg">
                  <Heart className="w-6 h-6 text-red-600" fill="currentColor" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Moyenne par Article</p>
                  <p className="text-2xl font-bold text-gray-900">{averageLikes}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Plus Populaire</p>
                  <p className="text-lg font-bold text-gray-900 truncate">{mostLikedArticle?.title || 'Aucun article'}</p>
                  <p className="text-sm text-gray-500">{mostLikedArticle?.likes || 0} likes</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" fill="currentColor" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart size={20} className="text-red-600" fill="currentColor" />
              Top 10 des Articles les Plus Aimés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div 
                  key={article.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        #{index + 1}
                      </div>
                    </div>
                    
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{article.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{article.description}</p>
                      <div className="flex space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryName(article.categoryId)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getVarietyName(article.varietyId)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getCollectionName(article.collectionId)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">{article.price}€</p>
                      <p className="text-sm text-gray-600">Stock: {article.stock}</p>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-red-600">
                      <Heart size={20} fill="currentColor" />
                      <span className="font-bold text-lg">{article.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popularity Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Articles par Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {safeCategories.map(category => {
                  const categoryArticles = safeArticles.filter(a => a.categoryId === category.id);
                  const categoryLikes = categoryArticles.reduce((sum, a) => sum + a.likes, 0);
                  const avgLikes = categoryArticles.length > 0 ? Math.round(categoryLikes / categoryArticles.length) : 0;
                  
                  return (
                    <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-600">{categoryArticles.length} articles</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{categoryLikes} likes</p>
                        <p className="text-sm text-gray-600">Moy: {avgLikes}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tendances par Prix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { range: '0€ - 50€', min: 0, max: 50 },
                  { range: '50€ - 100€', min: 50, max: 100 },
                  { range: '100€ - 500€', min: 100, max: 500 },
                  { range: '500€+', min: 500, max: Infinity },
                ].map(priceRange => {
                  const rangeArticles = safeArticles.filter(a => a.price >= priceRange.min && a.price < priceRange.max);
                  const rangeLikes = rangeArticles.reduce((sum, a) => sum + a.likes, 0);
                  const avgLikes = rangeArticles.length > 0 ? Math.round(rangeLikes / rangeArticles.length) : 0;
                  
                  return (
                    <div key={priceRange.range} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{priceRange.range}</h4>
                        <p className="text-sm text-gray-600">{rangeArticles.length} articles</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{rangeLikes} likes</p>
                        <p className="text-sm text-gray-600">Moy: {avgLikes}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}