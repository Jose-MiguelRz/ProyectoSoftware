import { CARD_STYLES, SPACING } from "../constants/design-tokens";

interface CardProps {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
  className?: string;
}

export function Card({ children, padding = "md", hover = false, className = "" }: CardProps) {
  const baseClasses = CARD_STYLES.base;
  const paddingClass = CARD_STYLES.padding[padding];
  const hoverClass = hover ? CARD_STYLES.hover : "";

  return (
    <div className={`${baseClasses} ${paddingClass} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
