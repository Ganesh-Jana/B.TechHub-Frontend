import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const baseNavItems = [
  { path: "/", icon: "🏠", label: "Home", exact: true },
  { path: "/dashboard", icon: "📊", label: "Dashboard" },
  { path: "/calculator", icon: "🧮", label: "Calculators" },
];
const adminNavItem = {
  path: "/admin",
  icon: "🛠️",
  label: "Admin Panel",
  adminOnly: true,
};

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAdmin } = useAuth();

  const isActive = (path, exact) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  const go = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            display: "none",
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 149,
          }}
          className="sidebar-overlay"
        />
      )}

      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: 240,
          background: "#0f1b2d",
          display: "flex",
          flexDirection: "column",
          zIndex: 150,
          transition: "transform 0.3s ease",
        }}
        className={`sidebar ${isOpen ? "open" : ""}`}
      >
        {/* Logo */}
        <div
          style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#111827",
                border: "1.5px solid rgba(249,115,22,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🎓
            </div>
            <div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  letterSpacing: "-0.3px",
                }}
              >
                <span style={{ color: "#fff" }}>BTech</span>
                <span style={{ color: "#f97316" }}>Hub</span>
              </div>
              <div
                style={{
                  color: "#64748b",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                B.TECH PLATFORM
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "12px 12px", overflowY: "auto" }}>
          <div
            style={{
              color: "#475569",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "4px 8px",
              marginBottom: 4,
            }}
          >
            Navigation
          </div>
          {[...baseNavItems, ...(isAdmin ? [adminNavItem] : [])].map((item) => {
            const active = isActive(item.path, item.exact);
            return (
              <button
                key={item.path}
                onClick={() => go(item.path)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: active ? "rgba(37,99,235,0.2)" : "none",
                  cursor: "pointer",
                  marginBottom: 2,
                  textAlign: "left",
                  transition: "all 0.15s",
                  borderLeft: active
                    ? "3px solid #2563eb"
                    : "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!active)
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "none";
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                    color: active ? "#60a5fa" : "#94a3b8",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              margin: "12px 0",
            }}
          />
          <div
            style={{
              color: "#475569",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "4px 8px",
              marginBottom: 4,
            }}
          >
            Semesters
          </div>

          {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => {
            const active =
              location.pathname.startsWith(`/streams/${sem}`) ||
              location.pathname.startsWith(`/subjects/${sem}`);
            return (
              <button
                key={sem}
                onClick={() => go(`/streams/${sem}`)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: active ? "rgba(37,99,235,0.15)" : "none",
                  cursor: "pointer",
                  marginBottom: 1,
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!active)
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!active)
                    e.currentTarget.style.background = active
                      ? "rgba(37,99,235,0.15)"
                      : "none";
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 700,
                    background: active ? "#2563eb" : "rgba(255,255,255,0.08)",
                    color: active ? "#fff" : "#64748b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {sem}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: active ? "#93c5fd" : "#64748b",
                  }}
                >
                  Semester {sem}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <button
            onClick={() => {
              logout();
            }}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "none",
              background: "rgba(239,68,68,0.1)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#f87171",
              fontSize: 13,
              fontWeight: 500,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(239,68,68,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(239,68,68,0.1)")
            }
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          .sidebar-overlay { display: block !important; }
        }
      `}</style>
    </>
  );
}
