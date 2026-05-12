import { useRef, type ReactNode, type MouseEvent } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  onClick,
  className = "",
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`btn-press transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </button>
  );
}
