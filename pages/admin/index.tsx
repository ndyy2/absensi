// app/page.tsx
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaDownload,
  FaEdit,
  FaTrash,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

// Components
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ResponsiveContainer,
  Bar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";

// Types
interface Student {
  nama: string;
  nis: string;
  kehadiran: "Hadir" | "Izin" | "Sakit" | "Alpa";
  tanggal: string;
  keterangan: string;
  surat: {
    name: string;
    url: string;
  } | null;
  aksi: string[];
}

interface KelasCard {
  kelas: string;
  icon: string;
  students: number;
  hadir: number;
  izin: number;
  sakit: number;
  alpa: number;
  bg: string;
}

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

// Data keseluruhan kelas dan murid
const chartData = [
  { month: "Senin", hadir: 28, izin: 2, sakit: 1, alpa: 1 },
  { month: "Selasa", hadir: 26, izin: 1, sakit: 2, alpa: 1 },
  { month: "Rabu", hadir: 30, izin: 0, sakit: 1, alpa: 1 },
  { month: "Kamis", hadir: 29, izin: 1, sakit: 1, alpa: 1 },
  { month: "Jumat", hadir: 27, izin: 2, sakit: 1, alpa: 2 },
  { month: "Sabtu", hadir: 25, izin: 1, sakit: 2, alpa: 2 },
];

const doughnutData = [
  { name: "Hadir", value: 88, color: "#22c55e" },
  { name: "Izin", value: 6, color: "#eab308" },
  { name: "Sakit", value: 3, color: "#ef4444" },
  { name: "Alpa", value: 3, color: "#9ca3af" },
];

const chartConfig: ChartConfig = {
  hadir: {
    label: "Hadir",
    color: "#22c55e",
  },
  izin: {
    label: "Izin",
    color: "#eab308",
  },
  sakit: {
    label: "Sakit",
    color: "#f97316",
  },
  alpa: {
    label: "Alpa",
    color: "#ef4444",
  },
};

export default function AttendanceDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoized data
  const kelasCards = useMemo(
    (): KelasCard[] => [
      {
        kelas: "X IPA 1",
        icon: "📘",
        students: 32,
        hadir: 28,
        izin: 2,
        sakit: 1,
        alpa: 1,
        bg: "gradient-blue",
      },
      {
        kelas: "X IPA 2",
        icon: "📗",
        students: 30,
        hadir: 26,
        izin: 1,
        sakit: 2,
        alpa: 1,
        bg: "gradient-green",
      },
      {
        kelas: "XI IPS 1",
        icon: "📕",
        students: 28,
        hadir: 25,
        izin: 1,
        sakit: 1,
        alpa: 1,
        bg: "gradient-purple",
      },
      {
        kelas: "XII IPA 3",
        icon: "📙",
        students: 30,
        hadir: 27,
        izin: 2,
        sakit: 0,
        alpa: 1,
        bg: "gradient-orange",
      },
    ],
    []
  );

  const absensiRows = useMemo(
    (): Student[] => [
      {
        nama: "Raka Darma",
        nis: "2200123",
        kehadiran: "Izin",
        tanggal: "2025-05-30",
        keterangan: "Mengikuti lomba OSN tingkat provinsi",
        surat: {
          name: "Surat_Izin_Raka.pdf",
          url: "#",
        },
        aksi: ["Detail", "Edit", "Hapus"],
      },
      {
        nama: "Nadia Putri",
        nis: "2200456",
        kehadiran: "Sakit",
        tanggal: "2025-05-30",
        keterangan: "Demam tinggi, istirahat 3 hari",
        surat: {
          name: "Surat_Dokter_Nadia.jpg",
          url: "#",
        },
        aksi: ["Detail", "Edit", "Hapus"],
      },
      {
        nama: "Arya Pratama",
        nis: "2200789",
        kehadiran: "Hadir",
        tanggal: "2025-05-29",
        keterangan: "-",
        surat: null,
        aksi: ["Detail", "Edit", "Hapus"],
      },
      {
        nama: "Siti Rahayu",
        nis: "2200912",
        kehadiran: "Alpa",
        tanggal: "2025-05-29",
        keterangan: "Tidak ada keterangan",
        surat: null,
        aksi: ["Detail", "Edit", "Hapus"],
      },
    ],
    []
  );

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const formattedDate = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setCurrentTime(`${formattedTime} • ${formattedDate}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  // Open student detail modal
  const openStudentModal = useCallback((student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  }, []);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      {/* Header */}
      <Header
        currentTime={currentTime}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="container mx-auto px-4 pb-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Class Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kelasCards.map((card, index) => (
            <ClassCard key={index} card={card} variants={cardVariants} />
          ))}
        </div>

        {/* Charts Section */}
        <ChartsSection chartConfig={chartConfig} />

        {/* Attendance Table */}
        <AttendanceTable
          absensiRows={absensiRows}
          openStudentModal={openStudentModal}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Student Detail Modal */}
      {isModalOpen && selectedStudent && (
        <StudentDetailModal
          selectedStudent={selectedStudent}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}

// Header Component
const Header = ({
  currentTime,
  isMenuOpen,
  setIsMenuOpen,
}: {
  currentTime: string;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <header className="p-6 flex justify-between items-center">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg mr-3">
        <span className="text-2xl">📊</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Panel Absensi Admin</h1>
        <p className="text-gray-400 text-sm">
          Dashboard monitoring kehadiran siswa
        </p>
      </div>
    </motion.div>

    <div className="flex items-center space-x-4">
      <div className="hidden md:block text-sm text-gray-300 bg-gray-800/50 px-4 py-2 rounded-lg">
        {currentTime || "Loading..."}
      </div>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-800 px-4 py-2 rounded-lg transition"
        >
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-8 h-8 rounded-full flex items-center justify-center">
            <span className="font-bold">A</span>
          </div>
          <span>Admin</span>
          <FaChevronDown
            className={`transition ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: "absolute",
              right: 0,
              marginTop: "0.5rem",
              width: "12rem",
              backgroundColor: "rgba(31, 41, 55, 0.9)",
              backdropFilter: "blur(8px)",
              borderRadius: "0.5rem",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              zIndex: 10,
            }}
          >
            <div className="p-4 border-b border-gray-700">
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-gray-400">admin@sekolah.id</p>
            </div>
            <div className="p-2">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-700/50 rounded-md transition">
                Pengaturan Akun
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-700/50 rounded-md transition">
                Keluar
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  </header>
);

