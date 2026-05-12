import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "./types";
import { loadDB } from "./db";

const SESSION_KEY = "konoha_session";

interface Ctx {
  user: User | null;
  login: (username: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function initAuth() {
      try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        if (raw) {
          const sess = JSON.parse(raw);
          // Avval bulutdan eng yangi ma'lumotlarni olamiz
          const { syncFromCloud } = await import("./db");
          await syncFromCloud();
          
          const db = loadDB();
          const u = db.users.find((x) => x.id === sess.id);
          if (u) setUser(u);
        }
      } catch { /* ignore */ }
    }
    initAuth();
  }, []);

  const login = (username: string, password: string) => {
    // Eng so'nggi ma'lumotlarni yuklash
    const db = loadDB();
    
    // Login/parolni tekshirish (bo'shliqlarni olib tashlab)
    const inputLogin = username.trim().toLowerCase();
    const inputPass = password.trim();

    // 1. Direktor (Admin) hisobi uchun doimiy tekshiruv
    // Agar bazada qandaydir sabab bilan o'chib ketgan bo'lsa ham ishlaydi
    if (inputLogin === "konoha_admin" && inputPass === "Konoha2026!Sakura") {
      const director = db.users.find(u => u.role === 'director') || db.users[0];
      setUser(director);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: director.id }));
      return { ok: true };
    }

    // 2. Boshqa foydalanuvchilar (ustoz, ota-ona) uchun
    const u = db.users.find(
      (x) => x.username.toLowerCase() === inputLogin && x.password === inputPass
    );

    if (!u) return { ok: false, error: "Login yoki parol noto'g'ri" };
    
    setUser(u);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: u.id }));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
