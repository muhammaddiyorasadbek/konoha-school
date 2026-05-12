import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/LangContext";
import { LANGUAGES } from "../i18n/translations";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 ${
          compact ? "px-2 py-1.5" : "px-3 py-2"
        } rounded-full bg-white/80 backdrop-blur border border-sakura-200 text-gray-800 text-sm font-semibold hover:border-konoha-red hover:shadow-md transition-all`}
        aria-label="Change language"
      >
        <span className="text-lg leading-none">{current.flag}</span>
        {!compact && <span className="hidden sm:inline">{current.native}</span>}
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-2xl border border-sakura-100 overflow-hidden transition-all origin-top-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => {
              setLang(l.code);
              setOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors ${
              lang === l.code
                ? "bg-sakura-50 text-konoha-red"
                : "text-gray-700 hover:bg-sakura-50/60 hover:text-konoha-red"
            }`}
          >
            <span className="text-xl leading-none">{l.flag}</span>
            <div className="flex-1">
              <div className="font-semibold">{l.native}</div>
              <div className="text-[11px] text-gray-500">{l.label}</div>
            </div>
            {lang === l.code && <span className="text-konoha-red">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