// Hero Section Component
const HeroSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    style={{
      position: "relative",
      padding: "2rem",
      borderRadius: "1rem",
      marginBottom: "2rem",
      overflow: "hidden",
      backdropFilter: "blur(8px)",
      backgroundColor: "rgba(31, 41, 55, 0.9)",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>
    <div className="relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
            <span className="mr-3">📊</span>
            Dashboard Kehadiran
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Pantau kehadiran siswa dengan visualisasi dan data real-time. Kelola
            data absensi dengan mudah dan efisien.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="glassmorphic-button px-4 py-2 rounded-lg flex items-center">
            <FaDownload className="mr-2" /> Ekspor Data
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-lg hover:opacity-90 transition">
            Tambah Data
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

// Class Card Component
const ClassCard = ({ card, variants }: { card: KelasCard; variants: any }) => {
  const attendancePercentage = Math.round((card.hadir / card.students) * 100);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{
        padding: "1.5rem",
        borderRadius: "1rem",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(8px)",
        backgroundColor:
          card.bg === "gradient-blue"
            ? "rgba(59, 130, 246, 0.2)"
            : card.bg === "gradient-green"
            ? "rgba(34, 197, 94, 0.2)"
            : card.bg === "gradient-purple"
            ? "rgba(139, 92, 246, 0.2)"
            : "rgba(245, 158, 11, 0.2)",
        backgroundImage:
          card.bg === "gradient-blue"
            ? "linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))"
            : card.bg === "gradient-green"
            ? "linear-gradient(to bottom right, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))"
            : card.bg === "gradient-purple"
            ? "linear-gradient(to bottom right, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2))"
            : "linear-gradient(to bottom right, rgba(245, 158, 11, 0.2), rgba(249, 115, 22, 0.2))",
      }}
    >
      <div className="absolute top-4 right-4 text-3xl opacity-20">
        {card.icon}
      </div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">{card.kelas}</h3>
        <p className="text-gray-300 mb-4">{card.students} Siswa</p>

        <div className="grid grid-cols-4 gap-2">
          <AttendanceBadge count={card.hadir} label="Hadir" color="green-400" />
          <AttendanceBadge count={card.izin} label="Izin" color="yellow-400" />
          <AttendanceBadge count={card.sakit} label="Sakit" color="red-400" />
          <AttendanceBadge count={card.alpa} label="Alpa" color="gray-400" />
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex justify-between text-sm mb-1">
            <span>Kehadiran</span>
            <span>{attendancePercentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
              style={{ width: `${attendancePercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Attendance Badge Component
const AttendanceBadge = ({
  count,
  label,
  color,
}: {
  count: number;
  label: string;
  color: string;
}) => (
  <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg text-center">
    <p className="text-2xl font-bold">{count}</p>
    <p className={`text-xs text-${color}`}>{label}</p>
  </div>
);

// Charts Section Component
const ChartsSection = ({ chartConfig }: { chartConfig: ChartConfig }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
    <WeeklyAttendanceChart chartConfig={chartConfig} />
    <AttendancePercentageChart />
  </div>
);

// Weekly Attendance Chart Component
const WeeklyAttendanceChart = ({
  chartConfig,
}: {
  chartConfig: ChartConfig;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    style={{
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      padding: "1.5rem",
      borderRadius: "1rem",
    }}
  >
    <h3 className="text-xl font-bold mb-4">Kehadiran Mingguan</h3>
    <div className="h-64">
      <ChartContainer
        config={chartConfig}
        className="min-h-[150px] w-full mt-10"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeOpacity={0.1} />
            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartConfig[key].color}
                radius={[4, 4, 0, 0]}
                barSize={16}
              />
            ))}
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#cbd5e1", fontSize: 12 }}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend className="mt-4" content={<ChartLegendContent />} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  </motion.div>
);

// Attendance Percentage Chart Component
const AttendancePercentageChart = () => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={600}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "1rem",
        padding: "1.5rem",
      }}
    >
      <h3 className="text-xl font-bold mb-4">Persentase Kehadiran</h3>
      <div className="flex flex-col items-center">
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={doughnutData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {doughnutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                formatter={(value) => [`${value}%`, "Persentase"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4 w-full">
          {doughnutData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold">{item.value}%</div>
              <div className="text-sm" style={{ color: item.color }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Attendance Table Component
const AttendanceTable = ({
  absensiRows,
  openStudentModal,
}: {
  absensiRows: Student[];
  openStudentModal: (student: Student) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    style={{
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      padding: "1.5rem",
      borderRadius: "1rem",
    }}
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h3 className="text-xl font-bold">Data Absensi Siswa</h3>
      <div className="flex mt-4 md:mt-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari siswa..."
            className="glassmorphic-input pl-10 pr-4 py-2 rounded-lg"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <select className="glassmorphic-input ml-2 px-4 py-2 rounded-lg">
          <option>Semua Kelas</option>
          <option>X IPA 1</option>
          <option>X IPA 2</option>
          <option>XI IPS 1</option>
          <option>XII IPA 3</option>
        </select>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700/50">
            <th className="text-left py-3 px-4">Nama</th>
            <th className="text-left py-3 px-4">NIS</th>
            <th className="text-left py-3 px-4">Kehadiran</th>
            <th className="text-left py-3 px-4">Tanggal</th>
            <th className="text-left py-3 px-4">Keterangan</th>
            <th className="text-left py-3 px-4">Surat</th>
            <th className="text-left py-3 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {absensiRows.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              openStudentModal={openStudentModal}
            />
          ))}
        </tbody>
      </table>
    </div>

    <TablePagination />
  </motion.div>
);

// Table Row Component
const TableRow = ({
  row,
  openStudentModal,
}: {
  row: Student;
  openStudentModal: (student: Student) => void;
}) => (
  <tr className="border-b border-gray-700/30 hover:bg-gray-800/30 transition">
    <td className="py-3 px-4">{row.nama}</td>
    <td className="py-3 px-4">{row.nis}</td>
    <td className="py-3 px-4">
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.kehadiran === "Hadir"
            ? "bg-green-500/20 text-green-400"
            : row.kehadiran === "Izin"
            ? "bg-yellow-500/20 text-yellow-400"
            : row.kehadiran === "Sakit"
            ? "bg-red-500/20 text-red-400"
            : "bg-gray-500/20 text-gray-400"
        }`}
      >
        {row.kehadiran}
      </span>
    </td>
    <td className="py-3 px-4">{row.tanggal}</td>
    <td className="py-3 px-4 max-w-xs">{row.keterangan}</td>
    <td className="py-3 px-4">
      {row.surat ? (
        <a
          href={row.surat.url}
          className="text-cyan-400 hover:underline flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDownload className="mr-1" /> {row.surat.name}
        </a>
      ) : (
        <span className="text-gray-500">-</span>
      )}
    </td>
    <td className="py-3 px-4">
      <div className="flex space-x-2">
        {row.aksi.map((action, actionIndex) => (
          <button
            key={actionIndex}
            className={`px-3 py-1 rounded-lg text-sm ${
              action === "Detail"
                ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400"
                : action === "Edit"
                ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
                : "bg-red-500/20 hover:bg-red-500/30 text-red-400"
            }`}
            onClick={() => action === "Detail" && openStudentModal(row)}
          >
            {action}
          </button>
        ))}
      </div>
    </td>
  </tr>
);

// Table Pagination Component
const TablePagination = () => (
  <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
    <div className="text-gray-400 text-sm">Menampilkan 4 dari 128 data</div>
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3].map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded-lg ${
            page === 1
              ? "bg-gradient-to-r from-blue-500 to-cyan-500"
              : "glassmorphic-button"
          }`}
        >
          {page}
        </button>
      ))}
      <button className="glassmorphic-button px-3 py-1 rounded-lg">
        Selanjutnya
      </button>
    </div>
  </div>
);

// Footer Component
const Footer = () => (
  <footer className="glassmorphic mt-12 py-6 text-center text-gray-400">
    <div className="container mx-auto px-4">
      <p className="mb-2">© 2025 Axelon Absensi System — Versi Elegan</p>
      <div className="flex justify-center space-x-4 text-xl">
        <span>🧾</span>
        <span>📊</span>
        <span>🧠</span>
      </div>
    </div>
  </footer>
);

// Student Detail Modal Component
const StudentDetailModal = ({
  selectedStudent,
  setIsModalOpen,
}: {
  selectedStudent: Student;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "1rem",
        width: "100%",
        maxWidth: "42rem",
      }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Detail Kehadiran Siswa</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="glassmorphic-button p-2 rounded-lg hover:bg-gray-700/50"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nama</label>
              <div className="glassmorphic-input p-3 rounded-lg">
                {selectedStudent.nama}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">NIS</label>
              <div className="glassmorphic-input p-3 rounded-lg">
                {selectedStudent.nis}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Kelas</label>
              <div className="glassmorphic-input p-3 rounded-lg">X IPA 1</div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Jenis Kehadiran
              </label>
              <div className="p-3 rounded-lg">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedStudent.kehadiran === "Hadir"
                      ? "bg-green-500/20 text-green-400"
                      : selectedStudent.kehadiran === "Izin"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : selectedStudent.kehadiran === "Sakit"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {selectedStudent.kehadiran}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Tanggal</label>
            <input
              type="date"
              defaultValue={selectedStudent.tanggal}
              className="glassmorphic-input w-full p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Keterangan
            </label>
            <textarea
              className="glassmorphic-input w-full p-3 rounded-lg"
              rows={3}
              defaultValue={selectedStudent.keterangan}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Surat Pendukung
            </label>
            {selectedStudent.surat ? (
              <div className="glassmorphic-input p-3 rounded-lg flex justify-between items-center">
                <div className="flex items-center">
                  <FaDownload className="mr-2 text-cyan-400" />
                  <span>{selectedStudent.surat.name}</span>
                </div>
                <button className="text-cyan-400 hover:underline text-sm">
                  Lihat Pratinjau
                </button>
              </div>
            ) : (
              <div className="glassmorphic-input p-3 rounded-lg text-center text-gray-500">
                Tidak ada file
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              className="glassmorphic-button px-4 py-2 rounded-lg"
              onClick={() => setIsModalOpen(false)}
            >
              Tutup
            </button>
            <button className="glassmorphic-button bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg">
              Edit
            </button>
            <button className="glassmorphic-button bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);
