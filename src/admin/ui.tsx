import type { ReactNode } from "react";
import { useEffect } from "react";

// ============== CARD ==============
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-sakura-100 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );
}

// ============== STAT CARD ==============
export function StatCard({
  icon,
  label,
  value,
  color = "from-konoha-red to-sakura-600",
  hint,
}: {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
  hint?: string;
}) {
  return (
    <Card className="p-5 hover:-translate-y-1 transition-transform group overflow-hidden relative">
      <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br ${color} opacity-10 group-hover:scale-150 transition-transform duration-700`} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-black text-gray-900">{value}</div>
          <div className="text-sm text-gray-600 mt-1">{label}</div>
          {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
        </div>
      </div>
    </Card>
  );
}

// ============== BUTTON ==============
type BtnVariant = "primary" | "outline" | "danger" | "ghost" | "success";
export function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  size = "md",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };
  const variants: Record<BtnVariant, string> = {
    primary: "bg-gradient-to-r from-konoha-red to-sakura-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
    outline: "bg-white text-konoha-red border-2 border-sakura-200 hover:border-konoha-red hover:bg-sakura-50",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
    ghost: "text-gray-700 hover:bg-sakura-50 hover:text-konoha-red",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

// ============== INPUT ==============
export function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
}: {
  label: string;
  type?: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">{label}{required && " *"}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all text-sm"
      />
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">{label}{required && " *"}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all text-sm cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">{label}{required && " *"}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-sakura-100 focus:border-konoha-red focus:outline-none focus:ring-4 focus:ring-sakura-100 transition-all text-sm resize-none"
      />
    </div>
  );
}

// ============== MODAL ==============
export function Modal({
  open,
  onClose,
  title,
  children,
  width = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 fade-in">
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className={`relative w-full ${width} max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl scale-in`}>
        <div className="sticky top-0 z-10 bg-white border-b border-sakura-100 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-sakura-50 hover:bg-konoha-red text-konoha-red hover:text-white flex items-center justify-center hover:rotate-90 transition-all"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ============== EMPTY STATE ==============
export function EmptyState({ icon = "📭", title, desc }: { icon?: string; title: string; desc?: string }) {
  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-3">{icon}</div>
      <div className="font-bold text-gray-700">{title}</div>
      {desc && <div className="text-sm text-gray-500 mt-1">{desc}</div>}
    </div>
  );
}

// ============== BADGE ==============
export function Badge({ children, color = "sakura" }: { children: ReactNode; color?: "sakura" | "green" | "blue" | "yellow" | "red" | "gray" }) {
  const colors: Record<string, string> = {
    sakura: "bg-sakura-100 text-konoha-red",
    green: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-700",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${colors[color]}`}>{children}</span>;
}

// ============== CONFIRM ==============
export function useConfirm() {
  return (msg: string): boolean => window.confirm(msg);
}
