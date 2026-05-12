import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x, ty = y;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const animate = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    const raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden md:block fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[2] mix-blend-multiply"
      style={{
        background:
          "radial-gradient(circle, rgba(255,163,189,0.25), rgba(245,90,133,0.08) 40%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  );
}
