import { useLang } from "../i18n/LangContext";

type Variant = "primary" | "outline" | "ghost" | "huge";

interface Props {
  onClick: () => void;
  variant?: Variant;
  className?: string;
  short?: boolean;
}

export default function InfoButton({
  onClick,
  variant = "outline",
  className = "",
  short = false,
}: Props) {
  const { t } = useLang();
  const label = short ? t("more_info_short") : t("more_info");

  if (variant === "huge") {
    return (
      <button
        onClick={onClick}
        className={`group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-5 rounded-full bg-gradient-to-r from-konoha-red via-sakura-600 to-konoha-red text-white font-extrabold text-base sm:text-lg shadow-2xl shadow-sakura-400/50 hover:-translate-y-1 hover:shadow-2xl active:scale-95 transition-all overflow-hidden gradient-animate ${className}`}
        style={{ backgroundSize: "200% 200%" }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full pulse-ring" />
        {/* Shine */}
        <span className="absolute inset-0 shine-effect rounded-full" />

        <span className="relative z-10 inline-flex items-center gap-3">
          <span className="text-2xl group-hover:rotate-12 transition-transform">📖</span>
          <span>{label}</span>
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20 group-hover:bg-white group-hover:text-konoha-red transition-all">
            →
          </span>
        </span>
      </button>
    );
  }

  if (variant === "primary") {
    return (
      <button
        onClick={onClick}
        className={`group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-konoha-red to-sakura-600 text-white font-bold shadow-lg shadow-sakura-400/40 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all shine-effect overflow-hidden ${className}`}
      >
        <span className="text-lg group-hover:rotate-12 transition-transform">📖</span>
        <span>{label}</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>
    );
  }

  if (variant === "ghost") {
    return (
      <button
        onClick={onClick}
        className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-konoha-red font-semibold text-sm hover:bg-sakura-50 transition-colors link-underline ${className}`}
      >
        <span className="group-hover:rotate-12 transition-transform">📖</span>
        <span>{label}</span>
      </button>
    );
  }

  // outline (default)
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-konoha-red font-bold border-2 border-konoha-red hover:bg-konoha-red hover:text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sakura-400/30 active:scale-95 transition-all overflow-hidden ${className}`}
    >
      <span className="text-lg group-hover:rotate-12 transition-transform">📖</span>
      <span>{label}</span>
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </button>
  );
}
