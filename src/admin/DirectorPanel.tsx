import { useMemo, useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Button, Card, EmptyState, Input, Modal, Select, StatCard, TextArea, Badge, useConfirm } from "./ui";
import { loadDB, saveDB, addUser, addStudent, addPayment, addNews, deleteItem, helpers, paymentStatus, ratingColor, ratingLabel } from "./db";
import type { AppDB, Role } from "./types";
import { useLang } from "../i18n/LangContext";
import type { Lang } from "../i18n/translations";

interface Props { onBackToSite: () => void; }

const T: Record<string, Record<Lang, string>> = {
  nav_dashboard: { uz: "Bosh sahifa", en: "Dashboard", ru: "Главная", ja: "ダッシュボード" },
  nav_students: { uz: "O'quvchilar", en: "Students", ru: "Ученики", ja: "生徒" },
  nav_teachers: { uz: "Ustozlar", en: "Teachers", ru: "Учителя", ja: "先生方" },
  nav_parents: { uz: "Ota-onalar", en: "Parents", ru: "Родители", ja: "保護者" },
  nav_courses: { uz: "Kurslar", en: "Courses", ru: "Курсы", ja: "コース" },
  nav_payments: { uz: "To'lovlar", en: "Payments", ru: "Платежи", ja: "支払い" },
  nav_rating: { uz: "Reyting", en: "Rating", ru: "Рейтинг", ja: "ランキング" },
  nav_news: { uz: "Yangiliklar", en: "News", ru: "Новости", ja: "ニュース" },
  panel_title: { uz: "Direktor paneli", en: "Director Panel", ru: "Панель директора", ja: "校長パネル" },
  dash_title: { uz: "Boshqaruv panel", en: "Dashboard", ru: "Панель управления", ja: "管理パネル" },
  dash_subtitle: { uz: "Maktab umumiy ko'rinishi", en: "School overview", ru: "Общий вид школы", ja: "学校の概要" },
  total_revenue: { uz: "Jami tushum", en: "Total Revenue", ru: "Всего доходов", ja: "総収入" },
  total_debt: { uz: "Jami qarz", en: "Total Debt", ru: "Общий долг", ja: "総負債" },
  from_all: { uz: "Hammasidan", en: "From all", ru: "От всех", ja: "全員から" },
  top_students: { uz: "Top o'quvchilar", en: "Top Students", ru: "Лучшие ученики", ja: "トップ生徒" },
  latest_news: { uz: "So'nggi yangiliklar", en: "Latest News", ru: "Последние новости", ja: "最新ニュース" },
  no_students: { uz: "O'quvchilar yo'q", en: "No students", ru: "Нет учеников", ja: "生徒なし" },
  no_news: { uz: "Yangiliklar yo'q", en: "No news", ru: "Нет новостей", ja: "ニュースなし" },
  students_title: { uz: "O'quvchilar", en: "Students", ru: "Ученики", ja: "生徒一覧" },
  total_count: { uz: "Jami", en: "Total", ru: "Всего", ja: "合計" },
  add_student: { uz: "+ Yangi o'quvchi", en: "+ New Student", ru: "+ Новый ученик", ja: "+ 新しい生徒" },
  search_placeholder: { uz: "🔍 Ism yoki telefon bo'yicha qidirish...", en: "🔍 Search by name or phone...", ru: "🔍 Поиск по имени или телефону...", ja: "🔍 検索..." },
  add_student_title: { uz: "Yangi o'quvchi qo'shish", en: "Add New Student", ru: "Добавить ученика", ja: "新しい生徒を追加" },
  no_students_desc: { uz: "Yangi o'quvchi qo'shing", en: "Add a new student", ru: "Добавьте ученика", ja: "生徒を追加してください" },
  fullname: { uz: "F.I.Sh", en: "Full Name", ru: "ФИО", ja: "氏名" },
  age: { uz: "Yosh", en: "Age", ru: "Возраст", ja: "年齢" },
  phone: { uz: "Telefon", en: "Phone", ru: "Телефон", ja: "電話番号" },
  parent_phone: { uz: "Ota-ona telefoni", en: "Parent Phone", ru: "Телефон родителя", ja: "保護者の電話番号" },
  course: { uz: "Kurs", en: "Course", ru: "Курс", ja: "コース" },
  note: { uz: "Izoh", en: "Note", ru: "Заметка", ja: "メモ" },
  add_btn: { uz: "Qo'shish", en: "Add", ru: "Добавить", ja: "追加" },
  cancel: { uz: "Bekor qilish", en: "Cancel", ru: "Отмена", ja: "キャンセル" },
  delete: { uz: "O'chirish", en: "Delete", ru: "Удалить", ja: "削除" },
  col_name: { uz: "F.I.Sh", en: "Full Name", ru: "ФИО", ja: "氏名" },
  col_age: { uz: "Yosh", en: "Age", ru: "Возраст", ja: "年齢" },
  col_phone: { uz: "Telefon", en: "Phone", ru: "Телефон", ja: "電話" },
  col_course: { uz: "Kurs", en: "Course", ru: "Курс", ja: "コース" },
  col_rating: { uz: "Reyting", en: "Rating", ru: "Рейтинг", ja: "評価" },
  col_debt: { uz: "Qarz", en: "Debt", ru: "Долг", ja: "負債" },
  no_debt: { uz: "Yo'q", en: "None", ru: "Нет", ja: "なし" },
  confirm_delete_student: { uz: "O'quvchini o'chirishga ishonchingiz komilmi?", en: "Delete this student?", ru: "Удалить ученика?", ja: "この生徒を削除しますか？" },
  no_yet: { uz: "Hozircha yo'q", en: "None yet", ru: "Пока нет", ja: "まだなし" },
  add_teacher: { uz: "+ Yangi ustoz", en: "+ New Teacher", ru: "+ Новый учитель", ja: "+ 新しい先生" },
  add_parent: { uz: "+ Yangi ota-ona", en: "+ New Parent", ru: "+ Новый родитель", ja: "+ 新しい保護者" },
  new_teacher_title: { uz: "Yangi ustoz hisobi", en: "New Teacher Account", ru: "Новый аккаунт учителя", ja: "新しい先生アカウント" },
  new_parent_title: { uz: "Yangi ota-ona hisobi", en: "New Parent Account", ru: "Новый аккаунт родителя", ja: "新しい保護者アカウント" },
  login: { uz: "Login", en: "Login", ru: "Логин", ja: "ログイン" },
  password: { uz: "Parol", en: "Password", ru: "Пароль", ja: "パスワード" },
  generate: { uz: "🎲 Yaratish", en: "🎲 Generate", ru: "🎲 Создать", ja: "🎲 生成" },
  random_pass_hint: { uz: "Tasodifiy parol uchun \"Yaratish\" tugmasini bosing", en: "Click \"Generate\" for a random password", ru: "Нажмите «Создать» для случайного пароля", ja: "ランダムパスワードには「生成」をクリック" },
  children: { uz: "Farzand(lar)i", en: "Children", ru: "Дети", ja: "子ども" },
  add_students_first: { uz: "Avval o'quvchilarni qo'shing", en: "Add students first", ru: "Сначала добавьте учеников", ja: "先に生徒を追加してください" },
  create_account: { uz: "✓ Hisob yaratish", en: "✓ Create Account", ru: "✓ Создать аккаунт", ja: "✓ アカウント作成" },
  account_created: { uz: "✅ Hisob yaratildi!", en: "✅ Account Created!", ru: "✅ Аккаунт создан!", ja: "✅ アカウント作成完了！" },
  creds_for: { uz: "uchun login ma'lumotlari yaratildi", en: "account credentials created", ru: "данные аккаунта созданы", ja: "アカウント情報が作成されました" },
  site_address: { uz: "Sayt manzili", en: "Site address", ru: "Адрес сайта", ja: "サイトアドレス" },
  warning_share: { uz: "Bu ma'lumotlarni hisob egasiga yetkazib bering.", en: "Share these credentials with the account owner.", ru: "Передайте эти данные владельцу аккаунта.", ja: "このデータをアカウントオーナーに渡してください。" },
  copy_creds: { uz: "📋 Ma'lumotlarni nusxa olish", en: "📋 Copy Credentials", ru: "📋 Копировать данные", ja: "📋 認証情報をコピー" },
  copied: { uz: "✓ Nusxa olindi!", en: "✓ Copied!", ru: "✓ Скопировано!", ja: "✓ コピーしました！" },
  close: { uz: "Yopish", en: "Close", ru: "Закрыть", ja: "閉じる" },
  login_taken: { uz: "Bu login band! Boshqasini tanlang.", en: "This login is taken!", ru: "Этот логин занят!", ja: "このログインは使用中です！" },
  confirm_delete_user: { uz: "O'chirishga ishonchingiz komilmi?", en: "Are you sure?", ru: "Вы уверены?", ja: "本当に削除しますか？" },
  show: { uz: "Ko'rsatish", en: "Show", ru: "Показать", ja: "表示" },
  hide: { uz: "Yashirish", en: "Hide", ru: "Скрыть", ja: "非表示" },
  password_label: { uz: "Parol:", en: "Password:", ru: "Пароль:", ja: "パスワード：" },
  course_label: { uz: "Kurs:", en: "Course:", ru: "Курс:", ja: "コース：" },
  children_label: { uz: "Farzandlari:", en: "Children:", ru: "Дети:", ja: "子ども：" },
  teacher_no_desc: { uz: "Yangi ustoz qo'shing", en: "Add a new teacher", ru: "Добавьте нового учителя", ja: "新しい先生を追加" },
  parent_no_desc: { uz: "Yangi ota-ona qo'shing", en: "Add a new parent", ru: "Добавьте нового родителя", ja: "新しい保護者を追加" },
  courses_title: { uz: "Kurslar", en: "Courses", ru: "Курсы", ja: "コース一覧" },
  courses_subtitle: { uz: "Maktab kurslari ro'yxati", en: "School courses list", ru: "Список курсов школы", ja: "学校コース一覧" },
  add_course: { uz: "+ Yangi kurs", en: "+ New Course", ru: "+ Новый курс", ja: "+ 新しいコース" },
  new_course_title: { uz: "Yangi kurs", en: "New Course", ru: "Новый курс", ja: "新しいコース" },
  course_name: { uz: "Kurs nomi", en: "Course Name", ru: "Название курса", ja: "コース名" },
  monthly_fee: { uz: "Oylik to'lov (so'm)", en: "Monthly Fee (UZS)", ru: "Ежемесячная плата", ja: "月謝" },
  description: { uz: "Tavsif", en: "Description", ru: "Описание", ja: "説明" },
  free: { uz: "BEPUL", en: "FREE", ru: "БЕСПЛАТНО", ja: "無料" },
  teacher_label: { uz: "Ustoz:", en: "Teacher:", ru: "Учитель:", ja: "先生：" },
  students_label: { uz: "O'quvchilar:", en: "Students:", ru: "Ученики:", ja: "生徒：" },
  per_month: { uz: "/oy", en: "/mo", ru: "/мес", ja: "/月" },
  payments_title: { uz: "To'lovlar", en: "Payments", ru: "Платежи", ja: "支払い一覧" },
  add_payment: { uz: "+ To'lov qo'shish", en: "+ Add Payment", ru: "+ Добавить платёж", ja: "+ 支払い追加" },
  new_payment_title: { uz: "Yangi to'lov", en: "New Payment", ru: "Новый платёж", ja: "新しい支払い" },
  student_label: { uz: "O'quvchi", en: "Student", ru: "Ученик", ja: "生徒" },
  amount: { uz: "Summa (so'm)", en: "Amount (UZS)", ru: "Сумма (сум)", ja: "金額" },
  month: { uz: "Oy (yyyy-mm)", en: "Month (yyyy-mm)", ru: "Месяц (yyyy-mm)", ja: "月（yyyy-mm）" },
  paid_months: { uz: "To'langan oylar:", en: "Paid months:", ru: "Оплаченных месяцев:", ja: "支払い済み月：" },
  debt: { uz: "Qarz:", en: "Debt:", ru: "Долг:", ja: "負債：" },
  next_payment: { uz: "Keyingi to'lov:", en: "Next payment:", ru: "Следующий платёж:", ja: "次の支払い：" },
  payment_history: { uz: "📋 To'lovlar tarixi", en: "📋 Payment History", ru: "📋 История платежей", ja: "📋 支払い履歴" },
  date: { uz: "Sana", en: "Date", ru: "Дата", ja: "日付" },
  accept_payment: { uz: "To'lovni qabul qilish", en: "Accept Payment", ru: "Принять платёж", ja: "支払いを受け取る" },
  rating_title: { uz: "🏆 Reyting", en: "🏆 Rating", ru: "🏆 Рейтинг", ja: "🏆 ランキング" },
  rating_subtitle: { uz: "O'quvchilarning umumiy o'rin tartibi", en: "Overall student ranking", ru: "Общий рейтинг учеников", ja: "生徒の総合ランキング" },
  no_rating: { uz: "Reyting yo'q", en: "No ratings yet", ru: "Рейтинг пуст", ja: "ランキングなし" },
  col_score: { uz: "Ball", en: "Score", ru: "Балл", ja: "スコア" },
  col_level: { uz: "Daraja", en: "Level", ru: "Уровень", ja: "レベル" },
  col_grades: { uz: "Baho soni", en: "Grade count", ru: "Кол-во оценок", ja: "評価数" },
  news_title: { uz: "📰 Yangiliklar", en: "📰 News", ru: "📰 Новости", ja: "📰 ニュース" },
  news_subtitle: { uz: "Saytda chiqadigan yangiliklar", en: "News published on the site", ru: "Новости сайта", ja: "サイトのニュース" },
  add_news: { uz: "+ Yangi yangilik", en: "+ New Post", ru: "+ Новая новость", ja: "+ 新しい投稿" },
  new_news_title: { uz: "Yangi yangilik", en: "New Post", ru: "Новая новость", ja: "新しい投稿" },
  news_headline: { uz: "Sarlavha", en: "Headline", ru: "Заголовок", ja: "見出し" },
  news_body: { uz: "Matn", en: "Body", ru: "Текст", ja: "本文" },
  publish: { uz: "E'lon qilish", en: "Publish", ru: "Опубликовать", ja: "公開する" },
  confirm_delete_news: { uz: "O'chirishga ishonchingiz komilmi?", en: "Are you sure to delete?", ru: "Удалить?", ja: "削除しますか？" },
};

