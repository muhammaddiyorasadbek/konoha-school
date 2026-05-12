import { useEffect, useState } from "react";
import { useLang } from "../i18n/LangContext";
import { PHONE, SOCIAL } from "../config";

export default function FloatingCTA({ onRegister }: { onRegister: () => void }) {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed left-5 bottom-5 sm:left-8 sm:bottom-8 z-40 flex flex-col gap-3 transition-all duration-500 ${
          show ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <a
          href={SOCIAL.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          title={SOCIAL.instagram_username}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white shadow-xl shadow-pink-400/40 flex items-center justify-center hover:-translate-y-1 hover:rotate-12 hover:scale-110 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
          </svg>
        </a>

        <a
          href={SOCIAL.telegram}
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram"
          title={SOCIAL.telegram_username}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#229ED9] to-[#0088cc] text-white shadow-xl shadow-blue-400/40 flex items-center justify-center hover:-translate-y-1 hover:rotate-12 hover:scale-110 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.13-.05-.18s-.14-.04-.21-.02c-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
          </svg>
        </a>

        <a
          href={`tel:${PHONE.replace(/\s/g, "")}`}
          aria-label="Call"
          title={PHONE}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-2xl shadow-green-400/40 flex items-center justify-center hover:-translate-y-1 hover:rotate-12 hover:scale-110 transition-all pulse-ring"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
          </svg>
        </a>
      </div>

      <button
        onClick={onRegister}
        aria-label={t("register")}
        className={`fixed right-5 bottom-5 sm:right-8 sm:bottom-8 z-40 px-5 py-3.5 rounded-full bg-gradient-to-r from-konoha-red to-sakura-600 text-white font-bold shadow-2xl shadow-sakura-400/50 hover:-translate-y-1 hover:scale-105 transition-all flex items-center gap-2 ${
          show ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } duration-500`}
      >
        <span className="text-lg">🌸</span>
        <span className="hidden sm:inline text-sm">{t("register")}</span>
        <span className="sm:hidden text-sm">{t("fab_register")}</span>
      </button>
    </>
  );
}
