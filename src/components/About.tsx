import useCountUp from "../hooks/useCountUp";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/LangContext";

function StatBox({ end, suffix, label, delay = 0 }: { end: number; suffix: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const v = useCountUp(end, 1800, start);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setStart(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="group relative p-4 rounded-2xl bg-white/90 backdrop-blur border border-sakura-100 hover:border-konoha-red hover:-translate-y-1 hover:shadow-xl hover:shadow-sakura-300/30 transition-all duration-500 overflow-hidden"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sakura-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="text-2xl sm:text-3xl font-black text-konoha-red count-glow">
          {v}{suffix}
        </div>
        <div className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">{label}</div>
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-sakura-100/60 blur-3xl -z-10 blob" />
      <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-sakura-200/40 blur-3xl -z-10 blob" style={{ animationDelay: "6s" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        {/* LEFT — Premium kanji card */}
        <div className="reveal-left">
          <div className="relative group">
            {/* Glow blobs behind */}
            <div className="absolute -inset-6 bg-gradient-to-br from-sakura-300 via-konoha-red to-sakura-500 rounded-[44px] rotate-3 opacity-25 blur-2xl group-hover:opacity-40 transition-opacity duration-700" />
            <div className="absolute -inset-3 bg-gradient-to-tr from-sakura-200 to-sakura-400 rounded-[40px] -rotate-2 opacity-30 blob" />

            {/* Main card */}
            <div className="relative rounded-[36px] bg-gradient-to-br from-white via-sakura-50/40 to-sakura-100/60 border border-white/80 backdrop-blur-xl shadow-2xl shadow-sakura-300/40 p-8 sm:p-10 overflow-hidden">

              {/* Animated corner rings */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full border-2 border-dashed border-sakura-300/50 spin-slow" />
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border border-konoha-red/20 spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

              {/* Floating sakura particles */}
              <div className="absolute top-6 right-8 text-2xl float-y opacity-70" style={{ animationDelay: "0.2s" }}>🌸</div>
              <div className="absolute top-24 right-20 text-base float-y opacity-50" style={{ animationDelay: "1.4s" }}>✿</div>
              <div className="absolute bottom-32 right-6 text-xl float-x opacity-60" style={{ animationDelay: "2.8s" }}>🌸</div>

              {/* Top label */}
              <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur border border-sakura-200 shadow-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-konoha-red animate-pulse" />
                <span className="font-jp text-konoha-red text-xs font-bold tracking-[0.25em]">日本語学校</span>
              </div>

              {/* HERO KANJI — 木花 */}
              <div className="relative">
                {/* Soft glow behind kanji */}
                <div className="absolute inset-0 blur-2xl opacity-40">
                  <div className="font-jp text-7xl sm:text-8xl lg:text-9xl font-black bg-gradient-to-br from-konoha-red via-sakura-500 to-sakura-700 bg-clip-text text-transparent leading-none">
                    木花
                  </div>
                </div>

                {/* Main kanji with shimmer */}
                <div className="relative font-jp text-7xl sm:text-8xl lg:text-9xl font-black leading-none tracking-tight">
                  <span className="inline-block bg-gradient-to-br from-konoha-red via-sakura-600 to-sakura-700 bg-clip-text text-transparent gradient-animate" style={{ backgroundSize: "200% 200%" }}>
                    木
                  </span>
                  <span className="inline-block bg-gradient-to-br from-sakura-500 via-konoha-red to-sakura-700 bg-clip-text text-transparent gradient-animate ml-1" style={{ backgroundSize: "200% 200%", animationDelay: "1s" }}>
                    花
                  </span>
                </div>

                {/* Pronunciation + meaning */}
                <div className="mt-4 flex items-center gap-3 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-konoha-red/10 text-konoha-red text-xs font-bold uppercase tracking-wider">
                    <span className="font-jp">きばな</span>
                    <span className="text-sakura-400">·</span>
                    <span>Kibana</span>
                  </div>
                  <div className="text-sm text-gray-600 italic">— "yog'och guli"</div>
                </div>

                {/* Decorative line */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-sakura-300 to-konoha-red" />
                  <span className="font-jp text-konoha-red text-lg">✿</span>
                  <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-sakura-300 to-konoha-red" />
                </div>
              </div>

              {/* Stats grid */}
              <div className="relative mt-7 grid grid-cols-2 gap-3">
                <StatBox end={500} suffix="+" label={t("about_stat_students")} delay={0} />
                <StatBox end={15} suffix="+" label={t("about_stat_teachers")} delay={150} />
                <StatBox end={4} suffix="" label={t("about_stat_directions")} delay={300} />
                <StatBox end={100} suffix="%" label={t("about_stat_quality")} delay={450} />
              </div>

              {/* Bridge banner */}
              <div className="relative mt-6 group/bridge cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-konoha-red via-sakura-600 to-konoha-red rounded-2xl blur-md opacity-50 group-hover/bridge:opacity-80 transition-opacity gradient-animate" style={{ backgroundSize: "200% 200%" }} />
                <div className="relative p-4 rounded-2xl bg-gradient-to-r from-konoha-red via-sakura-600 to-konoha-red text-white text-center shine-effect overflow-hidden gradient-animate" style={{ backgroundSize: "200% 200%" }}>
                  <div className="font-jp text-xs tracking-[0.3em] opacity-90 mb-1">架け橋</div>
                  <div className="font-bold flex items-center justify-center gap-2">
                    <span>🇺🇿</span>
                    <span className="h-px w-6 bg-white/60" />
                    <span>🌸</span>
                    <span className="h-px w-6 bg-white/60" />
                    <span>🇯🇵</span>
                  </div>
                  <div className="text-sm font-semibold mt-1.5">{t("about_bridge")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Content */}
        <div className="reveal-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sakura-100 text-konoha-red text-xs font-bold uppercase tracking-wider mb-4">
            <span className="font-jp">私たち</span>
            <span>{t("about_badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            {t("about_title_1")}{" "}
            <span className="text-shimmer">{t("about_title_2")}</span>{" "}
            {t("about_title_3")}
          </h2>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            <span className="font-bold text-konoha-red">KONOHA</span> — {t("about_desc")}
          </p>

          <div className="mt-6 space-y-3">
            {[
              { icon: "🇯🇵", title: t("about_item_1_t"), desc: t("about_item_1_d") },
              { icon: "🌍", title: t("about_item_2_t"), desc: t("about_item_2_d") },
              { icon: "💻", title: t("about_item_3_t"), desc: t("about_item_3_d") },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-4 rounded-2xl bg-white border border-sakura-100 hover:border-konoha-red hover:translate-x-2 hover:shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="text-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform">{item.icon}</div>
                <div>
                  <div className="font-bold text-gray-900 group-hover:text-konoha-red transition-colors">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
                <div className="ml-auto text-konoha-red opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-gray-700 text-base sm:text-lg italic border-l-4 border-konoha-red pl-4 relative">
            <span className="absolute -left-3 -top-3 text-4xl text-sakura-200 font-jp">"</span>
            {t("about_quote")}
          </p>
        </div>
      </div>
    </section>
  );
}