function useT() {
  const { lang } = useLang();
  return (key: keyof typeof T) => T[key]?.[lang] ?? T[key]?.uz ?? key;
}

export default function DirectorPanel({ onBackToSite }: Props) {
  const [tab, setTab] = useState("dashboard");
  const [db, setDB] = useState<AppDB>(loadDB());
  const t = useT();

  const navItems = [
    { id: "dashboard", label: t("nav_dashboard"), icon: "📊" },
    { id: "students", label: t("nav_students"), icon: "🎓" },
    { id: "teachers", label: t("nav_teachers"), icon: "👨‍🏫" },
    { id: "parents", label: t("nav_parents"), icon: "👨‍👩‍👧" },
    { id: "courses", label: t("nav_courses"), icon: "📚" },
    { id: "payments", label: t("nav_payments"), icon: "💰" },
    { id: "rating", label: t("nav_rating"), icon: "🏆" },
    { id: "news", label: t("nav_news"), icon: "📰" },
  ];

  const refresh = async () => {
    const { syncFromCloud } = await import("./db");
    await syncFromCloud();
    setDB({ ...loadDB() });
  };

  useEffect(() => { refresh(); }, []);

  return (
    <AdminLayout title={t("panel_title")} navItems={navItems} activeTab={tab} onTabChange={setTab} onBackToSite={onBackToSite}>
      {tab === "dashboard" && <Dashboard db={db} />}
      {tab === "students" && <StudentsTab db={db} refresh={refresh} />}
      {tab === "teachers" && <UsersTab db={db} refresh={refresh} role="teacher" />}
      {tab === "parents" && <UsersTab db={db} refresh={refresh} role="parent" />}
      {tab === "courses" && <CoursesTab db={db} refresh={refresh} />}
      {tab === "payments" && <PaymentsTab db={db} refresh={refresh} />}
      {tab === "rating" && <RatingTab db={db} />}
      {tab === "news" && <NewsTab db={db} refresh={refresh} />}
    </AdminLayout>
  );
}

