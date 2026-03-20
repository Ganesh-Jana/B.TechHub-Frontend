import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    materials: 0,
    pyq: 0,
    videos: 0,
    users: 0,
  });
  const [semesters, setSemesters] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch platform stats
    fetch("https://btechhub-backend-production.up.railway.app/api/stats", {
      headers,
    })
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoadingStats(false));

    // Fetch semesters for quick access
    fetch("https://btechhub-backend-production.up.railway.app/api/semesters", {
      headers,
    })
      .then((r) => r.json())
      .then((data) => setSemesters(Array.isArray(data) ? data.slice(0, 4) : []))
      .catch(() => {});

    // Load recent activity from localStorage (set by other pages on visit)
    try {
      const stored = JSON.parse(
        localStorage.getItem("btechhub_activity") || "[]",
      );
      setRecentActivity(stored.slice(0, 8));
    } catch {
      setRecentActivity([]);
    }
  }, []);

  const statCards = [
    {
      icon: "📚",
      label: "Study Materials",
      value: loadingStats ? "..." : stats.materials || 0,
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      icon: "📝",
      label: "PYQ Papers",
      value: loadingStats ? "..." : stats.pyq || 0,
      color: "#d97706",
      bg: "#fffbeb",
    },
    {
      icon: "▶️",
      label: "Video Lectures",
      value: loadingStats ? "..." : stats.videos || 0,
      color: "#dc2626",
      bg: "#fff1f2",
    },
    {
      icon: "🎓",
      label: "Registered Users",
      value: loadingStats ? "..." : stats.users || 0,
      color: "#16a34a",
      bg: "#f0fdf4",
    },
  ];

  const quickAccess = [
    { icon: "🏠", label: "Home", route: "/", color: "#0f172a", bg: "#f8fafc" },
    {
      icon: "🧮",
      label: "Calculators",
      route: "/calculator",
      color: "#7c3aed",
      bg: "#faf5ff",
    },
    {
      icon: "🛠️",
      label: "Admin Panel",
      route: "/admin",
      color: "#ea580c",
      bg: "#fff7ed",
    },
  ];

  const activityTypeConfig = {
    material: { icon: "📄", color: "#2563eb", label: "Notes" },
    pyq: { icon: "📝", color: "#d97706", label: "PYQ" },
    syllabus: { icon: "📋", color: "#16a34a", label: "Syllabus" },
    video: { icon: "▶️", color: "#dc2626", label: "Video" },
  };

  return (
    <Layout title="My Dashboard" breadcrumb={["Home", "Dashboard"]}>
      {/* Welcome banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b, #2563eb)",
          borderRadius: 16,
          padding: "24px 28px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 14, color: "#93c5fd", marginBottom: 4 }}>
            Welcome back 👋
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.3px",
            }}
          >
            {user?.name || "Student"}
          </div>
          <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>
            {user?.email || ""}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            {
              label: "Study Materials",
              value: loadingStats ? "..." : stats.materials || 0,
            },
            {
              label: "PYQ Papers",
              value: loadingStats ? "..." : stats.pyq || 0,
            },
            {
              label: "Video Lectures",
              value: loadingStats ? "..." : stats.videos || 0,
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: "10px 18px",
                textAlign: "center",
                minWidth: 90,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 10, color: "#93c5fd" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {statCards.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "16px 18px",
              border: "1px solid #e8ecf0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: 2,
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        {/* Quick Access */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "20px",
            border: "1px solid #e8ecf0",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 14,
            }}
          >
            ⚡ Quick Access
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {quickAccess.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.route)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: `1px solid ${item.color}20`,
                  background: item.bg,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = item.color;
                  e.currentTarget.querySelector("span.label").style.color =
                    "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = item.bg;
                  e.currentTarget.querySelector("span.label").style.color =
                    item.color;
                }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span
                  className="label"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: item.color,
                    flex: 1,
                  }}
                >
                  {item.label}
                </span>
                <span style={{ fontSize: 12, color: item.color }}>→</span>
              </button>
            ))}

            {/* Semester quick links */}
            <div
              style={{
                borderTop: "1px solid #f1f5f9",
                marginTop: 4,
                paddingTop: 10,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#9ca3af",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Jump to Semester
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 6,
                }}
              >
                {semesters.length > 0
                  ? semesters.map((sem) => (
                      <button
                        key={sem.id}
                        onClick={() => navigate(`/streams/${sem.id}`)}
                        style={{
                          padding: "7px 10px",
                          borderRadius: 8,
                          border: "1px solid #e5e7eb",
                          background: "#f9fafb",
                          cursor: "pointer",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#374151",
                          textAlign: "center",
                          fontFamily: "inherit",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#2563eb";
                          e.currentTarget.style.color = "#fff";
                          e.currentTarget.style.borderColor = "#2563eb";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#f9fafb";
                          e.currentTarget.style.color = "#374151";
                          e.currentTarget.style.borderColor = "#e5e7eb";
                        }}
                      >
                        Sem {sem.number}
                      </button>
                    ))
                  : [1, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        onClick={() => navigate(`/streams/${n}`)}
                        style={{
                          padding: "7px 10px",
                          borderRadius: 8,
                          border: "1px solid #e5e7eb",
                          background: "#f9fafb",
                          cursor: "pointer",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#374151",
                          textAlign: "center",
                          fontFamily: "inherit",
                        }}
                      >
                        Sem {n}
                      </button>
                    ))}
              </div>
            </div>
          </div>
        </div>

        {/* Account info */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "20px",
            border: "1px solid #e8ecf0",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 14,
            }}
          >
            👤 Account Info
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "#fff",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {(user?.name || "S")[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                {user?.name || "Student"}
              </div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {user?.email || ""}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#16a34a",
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                ● Active
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Platform", value: "BTechHub" },
              { label: "Access Level", value: "Student" },
              {
                label: "Content",
                value: `${(stats.materials || 0) + (stats.pyq || 0) + (stats.videos || 0)} resources available`,
              },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: "#f9fafb",
                }}
              >
                <span style={{ fontSize: 12, color: "#6b7280" }}>
                  {row.label}
                </span>
                <span
                  style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "20px",
          border: "1px solid #e8ecf0",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 14,
          }}
        >
          🕐 Recently Visited
        </div>

        {recentActivity.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "24px 0", color: "#9ca3af" }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>👀</div>
            <div style={{ fontSize: 13 }}>
              No recent activity yet — start browsing subjects to see your
              history here.
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {recentActivity.map((item, i) => {
              const cfg =
                activityTypeConfig[item.type] || activityTypeConfig.material;
              return (
                <div
                  key={i}
                  onClick={() => item.route && navigate(item.route)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: 10,
                    cursor: item.route ? "pointer" : "default",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      flexShrink: 0,
                      background: cfg.color + "15",
                      border: `1px solid ${cfg.color}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                    }}
                  >
                    {cfg.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#0f172a",
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>
                      {item.subject || ""}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: cfg.color,
                        background: cfg.color + "15",
                        padding: "2px 8px",
                        borderRadius: 6,
                      }}
                    >
                      {cfg.label}
                    </div>
                    <div
                      style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}
                    >
                      {item.time || ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dash-stats { grid-template-columns: repeat(2,1fr) !important; }
          .dash-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Layout>
  );
}
