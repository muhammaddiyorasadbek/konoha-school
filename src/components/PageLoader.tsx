import { useEffect, useState } from "react";
import logoSrc from "../assets/logo.png";

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Loader 1.4s ko'rinadi, keyin chiroyli o'chadi
    const t1 = setTimeout(() => setFading(true), 1400);
    const t2 = setTimeout(() => setHidden(true), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center bg-gradient-to-br from-sakura-50 via-white to-sakura-100 transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Decorative kanji background */}
      <div className="absolute inset-0 flex items-center justify-center font-jp text-[40vw] sm:text-[30vw] font-black text-sakura-100/40 leading-none select-none pointer-events-none">
        花
      </div>

      {/* Floating petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${15 + i * 14}%`,
              animationDuration: `${3 + i * 0.5}s`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Center: logo + brand */}
      <div className="relative flex flex-col items-center">
        <div className="loader-bloom relative">
          {/* Glow ring */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-sakura-300 to-konoha-red opacity-40 blur-2xl animate-pulse" />
          <div className="absolute -inset-2 rounded-full border-2 border-dashed border-konoha-red/40 spin-slow" />

          {/* Logo */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white shadow-2xl shadow-sakura-400/40 ring-4 ring-white">
            <img src={logoSrc} alt="KONOHA" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="mt-6 text-center fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="font-jp text-konoha-red text-sm font-bold tracking-[0.4em] mb-1">
            日本語学校
          </div>
          <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-konoha-red via-sakura-600 to-konoha-red bg-clip-text text-transparent gradient-animate" style={{ backgroundSize: "200% 200%" }}>
            KONOHA
          </div>
        </div>

        {/* Loading dots */}
        <div className="mt-5 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-konoha-red animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
