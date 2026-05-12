export type Lang = "uz" | "en" | "ru" | "ja";

export const LANGUAGES: { code: Lang; label: string; flag: string; native: string }[] = [
  { code: "uz", label: "Uzbek", flag: "🇺🇿", native: "O'zbekcha" },
  { code: "en", label: "English", flag: "🇬🇧", native: "English" },
  { code: "ru", label: "Russian", flag: "🇷🇺", native: "Русский" },
  { code: "ja", label: "Japanese", flag: "🇯🇵", native: "日本語" },
];

type Dict = Record<Lang, string>;

export const t = {
  // Header
  nav_home: { uz: "Bosh sahifa", en: "Home", ru: "Главная", ja: "ホーム" } as Dict,
  nav_about: { uz: "Biz haqimizda", en: "About", ru: "О нас", ja: "私たちについて" } as Dict,
  nav_courses: { uz: "Kurslar", en: "Courses", ru: "Курсы", ja: "コース" } as Dict,
  nav_advantages: { uz: "Afzalliklar", en: "Advantages", ru: "Преимущества", ja: "利点" } as Dict,
  nav_contact: { uz: "Aloqa", en: "Contact", ru: "Контакты", ja: "連絡先" } as Dict,
  register: { uz: "Ro'yxatdan o'tish", en: "Register", ru: "Регистрация", ja: "登録する" } as Dict,

  // Hero
  hero_badge: { uz: "Qabul ochildi · 2026", en: "Admission Open · 2026", ru: "Приём открыт · 2026", ja: "募集開始 · 2026" } as Dict,
  hero_title_1: { uz: "KONOHA Yapon", en: "KONOHA Japanese", ru: "Японская школа", ja: "コノハ日本語" } as Dict,
  hero_title_2: { uz: "maktabiga qabul", en: "School admission", ru: "KONOHA набор", ja: "学校の入学" } as Dict,
  hero_title_3: { uz: "boshlandi!", en: "is open!", ru: "начат!", ja: "受付開始！" } as Dict,
  hero_subtitle: {
    uz: "Darslar 20-maydan boshlanadi. Bolalaringiz uchun yapon tilida yorqin kelajakni hoziroq band qiling.",
    en: "Classes start on May 20. Reserve a bright Japanese-speaking future for your children right now.",
    ru: "Занятия начинаются с 20 мая. Забронируйте яркое будущее с японским языком для ваших детей уже сейчас.",
    ja: "授業は5月20日から始まります。お子様のために日本語での明るい未来を今すぐ予約しましょう。",
  } as Dict,
  hero_subtitle_date: { uz: "20-maydan", en: "May 20", ru: "20 мая", ja: "5月20日" } as Dict,
  hero_view_courses: { uz: "Kurslarni ko'rish", en: "View Courses", ru: "Смотреть курсы", ja: "コースを見る" } as Dict,
  hero_stat_1: { uz: "yoshgacha BEPUL", en: "and under FREE", ru: "до лет БЕСПЛАТНО", ja: "歳まで無料" } as Dict,
  hero_stat_2: { uz: "Yapon mutaxassis", en: "Japanese experts", ru: "Японских специалистов", ja: "日本人専門家" } as Dict,
  hero_stat_3: { uz: "O'quvchilar", en: "Students", ru: "Учеников", ja: "生徒数" } as Dict,
  hero_scroll: { uz: "Pastga", en: "Scroll", ru: "Вниз", ja: "下へ" } as Dict,

  feat_1_title: { uz: "Bolalar uchun BEPUL", en: "FREE for children", ru: "БЕСПЛАТНО для детей", ja: "子供は無料" } as Dict,
  feat_1_desc: {
    uz: "12 yoshgacha bolalarga yapon tili to'liq bepul o'rgatiladi",
    en: "Japanese language is taught completely free to children up to 12",
    ru: "Японский язык полностью бесплатно для детей до 12 лет",
    ja: "12歳までのお子様は日本語を完全無料で学べます",
  } as Dict,
  feat_2_title: { uz: "Yapon mutaxassislari", en: "Japanese specialists", ru: "Японские специалисты", ja: "日本人講師" } as Dict,
  feat_2_desc: {
    uz: "Darslarni Yaponiyalik tajribali ustozlar olib boradi",
    en: "Classes are conducted by experienced Japanese teachers",
    ru: "Занятия ведут опытные преподаватели из Японии",
    ja: "経験豊富な日本人講師が授業を行います",
  } as Dict,
  feat_3_title: { uz: "Chet el imkoniyati", en: "Abroad opportunity", ru: "Возможность за рубежом", ja: "海外チャンス" } as Dict,
  feat_3_desc: {
    uz: "Kelajakda Yaponiyada o'qish va ishlash imkoni",
    en: "Future opportunity to study and work in Japan",
    ru: "Возможность учиться и работать в Японии",
    ja: "将来日本で学び、働く機会",
  } as Dict,

  // About
  about_badge: { uz: "Biz haqimizda", en: "About us", ru: "О нас", ja: "私たちについて" } as Dict,
  about_title_1: { uz: "Yoshlarni", en: "We bring youth", ru: "Выводим молодёжь", ja: "若者を" } as Dict,
  about_title_2: { uz: "xalqaro darajaga", en: "to international level", ru: "на международный уровень", ja: "国際レベルへ" } as Dict,
  about_title_3: { uz: "olib chiqamiz", en: "", ru: "", ja: "導きます" } as Dict,
  about_desc: {
    uz: "KONOHA Yapon Maktabi — bu Farg'ona vodiysida zamonaviy ta'lim olishni istovchi yoshlar uchun ochilgan maxsus markaz. Bizda siz quyidagilarni o'rganasiz:",
    en: "KONOHA Japanese School is a special center for young people in the Fergana Valley who want to receive modern education. With us you will learn:",
    ru: "Японская школа KONOHA — это специальный центр для молодёжи Ферганской долины, желающей получить современное образование. У нас вы изучите:",
    ja: "KONOHA日本語学校は、現代的な教育を望むフェルガナ盆地の若者のための特別なセンターです。当校では以下を学べます:",
  } as Dict,
  about_item_1_t: { uz: "Yapon tili", en: "Japanese language", ru: "Японский язык", ja: "日本語" } as Dict,
  about_item_1_d: { uz: "Boshlang'ichdan ilg'or darajagacha", en: "From beginner to advanced level", ru: "От начального до продвинутого уровня", ja: "初級から上級まで" } as Dict,
  about_item_2_t: { uz: "Boshqa chet tillari", en: "Other foreign languages", ru: "Другие иностранные языки", ja: "その他の外国語" } as Dict,
  about_item_2_d: { uz: "Ingliz, koreys va boshqa tillar", en: "English, Korean and other languages", ru: "Английский, корейский и другие языки", ja: "英語、韓国語、その他の言語" } as Dict,
  about_item_3_t: { uz: "IT bilimlari", en: "IT knowledge", ru: "ИТ-знания", ja: "IT知識" } as Dict,
  about_item_3_d: { uz: "Zamonaviy texnologiyalar va dasturlash", en: "Modern technologies and programming", ru: "Современные технологии и программирование", ja: "最新技術とプログラミング" } as Dict,
  about_quote: {
    uz: "\"Bizning maqsadimiz — yoshlarni xalqaro darajaga olib chiqish va ularga dunyo eshiklarini ochish.\"",
    en: "\"Our goal is to bring youth to an international level and open the doors of the world to them.\"",
    ru: "\"Наша цель — вывести молодёжь на международный уровень и открыть для них двери мира.\"",
    ja: "「私たちの目標は、若者を国際的なレベルに引き上げ、世界の扉を開くことです。」",
  } as Dict,
  about_stat_students: { uz: "O'quvchilar", en: "Students", ru: "Ученики", ja: "生徒" } as Dict,
  about_stat_teachers: { uz: "Tajribali ustozlar", en: "Expert teachers", ru: "Опытные педагоги", ja: "経験豊富な教師" } as Dict,
  about_stat_directions: { uz: "Yo'nalish", en: "Directions", ru: "Направлений", ja: "方向" } as Dict,
  about_stat_quality: { uz: "Sifat kafolati", en: "Quality guarantee", ru: "Гарантия качества", ja: "品質保証" } as Dict,
  about_bridge: { uz: "Yaponiya bilan ko'prik", en: "Bridge with Japan", ru: "Мост с Японией", ja: "日本との架け橋" } as Dict,

  // Courses
  courses_badge: { uz: "Kurslar", en: "Courses", ru: "Курсы", ja: "コース" } as Dict,
  courses_title_1: { uz: "Sizga mos", en: "Choose the right", ru: "Выберите подходящее", ja: "あなたに合った" } as Dict,
  courses_title_2: { uz: "yo'nalishni", en: "direction", ru: "направление", ja: "方向を" } as Dict,
  courses_title_3: { uz: "tanlang", en: "for you", ru: "для себя", ja: "選んでください" } as Dict,
  courses_desc: {
    uz: "Har bir kurs zamonaviy metodika va tajribali ustozlar tomonidan olib boriladi.",
    en: "Each course is conducted using modern methodology by experienced teachers.",
    ru: "Каждый курс проводится по современной методике опытными преподавателями.",
    ja: "各コースは経験豊富な教師による最新の方法論で行われます。",
  } as Dict,
  course_audience: { uz: "Kimlar uchun:", en: "Audience:", ru: "Для кого:", ja: "対象:" } as Dict,
  course_duration: { uz: "Davomiyligi:", en: "Duration:", ru: "Длительность:", ja: "期間:" } as Dict,
  course_free: { uz: "BEPUL", en: "FREE", ru: "БЕСПЛАТНО", ja: "無料" } as Dict,
  course_register: { uz: "Ro'yxatdan o'tish", en: "Register", ru: "Записаться", ja: "登録する" } as Dict,

  c1_title: { uz: "Yapon tili — Bolalar", en: "Japanese — Children", ru: "Японский — Дети", ja: "日本語 — 子供" } as Dict,
  c1_desc: {
    uz: "Bolalarga yapon tilini o'yinlar va qiziqarli usullar orqali o'rgatamiz. Mahalliy va Yaponiyalik o'qituvchilar.",
    en: "We teach children Japanese through games and engaging methods. Local and Japanese teachers.",
    ru: "Учим детей японскому через игры и интересные методы. Местные и японские преподаватели.",
    ja: "ゲームや楽しい方法で子供たちに日本語を教えます。現地および日本人講師。",
  } as Dict,
  c1_aud: { uz: "6 — 12 yosh", en: "6 — 12 years", ru: "6 — 12 лет", ja: "6 — 12歳" } as Dict,
  c1_dur: { uz: "9 oy", en: "9 months", ru: "9 месяцев", ja: "9ヶ月" } as Dict,

  c2_title: { uz: "Yapon tili — Yoshlar", en: "Japanese — Youth", ru: "Японский — Молодёжь", ja: "日本語 — 若者" } as Dict,
  c2_desc: {
    uz: "JLPT N5–N3 darajalariga tayyorgarlik. Suhbat, yozma va o'qish ko'nikmalari.",
    en: "Preparation for JLPT N5–N3 levels. Speaking, writing and reading skills.",
    ru: "Подготовка к JLPT N5–N3. Разговорные, письменные навыки и чтение.",
    ja: "JLPT N5〜N3レベルの準備。会話、ライティング、リーディングスキル。",
  } as Dict,
  c2_aud: { uz: "13 yoshdan yuqori", en: "13+ years", ru: "От 13 лет", ja: "13歳以上" } as Dict,
  c2_dur: { uz: "12 oy", en: "12 months", ru: "12 месяцев", ja: "12ヶ月" } as Dict,

  c3_title: { uz: "IT asoslari", en: "IT Fundamentals", ru: "Основы ИТ", ja: "IT基礎" } as Dict,
  c3_desc: {
    uz: "Kompyuter savodxonligi, Web dasturlash asoslari, dizayn va sun'iy intellekt bilan tanishuv.",
    en: "Computer literacy, web programming basics, design and AI introduction.",
    ru: "Компьютерная грамотность, основы веб-программирования, дизайн и знакомство с ИИ.",
    ja: "コンピューターリテラシー、Webプログラミング基礎、デザイン、AI入門。",
  } as Dict,
  c3_aud: { uz: "12 yoshdan yuqori", en: "12+ years", ru: "От 12 лет", ja: "12歳以上" } as Dict,
  c3_dur: { uz: "6 oy", en: "6 months", ru: "6 месяцев", ja: "6ヶ月" } as Dict,

  c4_title: { uz: "Chet tillari", en: "Foreign Languages", ru: "Иностранные языки", ja: "外国語" } as Dict,
  c4_desc: {
    uz: "Ingliz va koreys tillari. Xalqaro imtihonlarga tayyorgarlik (IELTS, TOPIK).",
    en: "English and Korean. Preparation for international exams (IELTS, TOPIK).",
    ru: "Английский и корейский. Подготовка к международным экзаменам (IELTS, TOPIK).",
    ja: "英語と韓国語。国際試験(IELTS、TOPIK)の準備。",
  } as Dict,
  c4_aud: { uz: "10 yoshdan yuqori", en: "10+ years", ru: "От 10 лет", ja: "10歳以上" } as Dict,
  c4_dur: { uz: "8 — 12 oy", en: "8 — 12 months", ru: "8 — 12 месяцев", ja: "8〜12ヶ月" } as Dict,

  // Advantages
  adv_badge: { uz: "Afzalliklar", en: "Advantages", ru: "Преимущества", ja: "利点" } as Dict,
  adv_title_1: { uz: "Nima uchun", en: "Why", ru: "Почему", ja: "なぜ" } as Dict,
  adv_title_2: { uz: "KONOHA?", en: "KONOHA?", ru: "KONOHA?", ja: "KONOHA?" } as Dict,
  adv_desc: {
    uz: "Bizning afzalliklarimiz — sizning farzandingizning muvaffaqiyati.",
    en: "Our advantages are your child's success.",
    ru: "Наши преимущества — успех вашего ребёнка.",
    ja: "私たちの利点は、お子様の成功です。",
  } as Dict,
  adv_more: { uz: "Batafsil", en: "Learn more", ru: "Подробнее", ja: "詳細" } as Dict,

  adv_1_t: { uz: "Bepul ta'lim", en: "Free education", ru: "Бесплатное обучение", ja: "無料教育" } as Dict,
  adv_1_d: {
    uz: "12 yoshgacha bolalar uchun yapon tili kursi to'liq bepul.",
    en: "Japanese course is completely free for children up to 12 years old.",
    ru: "Курс японского полностью бесплатный для детей до 12 лет.",
    ja: "12歳までのお子様の日本語コースは完全無料。",
  } as Dict,
  adv_2_t: { uz: "Yapon mutaxassislari", en: "Japanese specialists", ru: "Японские специалисты", ja: "日本人専門家" } as Dict,
  adv_2_d: {
    uz: "Darslarni bevosita Yaponiyalik ona tilida so'zlashuvchi ustozlar olib boradi.",
    en: "Classes are taught directly by native Japanese-speaking teachers.",
    ru: "Занятия ведут носители японского языка из Японии.",
    ja: "ネイティブの日本人講師が直接授業を行います。",
  } as Dict,
  adv_3_t: { uz: "Amaliy darslar", en: "Practical lessons", ru: "Практические занятия", ja: "実践レッスン" } as Dict,
  adv_3_d: {
    uz: "Nazariya emas, real hayotda kerak bo'ladigan amaliy mahoratlarga e'tibor.",
    en: "Focus on practical skills needed in real life, not just theory.",
    ru: "Фокус на практических навыках, нужных в реальной жизни, а не теории.",
    ja: "理論だけでなく、実生活で必要な実践スキルに焦点を当てます。",
  } as Dict,
  adv_4_t: { uz: "Chet el imkoniyatlari", en: "International opportunities", ru: "Возможности за границей", ja: "海外の機会" } as Dict,
  adv_4_d: {
    uz: "Yaponiyada o'qish, ishlash va xalqaro almashinuv dasturlariga yo'l ochiladi.",
    en: "Opens path to study, work in Japan and international exchange programs.",
    ru: "Открывает путь к учёбе, работе в Японии и международным обменам.",
    ja: "日本での留学、就労、国際交流プログラムへの道を開きます。",
  } as Dict,
  adv_5_t: { uz: "Zamonaviy metodika", en: "Modern methodology", ru: "Современная методика", ja: "最新の方法論" } as Dict,
  adv_5_d: {
    uz: "Interaktiv darslar, video materiallar va eng yangi o'qitish texnologiyalari.",
    en: "Interactive lessons, video materials and the latest teaching technologies.",
    ru: "Интерактивные занятия, видеоматериалы и новейшие технологии обучения.",
    ja: "インタラクティブな授業、ビデオ教材、最新の指導技術。",
  } as Dict,
  adv_6_t: { uz: "Sertifikat", en: "Certificate", ru: "Сертификат", ja: "証明書" } as Dict,
  adv_6_d: {
    uz: "Kurs yakunida xalqaro standartlardagi sertifikat beriladi.",
    en: "An internationally standardized certificate is issued upon course completion.",
    ru: "По окончании курса выдаётся сертификат международного образца.",
    ja: "コース修了時に国際標準の証明書が発行されます。",
  } as Dict,

  // Contact
  contact_badge: { uz: "Aloqa", en: "Contact", ru: "Контакты", ja: "連絡先" } as Dict,
  contact_title_1: { uz: "Biz bilan", en: "Get in", ru: "Свяжитесь", ja: "お問い合わせ" } as Dict,
  contact_title_2: { uz: "bog'laning", en: "touch", ru: "с нами", ja: "ください" } as Dict,
  contact_desc: {
    uz: "Savollaringiz bo'lsa — qo'ng'iroq qiling yoki forma orqali murojaat qoldiring.",
    en: "If you have questions, call or leave a request through the form.",
    ru: "Если есть вопросы — позвоните или оставьте заявку через форму.",
    ja: "ご質問があれば、お電話またはフォームからお問い合わせください。",
  } as Dict,
  contact_address: { uz: "Manzil", en: "Address", ru: "Адрес", ja: "住所" } as Dict,
  contact_phone: { uz: "Telefon", en: "Phone", ru: "Телефон", ja: "電話" } as Dict,
  contact_hours: { uz: "Ish vaqti", en: "Working hours", ru: "Часы работы", ja: "営業時間" } as Dict,
  contact_hours_val: { uz: "Du–Sh: 9:00 — 19:00", en: "Mon–Sat: 9:00 — 19:00", ru: "Пн–Сб: 9:00 — 19:00", ja: "月〜土: 9:00 — 19:00" } as Dict,
  contact_form_title: { uz: "Xabar qoldiring", en: "Leave a message", ru: "Оставьте сообщение", ja: "メッセージを残す" } as Dict,
  contact_form_desc: {
    uz: "Biz tez orada siz bilan bog'lanamiz.",
    en: "We will contact you soon.",
    ru: "Мы скоро свяжемся с вами.",
    ja: "すぐにご連絡いたします。",
  } as Dict,
  field_name: { uz: "Ism", en: "Name", ru: "Имя", ja: "お名前" } as Dict,
  field_phone: { uz: "Telefon raqam", en: "Phone number", ru: "Номер телефона", ja: "電話番号" } as Dict,
  field_age: { uz: "Yosh", en: "Age", ru: "Возраст", ja: "年齢" } as Dict,
  field_fullname: { uz: "Ism familiya", en: "Full name", ru: "ФИО", ja: "氏名" } as Dict,
  field_course: { uz: "Kurs tanlash", en: "Choose course", ru: "Выбор курса", ja: "コース選択" } as Dict,
  placeholder_name: { uz: "Ismingizni kiriting", en: "Enter your name", ru: "Введите ваше имя", ja: "お名前を入力" } as Dict,
  placeholder_fullname: { uz: "Aliyev Ali", en: "John Smith", ru: "Иванов Иван", ja: "田中 太郎" } as Dict,
  btn_send: { uz: "Yuborish", en: "Send", ru: "Отправить", ja: "送信" } as Dict,
  msg_sending: { uz: "Yuborilmoqda...", en: "Sending...", ru: "Отправка...", ja: "送信中..." } as Dict,
  msg_sent: { uz: "✓ Xabaringiz yuborildi!", en: "✓ Your message was sent!", ru: "✓ Сообщение отправлено!", ja: "✓ メッセージが送信されました！" } as Dict,
  msg_error: {
    uz: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring yoki qo'ng'iroq qiling.",
    en: "An error occurred. Please try again or call.",
    ru: "Произошла ошибка. Попробуйте снова или позвоните.",
    ja: "エラーが発生しました。もう一度お試しいただくか、お電話ください。",
  } as Dict,

  // Modal
  modal_subtitle: {
    uz: "Ma'lumotlaringizni kiriting va biz bilan bog'laning.",
    en: "Enter your details and we'll get in touch.",
    ru: "Введите ваши данные, и мы свяжемся с вами.",
    ja: "詳細を入力してください。ご連絡いたします。",
  } as Dict,
  modal_success_title: { uz: "Tabriklaymiz!", en: "Congratulations!", ru: "Поздравляем!", ja: "おめでとうございます！" } as Dict,
  modal_success_desc: {
    uz: "Arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz.",
    en: "Your application has been received. We will contact you soon.",
    ru: "Ваша заявка принята. Мы скоро свяжемся с вами.",
    ja: "お申し込みを受け付けました。すぐにご連絡いたします。",
  } as Dict,
  modal_thanks: { uz: "Rahmat", en: "Thank you", ru: "Спасибо", ja: "ありがとうございます" } as Dict,
  modal_note: {
    uz: "Forma yuborilgach, mutaxassisimiz siz bilan bog'lanadi.",
    en: "After submission, our specialist will contact you.",
    ru: "После отправки наш специалист свяжется с вами.",
    ja: "送信後、当校の担当者がご連絡いたします。",
  } as Dict,

  // Marquee / extras
  bridge_jp: { uz: "Yaponiya bilan ko'prik", en: "Bridge with Japan", ru: "Мост с Японией", ja: "日本との架け橋" } as Dict,

  // Footer
  footer_cta_label: { uz: "Qabul ochildi", en: "Admission open", ru: "Приём открыт", ja: "募集中" } as Dict,
  footer_cta_title: {
    uz: "Bugun ariza qoldiring va kelajakni qo'lga oling!",
    en: "Apply today and seize the future!",
    ru: "Подайте заявку сегодня и обретите будущее!",
    ja: "今日申し込んで、未来をつかみましょう！",
  } as Dict,
  footer_about: {
    uz: "Bolalar va yoshlar uchun yapon tili, IT va boshqa chet tillarini o'rgatuvchi zamonaviy ta'lim markazi. Yaponiya bilan ko'prik.",
    en: "Modern educational center teaching Japanese, IT and other foreign languages for children and youth. Bridge with Japan.",
    ru: "Современный образовательный центр для детей и молодёжи: японский, ИТ и другие иностранные языки. Мост с Японией.",
    ja: "子供と若者に日本語、IT、その他の外国語を教える現代的な教育センター。日本との架け橋。",
  } as Dict,
  footer_dream: {
    uz: "Orzularni ro'yobga chiqaradigan joy",
    en: "A place where dreams come true",
    ru: "Место, где сбываются мечты",
    ja: "夢を実現する場所",
  } as Dict,
  footer_social: { uz: "Ijtimoiy tarmoqlar", en: "Social media", ru: "Социальные сети", ja: "ソーシャルメディア" } as Dict,
  footer_pages: { uz: "Sahifalar", en: "Pages", ru: "Страницы", ja: "ページ" } as Dict,
  footer_rights: {
    uz: "© 2026 KONOHA Yapon Maktabi. Barcha huquqlar himoyalangan.",
    en: "© 2026 KONOHA Japanese School. All rights reserved.",
    ru: "© 2026 Японская школа KONOHA. Все права защищены.",
    ja: "© 2026 KONOHA日本語学校。無断複写・転載を禁じます。",
  } as Dict,

  // Floating
  fab_register: { uz: "Yozilish", en: "Register", ru: "Записаться", ja: "登録" } as Dict,

  // Telegram-specific
  btn_send_telegram: {
    uz: "Telegram orqali yuborish",
    en: "Send via Telegram",
    ru: "Отправить через Telegram",
    ja: "Telegramで送信",
  } as Dict,
  telegram_hint: {
    uz: "Tugmani bosing — Telegram avtomatik ochiladi va siz bir bosish bilan ma'lumotlaringizni @KONOHA_UZ1 ga yuborasiz.",
    en: "Click the button — Telegram will open automatically and you'll send your details to @KONOHA_UZ1 with one tap.",
    ru: "Нажмите кнопку — Telegram откроется автоматически, и вы одним нажатием отправите данные на @KONOHA_UZ1.",
    ja: "ボタンをクリックすると、Telegramが自動的に開き、ワンタップで詳細を@KONOHA_UZ1に送信できます。",
  } as Dict,
  telegram_opened: {
    uz: "Telegram ochildi! Endi 'Yuborish' tugmasini bosing.",
    en: "Telegram opened! Now press 'Send'.",
    ru: "Telegram открыт! Теперь нажмите «Отправить».",
    ja: "Telegramが開きました！「送信」を押してください。",
  } as Dict,
  telegram_required: {
    uz: "Telegram dasturi kerak. O'rnatish uchun:",
    en: "Telegram app required. Install it from:",
    ru: "Требуется приложение Telegram. Установите:",
    ja: "Telegramアプリが必要です。インストール:",
  } as Dict,
  preview_label: {
    uz: "Yuboriladigan xabar (oldindan ko'rish):",
    en: "Message to be sent (preview):",
    ru: "Сообщение к отправке (предпросмотр):",
    ja: "送信されるメッセージ (プレビュー):",
  } as Dict,
  no_telegram: {
    uz: "Telegram yo'qmi? Bizga qo'ng'iroq qiling:",
    en: "No Telegram? Call us:",
    ru: "Нет Telegram? Позвоните нам:",
    ja: "Telegramがありませんか？お電話ください:",
  } as Dict,

  // Welcome popup
  popup_badge: {
    uz: "Maxsus taklif",
    en: "Special Offer",
    ru: "Специальное предложение",
    ja: "特別オファー",
  } as Dict,
  popup_title: {
    uz: "Qabul boshlandi! 🌸",
    en: "Admission is Open! 🌸",
    ru: "Приём открыт! 🌸",
    ja: "募集開始! 🌸",
  } as Dict,
  popup_subtitle: {
    uz: "12 yoshgacha bolalar uchun yapon tili — BEPUL!",
    en: "Japanese language is FREE for children up to 12!",
    ru: "Японский язык БЕСПЛАТНО для детей до 12 лет!",
    ja: "12歳までのお子様の日本語は無料です!",
  } as Dict,
  popup_desc: {
    uz: "Yapon mutaxassislari bilan bevosita darslar. Joylar cheklangan — bugun ro'yxatdan o'ting!",
    en: "Direct lessons with Japanese specialists. Limited spots — register today!",
    ru: "Прямые занятия с японскими специалистами. Места ограничены — регистрируйтесь сегодня!",
    ja: "日本人専門家による直接レッスン。席数限定 — 今日登録!",
  } as Dict,
  popup_btn: {
    uz: "Hoziroq ro'yxatdan o'tish",
    en: "Register right now",
    ru: "Зарегистрироваться сейчас",
    ja: "今すぐ登録",
  } as Dict,
  popup_later: {
    uz: "Keyinroq",
    en: "Maybe later",
    ru: "Позже",
    ja: "後で",
  } as Dict,
  popup_perk_1: {
    uz: "BEPUL kurs (12 yoshgacha)",
    en: "FREE course (under 12)",
    ru: "БЕСПЛАТНЫЙ курс (до 12 лет)",
    ja: "無料コース (12歳まで)",
  } as Dict,
  popup_perk_2: {
    uz: "Yapon ustozlari",
    en: "Japanese teachers",
    ru: "Японские преподаватели",
    ja: "日本人講師",
  } as Dict,
  popup_perk_3: {
    uz: "Sertifikat",
    en: "Certificate",
    ru: "Сертификат",
    ja: "証明書",
  } as Dict,
  popup_starts: {
    uz: "Darslar 20-maydan",
    en: "Classes start May 20",
    ru: "Занятия с 20 мая",
    ja: "授業は5月20日から",
  } as Dict,

  // "Batafsil" / Canva prezentatsiya
  more_info: {
    uz: "Maktab va ish haqida batafsil",
    en: "Detailed info about school & work",
    ru: "Подробно о школе и работе",
    ja: "学校と仕事についての詳細",
  } as Dict,
  more_info_short: {
    uz: "Batafsil ma'lumot",
    en: "Learn more",
    ru: "Подробнее",
    ja: "詳細を見る",
  } as Dict,
  more_info_subtitle: {
    uz: "Bizning maktabimiz, kurslarimiz va kelajak imkoniyatlari haqida to'liq taqdimot",
    en: "Full presentation about our school, courses and future opportunities",
    ru: "Полная презентация о нашей школе, курсах и будущих возможностях",
    ja: "学校、コース、将来の機会に関する完全なプレゼンテーション",
  } as Dict,
  more_info_open_new: {
    uz: "Yangi oynada ochish",
    en: "Open in new tab",
    ru: "Открыть в новой вкладке",
    ja: "新しいタブで開く",
  } as Dict,
  more_info_loading: {
    uz: "Yuklanmoqda...",
    en: "Loading...",
    ru: "Загрузка...",
    ja: "読み込み中...",
  } as Dict,
  more_info_section_title: {
    uz: "Maktab haqida ko'proq bilmoqchimisiz?",
    en: "Want to know more about the school?",
    ru: "Хотите узнать больше о школе?",
    ja: "学校についてもっと知りたいですか？",
  } as Dict,
  more_info_section_desc: {
    uz: "Bizning maktabimiz, ustozlarimiz, kurslarimiz va kelajak imkoniyatlari haqida to'liq taqdimotni ko'ring.",
    en: "View the full presentation about our school, teachers, courses and future opportunities.",
    ru: "Посмотрите полную презентацию о нашей школе, преподавателях, курсах и будущих возможностях.",
    ja: "私たちの学校、教師、コース、将来の機会に関する完全なプレゼンテーションをご覧ください。",
  } as Dict,
};

export type TKey = keyof typeof t;

export function tr(key: TKey, lang: Lang): string {
  return t[key]?.[lang] ?? t[key]?.uz ?? key;
}
