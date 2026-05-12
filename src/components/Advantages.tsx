import { useLang } from "../i18n/LangContext";

export default function Advantages() {
  const { t } = useLang();

  const items = [
    { icon: "🎁", title: t("adv_1_t"), desc: t("adv_1_d"), jp: "無料" },
    { icon: "🇯🇵", title: t("adv_2_t"), desc: t("adv_2_d"), jp: "先生" },
    { icon: "🛠️", title: t("adv_3_t"), desc: t("adv_3_d"), jp: "実践" },
    { icon: "✈️", title: t("adv_4_t"), desc: t("adv_4_d"), jp: "海外" },
    { icon: "🚀", title: t("adv_5_t"), desc: t("adv_5_d"), jp: "現代" },
    { icon: "🏆", title: t("adv_6_t"), desc: t("adv_6_d"), jp: "証明" },
  ];

  return (
    <section id="advantages" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-sakura-100/40 blur-3xl -z-10 blob" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sakura-100 text-konoha-red text-xs font-bold uppercase tracking-wider mb-4">
            <span className="font-jp">利点</span>
            <span>{t("adv_badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            {t("adv_title_1")} <span className="text-shimmer">{t("adv_title_2")}</span>
          </h2>
          <p className="mt-4 text-gray-600 text-lg">{t("adv_desc")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="reveal-scale group relative p-7 rounded-3xl bg-white border border-sakura-100 hover:border-konoha-red transition-all duration-500 hover:shadow-2xl hover:shadow-sakura-300/40 hover:-translate-y-2 overflow-hidden"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-sakura-50 group-hover:scale-[3] transition-transform duration-700 ease-out" />
              <div className="absolute right-4 bottom-2 font-jp text-7xl font-black text-sakura-50 leading-none select-none pointer-events-none group-hover:text-sakura-100/60 transition-colors">
                {it.jp}
              </div>

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-konoha-red to-sakura-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-sakura-300/40 mb-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
                  {it.icon}
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-konoha-red transition-colors">{it.title}</h3>
                <p className="text-gray-600">{it.desc}</p>

                <div className="mt-4 flex items-center gap-2 text-konoha-red font-bold text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  <span>{t("adv_more")}</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
