import logoSrc from "../assets/logo.png";

interface Props {
  size?: number;
  className?: string;
  withGlow?: boolean;
}

export default function Logo({ size = 44, className = "", withGlow = true }: Props) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-white ${
        withGlow ? "shadow-lg shadow-sakura-300/40 ring-2 ring-sakura-100" : ""
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={logoSrc}
        alt="KONOHA Yapon Maktabi"
        width={size}
        height={size}
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  );
}
