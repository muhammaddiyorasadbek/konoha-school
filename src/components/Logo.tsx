import logoSrc from "../assets/logo.png";

interface Props {
  size?: number;
  className?: string;
  withGlow?: boolean;
}

export default function Logo({
  size = 44,
  className = "",
  withGlow = true,
}: Props) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-white ${
        withGlow
          ? "shadow-lg shadow-sakura-300/40 ring-2 ring-sakura-100"
          : ""
      } ${className}`}
      style={{
        width: size,
        height: size,
        overflow: "hidden",
      }}
    >
      <img
        src={logoSrc}
        alt="KONOHA Yapon Maktabi"
        loading="eager"
        className="absolute max-w-none"
        style={{
          width: `${size * 2.55}px`,
          height: `${size * 2.55}px`,
          left: "50%",
          top: `${-size * 0.48}px`,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}
