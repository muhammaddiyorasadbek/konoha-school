import { useLang } from "../i18n/LangContext";
import { ADDRESS, PHONE, SOCIAL } from "../config";
import Logo from "./Logo";

export default function Footer({
  onRegister,
  onInfo,
  onAdmin,
}: {
  onRegister: () => void;
  onInfo: () => void;
  onAdmin: () => void;
}) {
  const { t, lang } = useLang();

  const pages: [string, string][] = [
    ["#about", t("nav_about")],
    ["#courses", t("nav_courses")],
    ["#advantages", t("nav_advantages")],
    ["#contact", t("nav_contact")],
  ];

  return (
    <footer className="relative bg-gradient-to-br from-konoha-darkred via-konoha-red to-sakura-700 text-white overflow-hidden">
      <div className="absolute -top-10 -right-10 font-jp text-[260px] font-black text-white/5 leading-none select-none pointer-events-none">
        桜
      </div>
      <div className="absolute -bottom-20 -left-10 font-jp text-[220px] font-black text-white/5 leading-none select-none pointer-events-none">
        木
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        <div className="rounded-[32px] bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-14">
          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-sakura-200 mb-2">
              🌸 {t("footer_cta_label")}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">{t("footer_cta_title")}</h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <button
              onClick={onInfo}
              className="group inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 backdrop-blur border-2 border-white/30 text-white font-bold hover:bg-white hover:text-konoha-red hover:-translate-y-1 transition-all"
            >
              <span className="text-lg group-hover:rotate-12 transition-transform">📖</span>
              <span>{t("more_info_short")}</span>
            </button>
            <button
              onClick={onRegister}
              className="px-8 py-4 rounded-full bg-white text-konoha-red font-bold shadow-2xl hover:-translate-y-1 hover:shadow-white/30 transition-all"
            >
              {t("register")} →
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={48} withGlow={false} />
              <div>
                <div className="font-extrabold text-xl">KONOHA</div>
                <div className="text-xs uppercase tracking-widest text-sakura-100/80">日本語学校</div>
              </div>
            </div>
            <p className="text-sakura-50/90 text-sm leading-relaxed max-w-md">{t("footer_about")}</p>
            <div className="mt-5 font-jp text-2xl text-sakura-100">夢を実現する場所</div>
            <div className="text-xs text-sakura-100/70 mt-1">{t("footer_dream")}</div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t("nav_contact")}</h4>
            <ul className="space-y-3 text-sm text-sakura-50/90">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>{ADDRESS[lang]}</span>
              </li>
              <li>
                <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <span>📞</span>
                  <span>{PHONE}</span>
                </a>
              </li>
              <li>
                <a href={SOCIAL.telegram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <span>✈️</span>
                  <span>{SOCIAL.telegram_username}</span>
                </a>
              </li>
              <li>
                <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <span>📷</span>
                  <span>{SOCIAL.instagram_username}</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>{t("contact_hours_val")}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t("footer_social")}</h4>
            <div className="flex flex-wrap gap-3">
              <a
                href={SOCIAL.telegram}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                title="Telegram"
                className="w-11 h-11 rounded-full bg-white/15 hover:bg-white hover:text-[#229ED9] flex items-center justify-center hover:-translate-y-1 hover:rotate-6 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.13-.05-.18s-.14-.04-.21-.02c-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </a>

              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="w-11 h-11 rounded-full bg-white/15 hover:bg-gradient-to-br hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white flex items-center justify-center hover:-translate-y-1 hover:rotate-6 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="YouTube"
                title="YouTube"
                className="w-11 h-11 rounded-full bg-white/15 hover:bg-white hover:text-red-600 flex items-center justify-center hover:-translate-y-1 hover:rotate-6 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2c-.3-1-1-1.8-2-2C19.5 3.7 12 3.7 12 3.7s-7.5 0-9.5.5c-1 .3-1.8 1-2 2C0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1 1 1.8 2 2 2 .5 9.5.5 9.5.5s7.5 0 9.5-.5c1-.3 1.8-1 2-2 .5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Facebook"
                title="Facebook"
                className="w-11 h-11 rounded-full bg-white/15 hover:bg-white hover:text-blue-600 flex items-center justify-center hover:-translate-y-1 hover:rotate-6 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>

            <h4 className="font-bold text-lg mt-6 mb-3">{t("footer_pages")}</h4>
            <ul className="space-y-1.5 text-sm">
              {pages.map(([h, l]) => (
                <li key={h}>
                  <a href={h} className="text-sakura-50/80 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-sakura-50/70">
          <div>{t("footer_rights")}</div>
          <div className="flex items-center gap-4">
            <button
              onClick={onAdmin}
              className="inline-flex items-center gap-2 text-sakura-100 hover:text-white transition-colors"
            >
              <span>🔐</span>
              <span>Hisobga kirish</span>
            </button>
            <span className="font-jp">日本語学校 KONOHA 🌸</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
