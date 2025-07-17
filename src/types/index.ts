export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar?: string;
  experience: number; // опыт преподавания в годах
  role: 'teacher' | 'student';
  bio?: string;
  subjects: string[];
}

export interface Material {
  id: string;
  title: string;
  subject: string;
  description: string;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  fileUrl?: string;
  teacherId: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  teacherId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: {
    fullName: string;
    avatar?: string;
  };
}

export interface Analytics {
  totalMaterials: number;
  totalSales: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  monthlyStats: {
    month: string;
    sales: number;
    revenue: number;
  }[];
} 