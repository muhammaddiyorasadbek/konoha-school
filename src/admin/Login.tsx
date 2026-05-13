import { useState } from "react";
import { useAuth } from "./AuthContext";
import logoSrc from "../assets/logo.png";

interface Props {
  onBack: () => void;
}

export default function Login({ onBack }: Props) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const r = await login(username, password);
      if (!r.ok) setError(r.error || "Xatolik yuz berdi");
    } catch {
      setError("Tarmoq xatosi. Internetni tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-sakura-50 via-white to-sakura-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-sakura-200/40 blur-3xl blob" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-sakura-300/30 blur-3xl blob" style={{ animationDelay: "5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-jp text-[40vw] font-black text-sakura-100/30 leading-none select-none">学</div>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="petal" style={{ left: `${i * 11}%`, animationDuration: `${8 + (i % 4)}s`, animationDelay: `${i * 0.4}s`, opacity: 0.6 }} />
        ))}
      </div>
      <div className="relative w-full max-w-md fade-up">
        <button onClick={onBack} className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-konoha-red transition-colors">
          ← Saytga qaytish
        </button>
        <div className="bg-white rounded-[32px] shadow-2xl shadow-sakura-300/40 border border-sakura-100 overflow-hidden">
          <div className="relative bg-gradient-to-br from-konoha-red via-sakura-600 to-sakura-700 p-7 text-white text-center overflow-hidden">
            <div className="absolute -top-4 -right-4 font-jp text-[120px] font-black text-white/10 leading-none">学</div>
            <div className="absolute -bottom-8 -left-4 font-jp text-[100px] font-black text-white/10 leading-none">校</div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-xl mb-3 ring-4 ring-white/30">
                <img src={logoSrc} alt="KONOHA" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="font-jp text-xs tracking-[0.4em] opacity-90 mb-1">管理パネル</div>
              <h1 className="text-2xl font-black">Boshqaruv paneli</h1>
              <p className="text-sm text-sakura-100 mt-1">Hisobingizga kiring</p>
            </div>
          </div>
          <form onSubmit={submit} className="p-7 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Login</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                <input type="text" required autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Loginingizni kiriting" className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Parol</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </span>
                <input type={showPassword ? "text" : "password"} required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-12 py-3 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all" />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-konoha-red transition-colors" tabIndex={-1}>
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm fade-in flex items-center gap-2">
                <span>⚠️</span><span>{error}</span>
              </div>
            )}
            <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-konoha-red to-sakura-600 text-white font-bold shadow-lg shadow-sakura-400/40 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all disabled:opacity-70 disabled:pointer-events-none">
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" /><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" /></svg>
                  Bulutdan yuklanmoqda...
                </span>
              ) : (
                <span className="inline-flex items-center justify-center gap-2"><span>Kirish</span><span>🌸</span></span>
              )}
            </button>
            <div className="pt-2 text-center text-xs text-gray-400">
              <span className="inline-flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Sizning ma'lumotlaringiz xavfsiz himoyalangan
              </span>
            </div>
          </form>
        </div>
        <div className="text-center mt-5 text-xs text-gray-500">🌸 KONOHA Yapon Maktabi</div>
      </div>
    </div>
  );
}
