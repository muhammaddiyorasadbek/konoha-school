import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "./AuthContext";
import { Button, Card, EmptyState, Input, Modal, StatCard, TextArea, Badge } from "./ui";
import { loadDB, addGrade, helpers, ratingColor, ratingLabel } from "./db";
import type { AppDB } from "./types";

interface Props {
  onBackToSite: () => void;
}

const navItems = [
  { id: "students", label: "Mening guruhim", icon: "🎓" },
  { id: "grades", label: "Baholar", icon: "📝" },
];

import { useEffect } from "react";

export default function TeacherPanel({ onBackToSite }: Props) {
  const { user } = useAuth();
  const [tab, setTab] = useState("students");
  const [db, setDB] = useState<AppDB>(loadDB());

  const refresh = async () => {
    const { syncFromCloud } = await import("./db");
    await syncFromCloud();
    setDB({ ...loadDB() });
  };

  useEffect(() => {
    refresh();
  }, []);

  if (!user) return null;
  const myStudents = db.students.filter((s) => s.courseId === user.courseId);
  const course = db.courses.find((c) => c.id === user.courseId);

  return (
    <AdminLayout title="Ustoz paneli" navItems={navItems} activeTab={tab} onTabChange={setTab} onBackToSite={onBackToSite}>
      {tab === "students" && <MyStudents db={db} myStudents={myStudents} courseName={course?.name || ""} refresh={refresh} />}
      {tab === "grades" && <MyGrades db={db} myTeacherId={user.id} myStudents={myStudents} />}
    </AdminLayout>
  );
}

function MyStudents({ db, myStudents, courseName, refresh }: { db: AppDB; myStudents: AppDB["students"]; courseName: string; refresh: () => void }) {
  const { user } = useAuth();
  const [grading, setGrading] = useState<string | null>(null);
  const [form, setForm] = useState({ score: "", subject: "Yapon tili", comment: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !grading) return;
    const cur = loadDB();
    addGrade(cur, {
      studentId: grading,
      teacherId: user.id,
      score: parseInt(form.score),
      subject: form.subject,
      comment: form.comment,
    });
    setGrading(null);
    setForm({ score: "", subject: "Yapon tili", comment: "" });
    refresh();
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Mening guruhim</h1>
        <p className="text-sm text-gray-500 mt-1">{courseName} · {myStudents.length} ta o'quvchi</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🎓" label="O'quvchilar" value={myStudents.length} color="from-blue-500 to-blue-700" />
        <StatCard icon="📝" label="Berilgan baholar" value={db.grades.filter((g) => g.teacherId === user?.id).length} color="from-emerald-500 to-emerald-700" />
        <StatCard icon="⭐" label="O'rtacha reyting" value={myStudents.length ? Math.round(myStudents.reduce((s, st) => s + st.rating, 0) / myStudents.length) : 0} color="from-yellow-500 to-yellow-700" />
        <StatCard icon="🏆" label="Top o'quvchi" value={myStudents.sort((a, b) => b.rating - a.rating)[0]?.fullName.split(" ")[0] || "—"} color="from-konoha-red to-sakura-600" />
      </div>

      {myStudents.length === 0 ? (
        <Card className="p-8"><EmptyState icon="🎓" title="O'quvchilaringiz hali yo'q" desc="Direktor sizga o'quvchilar biriktiradi" /></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myStudents.map((s) => (
            <Card key={s.id} className="p-5 hover:-translate-y-1 transition-transform">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow-md">
                  {s.fullName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 truncate">{s.fullName}</div>
                  <div className="text-xs text-gray-500">Yosh: {s.age} · {s.phone}</div>
                </div>
                <div className={`text-2xl font-black ${ratingColor(s.rating)}`}>{s.rating || "—"}</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Badge color={s.rating >= 75 ? "green" : s.rating >= 60 ? "blue" : s.rating > 0 ? "yellow" : "gray"}>
                  {ratingLabel(s.rating)}
                </Badge>
                <Button size="sm" onClick={() => setGrading(s.id)}>📝 Baho qo'yish</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={grading !== null} onClose={() => setGrading(null)} title={`Baho: ${myStudents.find((s) => s.id === grading)?.fullName || ""}`}>
        <form onSubmit={submit} className="space-y-4">
          <Input label="Mavzu / Fan" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} required />
          <Input label="Ball (1-100)" type="number" min={1} max={100} value={form.score} onChange={(v) => setForm({ ...form, score: v })} required />
          <TextArea label="Izoh (ixtiyoriy)" value={form.comment} onChange={(v) => setForm({ ...form, comment: v })} rows={3} />
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={() => setGrading(null)}>Bekor</Button>
            <Button type="submit" variant="success">Saqlash</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function MyGrades({ db, myTeacherId, myStudents }: { db: AppDB; myTeacherId: string; myStudents: AppDB["students"] }) {
  const myGrades = db.grades.filter((g) => g.teacherId === myTeacherId);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">📝 Berilgan baholar</h1>
        <p className="text-sm text-gray-500 mt-1">Jami: {myGrades.length} ta</p>
      </div>

      {myGrades.length === 0 ? (
        <Card className="p-8"><EmptyState icon="📝" title="Hozircha baholar yo'q" /></Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-sakura-50/60">
              <tr className="text-left">
                <th className="p-3">Sana</th>
                <th className="p-3">O'quvchi</th>
                <th className="p-3">Mavzu</th>
                <th className="p-3">Ball</th>
                <th className="p-3 hidden md:table-cell">Izoh</th>
              </tr>
            </thead>
            <tbody>
              {[...myGrades].reverse().map((g) => {
                const s = myStudents.find((x) => x.id === g.studentId);
                return (
                  <tr key={g.id} className="border-t border-sakura-50">
                    <td className="p-3 text-gray-600">{helpers.formatDate(g.date)}</td>
                    <td className="p-3 font-semibold">{s?.fullName || "—"}</td>
                    <td className="p-3">{g.subject}</td>
                    <td className={`p-3 font-bold ${ratingColor(g.score)}`}>{g.score}</td>
                    <td className="p-3 text-gray-500 text-xs hidden md:table-cell">{g.comment || "—"}</td>
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
