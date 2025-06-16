'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  TrendingUp,
  Heart,
  BarChart3
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Dashboard Admin</span>
            </div>
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button variant={"outline"}>
                  Accéder au Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Dashboard de Gestion
            <span className="text-blue-600 block">d&apos;Articles</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Une solution complète pour gérer vos articles, variétés, collections et clients 
            avec des analyses avancées et des graphiques interactifs.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/dashboard">
              <Button size="lg">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Commencer
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button size="lg" variant="outline">
                <BarChart3 className="mr-2 h-5 w-5" />
                Voir les Analyses
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Gestion d'Articles</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ajoutez, modifiez et supprimez vos articles facilement. 
                Organisez-les par catégories, variétés et collections.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Gestion Clients</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Suivez vos clients, leurs commandes et leur historique d'achat. 
                Analysez les tendances de consommation.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Articles Populaires</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Identifiez les articles les plus aimés par vos clients 
                et optimisez votre catalogue en conséquence.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Analyses Avancées</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Visualisez vos performances avec des graphiques interactifs. 
                Prenez des décisions éclairées basées sur les données.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Statistiques Temps Réel</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Consultez vos KPI en temps réel : ventes, revenus, 
                croissance mensuelle et bien plus encore.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <LayoutDashboard className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Interface Intuitive</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Interface moderne et responsive, facile à utiliser 
                sur tous les appareils. Navigation simple et efficace.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-white rounded-2xl shadow-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à Optimiser Votre Gestion ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez toutes les fonctionnalités de notre dashboard 
            et transformez la façon dont vous gérez vos articles.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              <LayoutDashboard className="mr-2 h-6 w-6" />
              Accéder au Dashboard Complet
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <LayoutDashboard className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-xl font-bold">Dashboard Admin</span>
          </div>
          <p className="text-gray-400">
            Solution complète de gestion d'articles avec analyses avancées
          </p>
        </div>
      </footer>
    </div>
  );
}