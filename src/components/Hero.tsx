import { useEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";
import useCountUp from "../hooks/useCountUp";
import { useLang } from "../i18n/LangContext";

const kanjis = [
  { kanji: "桜", label: "Sakura" },
  { kanji: "夢", label: "Dream" },
  { kanji: "学", label: "Study" },
  { kanji: "未来", label: "Future" },
  { kanji: "日本", label: "Japan" },
];

export default function Hero({
  onRegister,
  onInfo,
}: {
  onRegister: () => void;
  onInfo: () => void;
}) {
  const { t } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [kanjiIdx, setKanjiIdx] = useState(0);
  const [statsStart, setStatsStart] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setKanjiIdx((i) => (i + 1) % kanjis.length), 2400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const tm = setTimeout(() => setStatsStart(true), 600);
    return () => clearTimeout(tm);
  }, []);

  const c1 = useCountUp(12, 1500, statsStart);
  const c2 = useCountUp(100, 1800, statsStart);
  const c3 = useCountUp(500, 2000, statsStart);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sakura-50 via-white to-sakura-50/60" />
        <div
          className="blob absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-sakura-200/50 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div
          className="blob absolute -bottom-40 -left-32 w-[520px] h-[520px] rounded-full bg-sakura-300/40 blur-3xl"
          style={{ animationDelay: "5s", transform: `translateY(${scrollY * -0.15}px)` }}
        />
        <div
          className="absolute top-32 left-1/2 -translate-x-1/2 font-jp text-[400px] sm:text-[600px] font-black text-sakura-100/40 leading-none select-none pointer-events-none"
          style={{ transform: `translate(-50%, ${scrollY * 0.3}px)` }}
        >
          桜
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="slide-in-left text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-sakura-200 text-konoha-red text-xs sm:text-sm font-semibold mb-6 shadow-sm fade-in">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-konoha-red opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-konoha-red" />
            </span>
            <span className="font-jp">桜</span>
            <span>{t("hero_badge")}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-gray-900">
            <span className="block fade-up" style={{ animationDelay: "0.1s" }}>
              {t("hero_title_1")}
            </span>
            <span className="block text-shimmer fade-up" style={{ animationDelay: "0.3s" }}>
              {t("hero_title_2")}
            </span>
            <span className="block fade-up" style={{ animationDelay: "0.5s" }}>
              {t("hero_title_3")}{" "}
              <span className="inline-block wiggle origin-bottom">🌸</span>
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl lg:max-w-none fade-up" style={{ animationDelay: "0.7s" }}>
            {t("hero_subtitle")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start fade-up" style={{ animationDelay: "0.9s" }}>
            <MagneticButton
              onClick={onRegister}
              className="pulse-ring shine-effect inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-konoha-red to-sakura-600 text-white font-bold shadow-xl shadow-sakura-400/40 hover:shadow-2xl"
              strength={0.3}
            >
              <span>{t("register")}</span>
              <span>→</span>
            </MagneticButton>
            <button
              onClick={onInfo}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-konoha-red font-bold border-2 border-sakura-200 hover:border-konoha-red hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sakura-300/30 transition-all shine-effect overflow-hidden"
            >
              <span className="text-lg group-hover:rotate-12 transition-transform">📖</span>
              <span>{t("more_info_short")}</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 fade-up" style={{ animationDelay: "1.1s" }}>
            {[
              { v: c1, suffix: "", l: t("hero_stat_1") },
              { v: c2, suffix: "%", l: t("hero_stat_2") },
              { v: c3, suffix: "+", l: t("hero_stat_3") },
            ].map((s, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-konoha-red count-glow">
                  {s.v}{s.suffix}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[440px] sm:h-[540px] slide-in-right" style={{ animationDelay: "0.3s" }}>
          <div
            className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-sakura-100 via-white to-sakura-200/60 shadow-2xl shadow-sakura-300/40 overflow-hidden border border-white"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          >
            <div
              className="absolute top-10 right-10 w-32 h-32 rounded-full bg-konoha-red/90 shadow-[0_0_80px_rgba(200,16,46,0.5)] glow"
              style={{ transform: `translateY(${scrollY * 0.08}px)` }}
            />
            <div className="absolute top-6 right-6 w-40 h-40 rounded-full border-2 border-konoha-red/20 spin-slow" />

            <div className="absolute top-16 left-12 text-yellow-200 text-2xl animate-pulse">✦</div>
            <div className="absolute top-32 left-32 text-sakura-300 text-xl animate-pulse" style={{ animationDelay: "1s" }}>✧</div>
            <div className="absolute top-20 right-32 text-sakura-200 text-2xl animate-pulse" style={{ animationDelay: "0.5s" }}>✦</div>

            <svg viewBox="0 0 400 300" className="absolute bottom-0 left-0 right-0 w-full" preserveAspectRatio="xMidYMax meet">
              <path d="M0 240 Q 80 200 160 220 T 320 215 L400 230 L400 300 L0 300 Z" fill="#ffd6e1" opacity="0.5" />
              <path d="M0 250 Q 100 220 200 240 T 400 235 L400 300 L0 300 Z" fill="#ffc9d9" opacity="0.7" />
              <path d="M70 260 L180 90 Q200 70 220 90 L330 260 Z" fill="url(#fujiGrad)" />
              <path d="M155 130 L180 90 Q200 70 220 90 L245 130 Q230 120 215 130 T180 125 T155 130 Z" fill="#fff" />
              <path d="M165 145 Q180 138 195 145 T230 142" stroke="#fff" strokeWidth="3" fill="none" opacity="0.8" />
              <path d="M170 160 Q185 155 200 160 T235 158" stroke="#fff" strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M0 270 Q 100 250 200 270 T 400 265 L400 300 L0 300 Z" fill="#f55a85" opacity="0.85" />
              <g transform="translate(40,200)">
                <rect x="8" y="40" width="4" height="50" fill="#5e0f2c" />
                <circle cx="10" cy="35" r="22" fill="#ff7aa1" opacity="0.9" />
                <circle cx="-5" cy="40" r="14" fill="#ff89ad" opacity="0.85" />
                <circle cx="22" cy="42" r="14" fill="#ffa3bd" opacity="0.85" />
              </g>
              <defs>
                <linearGradient id="fujiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffa3bd" />
                  <stop offset="100%" stopColor="#b81f52" />
                </linearGradient>
              </defs>
            </svg>

            <svg viewBox="0 0 100 120" className="absolute bottom-10 right-12 w-24 h-28 drop-shadow-lg float-y" style={{ animationDelay: "1s" }}>
              <rect x="10" y="20" width="80" height="10" fill="#c8102e" />
              <rect x="5" y="32" width="90" height="6" fill="#c8102e" />
              <rect x="20" y="38" width="6" height="70" fill="#c8102e" />
              <rect x="74" y="38" width="6" height="70" fill="#c8102e" />
              <rect x="46" y="50" width="8" height="20" fill="#c8102e" />
            </svg>

            <div className="absolute top-8 left-8 px-5 py-4 rounded-2xl bg-white/95 backdrop-blur shadow-xl float-slow border border-sakura-100 min-w-[110px]">
              <div className="font-jp text-4xl font-bold text-konoha-red leading-none h-10 overflow-hidden">
                <div className="transition-transform duration-700 ease-out" style={{ transform: `translateY(-${kanjiIdx * 2.5}rem)` }}>
                  {kanjis.map((k, i) => (
                    <div key={i} className="h-10 flex items-center">{k.kanji}</div>
                  ))}
                </div>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1 h-4 overflow-hidden">
                <div className="transition-transform duration-700 ease-out" style={{ transform: `translateY(-${kanjiIdx * 1}rem)` }}>
                  {kanjis.map((k, i) => (
                    <div key={i} className="h-4">{k.label}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute top-44 left-6 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur shadow-xl float-y border border-sakura-100" style={{ animationDelay: "1.5s" }}>
              <div className="font-jp text-3xl font-bold text-konoha-red leading-none">学校</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">School</div>
            </div>

            <div className="absolute bottom-48 right-6 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur shadow-xl float-x border border-sakura-100" style={{ animationDelay: "2.5s" }}>
              <div className="font-jp text-3xl font-bold text-konoha-red leading-none">先生</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">Sensei</div>
            </div>

            <div className="absolute bottom-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur shadow-xl border border-sakura-100">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
              </div>
              <span className="text-xs font-bold text-gray-800">5.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-16 relative z-10">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: "🎌", title: t("feat_1_title"), desc: t("feat_1_desc") },
            { icon: "👨‍🏫", title: t("feat_2_title"), desc: t("feat_2_desc") },
            { icon: "✈️", title: t("feat_3_title"), desc: t("feat_3_desc") },
          ].map((f, i) => (
            <div
              key={i}
              className="reveal-scale group p-5 rounded-2xl bg-white/80 backdrop-blur border border-sakura-100 hover:border-konoha-red hover:-translate-y-1 transition-all shadow-sm hover:shadow-xl hover:shadow-sakura-200/40"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl mb-2 group-hover:scale-125 group-hover:rotate-12 transition-transform inline-block">{f.icon}</div>
              <div className="font-bold text-gray-900 mb-1">{f.title}</div>
              <div className="text-sm text-gray-600">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-konoha-red/70">
        <div className="text-[10px] uppercase tracking-widest font-bold">{t("hero_scroll")}</div>
        <div className="w-6 h-10 rounded-full border-2 border-konoha-red/40 flex items-start justify-center pt-2">
          <div className="scroll-dot w-1.5 h-1.5 rounded-full bg-konoha-red" />
        </div>
      </div>
    </section>
  );
}
