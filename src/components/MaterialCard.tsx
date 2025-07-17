'use client';

import { Material } from '@/types';
import { ShoppingCart, Plus } from 'lucide-react';

interface MaterialCardProps {
  material: Material;
  isOwner?: boolean;
  onBuy?: (materialId: string) => void;
  onAdd?: (materialId: string) => void;
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

const levelLabels = {
  beginner: 'Начинающий',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};

export default function MaterialCard({ material, isOwner = false, onBuy, onAdd }: MaterialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{material.title}</h3>
            <p className="text-sm text-gray-600">{material.subject}</p>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${levelColors[material.level]}`}>
            {levelLabels[material.level]}
          </span>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{material.description}</p>

        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            {material.price} ₽
          </div>

          <div className="flex gap-2">
            {isOwner ? (
              <button
                onClick={() => onAdd?.(material.id)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Добавить материал
              </button>
            ) : (
              <button
                onClick={() => onBuy?.(material.id)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <ShoppingCart className="w-4 h-4" />
                Купить материал
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 