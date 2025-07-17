'use client';

import { useState } from 'react';
import { User, Material, Review, Analytics } from '@/types';
import ProfileInfoSection from '@/components/ProfileInfoSection';
import AnalyticsSection from '@/components/AnalyticsSection';
import ReviewsSection from '@/components/ReviewsSection';
import MaterialCard from '@/components/MaterialCard';
import AddMaterialModal from '@/components/AddMaterialModal';
import { Plus } from 'lucide-react';

// Моковые данные для демонстрации
const mockUser: User = {
  id: '1',
  username: 'ivan-ivanov',
  fullName: 'Иван Иванов',
  experience: 5,
  role: 'teacher',
  bio: 'Опытный преподаватель математики с 5-летним стажем. Специализируюсь на подготовке к ЕГЭ и ОГЭ.',
  subjects: ['Математика', 'Физика'],
};

const mockMaterials: Material[] = [
  {
    id: '1',
    title: 'Подготовка к ЕГЭ по математике',
    subject: 'Математика',
    description: 'Полный курс подготовки к ЕГЭ по математике. Включает все темы, необходимые для успешной сдачи экзамена.',
    price: 2500,
    level: 'advanced',
    teacherId: '1',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Основы алгебры',
    subject: 'Математика',
    description: 'Базовый курс по алгебре для начинающих. Подходит для учеников 7-9 классов.',
    price: 1500,
    level: 'beginner',
    teacherId: '1',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Геометрия для школьников',
    subject: 'Математика',
    description: 'Интерактивный курс по геометрии с практическими заданиями и решениями.',
    price: 1800,
    level: 'intermediate',
    teacherId: '1',
    createdAt: new Date(),
  },
];

const mockReviews: Review[] = [
  {
    id: '1',
    userId: '2',
    teacherId: '1',
    rating: 5,
    comment: 'Отличный преподаватель! Материал объясняет очень понятно, помог подготовиться к ЕГЭ.',
    createdAt: new Date('2024-01-15'),
    user: {
      fullName: 'Анна Петрова',
      avatar: undefined,
    },
  },
  {
    id: '2',
    userId: '3',
    teacherId: '1',
    rating: 4,
    comment: 'Хорошие материалы, все понятно объяснено. Рекомендую!',
    createdAt: new Date('2024-01-10'),
    user: {
      fullName: 'Михаил Сидоров',
      avatar: undefined,
    },
  },
];

const mockAnalytics: Analytics = {
  totalMaterials: 12,
  totalSales: 156,
  totalRevenue: 45000,
  averageRating: 4.8,
  totalReviews: 23,
  monthlyStats: [
    { month: 'Январь', sales: 15, revenue: 4500 },
    { month: 'Февраль', sales: 18, revenue: 5400 },
    { month: 'Март', sales: 22, revenue: 6600 },
  ],
};

type TabType = 'info' | 'analytics' | 'reviews';

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOwner] = useState(true); // В реальном приложении это будет определяться по авторизации

  const handleBuyMaterial = (materialId: string) => {
    console.log('Покупка материала:', materialId);
    // Здесь будет логика покупки
  };

  const handleAddMaterial = (materialId: string) => {
    console.log('Добавление материала:', materialId);
    // Здесь будет логика добавления материала
  };

  const handleSubmitNewMaterial = (material: {
    title: string;
    subject: string;
    description: string;
    price: number;
    level: 'beginner' | 'intermediate' | 'advanced';
    file: File | null;
  }) => {
    console.log('Новый материал:', material);
    // Здесь будет логика сохранения материала
  };

  const tabs = [
    { id: 'info', label: 'Общая информация' },
    ...(mockUser.role === 'teacher' ? [{ id: 'analytics', label: 'Аналитика' }] : []),
    { id: 'reviews', label: 'Отзывы' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок профиля */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{mockUser.fullName}</h1>
              <p className="text-gray-600">@{mockUser.username}</p>
            </div>
            {isOwner && mockUser.role === 'teacher' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Добавить материал
              </button>
            )}
          </div>
        </div>

        {/* Навигация по вкладкам */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Контент вкладок */}
          <div className="p-6">
            {activeTab === 'info' && (
              <ProfileInfoSection
                user={mockUser}
                isOwner={isOwner}
                onEdit={() => console.log('Редактирование профиля')}
              />
            )}

            {activeTab === 'analytics' && mockUser.role === 'teacher' && (
              <AnalyticsSection analytics={mockAnalytics} />
            )}

            {activeTab === 'reviews' && (
              <ReviewsSection reviews={mockReviews} />
            )}
          </div>
        </div>

        {/* Витрина материалов */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Материалы</h2>

          {mockMaterials.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Пока нет материалов</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMaterials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  isOwner={isOwner}
                  onBuy={handleBuyMaterial}
                  onAdd={handleAddMaterial}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно добавления материала */}
      <AddMaterialModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSubmitNewMaterial}
      />
    </div>
  );
} 