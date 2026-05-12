import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Lang, tr, type TKey } from "./translations";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
}

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  // Sayt har doim birinchi marta O'ZBEK tilida ochiladi.
  // Foydalanuvchi tilni o'zgartirsa, faqat shu sessiya davomida saqlanadi
  // (sahifa yopilsa va qayta ochilsa — yana o'zbek tilida boshlanadi).
  const [lang, setLang] = useState<Lang>("uz");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: (k) => tr(k, lang) }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
