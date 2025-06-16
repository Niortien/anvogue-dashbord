'use client';

import { DashboardLayout } from '@/app/dashboard/layout';
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, DollarSign, Package, Users } from 'lucide-react';
import { salesData, categoryStats } from '@/lib/mock-data';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'];

const monthlyGrowthData = salesData.map((data, index) => ({
  ...data,
  growth: index > 0 ? ((data.sales - salesData[index - 1].sales) / salesData[index - 1].sales * 100).toFixed(1) : 0,
}));

const inventoryData = [
  { name: 'En stock', value: 245, color: '#10B981' },
  { name: 'Stock faible', value: 45, color: '#F59E0B' },
  { name: 'Rupture', value: 12, color: '#EF4444' },
];

const customerSegmentData = [
  { segment: 'Nouveaux', count: 34, percentage: 28 },
  { segment: 'Réguliers', count: 56, percentage: 46 },
  { segment: 'VIP', count: 18, percentage: 15 },
  { segment: 'Inactifs', count: 13, percentage: 11 },
];

export default function AnalyticsPage() {
  const totalRevenue = salesData.reduce((sum, data) => sum + data.revenue, 0);
  const totalSales = salesData.reduce((sum, data) => sum + data.sales, 0);
  const averageOrderValue = Math.round(totalRevenue / totalSales);
  const lastMonthGrowth = monthlyGrowthData[monthlyGrowthData.length - 1].growth;

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytiques</h1>
            <p className="text-muted-foreground mt-1">Analyse détaillée de vos performances</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CA Total</p>
                  <p className="text-2xl font-bold">{totalRevenue.toLocaleString()}€</p>
                  <p className="text-xs text-green-600 mt-1">+18% ce mois</p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg dark:bg-green-500/10">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ventes Totales</p>
                  <p className="text-2xl font-bold">{totalSales}</p>
                  <p className="text-xs text-green-600 mt-1">+{lastMonthGrowth}% ce mois</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg dark:bg-blue-500/10">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Panier Moyen</p>
                  <p className="text-2xl font-bold">{averageOrderValue}€</p>
                  <p className="text-xs text-green-600 mt-1">+5% ce mois</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg dark:bg-yellow-500/10">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taux de Conversion</p>
                  <p className="text-2xl font-bold">3.4%</p>
                  <p className="text-xs text-green-600 mt-1">+0.3% ce mois</p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg dark:bg-red-500/10">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution du Chiffre d&apos;Affaires</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    formatter={(value) => [`${value}€`, 'CA']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--card-foreground))'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Croissance Mensuelle</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Croissance']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--card-foreground))'
                    }}
                  />
                  <Bar dataKey="growth" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>État des Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--card-foreground))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segmentation Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerSegmentData.map((segment, index) => (
                  <div key={segment.segment} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      ></div>
                      <span className="font-medium">{segment.segment}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">{segment.count}</span>
                      <span className="text-sm text-muted-foreground">({segment.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex space-x-1 rounded-full overflow-hidden">
                  {customerSegmentData.map((segment, index) => (
                    <div
                      key={segment.segment}
                      className="h-2"
                      style={{
                        backgroundColor: COLORS[index],
                        width: `${segment.percentage}%`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Performance par Catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={categoryStats} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-muted-foreground" />
                <YAxis dataKey="name" type="category" width={120} className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--card-foreground))'
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
  );
}