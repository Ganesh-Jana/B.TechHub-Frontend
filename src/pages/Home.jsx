import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import SemesterCard from "../components/SemesterCard";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [semesters, setSemesters] = useState([]);
  const [stats, setStats] = useState({
    materials: 0,
    pyq: 0,
    videos: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch semesters
    fetch("http://localhost:8080/api/semesters", { headers })
      .then((r) => r.json())
      .then((data) => setSemesters(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));

    // Fetch platform stats
    fetch("http://localhost:8080/api/stats", { headers })
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);

  const statCards = [
    {
      icon: "📚",
      label: "Study Materials",
      value: stats.materials > 0 ? `${stats.materials}+` : "—",
    },
    {
      icon: "📝",
      label: "PYQ Papers",
      value: stats.pyq > 0 ? `${stats.pyq}+` : "—",
    },
    {
      icon: "▶️",
      label: "Video Lectures",
      value: stats.videos > 0 ? `${stats.videos}+` : "—",
    },
    {
      icon: "🎓",
      label: "Registered Users",
      value: stats.users > 0 ? `${stats.users}+` : "—",
    },
  ];

  return (
    <Layout title="">
      {/* Welcome banner */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #0f1b2d 0%, #1e3a5f 50%, #2563eb 100%)",
          borderRadius: 20,
          padding: "32px 36px",
          marginBottom: 28,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            background: "rgba(37,99,235,0.2)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: 100,
            width: 120,
            height: 120,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 13,
              color: "#93c5fd",
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            👋 Welcome back, {user?.name || "Student"}
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 8px",
              letterSpacing: "-0.5px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span>🎓</span>
            <span>Welcome to </span>
            <span style={{ color: "#fff" }}>BTech</span>
            <span style={{ color: "#f97316" }}>Hub</span>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#94a3b8",
              margin: "0 0 20px",
              maxWidth: 500,
            }}
          >
            Access notes, syllabus, PYQs, and video lectures for all semesters
            and branches.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => navigate("/calculator")}
              style={{
                padding: "9px 20px",
                borderRadius: 10,
                background: "#2563eb",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              🧮 Open Calculators
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "9px 20px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.1)",
                color: "#e2e8f0",
                border: "1px solid rgba(255,255,255,0.15)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              📊 My Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
          marginBottom: 28,
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
                fontSize: 20,
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: 2,
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Semester grid */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
              }}
            >
              Browse by Semester
            </h3>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0" }}>
              Select your current semester to access materials
            </p>
          </div>
        </div>

        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 14,
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 120,
                  borderRadius: 14,
                  background: "#f1f5f9",
                  animation: "pulse 1.5s infinite",
                }}
              />
            ))}
          </div>
        ) : semesters.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: 48,
              background: "#fff",
              borderRadius: 16,
              border: "1.5px dashed #e5e7eb",
              color: "#9ca3af",
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 10 }}>📭</div>
            <div style={{ fontWeight: 600, color: "#374151", marginBottom: 4 }}>
              No semesters found
            </div>
            <div style={{ fontSize: 13 }}>
              Add semesters to MySQL to see them here.
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 14,
            }}
          >
            {semesters.map((sem) => (
              <SemesterCard
                key={sem.id}
                semester={sem}
                onClick={() => navigate(`/streams/${sem.id}`)}
              />
            ))}
          </div>
        )}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </Layout>
  );
}
