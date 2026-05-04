import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ButtonWithLoadingProps {
  children: React.ReactNode;
  onClick: () => void | Promise<void>;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function ButtonWithLoading({
  children,
  onClick,
  variant = "primary",
  icon,
  className = "",
  disabled = false,
}: ButtonWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading || disabled) return;
    
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white disabled:bg-gray-300 disabled:cursor-not-allowed",
    secondary: "bg-secondary hover:bg-secondary/90 text-white disabled:bg-gray-300 disabled:cursor-not-allowed",
    outline: "border border-border hover:bg-background disabled:bg-muted disabled:cursor-not-allowed",
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${variants[variant]} ${className}`}
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

