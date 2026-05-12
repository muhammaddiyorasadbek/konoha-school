import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "./AuthContext";
import { Card, EmptyState, StatCard, Badge } from "./ui";
import { loadDB, helpers, paymentStatus, ratingColor, ratingLabel } from "./db";
import type { AppDB, Student } from "./types";

interface Props {
  onBackToSite: () => void;
}

import { useEffect } from "react";

export default function ParentPanel({ onBackToSite }: Props) {
  const { user } = useAuth();
  const [tab, setTab] = useState("");
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
  const children = db.students.filter((s) => user.childrenIds?.includes(s.id));

  const navItems = children.length > 0
    ? children.map((c) => ({ id: c.id, label: c.fullName, icon: "🎓" }))
    : [{ id: "empty", label: "Farzand yo'q", icon: "—" }];

  // First tab default
  if (!tab && children.length > 0) {
    setTimeout(() => setTab(children[0].id), 0);
  }

  return (
    <AdminLayout title="Ota-ona paneli" navItems={navItems} activeTab={tab} onTabChange={setTab} onBackToSite={onBackToSite}>
      {children.length === 0 ? (
        <Card className="p-8"><EmptyState icon="👨‍👩‍👧" title="Farzandlar yo'q" desc="Direktor sizga farzandlaringizni biriktirishi kerak" /></Card>
      ) : (
        children.map((c) => tab === c.id && <ChildView key={c.id} db={db} child={c} />)
      )}
    </AdminLayout>
  );
}

function ChildView({ db, child }: { db: AppDB; child: Student }) {
  const course = db.courses.find((c) => c.id === child.courseId);
  const grades = db.grades.filter((g) => g.studentId === child.id);
  const payments = db.payments.filter((p) => p.studentId === child.id);
  const ps = course ? paymentStatus(child.id, course.monthlyFee, db.payments, child.joinedAt) : null;
  const teacher = db.users.find((u) => u.courseId === child.courseId && u.role === "teacher");

  // Reyting o'rin tartibi
  const sortedAll = [...db.students].sort((a, b) => b.rating - a.rating);
  const myRank = sortedAll.findIndex((s) => s.id === child.id) + 1;

  return (
    <div className="space-y-5">
      {/* Header card */}
      <Card className="p-6 bg-gradient-to-br from-sakura-50 to-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {child.fullName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{child.fullName}</h1>
            <div className="text-sm text-gray-600 mt-0.5">{course?.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">
              👨‍🏫 Ustoz: <b>{teacher?.fullName || "—"}</b> · Yosh: {child.age}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-black ${ratingColor(child.rating)}`}>{child.rating || "—"}</div>
            <Badge color={child.rating >= 75 ? "green" : child.rating >= 60 ? "blue" : child.rating > 0 ? "yellow" : "gray"}>
              {ratingLabel(child.rating)}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🏆" label="Reyting o'rni" value={`#${myRank}`} hint={`${db.students.length} dan`} color="from-yellow-500 to-orange-500" />
        <StatCard icon="📝" label="Baholar soni" value={grades.length} color="from-blue-500 to-blue-700" />
        <StatCard icon="💰" label="To'langan" value={ps ? helpers.formatMoney(payments.reduce((s, p) => s + p.amount, 0)) : "—"} color="from-emerald-500 to-emerald-700" />
        <StatCard icon="⚠️" label="Qarz" value={ps ? helpers.formatMoney(ps.debt) : "—"} color={ps && ps.debt > 0 ? "from-red-500 to-red-700" : "from-emerald-500 to-emerald-700"} />
      </div>

      {/* Payment info */}
      {ps && course && (
        <Card className="p-5">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">💰 To'lov ma'lumotlari</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-xl bg-sakura-50/50">
              <div className="text-xs text-gray-500">Oylik to'lov</div>
              <div className="font-bold text-gray-900 mt-1">{course.monthlyFee === 0 ? "BEPUL" : helpers.formatMoney(course.monthlyFee)}</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/50">
              <div className="text-xs text-gray-500">To'langan oylar</div>
              <div className="font-bold text-emerald-600 mt-1">{ps.paidMonths} oy</div>
            </div>
            <div className="p-3 rounded-xl bg-yellow-50/50">
              <div className="text-xs text-gray-500">Keyingi to'lov sanasi</div>
              <div className="font-bold text-gray-900 mt-1">{ps.nextDue}</div>
            </div>
          </div>
        </Card>
      )}

      {/* Recent grades */}
      <Card className="overflow-x-auto">
        <div className="p-4 font-bold text-gray-900 border-b border-sakura-100 flex items-center gap-2">📝 Baholar tarixi</div>
        {grades.length === 0 ? (
          <EmptyState icon="📝" title="Hali baholar yo'q" />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-sakura-50/60">
              <tr className="text-left">
                <th className="p-3">Sana</th>
                <th className="p-3">Mavzu</th>
                <th className="p-3">Ball</th>
                <th className="p-3 hidden md:table-cell">Izoh</th>
              </tr>
            </thead>
            <tbody>
              {[...grades].reverse().map((g) => (
                <tr key={g.id} className="border-t border-sakura-50">
                  <td className="p-3 text-gray-600">{helpers.formatDate(g.date)}</td>
                  <td className="p-3 font-semibold">{g.subject}</td>
                  <td className={`p-3 font-bold ${ratingColor(g.score)}`}>{g.score}</td>
                  <td className="p-3 text-gray-500 text-xs hidden md:table-cell">{g.comment || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Payment history */}
      {payments.length > 0 && (
        <Card className="overflow-x-auto">
          <div className="p-4 font-bold text-gray-900 border-b border-sakura-100">📋 To'lovlar tarixi</div>
          <table className="w-full text-sm">
            <thead className="bg-sakura-50/60">
              <tr className="text-left">
                <th className="p-3">Sana</th>
                <th className="p-3">Oy</th>
                <th className="p-3">Summa</th>
                <th className="p-3 hidden md:table-cell">Izoh</th>
              </tr>
            </thead>
            <tbody>
              {[...payments].reverse().map((p) => (
                <tr key={p.id} className="border-t border-sakura-50">
                  <td className="p-3 text-gray-600">{helpers.formatDate(p.paidAt)}</td>
                  <td className="p-3">{p.month}</td>
                  <td className="p-3 font-bold text-emerald-600">{helpers.formatMoney(p.amount)}</td>
                  <td className="p-3 text-gray-500 text-xs hidden md:table-cell">{p.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
