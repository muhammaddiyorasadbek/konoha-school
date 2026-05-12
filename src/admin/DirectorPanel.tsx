import { useMemo, useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Button, Card, EmptyState, Input, Modal, Select, StatCard, TextArea, Badge, useConfirm } from "./ui";
import {
  loadDB, saveDB, addUser, addStudent, addPayment, addNews, deleteItem,
  helpers, paymentStatus, ratingColor, ratingLabel,
} from "./db";
import type { AppDB, Role } from "./types";

interface Props {
  onBackToSite: () => void;
}

const navItems = [
  { id: "dashboard", label: "Bosh sahifa", icon: "📊" },
  { id: "students", label: "O'quvchilar", icon: "🎓" },
  { id: "teachers", label: "Ustozlar", icon: "👨‍🏫" },
  { id: "parents", label: "Ota-onalar", icon: "👨‍👩‍👧" },
  { id: "courses", label: "Kurslar", icon: "📚" },
  { id: "payments", label: "To'lovlar", icon: "💰" },
  { id: "rating", label: "Reyting", icon: "🏆" },
  { id: "news", label: "Yangiliklar", icon: "📰" },
];

export default function DirectorPanel({ onBackToSite }: Props) {
  const [tab, setTab] = useState("dashboard");
  const [db, setDB] = useState<AppDB>(loadDB());
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const { syncFromCloud } = await import("./db");
    await syncFromCloud();
    setDB({ ...loadDB() });
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AdminLayout
      title="Direktor paneli"
      navItems={navItems}
      activeTab={tab}
      onTabChange={setTab}
      onBackToSite={onBackToSite}
    >
      {tab === "dashboard" && <Dashboard db={db} />}
      {tab === "students" && <StudentsTab db={db} refresh={refresh} />}
      {tab === "teachers" && <UsersTab db={db} refresh={refresh} role="teacher" title="Ustozlar" />}
      {tab === "parents" && <UsersTab db={db} refresh={refresh} role="parent" title="Ota-onalar" />}
      {tab === "courses" && <CoursesTab db={db} refresh={refresh} />}
      {tab === "payments" && <PaymentsTab db={db} refresh={refresh} />}
      {tab === "rating" && <RatingTab db={db} />}
      {tab === "news" && <NewsTab db={db} refresh={refresh} />}
    </AdminLayout>
  );
}

