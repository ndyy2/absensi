export const theme = {
  default: "dark",
  switchable: true,
  colors: {
    dark: {
      backgroundGradient: "linear-gradient(135deg, #1e3a8a, #2563eb)",
      background: "#1f2937",
      text: "#e0e7ff",
      navbarGradient: "linear-gradient(90deg, #1e3a8a, #2563eb)",
      button: {
        background: "#2563eb",
        hoverBackground: "#1e40af",
        text: "#e0e7ff",
        gradient: "linear-gradient(135deg, #2563eb, #1e40af)",
      },
    },
    light: {
      backgroundGradient: "linear-gradient(135deg, #93c5fd, #60a5fa)",
      background: "#f9fafb",
      text: "#1f2937",
      navbarGradient: "linear-gradient(90deg, #93c5fd, #60a5fa)",
      button: {
        background: "#60a5fa",
        hoverBackground: "#3b82f6",
        text: "#1f2937",
        gradient: "linear-gradient(135deg, #60a5fa, #3b82f6)",
      },
    },
  },
  animation: {
    themeToggleButton: {
      initial: { rotate: 0, scale: 1 },
      animate: { rotate: 360, scale: 1.1 },
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    pageTransition: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.5 },
    },
    navbar: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4 },
    },
  },
};
