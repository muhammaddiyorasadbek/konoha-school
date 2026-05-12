import { useEffect, useState } from "react";
import { useLang } from "../i18n/LangContext";

interface Props {
  onRegister: () => void;
}

const STORAGE_KEY = "konoha_popup_seen";
const SHOW_DELAY = 4500; // 4.5 sekund kutadi
// Agar foydalanuvchi yopib qo'ysa, qancha vaqtdan keyin yana ko'rsatish (ms)
// 12 soat = 12 * 60 * 60 * 1000
const REPEAT_AFTER = 12 * 60 * 60 * 1000;

export default function WelcomePopup({ onRegister }: Props) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Avval ko'rilganligini tekshiramiz
    try {
      const lastSeen = localStorage.getItem(STORAGE_KEY);
      if (lastSeen) {
        const ts = parseInt(lastSeen, 10);
        if (!isNaN(ts) && Date.now() - ts < REPEAT_AFTER) {
          return; // yaqinda ko'rilgan, ko'rsatmaymiz
        }
      }
    } catch {
      // ignore
    }

    // Belgilangan vaqtdan keyin pop-up'ni ochamiz
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // ESC tugmasi orqali yopish
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Body scroll'ni bloklash
  useEffect(() => {
    if (open && !closing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, closing]);

  const markSeen = () => {
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      // ignore
    }
  };

  const handleClose = () => {
    setClosing(true);
    markSeen();
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 400);
  };

  const handleRegister = () => {
    markSeen();
    setOpen(false);
    setClosing(false);
    // Modal'ga o'tish uchun bir oz kutamiz
    setTimeout(() => onRegister(), 200);
  };

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-opacity duration-400 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-gradient-to-br from-konoha-darkred/70 via-sakura-900/60 to-sakura-700/60 backdrop-blur-md"
      />

      {/* Floating petals around modal */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute petal"
            style={{
              left: `${10 + i * 11}%`,
              top: "-20px",
              animationDuration: `${6 + (i % 4) * 2}s`,
              animationDelay: `${i * 0.4}s`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div
        className={`relative w-full max-w-md sm:max-w-lg max-h-[95vh] overflow-y-auto rounded-[36px] bg-white shadow-2xl border-2 border-sakura-200 ${
          closing ? "scale-90 opacity-0" : "scale-in"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-konoha-red hover:rotate-90 transition-all z-20"
        >
          ✕
        </button>

        {/* Top decorative banner */}
        <div className="relative h-44 sm:h-52 bg-gradient-to-br from-sakura-100 via-sakura-200 to-sakura-300 overflow-hidden rounded-t-[34px]">
          {/* Sun */}
          <div className="absolute top-6 right-8 w-24 h-24 rounded-full bg-konoha-red shadow-[0_0_50px_rgba(200,16,46,0.6)] glow" />
          <div className="absolute top-3 right-5 w-30 h-30 rounded-full border-2 border-konoha-red/30 spin-slow" style={{ width: "120px", height: "120px" }} />

          {/* Big kanji background */}
          <div className="absolute -bottom-10 -left-4 font-jp text-[180px] font-black text-white/30 leading-none select-none pointer-events-none">
            桜
          </div>

          {/* Mt Fuji silhouette */}
          <svg viewBox="0 0 400 150" className="absolute bottom-0 left-0 right-0 w-full" preserveAspectRatio="xMidYMax meet">
            <path d="M0 130 Q 60 100 120 115 T 240 110 L400 125 L400 150 L0 150 Z" fill="#ffa3bd" opacity="0.7" />
            <path d="M80 140 L160 60 Q180 45 200 60 L280 140 Z" fill="url(#popupFuji)" />
            <path d="M140 88 L160 60 Q180 45 200 60 L220 88 Q210 80 200 88 T 170 85 T 140 88 Z" fill="#fff" />
            <path d="M0 138 Q 100 122 200 138 T 400 132 L400 150 L0 150 Z" fill="#f55a85" opacity="0.9" />
            <defs>
              <linearGradient id="popupFuji" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffc9d9" />
                <stop offset="100%" stopColor="#b81f52" />
              </linearGradient>
            </defs>
          </svg>

          {/* Floating sakura emoji */}
          <div className="absolute top-10 left-10 text-3xl float-y" style={{ animationDelay: "0.5s" }}>🌸</div>
          <div className="absolute top-20 left-32 text-2xl float-y" style={{ animationDelay: "1.5s" }}>🌸</div>
          <div className="absolute top-6 left-1/2 text-xl float-y" style={{ animationDelay: "2.5s" }}>✨</div>

          {/* Badge */}
          <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-konoha-red text-[11px] font-extrabold uppercase tracking-wider shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-konoha-red animate-pulse" />
            <span>{t("popup_badge")}</span>
          </div>
        </div>

        {/* Body */}
        <div className="relative px-6 sm:px-8 py-6 pb-7">
          <div className="text-center fade-up">
            <div className="font-jp text-konoha-red text-xs font-bold tracking-widest mb-1">特別オファー</div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              {t("popup_title")}
            </h2>
            <p className="mt-2 text-base sm:text-lg font-bold text-konoha-red">
              {t("popup_subtitle")}
            </p>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              {t("popup_desc")}
            </p>
          </div>

          {/* Perks */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { icon: "🎁", label: t("popup_perk_1") },
              { icon: "👨‍🏫", label: t("popup_perk_2") },
              { icon: "🏆", label: t("popup_perk_3") },
            ].map((p, i) => (
              <div
                key={i}
                className="text-center p-3 rounded-2xl bg-gradient-to-br from-sakura-50 to-white border border-sakura-100 fade-up"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="text-2xl mb-1">{p.icon}</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-gray-700 leading-tight">
                  {p.label}
                </div>
              </div>
            ))}
          </div>

          {/* Date strip */}
          <div className="mt-5 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-sakura-50 to-sakura-100 border border-sakura-200 text-konoha-red text-sm font-bold">
            <span className="text-lg">📅</span>
            <span>{t("popup_starts")}</span>
          </div>

          {/* CTA buttons */}
          <button
            onClick={handleRegister}
            className="mt-5 w-full py-4 rounded-2xl bg-gradient-to-r from-konoha-red to-sakura-600 text-white font-extrabold shadow-xl shadow-sakura-400/40 hover:-translate-y-0.5 hover:shadow-2xl active:scale-95 transition-all relative overflow-hidden group shine-effect pulse-ring"
          >
            <span className="relative z-10 inline-flex items-center justify-center gap-2 text-base">
              <span className="text-xl">🌸</span>
              {t("popup_btn")}
              <span>→</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-sakura-600 to-konoha-red opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={handleClose}
            className="mt-2 w-full py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {t("popup_later")}
          </button>
        </div>
      </div>
    </div>
  );
}
