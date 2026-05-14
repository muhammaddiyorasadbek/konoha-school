import { createClient } from "@supabase/supabase-js";
import { SUPABASE_CONFIG } from "../config";
import type { AppDB, User, Student, Grade, Payment, News } from "./types";

export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

const DB_KEY = "konoha_admin_db";
const DB_VERSION = "2";
const VERSION_KEY = "konoha_admin_db_version";

function seedDB(): AppDB {
  const now = new Date().toISOString();
  return {
    users: [
      {
        id: "u_dir_1",
        username: "konoha_admin",
        password: "Konoha2026!Sakura",
        role: "director",
        fullName: "Direktor",
        phone: "+998945945880",
        createdAt: now,
      },
    ],
    courses: [
      { id: "c_jp_kids", name: "Yapon tili — Bolalar (BEPUL)", monthlyFee: 0 },
      { id: "c_jp_youth", name: "Yapon tili — Yoshlar", monthlyFee: 400000 },
      { id: "c_it", name: "IT asoslari", monthlyFee: 350000 },
      { id: "c_lang", name: "Chet tillari", monthlyFee: 300000 },
    ],
    students: [],
    grades: [],
    payments: [],
    news: [
      {
        id: "n_1",
        title: "Xush kelibsiz!",
        body: "KONOHA boshqaruv tizimi ishga tushdi.",
        authorId: "u_dir_1",
        createdAt: now,
      },
    ],
  };
}

export function loadDB(): AppDB {
  try {
    const savedVersion = localStorage.getItem(VERSION_KEY);
    if (savedVersion !== DB_VERSION) {
      localStorage.removeItem(DB_KEY);
      localStorage.setItem(VERSION_KEY, DB_VERSION);
    }
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  const seeded = seedDB();
  saveDB(seeded);
  return seeded;
}

export async function syncFromCloud(): Promise<AppDB | null> {
  try {
    const { data, error } = await supabase
      .from('app_data')
      .select('content')
      .eq('id', 'main_db')
      .single();

    if (error || !data?.content) {
      console.warn("Cloud data not found, using local.");
      return null;
    }

    localStorage.setItem(DB_KEY, JSON.stringify(data.content));
    localStorage.setItem(VERSION_KEY, DB_VERSION);
    return data.content as AppDB;
  } catch (err) {
    console.error("Sync error:", err);
  }
  return null;
}

export function saveDB(db: AppDB) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  syncToCloud(db);
}

async function syncToCloud(db: AppDB) {
  try {
    const { error } = await supabase
      .from('app_data')
      .upsert({ id: 'main_db', content: db }, { onConflict: 'id' });
    if (error) console.error("Cloud sync error:", error.message);
  } catch (err) {
    console.error("Failed to sync to cloud", err);
  }
}

export function uid(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function calcRating(studentId: string, grades: Grade[]): number {
  const list = grades.filter((g) => g.studentId === studentId);
  if (list.length === 0) return 0;
  const sum = list.reduce((s, g) => s + g.score, 0);
  return Math.round((sum / list.length) * 10) / 10;
}

export function ratingColor(r: number): string {
  if (r >= 90) return "text-green-600";
  if (r >= 75) return "text-blue-600";
  if (r >= 60) return "text-yellow-600";
  if (r >= 40) return "text-orange-600";
  if (r > 0) return "text-red-600";
  return "text-gray-400";
}

export function ratingLabel(r: number): string {
  if (r >= 90) return "A'lo";
  if (r >= 75) return "Yaxshi";
  if (r >= 60) return "O'rtacha";
  if (r >= 40) return "Qoniqarli";
  if (r > 0) return "Past";
  return "Baholanmagan";
}

export function paymentStatus(
  studentId: string,
  courseFee: number,
  payments: Payment[],
  joinedAt: string
): { paidMonths: number; debt: number; nextDue: string } {
  const studentPayments = payments.filter((p) => p.studentId === studentId);
  const totalPaid = studentPayments.reduce((s, p) => s + p.amount, 0);
  const joined = new Date(joinedAt);
  const now = new Date();
  const monthsPassed = (now.getFullYear() - joined.getFullYear()) * 12 + (now.getMonth() - joined.getMonth()) + 1;
  const expected = monthsPassed * courseFee;
  const debt = Math.max(0, expected - totalPaid);
  const paidMonths = courseFee > 0 ? Math.floor(totalPaid / courseFee) : monthsPassed;
  const nextDueDate = new Date(joined);
  nextDueDate.setMonth(joined.getMonth() + paidMonths + 1);
  return { paidMonths, debt, nextDue: nextDueDate.toISOString().slice(0, 10) };
}

export const helpers = {
  formatMoney: (n: number): string => new Intl.NumberFormat("uz-UZ").format(n) + " so'm",
  formatDate: (d: string | Date): string => {
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toLocaleDateString("uz-UZ", { year: "numeric", month: "short", day: "numeric" });
  },
};

export function addUser(db: AppDB, user: Omit<User, "id" | "createdAt">): User {
  const u: User = { ...user, id: uid("u"), createdAt: new Date().toISOString() };
  db.users.push(u);
  saveDB(db);
  return u;
}

export function addStudent(db: AppDB, s: Omit<Student, "id" | "joinedAt" | "rating">): Student {
  const st: Student = { ...s, id: uid("s"), joinedAt: new Date().toISOString(), rating: 0 };
  db.students.push(st);
  saveDB(db);
  return st;
}

export function addGrade(db: AppDB, g: Omit<Grade, "id" | "date">): Grade {
  const grade: Grade = { ...g, id: uid("g"), date: new Date().toISOString() };
  db.grades.push(grade);
  const st = db.students.find((s) => s.id === g.studentId);
  if (st) st.rating = calcRating(st.id, db.grades);
  saveDB(db);
  return grade;
}

export function addPayment(db: AppDB, p: Omit<Payment, "id" | "paidAt">): Payment {
  const pay: Payment = { ...p, id: uid("p"), paidAt: new Date().toISOString() };
  db.payments.push(pay);
  saveDB(db);
  return pay;
}

export function addNews(db: AppDB, n: Omit<News, "id" | "createdAt">): News {
  const news: News = { ...n, id: uid("n"), createdAt: new Date().toISOString() };
  db.news.unshift(news);
  saveDB(db);
  return news;
}

export function deleteItem(db: AppDB, type: keyof AppDB, id: string) {
  (db[type] as Array<{ id: string }>) = (db[type] as Array<{ id: string }>).filter((item) => item.id !== id);
  saveDB(db);
}
