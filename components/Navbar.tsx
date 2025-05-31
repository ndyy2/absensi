// src/components/layout/Navbar.tsx
import { motion } from "framer-motion";
import Link from "next/link";
import { theme } from "@/lib/theme";

interface NavbarProps {
  isDark: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isDark }) => {
  const items = [
    { id: "kelas", label: "Kelas", icon: "school", route: "/kelas" },
    {
      id: "absensi-siswa",
      label: "Absensi Siswa",
      icon: "people",
      route: "/absensi-siswa",
    },
    {
      id: "statistik",
      label: "Statistik",
      icon: "bar_chart",
      route: "/statistik",
    },
  ];

  return (
    <motion.nav
      style={{
        width: "16rem",
        padding: "1rem",
        height: "100vh",
        position: "sticky",
        top: 0,
        background: isDark
          ? theme.colors.dark.navbarGradient
          : theme.colors.light.navbarGradient,
      }}
      initial={theme.animation.navbar.initial}
      animate={theme.animation.navbar.animate}
      transition={theme.animation.navbar.transition}
    >
      <div className="flex flex-col space-y-4">
        {items.map((item) => (
          <Link key={item.id} href={item.route}>
            <div
              className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-opacity-20 hover:bg-white transition-all duration-300 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              <img
                src={`/icons/${item.icon}.svg`}
                alt={item.label}
                className="w-6 h-6"
              />
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
