import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: "full" | "orange-pink";
}

export function GradientText({ children, className = "", variant = "full" }: GradientTextProps) {
  const gradientClass = variant === "full" ? "gradient-text" : "gradient-text-orange-pink";
  return <span className={`${gradientClass} ${className}`}>{children}</span>;
}
