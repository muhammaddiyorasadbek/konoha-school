// ==========================================================
// Telegram orqali ariza yuborish (BOT KERAK EMAS!)
// ==========================================================
// Foydalanuvchi formani to'ldiradi → "Yuborish" tugmasini bosadi
// → Telegram dasturi avtomatik ochiladi → tayyor xabar bilan
// @KONOHA_UZ1 ga yuborish dialogi paydo bo'ladi → foydalanuvchi
// faqat 1 ta "Yuborish" tugmasini bosadi → xabar sizga keladi.
// ==========================================================

export const TELEGRAM_USERNAME = "KONOHA_UZ1";

export interface RegistrationData {
  type: "registration" | "contact";
  name: string;
  phone: string;
  age?: string;
  course?: string;
  language: string;
}

const langFlag: Record<string, string> = {
  uz: "🇺🇿 O'zbekcha",
  en: "🇬🇧 English",
  ru: "🇷🇺 Русский",
  ja: "🇯🇵 日本語",
};

/**
 * Foydalanuvchining Telegramda yuboradigan xabarini tayyorlaydi.
 * Chiroyli, tushunish oson, emojilar va bo'limlar bilan.
 */
export function buildMessage(data: RegistrationData): string {
  const now = new Date();
  const date = now.toLocaleString("uz-UZ", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (data.type === "registration") {
    return [
      "🌸 KONOHA YAPON MAKTABI 🌸",
      "📝 YANGI RO'YXATDAN O'TISH",
      "━━━━━━━━━━━━━━━━━",
      "",
      `👤 Ism familiya:  ${data.name}`,
      `🎂 Yosh:          ${data.age || "-"}`,
      `📞 Telefon:       ${data.phone}`,
      `📚 Tanlangan kurs: ${data.course || "-"}`,
      "",
      "━━━━━━━━━━━━━━━━━",
      `🌐 Sayt tili:  ${langFlag[data.language] || data.language}`,
      `🕐 Sana/vaqt:  ${date}`,
      "",
      "Iltimos, men bilan bog'laning! 🙏",
    ].join("\n");
  }

  // contact form
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

/**
 * Telegram dasturini ochib, oldindan to'ldirilgan xabar bilan
 * @KONOHA_UZ1 ga yuborish dialogini ko'rsatadi.
 *
 * Foydalanuvchi faqat Telegramda "Yuborish" tugmasini bosadi
 * va xabar SIZGA (KONOHA_UZ1) keladi.
 */
export function sendViaTelegram(data: RegistrationData): boolean {
  try {
    const message = buildMessage(data);
    const encoded = encodeURIComponent(message);

    // t.me/share — Telegramning rasmiy "share" mexanizmi.
    // Mobil qurilmalarda Telegram ilovasini, kompyuterda Telegram Web/Desktop ni ochadi.
    // Foydalanuvchi qaysi profilga yuborishini tanlaydi, biz username'ni
    // sarlavhada ko'rsatamiz, shunda u darhol topib yuboradi.
    //
    // Eng ishonchlisi - to'g'ridan-to'g'ri profilga link:
    const directUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encoded}`;

    // Yangi tabda ochamiz (mobil qurilmada Telegram ilovasi avtomatik ochiladi)
    const win = window.open(directUrl, "_blank", "noopener,noreferrer");

    // Agar popup blocker to'sgan bo'lsa, hozirgi sahifada ochamiz
    if (!win) {
      window.location.href = directUrl;
    }

    // Backup uchun localStorage'ga ham saqlaymiz (statistika)
    saveToLocal(data);
    return true;
  } catch (err) {
    console.error("Telegram send error:", err);
    return false;
  }
}

/**
 * Backup — agar foydalanuvchi Telegramda yubormasdan chiqib ketsa,
 * sayt egasi keyinroq ariza ma'lumotlarini ko'ra olishi uchun.
 */
function saveToLocal(data: RegistrationData) {
  try {
    const list = JSON.parse(localStorage.getItem("konoha_apps") || "[]");
    list.push({ ...data, savedAt: new Date().toISOString() });
    localStorage.setItem("konoha_apps", JSON.stringify(list.slice(-200)));
  } catch {
    // ignore
  }
}