function Dashboard({ db }: { db: AppDB }) {
  const t = useT();
  const totalRevenue = db.payments.reduce((s, p) => s + p.amount, 0);
  const totalDebt = db.students.reduce((s, st) => {
    const c = db.courses.find((x) => x.id === st.courseId);
    if (!c) return s;
    return s + paymentStatus(st.id, c.monthlyFee, db.payments, st.joinedAt).debt;
  }, 0);
  const topStudents = [...db.students].sort((a, b) => b.rating - a.rating).slice(0, 5);
  return (
    <div className="space-y-6">
      <div>
        <div className="font-jp text-konoha-red text-xs font-bold tracking-[0.3em]">ダッシュボード</div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">{t("dash_title")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("dash_subtitle")}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🎓" label={t("nav_students")} value={db.students.length} color="from-konoha-red to-sakura-600" />
        <StatCard icon="👨‍🏫" label={t("nav_teachers")} value={db.users.filter((u) => u.role === "teacher").length} color="from-blue-500 to-blue-700" />
        <StatCard icon="👨‍👩‍👧" label={t("nav_parents")} value={db.users.filter((u) => u.role === "parent").length} color="from-emerald-500 to-emerald-700" />
        <StatCard icon="📚" label={t("nav_courses")} value={db.courses.length} color="from-purple-500 to-purple-700" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatCard icon="💰" label={t("total_revenue")} value={helpers.formatMoney(totalRevenue)} color="from-emerald-500 to-emerald-700" hint={`${db.payments.length} ta`} />
        <StatCard icon="⚠️" label={t("total_debt")} value={helpers.formatMoney(totalDebt)} color="from-red-500 to-red-700" hint={t("from_all")} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-bold text-gray-900 mb-4">🏆 {t("top_students")}</h3>
          {topStudents.length === 0 ? <EmptyState icon="🎓" title={t("no_students")} /> : (
            <div className="space-y-2">
              {topStudents.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-sakura-50 to-white border border-sakura-100">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white ${i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-orange-600" : "bg-sakura-300"}`}>{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">{s.fullName}</div>
                    <div className="text-xs text-gray-500">{db.courses.find((c) => c.id === s.courseId)?.name}</div>
                  </div>
                  <div className={`text-lg font-black ${ratingColor(s.rating)}`}>{s.rating || "—"}</div>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card className="p-5">
          <h3 className="font-bold text-gray-900 mb-4">📰 {t("latest_news")}</h3>
          {db.news.length === 0 ? <EmptyState icon="📰" title={t("no_news")} /> : (
            <div className="space-y-3">
              {db.news.slice(0, 4).map((n) => (
                <div key={n.id} className="p-3 rounded-xl border border-sakura-100 hover:border-konoha-red transition-colors">
                  <div className="font-semibold text-gray-900 text-sm">{n.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{helpers.formatDate(n.createdAt)}</div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function StudentsTab({ db, refresh }: { db: AppDB; refresh: () => void }) {
  const t = useT();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ fullName: "", age: "", phone: "", parentPhone: "", courseId: db.courses[0]?.id || "", notes: "" });
  const [search, setSearch] = useState("");
  const confirm = useConfirm();
  const filtered = useMemo(() => { const q = search.toLowerCase(); return db.students.filter((s) => s.fullName.toLowerCase().includes(q) || s.phone.includes(q)); }, [db.students, search]);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cur = loadDB();
    addStudent(cur, { fullName: form.fullName, age: parseInt(form.age), phone: form.phone, parentPhone: form.parentPhone, courseId: form.courseId, notes: form.notes });
    setShowAdd(false); setForm({ fullName: "", age: "", phone: "", parentPhone: "", courseId: db.courses[0]?.id || "", notes: "" }); refresh();
  };
  const remove = (id: string) => { if (!confirm(t("confirm_delete_student"))) return; const cur = loadDB(); deleteItem(cur, "students", id); refresh(); };
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-black text-gray-900">{t("students_title")}</h1><p className="text-sm text-gray-500 mt-1">{t("total_count")}: {db.students.length}</p></div>
        <Button onClick={() => setShowAdd(true)}>{t("add_student")}</Button>
      </div>
      <Card className="p-3"><input placeholder={t("search_placeholder")} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-sakura-50/40 border border-sakura-100 focus:border-konoha-red focus:outline-none text-sm" /></Card>
      {filtered.length === 0 ? <Card className="p-8"><EmptyState icon="🎓" title={t("no_students")} desc={t("no_students_desc")} /></Card> : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-sakura-50/60"><tr className="text-left">
              <th className="p-3 font-bold text-gray-700">{t("col_name")}</th>
              <th className="p-3 font-bold text-gray-700">{t("col_age")}</th>
              <th className="p-3 font-bold text-gray-700 hidden md:table-cell">{t("col_phone")}</th>
              <th className="p-3 font-bold text-gray-700 hidden lg:table-cell">{t("col_course")}</th>
              <th className="p-3 font-bold text-gray-700">{t("col_rating")}</th>
              <th className="p-3 font-bold text-gray-700 hidden md:table-cell">{t("col_debt")}</th>
              <th className="p-3"></th>
            </tr></thead>
            <tbody>{filtered.map((s) => { const c = db.courses.find((x) => x.id === s.courseId); const ps = c ? paymentStatus(s.id, c.monthlyFee, db.payments, s.joinedAt) : { debt: 0 }; return (
              <tr key={s.id} className="border-t border-sakura-50 hover:bg-sakura-50/30">
                <td className="p-3 font-semibold text-gray-900">{s.fullName}</td>
                <td className="p-3 text-gray-700">{s.age}</td>
                <td className="p-3 text-gray-700 hidden md:table-cell">{s.phone}</td>
                <td className="p-3 text-gray-700 hidden lg:table-cell text-xs">{c?.name || "—"}</td>
                <td className="p-3"><span className={`font-bold ${ratingColor(s.rating)}`}>{s.rating || "—"}</span></td>
                <td className="p-3 hidden md:table-cell">{ps.debt > 0 ? <Badge color="red">{helpers.formatMoney(ps.debt)}</Badge> : <Badge color="green">{t("no_debt")}</Badge>}</td>
                <td className="p-3"><Button variant="danger" size="sm" onClick={() => remove(s.id)}>✕</Button></td>
              </tr>);})}</tbody>
          </table>
        </Card>
      )}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title={t("add_student_title")}>
        <form onSubmit={submit} className="space-y-4">
          <Input label={t("fullname")} value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} required />
          <div className="grid grid-cols-2 gap-3">
            <Input label={t("age")} type="number" min={5} max={70} value={form.age} onChange={(v) => setForm({ ...form, age: v })} required />
            <Input label={t("phone")} type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+998..." required />
          </div>
          <Input label={t("parent_phone")} type="tel" value={form.parentPhone} onChange={(v) => setForm({ ...form, parentPhone: v })} placeholder="+998..." />
          <Select label={t("course")} value={form.courseId} onChange={(v) => setForm({ ...form, courseId: v })} options={db.courses.map((c) => ({ value: c.id, label: c.name }))} required />
          <TextArea label={t("note")} value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} rows={2} />
          <div className="flex gap-2 justify-end pt-2"><Button variant="ghost" onClick={() => setShowAdd(false)}>{t("cancel")}</Button><Button type="submit">{t("add_btn")}</Button></div>
        </form>
      </Modal>
    </div>
  );
}

function UsersTab({ db, refresh, role }: { db: AppDB; refresh: () => void; role: Role }) {
  const t = useT();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ fullName: "", username: "", password: "", phone: "", courseId: db.courses[0]?.id || "", childrenIds: [] as string[] });
  const [revealId, setRevealId] = useState<string | null>(null);
  const [createdCreds, setCreatedCreds] = useState<{ login: string; password: string; name: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const confirm = useConfirm();
  const list = db.users.filter((u) => u.role === role);
  const genPassword = () => { const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"; let p = ""; for (let i = 0; i < 8; i++) p += chars[Math.floor(Math.random() * chars.length)]; setForm((f) => ({ ...f, password: p })); };
  const suggestLogin = (fullName: string) => { const base = fullName.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim().split(/\s+/).slice(0, 2).join("."); if (base) setForm((f) => ({ ...f, username: base + Math.floor(Math.random() * 99) })); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); const cur = loadDB();
    if (cur.users.some((u) => u.username.toLowerCase() === form.username.toLowerCase())) { alert(t("login_taken")); return; }
    addUser(cur, { fullName: form.fullName, username: form.username, password: form.password, phone: form.phone, role, courseId: role === "teacher" ? form.courseId : undefined, childrenIds: role === "parent" ? form.childrenIds : undefined });
    setCreatedCreds({ login: form.username, password: form.password, name: form.fullName });
    setShowAdd(false); setForm({ fullName: "", username: "", password: "", phone: "", courseId: db.courses[0]?.id || "", childrenIds: [] }); refresh();
  };
  const remove = (id: string) => { if (!confirm(t("confirm_delete_user"))) return; const cur = loadDB(); deleteItem(cur, "users", id); refresh(); };
  const toggleChild = (id: string) => { setForm((f) => ({ ...f, childrenIds: f.childrenIds.includes(id) ? f.childrenIds.filter((x) => x !== id) : [...f.childrenIds, id] })); };
  const copyCreds = (login: string, password: string, name: string) => { const text = `KONOHA — kirish ma'lumotlari\n\n${name}\nLogin: ${login}\nParol: ${password}\n\nkonoha-school.com/#admin`; navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  const title = role === "teacher" ? t("nav_teachers") : t("nav_parents");
  const addLabel = role === "teacher" ? t("add_teacher") : t("add_parent");
  const modalTitle = role === "teacher" ? t("new_teacher_title") : t("new_parent_title");
  const noDesc = role === "teacher" ? t("teacher_no_desc") : t("parent_no_desc");
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-black text-gray-900">{title}</h1><p className="text-sm text-gray-500 mt-1">{t("total_count")}: {list.length}</p></div>
        <Button onClick={() => setShowAdd(true)}>{addLabel}</Button>
      </div>
      {list.length === 0 ? <Card className="p-8"><EmptyState icon={role === "teacher" ? "👨‍🏫" : "👨‍👩‍👧"} title={t("no_yet")} desc={noDesc} /></Card> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((u) => { const course = db.courses.find((c) => c.id === u.courseId); const children = db.students.filter((s) => u.childrenIds?.includes(s.id)); const revealed = revealId === u.id; return (
            <Card key={u.id} className="p-5 hover:-translate-y-1 transition-transform">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ${role === "teacher" ? "bg-gradient-to-br from-blue-500 to-blue-700" : "bg-gradient-to-br from-emerald-500 to-emerald-700"}`}>{u.fullName.charAt(0)}</div>
                <div className="flex-1 min-w-0"><div className="font-bold text-gray-900 truncate">{u.fullName}</div><div className="text-xs text-gray-500">@{u.username}</div>{u.phone && <div className="text-xs text-gray-500 mt-0.5">{u.phone}</div>}</div>
              </div>
              {course && <div className="mt-3 text-xs text-gray-600"><b>{t("course_label")}</b> {course.name}</div>}
              {children.length > 0 && <div className="mt-2 text-xs text-gray-600"><b>{t("children_label")}</b> {children.map((c) => c.fullName).join(", ")}</div>}
              <div className="mt-3 p-2 rounded-lg bg-sakura-50/50 border border-sakura-100 flex items-center gap-2">
                <span className="text-xs text-gray-500 flex-shrink-0">{t("password_label")}</span>
                <code className="flex-1 text-xs font-mono text-gray-800 truncate">{revealed ? u.password : "••••••••"}</code>
                <button onClick={() => setRevealId(revealed ? null : u.id)} className="text-konoha-red hover:scale-110 transition-transform" title={revealed ? t("hide") : t("show")}>{revealed ? "🙈" : "👁️"}</button>
                <button onClick={() => copyCreds(u.username, u.password, u.fullName)} className="text-konoha-red hover:scale-110 transition-transform">📋</button>
              </div>
              <div className="mt-3 flex gap-2 justify-end"><Button variant="danger" size="sm" onClick={() => remove(u.id)}>{t("delete")}</Button></div>
            </Card>);
          })}
        </div>
      )}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title={modalTitle}>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">{t("fullname")} *</label><input type="text" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} onBlur={() => !form.username && suggestLogin(form.fullName)} placeholder="Aliyev Vali" className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none text-sm" /></div>
          <div><label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">{t("login")} *</label><input type="text" required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="aliyev.vali" className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none text-sm font-mono" /></div>
          <div><label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">{t("password")} *</label><div className="flex gap-2"><input type="text" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="flex-1 px-4 py-2.5 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none text-sm font-mono" /><Button type="button" variant="outline" onClick={genPassword}>{t("generate")}</Button></div><p className="text-xs text-gray-500 mt-1">{t("random_pass_hint")}</p></div>
          <Input label={t("phone")} type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+998..." />
          {role === "teacher" && db.courses.length > 0 && <Select label={t("course")} value={form.courseId} onChange={(v) => setForm({ ...form, courseId: v })} options={db.courses.map((c) => ({ value: c.id, label: c.name }))} required />}
          {role === "parent" && (<div><label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">{t("children")}</label><div className="max-h-40 overflow-y-auto space-y-1 p-2 rounded-xl border border-sakura-100">{db.students.length === 0 ? <div className="text-sm text-gray-400 p-2">{t("add_students_first")}</div> : db.students.map((s) => (<label key={s.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-sakura-50 cursor-pointer"><input type="checkbox" checked={form.childrenIds.includes(s.id)} onChange={() => toggleChild(s.id)} /><span className="text-sm">{s.fullName}</span></label>))}</div></div>)}
          <div className="flex gap-2 justify-end pt-2"><Button variant="ghost" onClick={() => setShowAdd(false)}>{t("cancel")}</Button><Button type="submit">{t("create_account")}</Button></div>
        </form>
      </Modal>
      <Modal open={!!createdCreds} onClose={() => setCreatedCreds(null)} title={t("account_created")} width="max-w-md">
        {createdCreds && (<div className="space-y-4">
          <div className="text-center"><div className="inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 items-center justify-center text-white text-3xl shadow-lg mb-3">✓</div><h3 className="text-lg font-black text-gray-900">{createdCreds.name}</h3><p className="text-sm text-gray-500 mt-1">{t("creds_for")}</p></div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-sakura-50 to-white border-2 border-sakura-200 space-y-3">
            <div><div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t("login")}</div><div className="font-mono text-base font-bold text-gray-900">{createdCreds.login}</div></div>
            <div className="border-t border-sakura-100" />
            <div><div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t("password")}</div><div className="font-mono text-base font-bold text-konoha-red">{createdCreds.password}</div></div>
            <div className="border-t border-sakura-100" />
            <div><div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t("site_address")}</div><div className="font-mono text-sm text-gray-700">konoha-school.com/#admin</div></div>
          </div>
          <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-xs text-yellow-800 flex items-start gap-2"><span>⚠️</span><span>{t("warning_share")}</span></div>
          <Button variant="success" onClick={() => copyCreds(createdCreds.login, createdCreds.password, createdCreds.name)} className="w-full">{copied ? t("copied") : t("copy_creds")}</Button>
          <Button variant="ghost" onClick={() => setCreatedCreds(null)} className="w-full">{t("close")}</Button>
        </div>)}
      </Modal>
    </div>
  );
}

function CoursesTab({ db, refresh }: { db: AppDB; refresh: () => void }) {
  const t = useT();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", monthlyFee: "0", description: "" });
  const submit = (e: React.FormEvent) => { e.preventDefault(); const cur = loadDB(); cur.courses.push({ id: `c_${Date.now().toString(36)}`, name: form.name, monthlyFee: parseInt(form.monthlyFee) || 0, description: form.description }); saveDB(cur); setShowAdd(false); setForm({ name: "", monthlyFee: "0", description: "" }); refresh(); };
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-black text-gray-900">{t("courses_title")}</h1><p className="text-sm text-gray-500 mt-1">{t("courses_subtitle")}</p></div><Button onClick={() => setShowAdd(true)}>{t("add_course")}</Button></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {db.courses.map((c) => { const students = db.students.filter((s) => s.courseId === c.id); const teacher = db.users.find((u) => u.id === c.teacherId); return (
          <Card key={c.id} className="p-5 hover:-translate-y-1 transition-transform">
            <div className="flex items-start justify-between"><div className="font-bold text-gray-900">{c.name}</div>{c.monthlyFee === 0 && <Badge color="green">{t("free")}</Badge>}</div>
            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <div>💰 <b>{c.monthlyFee === 0 ? t("free") : helpers.formatMoney(c.monthlyFee) + t("per_month")}</b></div>
              <div>👨‍🏫 {t("teacher_label")} {teacher?.fullName || "—"}</div>
              <div>🎓 {t("students_label")} <b>{students.length}</b></div>
            </div>
          </Card>);})}
      </div>
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title={t("new_course_title")}>
        <form onSubmit={submit} className="space-y-4">
          <Input label={t("course_name")} value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Input label={t("monthly_fee")} type="number" value={form.monthlyFee} onChange={(v) => setForm({ ...form, monthlyFee: v })} required />
          <TextArea label={t("description")} value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
          <div className="flex gap-2 justify-end pt-2"><Button variant="ghost" onClick={() => setShowAdd(false)}>{t("cancel")}</Button><Button type="submit">{t("add_btn")}</Button></div>
        </form>
      </Modal>
    </div>
  );
}

function PaymentsTab({ db, refresh }: { db: AppDB; refresh: () => void }) {
  const t = useT();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ studentId: db.students[0]?.id || "", amount: "", month: new Date().toISOString().slice(0, 7), note: "" });
  const submit = (e: React.FormEvent) => { e.preventDefault(); const cur = loadDB(); addPayment(cur, { studentId: form.studentId, amount: parseInt(form.amount), month: form.month, note: form.note }); setShowAdd(false); setForm({ studentId: db.students[0]?.id || "", amount: "", month: new Date().toISOString().slice(0, 7), note: "" }); refresh(); };
  const total = db.payments.reduce((s, p) => s + p.amount, 0);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-black text-gray-900">{t("payments_title")}</h1><p className="text-sm text-gray-500 mt-1">{t("total_count")}: {helpers.formatMoney(total)}</p></div><Button onClick={() => setShowAdd(true)} disabled={db.students.length === 0}>{t("add_payment")}</Button></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {db.students.map((s) => { const c = db.courses.find((x) => x.id === s.courseId); if (!c) return null; const ps = paymentStatus(s.id, c.monthlyFee, db.payments, s.joinedAt); return (
          <Card key={s.id} className="p-5">
            <div className="font-bold text-gray-900">{s.fullName}</div><div className="text-xs text-gray-500 mb-3">{c.name}</div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">{t("paid_months")}</span> <b className="text-emerald-600">{ps.paidMonths}</b></div>
              <div className="flex justify-between"><span className="text-gray-600">{t("debt")}</span>{ps.debt > 0 ? <Badge color="red">{helpers.formatMoney(ps.debt)}</Badge> : <Badge color="green">{t("no_debt")}</Badge>}</div>
              <div className="flex justify-between"><span className="text-gray-600">{t("next_payment")}</span> <b>{ps.nextDue}</b></div>
            </div>
          </Card>);})}
      </div>
      {db.payments.length > 0 && (<Card className="overflow-x-auto">
        <div className="p-4 font-bold text-gray-900 border-b border-sakura-100">{t("payment_history")}</div>
        <table className="w-full text-sm"><thead className="bg-sakura-50/60"><tr className="text-left"><th className="p-3">{t("date")}</th><th className="p-3">{t("student_label")}</th><th className="p-3">{t("month")}</th><th className="p-3">{t("amount")}</th><th className="p-3">{t("note")}</th></tr></thead>
          <tbody>{[...db.payments].reverse().map((p) => { const s = db.students.find((x) => x.id === p.studentId); return (<tr key={p.id} className="border-t border-sakura-50"><td className="p-3 text-gray-600">{helpers.formatDate(p.paidAt)}</td><td className="p-3 font-semibold">{s?.fullName || "—"}</td><td className="p-3">{p.month}</td><td className="p-3 font-bold text-emerald-600">{helpers.formatMoney(p.amount)}</td><td className="p-3 text-gray-500 text-xs">{p.note || "—"}</td></tr>);})}</tbody>
        </table>
      </Card>)}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title={t("new_payment_title")}>
        <form onSubmit={submit} className="space-y-4">
          <Select label={t("student_label")} value={form.studentId} onChange={(v) => setForm({ ...form, studentId: v })} options={db.students.map((s) => ({ value: s.id, label: s.fullName }))} required />
          <Input label={t("amount")} type="number" value={form.amount} onChange={(v) => setForm({ ...form, amount: v })} required />
          <Input label={t("month")} value={form.month} onChange={(v) => setForm({ ...form, month: v })} required />
          <Input label={t("note")} value={form.note} onChange={(v) => setForm({ ...form, note: v })} />
          <div className="flex gap-2 justify-end pt-2"><Button variant="ghost" onClick={() => setShowAdd(false)}>{t("cancel")}</Button><Button type="submit" variant="success">{t("accept_payment")}</Button></div>
        </form>
      </Modal>
    </div>
  );
}

function RatingTab({ db }: { db: AppDB }) {
  const t = useT();
  const sorted = [...db.students].sort((a, b) => b.rating - a.rating);
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-black text-gray-900">{t("rating_title")}</h1><p className="text-sm text-gray-500 mt-1">{t("rating_subtitle")}</p></div>
      {sorted.length === 0 ? <Card className="p-8"><EmptyState icon="🏆" title={t("no_rating")} /></Card> : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm"><thead className="bg-sakura-50/60"><tr className="text-left"><th className="p-3">#</th><th className="p-3">{t("col_name")}</th><th className="p-3 hidden md:table-cell">{t("col_course")}</th><th className="p-3">{t("col_score")}</th><th className="p-3">{t("col_level")}</th><th className="p-3">{t("col_grades")}</th></tr></thead>
            <tbody>{sorted.map((s, i) => { const c = db.courses.find((x) => x.id === s.courseId); const gradeCount = db.grades.filter((g) => g.studentId === s.id).length; return (
              <tr key={s.id} className="border-t border-sakura-50 hover:bg-sakura-50/30">
                <td className="p-3"><span className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-white text-xs ${i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-orange-600" : "bg-sakura-200 text-konoha-red"}`}>{i + 1}</span></td>
                <td className="p-3 font-bold text-gray-900">{s.fullName}</td>
                <td className="p-3 text-xs text-gray-600 hidden md:table-cell">{c?.name || "—"}</td>
                <td className={`p-3 font-black text-lg ${ratingColor(s.rating)}`}>{s.rating || "—"}</td>
                <td className="p-3"><Badge color={s.rating >= 75 ? "green" : s.rating >= 60 ? "blue" : s.rating >= 40 ? "yellow" : s.rating > 0 ? "red" : "gray"}>{ratingLabel(s.rating)}</Badge></td>
                <td className="p-3 text-gray-600">{gradeCount}</td>
              </tr>);})}</tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

function NewsTab({ db, refresh }: { db: AppDB; refresh: () => void }) {
  const t = useT();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", body: "" });
  const confirm = useConfirm();
  const submit = (e: React.FormEvent) => { e.preventDefault(); const cur = loadDB(); const dirId = cur.users.find((u) => u.role === "director")?.id || "system"; addNews(cur, { title: form.title, body: form.body, authorId: dirId }); setShowAdd(false); setForm({ title: "", body: "" }); refresh(); };
  const remove = (id: string) => { if (!confirm(t("confirm_delete_news"))) return; const cur = loadDB(); deleteItem(cur, "news", id); refresh(); };
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-black text-gray-900">{t("news_title")}</h1><p className="text-sm text-gray-500 mt-1">{t("news_subtitle")}</p></div><Button onClick={() => setShowAdd(true)}>{t("add_news")}</Button></div>
      {db.news.length === 0 ? <Card className="p-8"><EmptyState icon="📰" title={t("no_news")} /></Card> : (
        <div className="space-y-3">{db.news.map((n) => (<Card key={n.id} className="p-5 hover:-translate-y-0.5 transition-transform"><div className="flex items-start justify-between gap-3"><div className="flex-1 min-w-0"><div className="font-bold text-gray-900">{n.title}</div><div className="text-xs text-gray-500 mt-1">{helpers.formatDate(n.createdAt)}</div><p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{n.body}</p></div><Button variant="danger" size="sm" onClick={() => remove(n.id)}>✕</Button></div></Card>))}</div>
      )}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title={t("new_news_title")}>
        <form onSubmit={submit} className="space-y-4">
          <Input label={t("news_headline")} value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <TextArea label={t("news_body")} value={form.body} onChange={(v) => setForm({ ...form, body: v })} rows={6} required />
          <div className="flex gap-2 justify-end pt-2"><Button variant="ghost" onClick={() => setShowAdd(false)}>{t("cancel")}</Button><Button type="submit">{t("publish")}</Button></div>
        </form>
      </Modal>
    </div>
  );
}
