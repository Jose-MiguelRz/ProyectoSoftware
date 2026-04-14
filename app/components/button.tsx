import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { BUTTON_STYLES } from "../constants/design-tokens";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", isLoading = false, icon, className = "", disabled, ...props }, ref) => {
    const baseClasses = BUTTON_STYLES.base;
    const variantClasses = variant !== "ghost" ? BUTTON_STYLES.variants[variant] : BUTTON_STYLES.variants.ghost;
    const sizeClasses = variant !== "ghost" ? BUTTON_STYLES.sizes[size] : "";

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Procesando...</span>
          </>
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
