import { useState } from "react";

const semColors = [
  { bg: "#eff6ff", border: "#bfdbfe", accent: "#2563eb", text: "#1e40af" },
  { bg: "#f0fdf4", border: "#bbf7d0", accent: "#16a34a", text: "#166534" },
  { bg: "#fdf4ff", border: "#e9d5ff", accent: "#9333ea", text: "#7e22ce" },
  { bg: "#fff7ed", border: "#fed7aa", accent: "#ea580c", text: "#9a3412" },
  { bg: "#fefce8", border: "#fde68a", accent: "#ca8a04", text: "#854d0e" },
  { bg: "#f0fdfa", border: "#99f6e4", accent: "#0d9488", text: "#134e4a" },
  { bg: "#fff1f2", border: "#fecdd3", accent: "#e11d48", text: "#9f1239" },
  { bg: "#f8fafc", border: "#cbd5e1", accent: "#475569", text: "#1e293b" },
];

export default function SemesterCard({ semester, onClick }) {
  const [hovered, setHovered] = useState(false);
  const c = semColors[(semester.number - 1) % 8];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? c.bg : "#ffffff",
        border: `1.5px solid ${hovered ? c.border : "#e8ecf0"}`,
        borderRadius: 16,
        padding: "22px 20px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 12px 32px ${c.accent}20`
          : "0 1px 4px rgba(0,0,0,0.06)",
        position: "relative", overflow: "hidden"
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${c.accent}, ${c.accent}88)`,
        borderRadius: "16px 16px 0 0"
      }} />

      {/* Icon */}
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: hovered ? "#fff" : c.bg,
        border: `1.5px solid ${c.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, marginBottom: 14,
        boxShadow: hovered ? `0 4px 12px ${c.accent}25` : "none",
        transition: "all 0.25s"
      }}>
        {semester.icon}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: c.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
        SEMESTER {semester.number}
      </div>

      <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4, lineHeight: 1.3 }}>
        {semester.name}
      </div>

      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 16, lineHeight: 1.5 }}>
        {semester.description}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontSize: 12, fontWeight: 600,
          color: c.text, background: c.bg,
          padding: "3px 10px", borderRadius: 100,
          border: `1px solid ${c.border}`
        }}>
          {semester.subjectCount} subjects
        </span>

        <span style={{
          fontSize: 12, fontWeight: 600, color: c.accent,
          display: "flex", alignItems: "center", gap: 4,
          opacity: hovered ? 1 : 0, transition: "opacity 0.2s"
        }}>
          View → 
        </span>
      </div>
    </div>
  );
}
