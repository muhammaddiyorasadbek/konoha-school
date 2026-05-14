export const TELEGRAM_USERNAME = "KONOHA_UZ1";

export interface RegistrationData {
  type: "registration" | "contact";
  name: string;
  phone: string;
  age?: string;
  course?: string;
  schedule?: string;
  goal?: string;
  goalOther?: string;
  language: string;
}

const langFlag: Record<string, string> = {
  uz: "🇺🇿 O'zbekcha",
  en: "🇬🇧 English",
  ru: "🇷🇺 Русский",
  ja: "🇯🇵 日本語",
};

export function buildMessage(data: RegistrationData): string {
  const now = new Date();
  const date = now.toLocaleString("uz-UZ", {
    timeZone: "Asia/Tashkent",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });

  if (data.type === "registration") {
    return [
      "🌸 KONOHA YAPON MAKTABI 🌸",
      "📝 YANGI RO'YXATDAN O'TISH",
      "━━━━━━━━━━━━━━━━━",
      "",
      `👤 Ism familiya:   ${data.name}`,
      `🎂 Yosh:           ${data.age || "-"}`,
      `📞 Telefon:        ${data.phone}`,
      `📚 Tanlangan kurs: ${data.course || "-"}`,
      `🕐 Dars vaqti:     ${data.schedule || "-"}`,
      `🎯 Maqsad:         ${data.goal === "other" ? (data.goalOther || "Boshqa") : (data.goal || "-")}`,
      "",
      "━━━━━━━━━━━━━━━━━",
      `🌐 Sayt tili:  ${langFlag[data.language] || data.language}`,
      `🕐 Sana/vaqt:  ${date}`,
      "",
      "Iltimos, men bilan bog'laning! 🙏",
    ].join("\n");
  }

  return [
    "🌸 KONOHA YAPON MAKTABI 🌸",
    "💬 ALOQA — YANGI MUROJAAT",
    "━━━━━━━━━━━━━━━━━",
    "",
    `👤 Ism:      ${data.name}`,
    `📞 Telefon:  ${data.phone}`,
    "",
    "━━━━━━━━━━━━━━━━━",
    `🌐 Sayt tili:  ${langFlag[data.language] || data.language}`,
    `🕐 Sana/vaqt:  ${date}`,
    "",
    "Iltimos, men bilan bog'laning! 🙏",
  ].join("\n");
}

export function sendViaTelegram(data: RegistrationData): boolean {
  try {
    const message = buildMessage(data);
    const encoded = encodeURIComponent(message);
    const directUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encoded}`;
    const win = window.open(directUrl, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = directUrl;
    saveToLocal(data);
    return true;
  } catch (err) {
    console.error("Telegram send error:", err);
    return false;
  }
}

function saveToLocal(data: RegistrationData) {
  try {
    const list = JSON.parse(localStorage.getItem("konoha_apps") || "[]");
    list.push({ ...data, savedAt: new Date().toISOString() });
    localStorage.setItem("konoha_apps", JSON.stringify(list.slice(-200)));
  } catch { /* ignore */ }
}
