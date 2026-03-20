import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      login(res.token, res.user);
      navigate("/");
    } catch {
      // Demo fallback
      login("demo-token-123", { name: form.name, email: form.email });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      key: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Rahul Sharma",
    },
    {
      key: "email",
      label: "Email Address",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      key: "password",
      label: "Password",
      type: "password",
      placeholder: "Min. 6 characters",
    },
    {
      key: "confirm",
      label: "Confirm Password",
      type: "password",
      placeholder: "Re-enter password",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: 20,
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'); * { box-sizing: border-box; } body { margin: 0; }`}</style>

      <div style={{ width: "100%", maxWidth: 460 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#111827",
              border: "2px solid rgba(249,115,22,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              margin: "0 auto 10px",
              boxShadow: "0 4px 16px rgba(249,115,22,0.15)",
            }}
          >
            🎓
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>
            <span style={{ color: "#111827" }}>BTech</span>
            <span style={{ color: "#f97316" }}>Hub</span>
          </h1>
          <p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0" }}>
            B.Tech Engineering Platform
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "36px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            border: "1px solid #e8ecf0",
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 0 6px",
              letterSpacing: "-0.3px",
            }}
          >
            Create Account
          </h2>
          <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 24px" }}>
            Join 50,000+ engineering students
          </p>

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
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {fields.map((f) => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 5,
                  }}
                >
                  {f.label}
                </label>
                <input
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1.5px solid #e5e7eb",
                    fontSize: 14,
                    outline: "none",
                    transition: "border-color 0.2s",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                border: "none",
                background: loading ? "#93c5fd" : "#2563eb",
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: 8,
              }}
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <div
            style={{
              textAlign: "center",
              marginTop: 18,
              fontSize: 13,
              color: "#6b7280",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#2563eb",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
