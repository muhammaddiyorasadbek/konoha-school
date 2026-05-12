// Maktab boshqaruv tizimi uchun turlar
export type Role = "director" | "teacher" | "parent";

export interface User {
  id: string;
  username: string;
  password: string; // Demo uchun (real loyihada hashed bo'lishi kerak)
  role: Role;
  fullName: string;
  phone?: string;
  // Ota-ona uchun: farzandi(lari) ID si
  childrenIds?: string[];
  // Ustoz uchun: o'qitadigan kursi
  courseId?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  fullName: string;
  age: number;
  phone: string;
  parentPhone?: string;
  courseId: string;
  joinedAt: string;
  // Hozirgi reyting (avtomatik hisoblanadi)
  rating: number;
  notes?: string;
}

export interface Course {
  id: string;
  name: string;
  teacherId?: string;
  monthlyFee: number; // so'mda
  description?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  teacherId: string;
  score: number; // 1-100
  subject: string;
  comment?: string;
  date: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  month: string; // "2026-01" format
  paidAt: string;
  note?: string;
}

export interface News {
  id: string;
  title: string;
  body: string;
  authorId: string;
  createdAt: string;
}

// Saytning umumiy holati (LocalStorage'da saqlanadi)
export interface AppDB {
  users: User[];
  students: Student[];
  courses: Course[];
  grades: Grade[];
  payments: Payment[];
  news: News[];
}
