import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={{
      position: "fixed", top: 0, right: 0, left: 240,
      height: 64, background: "#ffffff",
      borderBottom: "1px solid #e8ecf0",
      display: "flex", alignItems: "center",
      padding: "0 24px", gap: 16, zIndex: 100,
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
    }}>
      {/* Mobile menu */}
      <button onClick={onMenuToggle} style={{
        display: "none", background: "none", border: "none",
        cursor: "pointer", fontSize: 20, color: "#374151"
      }} className="menu-btn">☰</button>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 480, position: "relative" }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#9ca3af" }}>🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search subjects, materials, PYQ..."
          style={{
            width: "100%", padding: "9px 12px 9px 38px",
            borderRadius: 10, border: "1.5px solid #e5e7eb",
            background: "#f9fafb", fontFamily: "inherit",
            fontSize: 14, color: "#111827", outline: "none",
            transition: "border-color 0.2s"
          }}
          onFocus={e => e.target.style.borderColor = "#2563eb"}
          onBlur={e => e.target.style.borderColor = "#e5e7eb"}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
        {/* Calculator shortcut */}
        <button onClick={() => navigate("/calculator")} title="Calculators" style={{
          width: 38, height: 38, borderRadius: 10, border: "1.5px solid #e5e7eb",
          background: "none", cursor: "pointer", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#6b7280", transition: "all 0.2s"
        }} onMouseEnter={e => { e.target.style.background = "#eff6ff"; e.target.style.borderColor = "#bfdbfe"; e.target.style.color = "#2563eb"; }}
           onMouseLeave={e => { e.target.style.background = "none"; e.target.style.borderColor = "#e5e7eb"; e.target.style.color = "#6b7280"; }}>
          🧮
        </button>

        {/* Notifications */}
        <button style={{
          width: 38, height: 38, borderRadius: 10, border: "1.5px solid #e5e7eb",
          background: "none", cursor: "pointer", fontSize: 16, position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280"
        }}>
          🔔
          <span style={{
            position: "absolute", top: 6, right: 6, width: 8, height: 8,
            background: "#ef4444", borderRadius: "50%", border: "1.5px solid #fff"
          }} />
        </button>

        {/* User avatar */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowDropdown(!showDropdown)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "6px 10px",
            borderRadius: 10, border: "1.5px solid #e5e7eb", background: "none",
            cursor: "pointer", transition: "all 0.2s"
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 13
            }}>
              {user?.name?.[0]?.toUpperCase() || "S"}
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{user?.name || "Student"}</span>
            <span style={{ fontSize: 11, color: "#9ca3af" }}>▼</span>
          </button>
          {showDropdown && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 8px)",
              background: "#fff", border: "1px solid #e5e7eb",
              borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              minWidth: 180, overflow: "hidden", zIndex: 200
            }}>
              {[
                { label: "📊 Dashboard", action: () => navigate("/dashboard") },
                { label: "👤 Profile", action: () => {} },
                { label: "⚙️ Settings", action: () => {} },
              ].map(item => (
                <button key={item.label} onClick={() => { item.action(); setShowDropdown(false); }} style={{
                  width: "100%", padding: "10px 16px", textAlign: "left",
                  border: "none", background: "none", cursor: "pointer",
                  fontSize: 13, color: "#374151", transition: "background 0.15s"
                }} onMouseEnter={e => e.target.style.background = "#f3f4f6"}
                   onMouseLeave={e => e.target.style.background = "none"}>
                  {item.label}
                </button>
              ))}
              <div style={{ borderTop: "1px solid #e5e7eb", margin: "4px 0" }} />
              <button onClick={handleLogout} style={{
                width: "100%", padding: "10px 16px", textAlign: "left",
                border: "none", background: "none", cursor: "pointer",
                fontSize: 13, color: "#ef4444"
              }}>
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          header { left: 0 !important; }
          .menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
