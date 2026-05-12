import { useMemo } from "react";

export default function SakuraPetals({ count = 18 }: { count?: number }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const duration = 9 + Math.random() * 12;
      const delay = -Math.random() * duration;
      const size = 8 + Math.random() * 14;
      const opacity = 0.4 + Math.random() * 0.5;
      return { i, left, duration, delay, size, opacity };
    });
  }, [count]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.i}
          className="petal"
          style={{
            left: `${p.left}vw`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
