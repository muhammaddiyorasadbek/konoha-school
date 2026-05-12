import { useRef, type ReactNode, type MouseEvent } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 8,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * intensity;
    const ry = (x - 0.5) * intensity;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;

    // Glow position
    el.style.setProperty("--glow-x", `${x * 100}%`);
    el.style.setProperty("--glow-y", `${y * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card relative ${className}`}
      style={{
        background:
          "radial-gradient(circle at var(--glow-x,50%) var(--glow-y,50%), rgba(255,196,212,0.18), transparent 50%), white",
      }}
    >
      {children}
    </div>
  );
}
