import { useEffect, useMemo, useState } from "react";
import { useLang } from "../i18n/LangContext";
import { sendViaTelegram, buildMessage, TELEGRAM_USERNAME } from "../utils/telegram";

interface Props {
  open: boolean;
  defaultCourse?: string;
  onClose: () => void;
}

type Step = "form" | "preview" | "sent";

// Dars vaqtlari
const SCHEDULES = [
  { id: "12-15", label: "🌤 12:00 – 15:00", desc: "" },
  { id: "15-17", label: "🌅 15:00 – 17:00", desc: "" },
  { id: "17-19", label: "🌆 17:00 – 19:00", desc: "" },
];

// Maqsadlar
const GOALS: Record<string, { uz: string; en: string; ru: string; ja: string; icon: string }> = {
  work: { uz: "Yaponiyada ishlash", en: "Work in Japan", ru: "Работа в Японии", ja: "日本で働く", icon: "💼" },
  study: { uz: "Yaponiyada o'qish", en: "Study in Japan", ru: "Учёба в Японии", ja: "日本で学ぶ", icon: "🎓" },
  travel: { uz: "Sayohat qilish", en: "Travel to Japan", ru: "Путешествие в Японию", ja: "日本旅行", icon: "✈️" },
  culture: { uz: "Yapon madaniyatiga qiziqish", en: "Interest in Japanese culture", ru: "Интерес к культуре Японии", ja: "日本文化への興味", icon: "🎌" },
  anime: { uz: "Anime/manga tushunish", en: "Understand anime/manga", ru: "Понимать аниме/мангу", ja: "アニメ・マンガ", icon: "🎭" },
  other: { uz: "Boshqa maqsad", en: "Other goal", ru: "Другая цель", ja: "その他", icon: "✏️" },
};

