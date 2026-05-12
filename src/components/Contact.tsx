import { useMemo, useState } from "react";
import { useLang } from "../i18n/LangContext";
import { sendViaTelegram, buildMessage, TELEGRAM_USERNAME } from "../utils/telegram";
import { ADDRESS, PHONE, SOCIAL } from "../config";

type Step = "form" | "preview" | "sent";

export default function Contact() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: "", phone: "" });
  const [step, setStep] = useState<Step>("form");

  const previewMessage = useMemo(
    () =>
      buildMessage({
        type: "contact",
        name: form.name || "...",
        phone: form.phone || "...",
        language: lang,
      }),
    [form, lang]
  );

  const goPreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStep("preview");
  };

  const sendNow = () => {
    sendViaTelegram({
      type: "contact",
      name: form.name,
      phone: form.phone,
      language: lang,
    });
    setStep("sent");
    setTimeout(() => {
      setStep("form");
      setForm({ name: "", phone: "" });
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white to-sakura-50/60">
      <div className="absolute top-10 right-10 font-jp text-[200px] font-black text-sakura-100/40 leading-none select-none pointer-events-none">
        連絡
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sakura-100 text-konoha-red text-xs font-bold uppercase tracking-wider mb-4">
            <span className="font-jp">連絡</span>
            <span>{t("contact_badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            {t("contact_title_1")} <span className="text-shimmer">{t("contact_title_2")}</span>
          </h2>
          <p className="mt-4 text-gray-600 text-lg">{t("contact_desc")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info + Map */}
          <div className="reveal-left space-y-5">
            <div className="group p-6 rounded-3xl bg-white border border-sakura-100 shadow-sm hover:shadow-xl hover:border-konoha-red transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-konoha-red to-sakura-500 flex items-center justify-center text-white text-xl flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  📍
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    {t("contact_address")}
                  </div>
                  <div className="font-bold text-gray-900 mt-1">{ADDRESS[lang]}</div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="group p-6 rounded-3xl bg-white border border-sakura-100 shadow-sm hover:shadow-xl hover:border-konoha-red hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-konoha-red to-sakura-500 flex items-center justify-center text-white text-xl mb-3 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  📞
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">{t("contact_phone")}</div>
                <div className="font-bold text-gray-900 mt-1">{PHONE}</div>
              </a>

              <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noreferrer" className="group p-6 rounded-3xl bg-white border border-sakura-100 shadow-sm hover:shadow-xl hover:border-konoha-red hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#229ED9] to-[#0088cc] flex items-center justify-center text-white mb-3 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.13-.05-.18s-.14-.04-.21-.02c-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Telegram</div>
                <div className="font-bold text-gray-900 mt-1">{SOCIAL.telegram_username}</div>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="group p-6 rounded-3xl bg-white border border-sakura-100 shadow-sm hover:shadow-xl hover:border-konoha-red hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white mb-3 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                  </svg>
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Instagram</div>
                <div className="font-bold text-gray-900 mt-1">{SOCIAL.instagram_username}</div>
              </a>

              <div className="group p-6 rounded-3xl bg-white border border-sakura-100 shadow-sm hover:shadow-xl hover:border-konoha-red hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-konoha-red to-sakura-500 flex items-center justify-center text-white text-xl mb-3 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  🕐
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">{t("contact_hours")}</div>
                <div className="font-bold text-gray-900 mt-1">{t("contact_hours_val")}</div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-sakura-100 shadow-lg h-64 hover:shadow-2xl transition-shadow">
              <iframe
                title="KONOHA"
                src="https://www.google.com/maps?q=Furqat+tumani,+Chirkay,+Hunarmandlar+uyi&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form / Preview / Sent */}
          <div className="reveal-right">
            <div className="relative p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-sakura-50 border border-sakura-100 shadow-xl shadow-sakura-200/30 overflow-hidden">
              <div className="absolute -top-6 -right-6 font-jp text-[120px] font-black text-sakura-100/60 leading-none select-none pointer-events-none">
                花
              </div>

              <div className="relative">
                {step === "form" && (
                  <form onSubmit={goPreview} className="space-y-4 fade-in">
                    <h3 className="text-2xl font-black text-gray-900 mb-1">{t("contact_form_title")}</h3>
                    <p className="text-gray-600 mb-4">{t("contact_form_desc")}</p>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t("field_name")} *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t("placeholder_name")}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t("field_phone")} *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+998 __ ___ __ __"
                        className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-konoha-red to-sakura-600 text-white font-bold shadow-lg shadow-sakura-400/30 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all shine-effect overflow-hidden relative"
                    >
                      <span className="relative">{t("btn_send")} →</span>
                    </button>
                  </form>
                )}

                {step === "preview" && (
                  <div className="space-y-4 fade-up">
                    <button
                      onClick={() => setStep("form")}
                      className="text-sm text-gray-500 hover:text-konoha-red transition-colors"
                    >
                      ← Back
                    </button>

                    <div className="text-center">
                      <div className="inline-flex w-14 h-14 rounded-full bg-gradient-to-br from-[#229ED9] to-[#0088cc] items-center justify-center text-white text-2xl shadow-lg mb-2">
                        ✈️
                      </div>
                      <h3 className="text-xl font-black text-gray-900">{t("btn_send_telegram")}</h3>
                      <p className="text-sm text-gray-600 mt-1">{t("telegram_hint")}</p>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        {t("preview_label")}
                      </div>
                      <div className="rounded-xl bg-white border-2 border-sakura-100 p-3 max-h-48 overflow-y-auto">
                        <pre className="font-mono text-[11px] text-gray-800 whitespace-pre-wrap leading-relaxed">
                          {previewMessage}
                        </pre>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-xl bg-sakura-50 border border-sakura-100">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-konoha-red to-sakura-500 flex items-center justify-center text-white font-bold text-sm">K</div>
                      <div className="text-sm font-bold text-gray-900">@{TELEGRAM_USERNAME}</div>
                      <div className="ml-auto text-konoha-red">✈️</div>
                    </div>

                    <button
                      onClick={sendNow}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#229ED9] to-[#0088cc] text-white font-bold shadow-xl shadow-blue-400/40 hover:-translate-y-0.5 hover:shadow-2xl active:scale-95 transition-all shine-effect pulse-ring"
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                        {t("btn_send_telegram")}
                      </span>
                    </button>
                  </div>
                )}

                {step === "sent" && (
                  <div className="text-center py-6 fade-up">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-konoha-red to-sakura-500 flex items-center justify-center text-white text-4xl shadow-2xl shadow-sakura-400/40 animate-bounce">
                      ✓
                    </div>
                    <h3 className="mt-5 text-2xl font-black text-gray-900">{t("modal_success_title")} 🌸</h3>
                    <p className="mt-2 text-gray-600">{t("telegram_opened")}</p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sakura-50 text-konoha-red text-sm font-bold">
                      ✈️ @{TELEGRAM_USERNAME}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
