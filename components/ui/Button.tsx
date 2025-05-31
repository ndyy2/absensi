// src/components/ui/Button.tsx
import { ReactNode } from "react";
import { theme } from "@/lib/theme";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isDark?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className,
  onClick,
  isDark,
}) => {
  const baseStyles = "rounded-lg px-4 py-2 transition-all duration-300";
  const primaryStyles = isDark
    ? "button-gradient-dark text-white hover:bg-[#1e40af]"
    : "button-gradient-light text-gray-900 hover:bg-[#3b82f6]";
  const secondaryStyles = isDark
    ? "bg-transparent border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white"
    : "bg-transparent border-2 border-[#60a5fa] text-[#60a5fa] hover:bg-[#60a5fa] hover:text-gray-900";

  return (
    <button
      className={`${baseStyles} ${
        variant === "primary" ? primaryStyles : secondaryStyles
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
