import TiltCard from "./TiltCard";
import { useLang } from "../i18n/LangContext";

export default function Courses({ onRegister }: { onRegister: (course?: string) => void }) {
  const { t } = useLang();

  const courses = [
    {
      title: t("c1_title"),
      jp: "日本語",
      icon: "🌸",
      desc: t("c1_desc"),
      audience: t("c1_aud"),
      duration: t("c1_dur"),
      free: true,
      color: "from-konoha-red to-sakura-500",
    },
    {
      title: t("c2_title"),
      jp: "日本語",
      icon: "⛩️",
      desc: t("c2_desc"),
      audience: t("c2_aud"),
      duration: t("c2_dur"),
      color: "from-sakura-500 to-sakura-700",
    },
    {
      title: t("c3_title"),
      jp: "情報技術",
      icon: "💻",
      desc: t("c3_desc"),
      audience: t("c3_aud"),
      duration: t("c3_dur"),
      color: "from-sakura-600 to-konoha-darkred",
    },
    {
      title: t("c4_title"),
      jp: "外国語",
      icon: "🌍",
      desc: t("c4_desc"),
      audience: t("c4_aud"),
      duration: t("c4_dur"),
      color: "from-sakura-400 to-sakura-600",
    },
  ];

  return (
    <section id="courses" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-sakura-50/40 to-white">
      <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-sakura-200/30 blur-3xl blob" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-sakura-300/30 blur-3xl blob" style={{ animationDelay: "8s" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sakura-100 text-konoha-red text-xs font-bold uppercase tracking-wider mb-4">
            <span className="font-jp">講座</span>
            <span>{t("courses_badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            {t("courses_title_1")}{" "}
            <span className="text-shimmer">{t("courses_title_2")}</span>{" "}
            {t("courses_title_3")}
          </h2>
          <p className="mt-4 text-gray-600 text-lg">{t("courses_desc")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((c, idx) => (
            <div key={idx} className="reveal" style={{ transitionDelay: `${idx * 90}ms` }}>
              <TiltCard className="group relative p-6 rounded-3xl border border-sakura-100 hover:border-konoha-red transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-sakura-300/40 flex flex-col h-full overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`} />

                {c.free && (
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-konoha-red to-sakura-600 text-white text-xs font-bold shadow-lg shadow-konoha-red/30 z-10">
                    <span className="inline-block animate-pulse">✨</span> {t("course_free")}
                  </div>
                )}

                <div className="absolute -bottom-6 -right-6 font-jp text-[120px] font-black text-sakura-50 leading-none select-none pointer-events-none group-hover:text-sakura-100 transition-colors">
                  {c.jp.charAt(0)}
                </div>

                <div className="relative flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-3xl shadow-lg shadow-sakura-300/40 group-hover:scale-110 group-hover:-rotate-6 transition-transform`}>
                    <span>{c.icon}</span>
                  </div>
                  <div className="font-jp text-3xl font-black text-sakura-200 group-hover:text-konoha-red transition-colors">
                    {c.jp}
                  </div>
                </div>

                <h3 className="relative text-xl font-extrabold text-gray-900 mb-2">{c.title}</h3>
                <p className="relative text-sm text-gray-600 mb-5 flex-1">{c.desc}</p>

                <div className="relative space-y-2 mb-5 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-konoha-red">👥</span>
                    <span><b>{t("course_audience")}</b> {c.audience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-konoha-red">⏱️</span>
                    <span><b>{t("course_duration")}</b> {c.duration}</span>
                  </div>
                </div>

                <button
                  onClick={() => onRegister(c.title)}
                  className="relative mt-auto w-full py-3 rounded-xl bg-sakura-50 text-konoha-red font-bold text-sm hover:bg-gradient-to-r hover:from-konoha-red hover:to-sakura-600 hover:text-white transition-all shine-effect overflow-hidden"
                >
                  {t("course_register")} →
                </button>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
