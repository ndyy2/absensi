"use client";

import { motion } from "framer-motion";

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface BarChartProps {
  data: {
    labels: string[];
    datasets: Dataset[];
  };
  maxValue?: number; // maksimal nilai untuk scaling bar
}

export default function BarChart({ data, maxValue = 50 }: BarChartProps) {
  if (!data || !data.labels || !data.datasets) return null;

  // Buat total per label (misal Senin) dengan menjumlah semua dataset untuk hari itu
  const totals = data.labels.map((_, i) =>
    data.datasets.reduce((sum, ds) => sum + (ds.data[i] || 0), 0)
  );

  // Ambil nilai maksimal untuk scale bar (bisa custom lewat maxValue prop)
  const maxDataValue = Math.max(maxValue, ...totals);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a1c2e 0%, #2a2d4a 100%)",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        color: "#e2e8f0",
        maxWidth: 700,
        margin: "auto",
        overflowX: "auto",
      }}
    >
      <h3 style={{ fontSize: 20, fontWeight: "600", marginBottom: 24 }}>
        Kehadiran Mingguan
      </h3>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 12,
          height: 200,
        }}
      >
        {data.labels.map((label, index) => {
          // Kumpulkan data per hari index, setiap dataset punya nilai
          const barSegments = data.datasets.map((ds) => ({
            label: ds.label,
            value: ds.data[index] || 0,
            color: ds.backgroundColor,
          }));

          // Hitung total untuk hari ini, buat skala tinggi bar
          const totalValue = totals[index];

          return (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 60,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  height: 150,
                  width: "100%",
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  backgroundColor: "#111827",
                }}
              >
                {barSegments.map(({ value, color, label }, i) => {
                  const heightPercent = (value / maxDataValue) * 100;

                  return (
                    <motion.div
                      key={label}
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      title={`${label}: ${value}`}
                      style={{
                        backgroundColor: color,
                        width: "100%",
                        borderTop:
                          i === barSegments.length - 1
                            ? "none"
                            : "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  );
                })}
              </div>

              <span
                style={{
                  marginTop: 8,
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#cbd5e1",
                  userSelect: "none",
                  textAlign: "center",
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
