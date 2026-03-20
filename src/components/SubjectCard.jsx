import { useState } from "react";
import { useNavigate } from "react-router-dom";

const actions = [
  { key: "materials", icon: "📄", label: "Study Materials", color: "#2563eb", bg: "#eff6ff" },
  { key: "syllabus", icon: "📋", label: "Syllabus", color: "#16a34a", bg: "#f0fdf4" },
  { key: "videos", icon: "▶️", label: "YouTube", color: "#dc2626", bg: "#fff1f2" },
  { key: "pyq", icon: "📝", label: "PYQ", color: "#d97706", bg: "#fffbeb" },
];

export default function SubjectCard({ subject }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        border: `1.5px solid ${hovered ? "#bfdbfe" : "#e8ecf0"}`,
        borderRadius: 16, padding: "20px",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 8px 24px rgba(37,99,235,0.1)" : "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4, lineHeight: 1.4 }}>
              {subject.name}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span style={{
                fontSize: 11, fontWeight: 600, color: "#2563eb",
                background: "#eff6ff", padding: "2px 8px", borderRadius: 6,
                border: "1px solid #bfdbfe"
              }}>{subject.code}</span>
              {subject.credits && (
                <span style={{
                  fontSize: 11, fontWeight: 500, color: "#6b7280",
                  background: "#f3f4f6", padding: "2px 8px", borderRadius: 6
                }}>{subject.credits} Credits</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {actions.map(action => (
          <button
            key={action.key}
            onClick={() => navigate(`/${action.key}/${subject.id}`)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 12px", borderRadius: 10,
              border: `1px solid ${action.color}25`,
              background: action.bg, cursor: "pointer",
              fontSize: 12, fontWeight: 600, color: action.color,
              transition: "all 0.15s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = action.color;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = action.bg;
              e.currentTarget.style.color = action.color;
            }}
          >
            <span style={{ fontSize: 14 }}>{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
