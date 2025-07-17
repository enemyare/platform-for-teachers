'use client';

import { User } from '@/types';
import { Edit, Calendar, BookOpen, Award } from 'lucide-react';

interface ProfileInfoSectionProps {
  user: User;
  isOwner?: boolean;
  onEdit?: () => void;
}

export default function ProfileInfoSection({ user, isOwner = false, onEdit }: ProfileInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Общая информация</h2>
        {isOwner && (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
            Заполнить профиль
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start gap-6">
          {/* Аватар */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-600">
                  {user.fullName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Информация */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{user.fullName}</h3>
              <p className="text-gray-600">@{user.username}</p>
            </div>

            {/* Опыт преподавания */}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">
                Опыт преподавания: {user.experience} {user.experience === 1 ? 'год' :
                  user.experience < 5 ? 'года' : 'лет'}
              </span>
            </div>

            {/* Количество материалов */}
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">
                Количество карточек услуг: {user.role === 'teacher' ? '12' : '0'}
              </span>
            </div>

            {/* Роль */}
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">
                Роль: {user.role === 'teacher' ? 'Преподаватель' : 'Ученик'}
              </span>
            </div>

            {/* Предметы (только для преподавателей) */}
            {user.role === 'teacher' && user.subjects.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Предметы:</h4>
                <div className="flex flex-wrap gap-2">
                  {user.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Биография */}
            {user.bio && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">О себе:</h4>
                <p className="text-gray-700">{user.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Статистика (только для преподавателей) */}
      {user.role === 'teacher' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">12</div>
            <div className="text-gray-600">Материалов</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">156</div>
            <div className="text-gray-600">Продаж</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">4.8</div>
            <div className="text-gray-600">Рейтинг</div>
          </div>
        </div>
      )}
    </div>
  );
} 