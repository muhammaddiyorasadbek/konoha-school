import { useLang } from "../i18n/LangContext";

interface Props {
  onOpen: () => void;
}

export default function InfoSection({ onOpen }: Props) {
  const { t } = useLang();

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sakura-50 via-white to-sakura-100/60" />
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-sakura-200/40 blur-3xl blob" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-sakura-300/30 blur-3xl blob" style={{ animationDelay: "5s" }} />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="reveal-scale relative rounded-[40px] overflow-hidden bg-gradient-to-br from-konoha-red via-sakura-600 to-sakura-700 shadow-2xl shadow-sakura-400/40">
          {/* Animated mesh gradient background */}
          <div className="absolute inset-0 opacity-60">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sakura-300 blur-3xl blob" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-konoha-darkred blur-3xl blob" style={{ animationDelay: "4s" }} />
            <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-sakura-400 blur-3xl blob" style={{ animationDelay: "8s" }} />
          </div>

          {/* Big decorative kanji */}
          <div className="absolute -top-10 -right-6 sm:-right-10 font-jp text-[200px] sm:text-[280px] lg:text-[340px] font-black text-white/10 leading-none select-none pointer-events-none">
            学
          </div>
          <div className="absolute -bottom-16 -left-6 font-jp text-[160px] sm:text-[220px] font-black text-white/10 leading-none select-none pointer-events-none">
            校
          </div>

          {/* Floating sakura emojis */}
          <div className="absolute top-8 left-8 text-3xl float-y opacity-80" style={{ animationDelay: "0.5s" }}>🌸</div>
          <div className="absolute top-20 right-32 text-2xl float-y opacity-60" style={{ animationDelay: "1.8s" }}>✿</div>
          <div className="absolute bottom-12 right-12 text-3xl float-x opacity-70" style={{ animationDelay: "2.5s" }}>🌸</div>
          <div className="absolute bottom-20 left-32 text-xl float-y opacity-50" style={{ animationDelay: "3.2s" }}>🎌</div>

          {/* Spinning rings */}
          <div className="absolute top-12 right-12 w-32 h-32 rounded-full border-2 border-dashed border-white/20 spin-slow" />
          <div className="absolute bottom-16 left-16 w-24 h-24 rounded-full border border-white/15 spin-slow" style={{ animationDirection: "reverse", animationDuration: "25s" }} />

          {/* Content */}
          <div className="relative px-6 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
            <div className="text-white">
              {/* Top label */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-5">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-white opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-white" />
                </span>
                <span className="font-jp">学校案内</span>
                <span>·</span>
                <span>Presentation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                {t("more_info_section_title")}
              </h2>

              <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
                {t("more_info_section_desc")}
              </p>

              {/* Mini features */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: "📚", label: "Kurslar" },
                  { icon: "👨‍🏫", label: "Ustozlar" },
                  { icon: "💼", label: "Ish imkoniyatlari" },
                  { icon: "🎓", label: "Sertifikat" },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-semibold"
                  >
                    <span>{f.icon}</span>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA mobile */}
              <div className="mt-7 lg:hidden">
                <button
                  onClick={onOpen}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-white text-konoha-red font-extrabold shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all shine-effect overflow-hidden"
                >
                  <span className="text-xl group-hover:rotate-12 transition-transform">📖</span>
                  <span>{t("more_info_short")}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* Big circular CTA (desktop) */}
            <div className="hidden lg:flex items-center justify-center">
              <button
                onClick={onOpen}
                className="group relative w-48 h-48 xl:w-56 xl:h-56 rounded-full bg-white text-konoha-red font-black text-base shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-500"
              >
                {/* Pulse rings */}
                <span className="absolute inset-0 rounded-full pulse-ring" />
                <span className="absolute -inset-3 rounded-full border-2 border-dashed border-white/40 spin-slow" />
                <span className="absolute -inset-6 rounded-full border border-white/20 spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

                {/* Inner content */}
                <div className="relative flex flex-col items-center justify-center h-full">
                  <div className="text-5xl mb-2 group-hover:rotate-12 group-hover:scale-110 transition-transform">📖</div>
                  <div className="font-jp text-[10px] tracking-[0.3em] text-konoha-red/70">案内</div>
                  <div className="mt-1 text-base xl:text-lg font-extrabold leading-tight">{t("more_info_short")}</div>
                  <div className="mt-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-konoha-red text-white text-sm group-hover:bg-sakura-600 group-hover:translate-x-1 transition-all">
                    →
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
