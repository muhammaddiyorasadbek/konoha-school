// ============================================
// TELEGRAM BOT KONFIGURATSIYASI
// ============================================
// 1. Telegramda @BotFather ga yozing
// 2. /newbot buyrug'ini yuboring va botingizni yarating
// 3. Olingan TOKEN ni quyiga qo'ying
// 4. @KONOHA_UZ1 profili botingizga /start yuborsin
//    (yoki @userinfobot orqali Chat ID ni oling)
// 5. CHAT_ID ni quyiga qo'ying (raqam, masalan: 123456789)
// ============================================

export const TELEGRAM_CONFIG = {
  // Sizning bot tokeningiz (BotFather'dan olingan)
  BOT_TOKEN: "YOUR_BOT_TOKEN_HERE",

  // @KONOHA_UZ1 ning Chat ID si (raqamli)
  // Yoki kanal username: "@KONOHA_UZ1" (agar bot kanalga admin bo'lsa)
  CHAT_ID: "@KONOHA_UZ1",
};

// Saytdagi manzil
export const ADDRESS = {
  uz: "Farg'ona viloyati, Furqat tumani, Chirkay MFY, Hunarmandlar uyi",
  en: "Fergana region, Furqat district, Chirkay MFY, Hunarmandlar uyi",
  ru: "Ферганская область, Фуркатский район, Чиркай МФЙ, Хунармандлар уйи",
  ja: "フェルガナ州、フルカット地区、チルカイMFY、フナルマンドラル・ウイ",
};

export const PHONE = "+998 94 594 58 80";

// Ijtimoiy tarmoqlar
export const SOCIAL = {
  telegram: "https://t.me/konoha_yapon_maktabi",
  telegram_username: "@konoha_yapon_maktabi",
  instagram: "https://instagram.com/konoha.uz",
  instagram_username: "@konoha.uz",
};

// Maktab va ish haqida batafsil ma'lumot (Canva prezentatsiyasi)
export const PRESENTATION_URL = "https://canva.link/ll1h9aw12az8hrg";

// ============================================
// SUPABASE BULUTLI BAZA SOZLAMALARI
// ============================================
// Bularni supabase.com dan oling
export const SUPABASE_CONFIG = {
  url: "https://ctiyojckbeokqpuboguc.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0aXlvamNrYmVva3FwdWJvZ3VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1ODA5MDUsImV4cCI6MjA5NDE1NjkwNX0.rQsI-ARvMBoAa2QsgNvgi8uMQJDcUZowkAVaseQDwdU",
};