export default function RegistrationModal({ open, defaultCourse, onClose }: Props) {
  const { t, lang } = useLang();

  const courseOptions = [
    `${t("c1_title")} (${t("course_free")})`,
    t("c2_title"),
    t("c3_title"),
    t("c4_title"),
  ];

  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    course: defaultCourse || courseOptions[0],
    schedule: "",
    goal: "",
    goalOther: "",
  });
  const [step, setStep] = useState<Step>("form");

  useEffect(() => {
    if (defaultCourse) setForm((f) => ({ ...f, course: defaultCourse }));
  }, [defaultCourse]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => setStep("form"), 300);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const goalLabel = form.goal
    ? form.goal === "other"
      ? (form.goalOther || GOALS.other[lang as keyof typeof GOALS.other] || GOALS.other.uz)
      : (GOALS[form.goal]?.[lang as keyof typeof GOALS.other] || GOALS[form.goal]?.uz || "")
    : "";

  const scheduleLabel = SCHEDULES.find(s => s.id === form.schedule)?.label || "";

  const previewMessage = useMemo(() =>
    buildMessage({
      type: "registration",
      name: form.name || "...",
      age: form.age || "...",
      phone: form.phone || "...",
      course: form.course,
      schedule: scheduleLabel,
      goal: form.goal === "other" ? "other" : goalLabel,
      goalOther: form.goalOther,
      language: lang,
    }),
    [form, lang, scheduleLabel, goalLabel]
  );

  const goPreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.phone || !form.schedule || !form.goal) return;
    if (form.goal === "other" && !form.goalOther.trim()) return;
    setStep("preview");
  };

  const sendNow = () => {
    sendViaTelegram({
      type: "registration",
      name: form.name,
      age: form.age,
      phone: form.phone,
      course: form.course,
      schedule: scheduleLabel,
      goal: form.goal === "other" ? "other" : goalLabel,
      goalOther: form.goalOther,
      language: lang,
    });
    setStep("sent");
    setTimeout(() => {
      onClose();
      setForm({ name: "", age: "", phone: "", course: courseOptions[0], schedule: "", goal: "", goalOther: "" });
    }, 4500);
  };

  // Tarjimalar
  const labels: Record<string, Record<string, string>> = {
    schedule_title: { uz: "Dars vaqti", en: "Class schedule", ru: "Время занятий", ja: "授業時間" },
    goal_title: { uz: "Yapon tilini o'rganish maqsadingiz", en: "Your goal for learning Japanese", ru: "Цель изучения японского", ja: "日本語を学ぶ目的" },
    goal_other_placeholder: { uz: "Maqsadingizni yozing...", en: "Write your goal...", ru: "Напишите вашу цель...", ja: "目標を書いてください..." },
    required_all: { uz: "Barcha maydonlarni to'ldiring", en: "Please fill all fields", ru: "Заполните все поля", ja: "すべての項目を入力してください" },
    back: { uz: "Orqaga", en: "Back", ru: "Назад", ja: "戻る" },
  };
  const l = (key: string) => labels[key]?.[lang] || labels[key]?.uz || key;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div onClick={onClose} className={`absolute inset-0 bg-gradient-to-br from-sakura-900/60 to-konoha-darkred/70 backdrop-blur-md transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />

      <div className={`relative w-full max-w-lg max-h-[95vh] overflow-y-auto rounded-[32px] bg-gradient-to-br from-white via-white to-sakura-50 shadow-2xl border border-sakura-100 transition-all duration-500 ${open ? "scale-100 translate-y-0 opacity-100" : "scale-90 translate-y-8 opacity-0"}`}>
        <div className="absolute -top-4 -right-4 font-jp text-[140px] font-black text-sakura-100 leading-none select-none pointer-events-none">桜</div>
        <div className="absolute -bottom-12 -left-6 font-jp text-[120px] font-black text-sakura-50 leading-none select-none pointer-events-none">学</div>

        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-konoha-red hover:rotate-90 transition-all z-10">✕</button>

        {/* SUCCESS */}
        {step === "sent" && (
          <div className="relative p-12 text-center fade-up">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-konoha-red to-sakura-500 flex items-center justify-center text-white text-5xl shadow-2xl shadow-sakura-400/40 animate-bounce">✓</div>
            <h3 className="mt-6 text-3xl font-black text-gray-900">{t("modal_success_title")} 🌸</h3>
            <p className="mt-3 text-gray-600">{t("telegram_opened")}</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sakura-50 text-konoha-red text-sm font-bold">✈️ @{TELEGRAM_USERNAME}</div>
            <div className="mt-6 font-jp text-konoha-red text-xl">ありがとうございます</div>
            <div className="text-sm text-gray-500 mt-1">{t("modal_thanks")}</div>
          </div>
        )}

        {/* FORM */}
        {step === "form" && (
          <div className="relative p-7 sm:p-9">
            <div className="text-center mb-6">
              <div className="font-jp text-konoha-red text-sm font-bold tracking-widest">登録</div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">{t("register")}</h3>
              <p className="text-gray-600 text-sm mt-2">{t("modal_subtitle")}</p>
            </div>

            <form onSubmit={goPreview} className="space-y-5">
              {/* Ism */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">{t("field_fullname")} *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("placeholder_fullname")}
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all" />
              </div>

              {/* Yosh va Telefon */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">{t("field_age")} *</label>
                  <input type="number" required min={5} max={70} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="12"
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">{t("field_phone")} *</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+998 __ ___ __ __"
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all" />
                </div>
              </div>

              {/* Kurs */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">{t("field_course")} *</label>
                <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all appearance-none cursor-pointer">
                  {courseOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Dars vaqti */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">{l("schedule_title")} *</label>
                <div className="grid grid-cols-3 gap-2">
                  {SCHEDULES.map((s) => (
                    <button key={s.id} type="button" onClick={() => setForm({ ...form, schedule: s.id })}
                      className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all text-center ${form.schedule === s.id ? "border-konoha-red bg-sakura-50 text-konoha-red shadow-md" : "border-sakura-100 bg-white text-gray-700 hover:border-sakura-300"}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Maqsad */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">{l("goal_title")} *</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(GOALS).map(([key, g]) => (
                    <button key={key} type="button" onClick={() => setForm({ ...form, goal: key, goalOther: key !== "other" ? "" : form.goalOther })}
                      className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all text-left flex items-center gap-2 ${form.goal === key ? "border-konoha-red bg-sakura-50 text-konoha-red shadow-md" : "border-sakura-100 bg-white text-gray-700 hover:border-sakura-300"}`}>
                      <span className="text-base">{g.icon}</span>
                      <span className="text-xs leading-tight">{g[lang as keyof typeof g] || g.uz}</span>
                    </button>
                  ))}
                </div>
                {form.goal === "other" && (
                  <textarea value={form.goalOther} onChange={(e) => setForm({ ...form, goalOther: e.target.value })} placeholder={l("goal_other_placeholder")} rows={2} required
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all text-sm resize-none" />
                )}
              </div>

              <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-konoha-red to-sakura-600 text-white font-bold shadow-lg shadow-sakura-400/40 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all relative overflow-hidden group">
                <span className="relative z-10 inline-flex items-center gap-2">{t("register")} 🌸 →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-sakura-600 to-konoha-red opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <p className="text-xs text-gray-500 text-center">{t("modal_note")}</p>
            </form>
          </div>
        )}

        {/* PREVIEW */}
        {step === "preview" && (
          <div className="relative p-6 sm:p-8 fade-up">
            <button onClick={() => setStep("form")} className="text-sm text-gray-500 hover:text-konoha-red flex items-center gap-1 mb-4 transition-colors">
              ← {l("back")}
            </button>
            <div className="text-center mb-5">
              <div className="inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-[#229ED9] to-[#0088cc] items-center justify-center text-white text-3xl shadow-lg shadow-blue-400/40 mb-3">✈️</div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900">{t("btn_send_telegram")}</h3>
              <p className="text-sm text-gray-600 mt-2">{t("telegram_hint")}</p>
            </div>
            <div className="mb-5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t("preview_label")}</div>
              <div className="rounded-2xl bg-gradient-to-br from-sakura-50 to-white border-2 border-sakura-100 p-4 max-h-64 overflow-y-auto">
                <pre className="font-mono text-[11px] sm:text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">{previewMessage}</pre>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-sakura-50 border border-sakura-100 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-konoha-red to-sakura-500 flex items-center justify-center text-white font-bold">K</div>
              <div className="flex-1">
                <div className="text-xs text-gray-500">→ Telegram</div>
                <div className="font-bold text-gray-900">@{TELEGRAM_USERNAME}</div>
              </div>
              <div className="text-konoha-red text-xl">✈️</div>
            </div>
            <button onClick={sendNow} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#229ED9] to-[#0088cc] text-white font-bold shadow-xl shadow-blue-400/40 hover:-translate-y-0.5 hover:shadow-2xl active:scale-95 transition-all relative overflow-hidden group shine-effect pulse-ring">
              <span className="relative z-10 inline-flex items-center justify-center gap-2 text-base">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                {t("btn_send_telegram")}
              </span>
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">
              {t("no_telegram")}{" "}
              <a href="tel:+998945945880" className="text-konoha-red font-bold hover:underline">+998 94 594 58 80</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