// ================= DASHBOARD =================
function Dashboard({ db }: { db: AppDB }) {
  const totalRevenue = db.payments.reduce((s, p) => s + p.amount, 0);
  const totalDebt = db.students.reduce((s, st) => {
    const c = db.courses.find((x) => x.id === st.courseId);
    if (!c) return s;
    return s + paymentStatus(st.id, c.monthlyFee, db.payments, st.joinedAt).debt;
  }, 0);

  const topStudents = [...db.students].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="font-jp text-konoha-red text-xs font-bold tracking-[0.3em]">ダッシュボード</div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Boshqaruv panel</h1>
          <p className="text-sm text-gray-500 mt-1">Maktab umumiy ko'rinishi</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🎓" label="O'quvchilar" value={db.students.length} color="from-konoha-red to-sakura-600" />
        <StatCard icon="👨‍🏫" label="Ustozlar" value={db.users.filter((u) => u.role === "teacher").length} color="from-blue-500 to-blue-700" />
        <StatCard icon="👨‍👩‍👧" label="Ota-onalar" value={db.users.filter((u) => u.role === "parent").length} color="from-emerald-500 to-emerald-700" />
        <StatCard icon="📚" label="Kurslar" value={db.courses.length} color="from-purple-500 to-purple-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatCard icon="💰" label="Jami tushum" value={helpers.formatMoney(totalRevenue)} color="from-emerald-500 to-emerald-700" hint={`${db.payments.length} ta to'lov`} />
        <StatCard icon="⚠️" label="Jami qarz" value={helpers.formatMoney(totalDebt)} color="from-red-500 to-red-700" hint="Hammasidan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">🏆 Top o'quvchilar</h3>
          {topStudents.length === 0 ? (
            <EmptyState icon="🎓" title="O'quvchilar yo'q" />
          ) : (
            <div className="space-y-2">
              {topStudents.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-sakura-50 to-white border border-sakura-100">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white ${
                    i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-orange-600" : "bg-sakura-300"
                  }`}>{i + 1}</div>
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
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">📰 So'nggi yangiliklar</h3>
          {db.news.length === 0 ? (
            <EmptyState icon="📰" title="Yangiliklar yo'q" />
          ) : (
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

// ================= STUDENTS =================
function StudentsTab({ db, refresh }: { db: AppDB; refresh: () => void }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ fullName: "", age: "", phone: "", parentPhone: "", courseId: db.courses[0]?.id || "", notes: "" });
  const [search, setSearch] = useState("");
  const confirm = useConfirm();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return db.students.filter((s) => s.fullName.toLowerCase().includes(q) || s.phone.includes(q));
  }, [db.students, search]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cur = loadDB();
    addStudent(cur, {
      fullName: form.fullName,
      age: parseInt(form.age),
      phone: form.phone,
      parentPhone: form.parentPhone,
      courseId: form.courseId,
      notes: form.notes,
    });
    setShowAdd(false);
    setForm({ fullName: "", age: "", phone: "", parentPhone: "", courseId: db.courses[0]?.id || "", notes: "" });
    refresh();
  };

  const remove = (id: string) => {
    if (!confirm("O'quvchini o'chirishga ishonchingiz komilmi?")) return;
    const cur = loadDB();
    deleteItem(cur, "students", id);
    refresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">O'quvchilar</h1>
          <p className="text-sm text-gray-500 mt-1">Jami: {db.students.length} ta</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>+ Yangi o'quvchi</Button>
      </div>

      <Card className="p-3">
        <input
          placeholder="🔍 Ism yoki telefon bo'yicha qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-sakura-50/40 border border-sakura-100 focus:border-konoha-red focus:outline-none text-sm"
        />
      </Card>

      {filtered.length === 0 ? (
        <Card className="p-8"><EmptyState icon="🎓" title="O'quvchilar yo'q" desc="Yangi o'quvchi qo'shing" /></Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-sakura-50/60">
              <tr className="text-left">
                <th className="p-3 font-bold text-gray-700">F.I.Sh</th>
                <th className="p-3 font-bold text-gray-700">Yosh</th>
                <th className="p-3 font-bold text-gray-700 hidden md:table-cell">Telefon</th>
                <th className="p-3 font-bold text-gray-700 hidden lg:table-cell">Kurs</th>
                <th className="p-3 font-bold text-gray-700">Reyting</th>
                <th className="p-3 font-bold text-gray-700 hidden md:table-cell">Qarz</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const c = db.courses.find((x) => x.id === s.courseId);
                const ps = c ? paymentStatus(s.id, c.monthlyFee, db.payments, s.joinedAt) : { debt: 0 };
                return (
                  <tr key={s.id} className="border-t border-sakura-50 hover:bg-sakura-50/30">
                    <td className="p-3 font-semibold text-gray-900">{s.fullName}</td>
                    <td className="p-3 text-gray-700">{s.age}</td>
                    <td className="p-3 text-gray-700 hidden md:table-cell">{s.phone}</td>
                    <td className="p-3 text-gray-700 hidden lg:table-cell text-xs">{c?.name || "—"}</td>
                    <td className="p-3"><span className={`font-bold ${ratingColor(s.rating)}`}>{s.rating || "—"}</span></td>
                    <td className="p-3 hidden md:table-cell">
                      {ps.debt > 0 ? <Badge color="red">{helpers.formatMoney(ps.debt)}</Badge> : <Badge color="green">Yo'q</Badge>}
                    </td>
                    <td className="p-3">
                      <Button variant="danger" size="sm" onClick={() => remove(s.id)}>✕</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Yangi o'quvchi qo'shish">
        <form onSubmit={submit} className="space-y-4">
          <Input label="F.I.Sh" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Yosh" type="number" min={5} max={70} value={form.age} onChange={(v) => setForm({ ...form, age: v })} required />
            <Input label="Telefon" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+998..." required />
          </div>
          <Input label="Ota-ona telefoni" type="tel" value={form.parentPhone} onChange={(v) => setForm({ ...form, parentPhone: v })} placeholder="+998..." />
          <Select label="Kurs" value={form.courseId} onChange={(v) => setForm({ ...form, courseId: v })} options={db.courses.map((c) => ({ value: c.id, label: c.name }))} required />
          <TextArea label="Izoh" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} rows={2} />
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Bekor qilish</Button>
            <Button type="submit">Qo'shish</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// ================= USERS (teacher / parent) =================
function UsersTab({ db, refresh, role, title }: { db: AppDB; refresh: () => void; role: Role; title: string }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ fullName: "", username: "", password: "", phone: "", courseId: db.courses[0]?.id || "", childrenIds: [] as string[] });
  const [revealId, setRevealId] = useState<string | null>(null);
  const [createdCreds, setCreatedCreds] = useState<{ login: string; password: string; name: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const confirm = useConfirm();

  const list = db.users.filter((u) => u.role === role);

  // Tasodifiy parol generatori
  const genPassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let p = "";
    for (let i = 0; i < 8; i++) p += chars[Math.floor(Math.random() * chars.length)];
    setForm((f) => ({ ...f, password: p }));
  };

  // Login avtomatik taklif qilish (ismdan)
  const suggestLogin = (fullName: string) => {
    const base = fullName
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .join(".");
    if (base) setForm((f) => ({ ...f, username: base + Math.floor(Math.random() * 99) }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cur = loadDB();
    if (cur.users.some((u) => u.username.toLowerCase() === form.username.toLowerCase())) {
      alert("Bu login band! Boshqasini tanlang.");
      return;
    }
    addUser(cur, {
      fullName: form.fullName,
      username: form.username,
      password: form.password,
      phone: form.phone,
      role,
      courseId: role === "teacher" ? form.courseId : undefined,
      childrenIds: role === "parent" ? form.childrenIds : undefined,
    });
    // Yaratilgan ma'lumotni ko'rsatamiz
    setCreatedCreds({ login: form.username, password: form.password, name: form.fullName });
    setShowAdd(false);
    setForm({ fullName: "", username: "", password: "", phone: "", courseId: db.courses[0]?.id || "", childrenIds: [] });
    refresh();
  };

  const remove = (id: string) => {
    if (!confirm("O'chirishga ishonchingiz komilmi? Bu hisob qaytarib bo'lmaydi.")) return;
    const cur = loadDB();
    deleteItem(cur, "users", id);
    refresh();
  };

  const toggleChild = (id: string) => {
    setForm((f) => ({
      ...f,
      childrenIds: f.childrenIds.includes(id) ? f.childrenIds.filter((x) => x !== id) : [...f.childrenIds, id],
    }));
  };

  const copyCreds = (login: string, password: string, name: string) => {
    const text = `KONOHA Yapon Maktabi — kirish ma'lumotlari\n\nF.I.Sh: ${name}\nLogin: ${login}\nParol: ${password}\n\nSayt: konoha.uz/#admin`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">Jami: {list.length} ta</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>+ Yangi {role === "teacher" ? "ustoz" : "ota-ona"}</Button>
      </div>

      {list.length === 0 ? (
        <Card className="p-8"><EmptyState icon={role === "teacher" ? "👨‍🏫" : "👨‍👩‍👧"} title="Hozircha yo'q" desc={`Yangi ${role === "teacher" ? "ustoz" : "ota-ona"} qo'shing — login va parol siz yaratasiz`} /></Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((u) => {
            const course = db.courses.find((c) => c.id === u.courseId);
            const children = db.students.filter((s) => u.childrenIds?.includes(s.id));
            const revealed = revealId === u.id;
            return (
              <Card key={u.id} className="p-5 hover:-translate-y-1 transition-transform">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
                    role === "teacher" ? "bg-gradient-to-br from-blue-500 to-blue-700" : "bg-gradient-to-br from-emerald-500 to-emerald-700"
                  }`}>{u.fullName.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 truncate">{u.fullName}</div>
                    <div className="text-xs text-gray-500">@{u.username}</div>
                    {u.phone && <div className="text-xs text-gray-500 mt-0.5">{u.phone}</div>}
                  </div>
                </div>
                {course && <div className="mt-3 text-xs text-gray-600"><b>Kurs:</b> {course.name}</div>}
                {children.length > 0 && (
                  <div className="mt-2 text-xs text-gray-600">
                    <b>Farzandlari:</b> {children.map((c) => c.fullName).join(", ")}
                  </div>
                )}

                {/* Parol — yashirin, ko'rsatish/nusxa tugmalari bilan */}
                <div className="mt-3 p-2 rounded-lg bg-sakura-50/50 border border-sakura-100 flex items-center gap-2">
                  <span className="text-xs text-gray-500 flex-shrink-0">Parol:</span>
                  <code className="flex-1 text-xs font-mono text-gray-800 truncate">
                    {revealed ? u.password : "••••••••"}
                  </code>
                  <button
                    onClick={() => setRevealId(revealed ? null : u.id)}
                    className="text-konoha-red hover:scale-110 transition-transform"
                    title={revealed ? "Yashirish" : "Ko'rsatish"}
                  >
                    {revealed ? "🙈" : "👁️"}
                  </button>
                  <button
                    onClick={() => copyCreds(u.username, u.password, u.fullName)}
                    className="text-konoha-red hover:scale-110 transition-transform"
                    title="Nusxa olish"
                  >
                    📋
                  </button>
                </div>

                <div className="mt-3 flex gap-2 justify-end items-center">
                  <Button variant="danger" size="sm" onClick={() => remove(u.id)}>O'chirish</Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* "Yangi qo'shish" formasi */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title={`Yangi ${role === "teacher" ? "ustoz" : "ota-ona"} hisobi`}>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">F.I.Sh *</label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              onBlur={() => !form.username && suggestLogin(form.fullName)}
              placeholder="Aliyev Vali"
              className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Login *</label>
            <input
              type="text"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="aliyev.vali"
              className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Parol *</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Parol kiriting"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all text-sm font-mono"
              />
              <Button type="button" variant="outline" onClick={genPassword}>🎲 Yaratish</Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Tasodifiy parol uchun "Yaratish" tugmasini bosing</p>
          </div>

          <Input label="Telefon" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+998..." />

          {role === "teacher" && db.courses.length > 0 && (
            <Select label="Kurs" value={form.courseId} onChange={(v) => setForm({ ...form, courseId: v })} options={db.courses.map((c) => ({ value: c.id, label: c.name }))} required />
          )}

          {role === "parent" && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Farzand(lar)i</label>
              <div className="max-h-40 overflow-y-auto space-y-1 p-2 rounded-xl border border-sakura-100">
                {db.students.length === 0 ? (
                  <div className="text-sm text-gray-400 p-2">Avval o'quvchilarni qo'shing</div>
                ) : (
                  db.students.map((s) => (
                    <label key={s.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-sakura-50 cursor-pointer">
                      <input type="checkbox" checked={form.childrenIds.includes(s.id)} onChange={() => toggleChild(s.id)} />
                      <span className="text-sm">{s.fullName}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Bekor qilish</Button>
            <Button type="submit">✓ Hisob yaratish</Button>
          </div>
        </form>
      </Modal>

      {/* Yaratilgan hisob ma'lumotlarini ko'rsatish */}
      <Modal open={!!createdCreds} onClose={() => setCreatedCreds(null)} title="✅ Hisob yaratildi!" width="max-w-md">
        {createdCreds && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 items-center justify-center text-white text-3xl shadow-lg mb-3">
                ✓
              </div>
              <h3 className="text-lg font-black text-gray-900">{createdCreds.name}</h3>
              <p className="text-sm text-gray-500 mt-1">uchun login ma'lumotlari yaratildi</p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-sakura-50 to-white border-2 border-sakura-200 space-y-3">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Login</div>
                <div className="font-mono text-base font-bold text-gray-900">{createdCreds.login}</div>
              </div>
              <div className="border-t border-sakura-100" />
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Parol</div>
                <div className="font-mono text-base font-bold text-konoha-red">{createdCreds.password}</div>
              </div>
              <div className="border-t border-sakura-100" />
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Sayt manzili</div>
                <div className="font-mono text-sm text-gray-700">konoha.uz/#admin</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-xs text-yellow-800 flex items-start gap-2">
              <span>⚠️</span>
              <span>Bu ma'lumotlarni hisob egasiga yetkazib bering. Yopilgandan keyin parolni qaytadan ko'rishingiz uchun "Ko'rsatish" tugmasini bossangiz bo'ladi.</span>
            </div>

            <Button
              variant="success"
              onClick={() => copyCreds(createdCreds.login, createdCreds.password, createdCreds.name)}
              className="w-full"
            >
              {copied ? "✓ Nusxa olindi!" : "📋 Ma'lumotlarni nusxa olish"}
            </Button>

            <Button variant="ghost" onClick={() => setCreatedCreds(null)} className="w-full">
              Yopish
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ================= COURSES =================
function CoursesTab({ db, refresh }: { db: AppDB; refresh: () => void }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", monthlyFee: "0", description: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cur = loadDB();
    cur.courses.push({
      id: `c_${Date.now().toString(36)}`,
      name: form.name,
      monthlyFee: parseInt(form.monthlyFee) || 0,
      description: form.description,
    });
    saveDB(cur);
    setShowAdd(false);
    setForm({ name: "", monthlyFee: "0", description: "" });
    refresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Kurslar</h1>
          <p className="text-sm text-gray-500 mt-1">Maktab kurslari ro'yxati</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>+ Yangi kurs</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {db.courses.map((c) => {
          const students = db.students.filter((s) => s.courseId === c.id);
          const teacher = db.users.find((u) => u.id === c.teacherId);
          return (
            <Card key={c.id} className="p-5 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between">
                <div className="font-bold text-gray-900">{c.name}</div>
                {c.monthlyFee === 0 && <Badge color="green">BEPUL</Badge>}
              </div>
              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <div>💰 <b>{c.monthlyFee === 0 ? "BEPUL" : helpers.formatMoney(c.monthlyFee) + "/oy"}</b></div>
                <div>👨‍🏫 Ustoz: {teacher?.fullName || "—"}</div>
                <div>🎓 O'quvchilar: <b>{students.length}</b></div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Yangi kurs">
        <form onSubmit={submit} className="space-y-4">
          <Input label="Kurs nomi" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Input label="Oylik to'lov (so'm)" type="number" value={form.monthlyFee} onChange={(v) => setForm({ ...form, monthlyFee: v })} required />
          <TextArea label="Tavsif" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Bekor</Button>
            <Button type="submit">Qo'shish</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// ================= PAYMENTS =================
function PaymentsTab({ db, refresh }: { db: AppDB; refresh: () => void }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ studentId: db.students[0]?.id || "", amount: "", month: new Date().toISOString().slice(0, 7), note: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cur = loadDB();
    addPayment(cur, { studentId: form.studentId, amount: parseInt(form.amount), month: form.month, note: form.note });
    setShowAdd(false);
    setForm({ studentId: db.students[0]?.id || "", amount: "", month: new Date().toISOString().slice(0, 7), note: "" });
    refresh();
  };

  const total = db.payments.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">To'lovlar</h1>
          <p className="text-sm text-gray-500 mt-1">Jami: {helpers.formatMoney(total)}</p>
        </div>
        <Button onClick={() => setShowAdd(true)} disabled={db.students.length === 0}>+ To'lov qo'shish</Button>
      </div>

      {/* Per-student summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {db.students.map((s) => {
          const c = db.courses.find((x) => x.id === s.courseId);
          if (!c) return null;
          const ps = paymentStatus(s.id, c.monthlyFee, db.payments, s.joinedAt);
          return (
            <Card key={s.id} className="p-5">
              <div className="font-bold text-gray-900">{s.fullName}</div>
              <div className="text-xs text-gray-500 mb-3">{c.name}</div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">To'langan oylar:</span> <b className="text-emerald-600">{ps.paidMonths}</b></div>
                <div className="flex justify-between"><span className="text-gray-600">Qarz:</span>
                  {ps.debt > 0 ? <Badge color="red">{helpers.formatMoney(ps.debt)}</Badge> : <Badge color="green">Yo'q</Badge>}
                </div>
                <div className="flex justify-between"><span className="text-gray-600">Keyingi to'lov:</span> <b>{ps.nextDue}</b></div>
              </div>
            </Card>
          );
        })}
      </div>

      {db.payments.length > 0 && (
        <Card className="overflow-x-auto">
          <div className="p-4 font-bold text-gray-900 border-b border-sakura-100">📋 To'lovlar tarixi</div>
          <table className="w-full text-sm">
            <thead className="bg-sakura-50/60">
              <tr className="text-left">
                <th className="p-3">Sana</th>
                <th className="p-3">O'quvchi</th>
                <th className="p-3">Oy</th>
                <th className="p-3">Summa</th>
                <th className="p-3">Izoh</th>
              </tr>
            </thead>
            <tbody>
              {[...db.payments].reverse().map((p) => {
                const s = db.students.find((x) => x.id === p.studentId);
                return (
                  <tr key={p.id} className="border-t border-sakura-50">
                    <td className="p-3 text-gray-600">{helpers.formatDate(p.paidAt)}</td>
                    <td className="p-3 font-semibold">{s?.fullName || "—"}</td>
                    <td className="p-3">{p.month}</td>
                    <td className="p-3 font-bold text-emerald-600">{helpers.formatMoney(p.amount)}</td>
                    <td className="p-3 text-gray-500 text-xs">{p.note || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Yangi to'lov">
        <form onSubmit={submit} className="space-y-4">
          <Select label="O'quvchi" value={form.studentId} onChange={(v) => setForm({ ...form, studentId: v })} options={db.students.map((s) => ({ value: s.id, label: s.fullName }))} required />
          <Input label="Summa (so'm)" type="number" value={form.amount} onChange={(v) => setForm({ ...form, amount: v })} required />
          <Input label="Oy (yyyy-mm)" value={form.month} onChange={(v) => setForm({ ...form, month: v })} required />
          <Input label="Izoh" value={form.note} onChange={(v) => setForm({ ...form, note: v })} />
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Bekor</Button>
            <Button type="submit" variant="success">To'lovni qabul qilish</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// ================= RATING =================
function RatingTab({ db }: { db: AppDB }) {
  const sorted = [...db.students].sort((a, b) => b.rating - a.rating);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">🏆 Reyting</h1>
        <p className="text-sm text-gray-500 mt-1">O'quvchilarning umumiy o'rin tartibi</p>
      </div>

      {sorted.length === 0 ? (
        <Card className="p-8"><EmptyState icon="🏆" title="Reyting yo'q" /></Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-sakura-50/60">
              <tr className="text-left">
                <th className="p-3">#</th>
                <th className="p-3">O'quvchi</th>
                <th className="p-3 hidden md:table-cell">Kurs</th>
                <th className="p-3">Ball</th>
                <th className="p-3">Daraja</th>
                <th className="p-3">Baho soni</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s, i) => {
                const c = db.courses.find((x) => x.id === s.courseId);
                const gradeCount = db.grades.filter((g) => g.studentId === s.id).length;
                return (
                  <tr key={s.id} className="border-t border-sakura-50 hover:bg-sakura-50/30">
                    <td className="p-3">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-white text-xs ${
                        i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-orange-600" : "bg-sakura-200 text-konoha-red"
                      }`}>{i + 1}</span>
                    </td>
                    <td className="p-3 font-bold text-gray-900">{s.fullName}</td>
                    <td className="p-3 text-xs text-gray-600 hidden md:table-cell">{c?.name || "—"}</td>
                    <td className={`p-3 font-black text-lg ${ratingColor(s.rating)}`}>{s.rating || "—"}</td>
                    <td className="p-3"><Badge color={s.rating >= 75 ? "green" : s.rating >= 60 ? "blue" : s.rating >= 40 ? "yellow" : s.rating > 0 ? "red" : "gray"}>{ratingLabel(s.rating)}</Badge></td>
                    <td className="p-3 text-gray-600">{gradeCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

// ================= NEWS =================
function NewsTab({ db, refresh }: { db: AppDB; refresh: () => void }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", body: "" });
  const confirm = useConfirm();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cur = loadDB();
    const dirId = cur.users.find((u) => u.role === "director")?.id || "system";
    addNews(cur, { title: form.title, body: form.body, authorId: dirId });
    setShowAdd(false);
    setForm({ title: "", body: "" });
    refresh();
  };

  const remove = (id: string) => {
    if (!confirm("O'chirishga ishonchingiz komilmi?")) return;
    const cur = loadDB();
    deleteItem(cur, "news", id);
    refresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">📰 Yangiliklar</h1>
          <p className="text-sm text-gray-500 mt-1">Saytda chiqadigan yangiliklar</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>+ Yangi yangilik</Button>
      </div>

      {db.news.length === 0 ? (
        <Card className="p-8"><EmptyState icon="📰" title="Yangiliklar yo'q" /></Card>
      ) : (
        <div className="space-y-3">
          {db.news.map((n) => (
            <Card key={n.id} className="p-5 hover:-translate-y-0.5 transition-transform">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900">{n.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{helpers.formatDate(n.createdAt)}</div>
                  <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{n.body}</p>
                </div>
                <Button variant="danger" size="sm" onClick={() => remove(n.id)}>✕</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Yangi yangilik">
        <form onSubmit={submit} className="space-y-4">
          <Input label="Sarlavha" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <TextArea label="Matn" value={form.body} onChange={(v) => setForm({ ...form, body: v })} rows={6} required />
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Bekor</Button>
            <Button type="submit">E'lon qilish</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
