'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Heart,
  Palette,
} from 'lucide-react';
import { articles, clients, salesData, categoryStats } from '@/lib/mock-data';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function DashboardPage() {
  const totalArticles = articles.length;
  const totalVariants = articles.reduce((sum, article) => sum + article.variants.length, 0);
  const totalClients = clients.length;
  const totalSales = salesData.reduce((sum, data) => sum + data.sales, 0);
  const totalRevenue = salesData.reduce((sum, data) => sum + data.revenue, 0);
  const popularArticles = articles.sort((a, b) => b.likes - a.likes).slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-1">Vue d'ensemble de votre activité</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Dernière mise à jour</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatsCard
            title="Total Articles"
            value={totalArticles}
            change="+12% ce mois"
            changeType="positive"
            icon={Package}
            color="blue"
          />
          <StatsCard
            title="Total Variantes"
            value={totalVariants}
            change="+25% ce mois"
            changeType="positive"
            icon={Palette}
            color="green"
          />
          <StatsCard
            title="Clients Actifs"
            value={totalClients}
            change="+8% ce mois"
            changeType="positive"
            icon={Users}
            color="yellow"
          />
          <StatsCard
            title="Ventes Totales"
            value={totalSales}
            change="+15% ce mois"
            changeType="positive"
            icon={ShoppingCart}
            color="red"
          />
          <StatsCard
            title="Chiffre d'Affaires"
            value={`${totalRevenue.toLocaleString('fr-FR')}€`}
            change="+18% ce mois"
            changeType="positive"
            icon={DollarSign}
            color="blue"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} />
                Évolution des Ventes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign size={20} />
                Chiffre d'Affaires Mensuel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition par Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {categoryStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Popular Articles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart size={20} />
                Articles les Plus Aimés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{article.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{article.basePrice}€</span>
                          <span>•</span>
                          <span>{article.variants.length} variante{article.variants.length > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-red-600">
                      <Heart size={16} fill="currentColor" />
                      <span className="font-medium">{article.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Variants Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette size={20} />
              Aperçu des Variantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.slice(0, 3).map((article) => (
                <div key={article.id} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-sm">{article.title}</h4>
                      <p className="text-xs text-gray-500">{article.variants.length} variante{article.variants.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {article.variants.slice(0, 2).map((variant) => (
                      <div key={variant.id} className="flex justify-between items-center text-xs">
                        <span className="truncate">{variant.name}</span>
                        <span className="font-medium">{variant.price}€</span>
                      </div>
                    ))}
                    {article.variants.length > 2 && (
                      <p className="text-xs text-gray-500">
                        +{article.variants.length - 2} autre{article.variants.length - 2 > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}