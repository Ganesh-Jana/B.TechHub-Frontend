import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

const features = [
  {
    icon: "📒",
    title: "12,000+ Notes",
    desc: "Handwritten & typed notes for every subject",
  },
  {
    icon: "📝",
    title: "PYQ Papers",
    desc: "10 years of solved question papers",
  },
  {
    icon: "▶️",
    title: "Video Lectures",
    desc: "Curated YouTube lectures by top educators",
  },
  {
    icon: "🧮",
    title: "Smart Calculators",
    desc: "CGPA, SGPA & percentage calculators",
  },
];

const subjects = [
  "Data Structures",
  "DBMS",
  "OS",
  "Computer Networks",
  "Algorithms",
  "Digital Electronics",
  "Thermodynamics",
  "Engineering Math",
];

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.login(form);
      login(res.token, res.user);
      navigate("/");
    } catch (err) {
      // No dummy fallback — real backend auth only
      setError("Invalid email or password. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: "#060d1a",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-glow { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        .hero-logo { animation: float 4s ease-in-out infinite; }
        .glow-orb { animation: pulse-glow 3s ease-in-out infinite; }
        .ticker-track { display: flex; animation: scroll-left 20s linear infinite; width: max-content; }
        .ticker-track:hover { animation-play-state: paused; }
        .fade-up { animation: fade-up 0.6s ease forwards; }
        .fade-up-1 { animation: fade-up 0.6s ease 0.1s both; }
        .fade-up-2 { animation: fade-up 0.6s ease 0.2s both; }
        .fade-up-3 { animation: fade-up 0.6s ease 0.3s both; }

        .feat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 16px;
          display: flex; gap: 12px; align-items: flex-start;
          transition: all 0.2s;
        }
        .feat-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(99,157,255,0.3);
          transform: translateX(4px);
        }

        .input-field {
          width: 100%; padding: 12px 14px;
          border-radius: 10px; border: 1.5px solid #e5e7eb;
          font-size: 14px; outline: none;
          transition: all 0.2s;
          font-family: inherit; background: #fff;
          color: #111827;
        }
        .input-field:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }

        .sign-btn {
          width: 100%; padding: 13px; border-radius: 11px; border: none;
          font-size: 15px; font-weight: 700; cursor: pointer;
          font-family: inherit; transition: all 0.2s;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #fff; letter-spacing: 0.01em;
        }
        .sign-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.4);
        }
        .sign-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .pass-toggle { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; font-size:16px; color:#9ca3af; padding:4px; }

        .stat-pill {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px; padding: 8px 16px;
          transition: all 0.2s;
        }
        .stat-pill:hover { background: rgba(255,255,255,0.1); border-color: rgba(99,157,255,0.4); }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background orbs */}
        <div
          className="glow-orb"
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="glow-orb"
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "-10%",
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 65%)",
            pointerEvents: "none",
            animationDelay: "1.5s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            right: "5%",
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: 520 }}>
          {/* Logo */}
          <div
            className="hero-logo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 36,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "#111827",
                border: "2px solid rgba(249,115,22,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                boxShadow: "0 8px 24px rgba(249,115,22,0.2)",
              }}
            >
              🎓
            </div>
            <div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  lineHeight: 1,
                }}
              >
                <span style={{ color: "#fff" }}>BTech</span>
                <span style={{ color: "#f97316" }}>Hub</span>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#f97316",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: 3,
                }}
              >
                B.Tech Engineering Platform
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="fade-up-1">
            <h1
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
                letterSpacing: "-1px",
                marginBottom: 16,
              }}
            >
              Everything you need to{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #60a5fa, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ace your B.Tech
              </span>
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "#94a3b8",
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 460,
              }}
            >
              One platform for all 8 semesters — notes, PYQs, syllabus, video
              lectures, and calculators. Trusted by 50,000+ engineering
              students.
            </p>
          </div>

          {/* Feature cards */}
          <div
            className="fade-up-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 32,
            }}
          >
            {features.map((f) => (
              <div key={f.title} className="feat-card">
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "rgba(37,99,235,0.2)",
                    border: "1px solid rgba(37,99,235,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#e2e8f0",
                      marginBottom: 2,
                    }}
                  >
                    {f.title}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}
                  >
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div
            className="fade-up-3"
            style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
          >
            {[
              ["🎓", "50,000+", "Students"],
              ["📚", "8", "Semesters"],
              ["🏫", "10+", "Branches"],
              ["⭐", "4.8", "Rating"],
            ].map(([icon, val, label]) => (
              <div key={label} className="stat-pill">
                <span style={{ fontSize: 14 }}>{icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#e2e8f0",
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject ticker */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            overflow: "hidden",
            padding: "14px 0",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div className="ticker-track">
            {[...subjects, ...subjects].map((s, i) => (
              <span
                key={i}
                style={{
                  color: "#475569",
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "0 20px",
                  whiteSpace: "nowrap",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        style={{
          width: 480,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 44px",
          position: "relative",
        }}
      >
        {/* Top badge */}
        <div style={{ position: "absolute", top: 28, right: 28 }}>
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 100,
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 600,
              color: "#16a34a",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            Free Access
          </div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#f97316",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Welcome back
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.5px",
              marginBottom: 6,
            }}
          >
            Sign in to <span style={{ color: "#111827" }}>BTech</span>
            <span style={{ color: "#f97316" }}>Hub</span>
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280" }}>
            Access all your study materials in one place.
          </p>
        </div>

        {/* Social proof */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#f8fafc",
            border: "1px solid #e8ecf0",
            borderRadius: 12,
            padding: "10px 14px",
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex" }}>
            {["#2563eb", "#7c3aed", "#16a34a", "#ea580c"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: c,
                  border: "2px solid #fff",
                  marginLeft: i > 0 ? -8 : 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                {["R", "S", "A", "M"][i]}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#374151" }}>
            <span style={{ fontWeight: 700 }}>2,400+ students</span> signed in
            this week
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "#fff1f2",
              border: "1px solid #fecdd3",
              borderRadius: 10,
              padding: "10px 14px",
              fontSize: 13,
              color: "#e11d48",
              marginBottom: 16,
              display: "flex",
              gap: 8,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 6,
              }}
            >
              Email address
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 15,
                  color: "#9ca3af",
                }}
              >
                ✉️
              </span>
              <input
                className="input-field"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                style={{ paddingLeft: 38 }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <label
                style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}
              >
                Password
              </label>
              <span
                style={{
                  fontSize: 12,
                  color: "#2563eb",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </span>
            </div>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 15,
                  color: "#9ca3af",
                }}
              >
                🔒
              </span>
              <input
                className="input-field"
                type={showPass ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
                style={{ paddingLeft: 38, paddingRight: 44 }}
              />
              <button
                type="button"
                className="pass-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button className="sign-btn" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            margin: "20px 0",
          }}
        >
          <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
            What you get
          </span>
          <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        </div>

        {/* Mini feature list */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 20,
          }}
        >
          {[
            ["✅", "Free forever"],
            ["✅", "All 8 semesters"],
            ["✅", "10+ branches"],
            ["✅", "Offline-ready PDFs"],
          ].map(([ic, text]) => (
            <div
              key={text}
              style={{
                display: "flex",
                gap: 6,
                alignItems: "center",
                fontSize: 12,
                color: "#374151",
                fontWeight: 500,
              }}
            >
              <span style={{ fontSize: 12 }}>{ic}</span>
              {text}
            </div>
          ))}
        </div>

        {/* Sign up link */}
        <div style={{ textAlign: "center", fontSize: 13, color: "#6b7280" }}>
          New to BTechHub?{" "}
          <Link
            to="/signup"
            style={{
              color: "#2563eb",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Create free account
          </Link>
        </div>
      </div>
    </div>
  );
}
