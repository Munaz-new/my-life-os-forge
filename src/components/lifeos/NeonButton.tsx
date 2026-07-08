import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}

export function NeonButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: NeonButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  const variants: Record<Variant, string> = {
    primary:
      "text-primary-foreground shadow-[var(--shadow-neon)] hover:brightness-110 [background:var(--gradient-hero)]",
    secondary:
      "glass text-foreground hover:bg-secondary/60",
    ghost:
      "text-muted-foreground hover:text-foreground hover:bg-white/5",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-50",
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
