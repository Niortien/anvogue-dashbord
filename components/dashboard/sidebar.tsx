'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Palette,
  FolderOpen,
  Tags,
  Users,
  Heart,
  BarChart3,
  Settings,
} from 'lucide-react';

const sidebarItems = [
  {
    title: 'Vue d\'ensemble',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Articles & Variantes',
    href: '/dashboard/articles',
    icon: Package,
  },
  {
    title: 'Collections',
    href: '/dashboard/collections',
    icon: FolderOpen,
  },
  {
    title: 'Catégories',
    href: '/dashboard/categories',
    icon: Tags,
  },
  {
    title: 'Clients',
    href: '/dashboard/clients',
    icon: Users,
  },
  {
    title: 'Articles Populaires',
    href: '/dashboard/popular',
    icon: Heart,
  },
  {
    title: 'Analytiques',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Gestion des articles</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/dashboard/settings"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
        >
          <Settings size={20} />
          <span>Paramètres</span>
        </Link>
      </div>
    </div>
  );
}