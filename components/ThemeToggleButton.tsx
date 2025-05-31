import { motion } from "framer-motion";
import { theme } from "@/lib/theme";

interface ThemeToggleButtonProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  isDark,
  setIsDark,
}) => {
  return (
    <motion.button
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        padding: "0.75rem",
        borderRadius: "0.75rem",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        background: isDark
          ? theme.colors.dark.button.gradient
          : theme.colors.light.button.gradient,
        color: isDark
          ? theme.colors.dark.button.text
          : theme.colors.light.button.text,
      }}
      onTap={() => setIsDark(!isDark)}
      initial={theme.animation.themeToggleButton.initial}
      animate={theme.animation.themeToggleButton.animate}
      transition={theme.animation.themeToggleButton.transition}
      aria-label="Toggle Theme"
    >
      {isDark ? "☀️" : "🌙"}
    </motion.button>
  );
};

export default ThemeToggleButton;
