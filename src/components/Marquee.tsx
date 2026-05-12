import { useLang } from "../i18n/LangContext";

export default function Marquee() {
  const { t } = useLang();

  const items = [
    `🌸 ${t("hero_badge")}`,
    `✨ ${t("course_free")}`,
    `🎌 ${t("about_bridge")}`,
    `⛩️ JLPT N5–N3`,
    `💫 ${t("adv_5_t")}`,
    `🗾 ${t("footer_dream")}`,
    `🌸 桜が咲く`,
    `🎓 ${t("adv_6_t")}`,
  ];
  const list = [...items, ...items];

  return (
    <div className="marquee-wrap relative py-4 bg-gradient-to-r from-konoha-red via-sakura-600 to-konoha-red overflow-hidden border-y border-white/10">
      <div className="marquee">
        {list.map((tx, i) => (
          <div key={i} className="flex items-center gap-3 px-8 text-white font-bold text-sm sm:text-base whitespace-nowrap">
            <span>{tx}</span>
            <span className="text-sakura-200">✦</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-konoha-red to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-konoha-red to-transparent pointer-events-none" />
    </div>
  );
}
