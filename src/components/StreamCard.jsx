import { useState } from "react";

export default function StreamCard({ stream, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? stream.color + "08" : "#ffffff",
        border: `1.5px solid ${hovered ? stream.color + "40" : "#e8ecf0"}`,
        borderRadius: 16, padding: "28px 24px",
        cursor: "pointer", transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 32px ${stream.color}20` : "0 1px 4px rgba(0,0,0,0.06)",
        display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14
      }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: stream.color + "15",
        border: `2px solid ${stream.color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, transition: "all 0.25s",
        boxShadow: hovered ? `0 4px 16px ${stream.color}30` : "none"
      }}>
        {stream.icon}
      </div>

      <div>
        <div style={{
          display: "inline-block", fontSize: 10, fontWeight: 700,
          color: stream.color, background: stream.color + "15",
          padding: "2px 8px", borderRadius: 6, letterSpacing: "0.08em",
          marginBottom: 6, textTransform: "uppercase"
        }}>
          {stream.code}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>
          {stream.name}
        </div>
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        fontSize: 13, fontWeight: 600, color: stream.color,
        opacity: hovered ? 1 : 0.6, transition: "opacity 0.2s"
      }}>
        Select stream →
      </div>
    </div>
  );
}
