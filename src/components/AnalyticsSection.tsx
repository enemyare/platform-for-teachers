'use client';

import { Analytics } from '@/types';
import { TrendingUp, Users, DollarSign, Star, BookOpen } from 'lucide-react';

interface AnalyticsSectionProps {
  analytics: Analytics;
}

export default function AnalyticsSection({ analytics }: AnalyticsSectionProps) {
  const stats = [
    {
      title: 'Всего материалов',
      value: analytics.totalMaterials,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Продажи',
      value: analytics.totalSales,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Доход',
      value: `${analytics.totalRevenue} ₽`,
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Средний рейтинг',
      value: analytics.averageRating.toFixed(1),
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Аналитика</h2>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* График продаж по месяцам */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Продажи по месяцам</h3>
        <div className="space-y-3">
          {analytics.monthlyStats.map((month) => (
            <div key={month.month} className="flex items-center justify-between">
              <span className="text-gray-700">{month.month}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{month.sales} продаж</span>
                <span className="font-medium text-gray-900">{month.revenue} ₽</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Дополнительная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Общая статистика</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Всего отзывов:</span>
              <span className="font-medium">{analytics.totalReviews}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Средний доход с материала:</span>
              <span className="font-medium">
                {analytics.totalMaterials > 0
                  ? `${Math.round(analytics.totalRevenue / analytics.totalMaterials)} ₽`
                  : '0 ₽'
                }
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Тренды</h3>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Рост продаж</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            По сравнению с прошлым месяцем продажи выросли на 15%
          </p>
        </div>
      </div>
    </div>
  );
} 