import { useEffect, useState } from "react";
import { useLang } from "../i18n/LangContext";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

export default function Header({
  onRegister,
  onInfo,
  onAdmin,
}: {
  onRegister: () => void;
  onInfo: () => void;
  onAdmin: () => void;
}) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#home", label: t("nav_home") },
    { href: "#about", label: t("nav_about") },
    { href: "#courses", label: t("nav_courses") },
    { href: "#advantages", label: t("nav_advantages") },
    { href: "#contact", label: t("nav_contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-lg shadow-[0_4px_30px_rgba(200,16,46,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-3">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="group-hover:scale-105 group-hover:rotate-6 transition-transform">
            <Logo size={44} />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold text-lg sm:text-xl text-konoha-red tracking-tight">
              KONOHA
            </div>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-sakura-700/80 font-semibold">
              日本語学校
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-konoha-red transition-colors group"
            >
              {l.label}
              <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-gradient-to-r from-sakura-400 to-konoha-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          <button
            onClick={onInfo}
            title={t("more_info")}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur text-konoha-red text-sm font-semibold border-2 border-sakura-200 hover:border-konoha-red hover:bg-konoha-red hover:text-white hover:-translate-y-0.5 transition-all shine-effect overflow-hidden"
          >
            <span>📖</span>
            <span className="hidden lg:inline">{t("more_info_short")}</span>
          </button>

          <button
            onClick={onAdmin}
            title="Hisobga kirish"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur text-gray-700 text-sm font-semibold border-2 border-sakura-200 hover:border-konoha-red hover:text-konoha-red hover:-translate-y-0.5 transition-all"
          >
            <span>🔐</span>
            <span className="hidden lg:inline">Hisobga kirish</span>
          </button>

          <button
            onClick={onRegister}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-konoha-red to-sakura-600 text-white text-sm font-semibold shadow-lg shadow-sakura-400/30 hover:shadow-xl hover:shadow-sakura-500/40 hover:-translate-y-0.5 transition-all"
          >
            <span>{t("register")}</span>
            <span className="text-base">→</span>
          </button>

          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-sakura-100 text-konoha-red"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden bg-white/95 backdrop-blur-lg border-t border-sakura-100 transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-gray-800 font-medium border-b border-sakura-100/60 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onInfo();
            }}
            className="mt-3 px-5 py-3 rounded-full bg-white text-konoha-red font-semibold border-2 border-konoha-red flex items-center justify-center gap-2"
          >
            <span>📖</span>
            <span>{t("more_info_short")}</span>
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onAdmin();
            }}
            className="mt-2 px-5 py-3 rounded-full bg-white text-gray-700 font-semibold border-2 border-sakura-200 flex items-center justify-center gap-2"
          >
            <span>🔐</span>
            <span>Hisobga kirish</span>
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onRegister();
            }}
            className="mt-2 mb-2 px-5 py-3 rounded-full bg-gradient-to-r from-konoha-red to-sakura-600 text-white font-semibold"
          >
            {t("register")}
          </button>
        </nav>
      </div>
    </header>
  );
}
