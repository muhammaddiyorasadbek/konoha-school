import { useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { useLang } from "../i18n/LangContext";
import { LANGUAGES } from "../i18n/translations";
import logoSrc from "../assets/logo.png";

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface Props {
  title: string;
  navItems: NavItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: ReactNode;
  onBackToSite: () => void;
}

export default function AdminLayout({
  title, navItems, activeTab, onTabChange, children, onBackToSite,
}: Props) {
  const { user, logout } = useAuth();
  const { lang, setLang } = useLang();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const roleLabel: Record<string, Record<string, string>> = {
    director: { uz: "Direktor", en: "Director", ru: "Директор", ja: "ディレクター" },
    teacher: { uz: "Ustoz", en: "Teacher", ru: "Учитель", ja: "先生" },
    parent: { uz: "Ota-ona", en: "Parent", ru: "Родитель", ja: "保護者" },
  };
  const roleColor: Record<string, string> = {
    director: "from-konoha-red to-sakura-600",
    teacher: "from-blue-500 to-blue-700",
    parent: "from-emerald-500 to-emerald-700",
  };
  const backLabel: Record<string, string> = {
    uz: "Saytga qaytish", en: "Back to site", ru: "На сайт", ja: "サイトへ戻る"
  };
  const logoutLabel: Record<string, string> = {
    uz: "Chiqish", en: "Logout", ru: "Выйти", ja: "ログアウト"
  };

  const currentLang = LANGUAGES.find(l => l.code === lang);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50/40 via-white to-sakura-100/30 flex">
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30 fade-in" />
      )}

      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-sakura-100 shadow-xl lg:shadow-none z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} flex flex-col`}>
        <div className="p-5 border-b border-sakura-100 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden bg-white ring-2 ring-sakura-200 shadow-md">
            <img src={logoSrc} alt="KONOHA" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-extrabold text-konoha-red text-lg leading-tight">KONOHA</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{title}</div>
          </div>
        </div>

        {user && (
          <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-sakura-50 to-white border border-sakura-100">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${roleColor[user.role]} flex items-center justify-center text-white font-bold shadow-md`}>
                {user.fullName.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-gray-900 text-sm truncate">{user.fullName}</div>
                <div className="text-xs text-gray-500">{roleLabel[user.role]?.[lang] ?? user.role}</div>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => { onTabChange(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${active ? "bg-gradient-to-r from-konoha-red to-sakura-600 text-white shadow-lg shadow-sakura-400/30" : "text-gray-700 hover:bg-sakura-50 hover:text-konoha-red"}`}>
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                {active && <span>→</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sakura-100 space-y-1">
          <button onClick={onBackToSite} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-sakura-50 hover:text-konoha-red transition-all">
            <span>🏠</span><span>{backLabel[lang]}</span>
          </button>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all">
            <span>🚪</span><span>{logoutLabel[lang]}</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-sakura-100 px-4 sm:px-6 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-10 h-10 rounded-full bg-sakura-50 text-konoha-red flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
          <div className="text-sm text-gray-600">
            <span className="font-jp text-konoha-red">日本語学校</span>
            <span className="mx-2 text-gray-400">·</span>
            <span className="font-semibold">{navItems.find((n) => n.id === activeTab)?.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setLangOpen(v => !v)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sakura-200 bg-white hover:bg-sakura-50 text-sm font-semibold transition-all">
                <span>{currentLang?.flag}</span>
                <span className="hidden sm:inline">{currentLang?.native}</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-sakura-100 rounded-xl shadow-xl z-50 overflow-hidden min-w-[130px]">
                  {LANGUAGES.map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-sakura-50 transition-all ${lang === l.code ? "font-bold text-konoha-red" : "text-gray-700"}`}>
                      <span>{l.flag}</span><span>{l.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 hidden sm:block">
              {new Date().toLocaleDateString("uz-UZ", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
