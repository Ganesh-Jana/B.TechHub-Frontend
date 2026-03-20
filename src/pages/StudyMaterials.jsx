import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { trackActivity } from "../services/activity";

const typeIcons = {
  "PDF Notes": "📄",
  "Lecture Slides": "📊",
  "Book Extract": "📚",
  "Lab Manual": "🧪",
  "Reference Material": "📖",
};
const typeColors = {
  "PDF Notes": { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  "Lecture Slides": { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  "Book Extract": { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
  "Lab Manual": { bg: "#faf5ff", color: "#7c3aed", border: "#ddd6fe" },
  "Reference Material": { bg: "#fff1f2", color: "#e11d48", border: "#fecdd3" },
};

export default function StudyMaterials() {
  const { subjectId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [subjectName, setSubjectName] = useState("Subject");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    trackActivity({
      title: "Study Materials",
      subject: subjectName,
      type: "material",
      route: `/materials/${subjectId}`,
    });

    fetch(`http://localhost:8080/api/materials?subjectId=${subjectId}`, {
      headers,
    })
      .then((r) => r.json())
      .then((data) => setMaterials(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));

    // Get subject name
    fetch(`http://localhost:8080/api/subjects`, { headers })
      .then((r) => r.json())
      .then((data) => {
        const subj = Array.isArray(data)
          ? data.find((s) => s.id === parseInt(subjectId))
          : null;
        if (subj) setSubjectName(subj.name);
      })
      .catch(() => {});
  }, [subjectId]);

  const availableTypes = [
    "All",
    ...new Set(materials.map((m) => m.type).filter(Boolean)),
  ];
  const filtered =
    filter === "All" ? materials : materials.filter((m) => m.type === filter);

  const handleDownload = (url, title) => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  return (
    <Layout
      title="Study Materials"
      breadcrumb={["Home", "Subjects", subjectName, "Study Materials"]}
    >
      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {availableTypes.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: "7px 16px",
              borderRadius: 10,
              border: `1.5px solid ${filter === t ? "#2563eb" : "#e5e7eb"}`,
              background: filter === t ? "#eff6ff" : "#fff",
              color: filter === t ? "#2563eb" : "#6b7280",
              fontWeight: filter === t ? 600 : 400,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {t}
          </button>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 12, color: "#6b7280" }}>
          {loading
            ? "Loading..."
            : `${filtered.length} resource${filtered.length !== 1 ? "s" : ""}`}
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 76,
                borderRadius: 14,
                background: "#f1f5f9",
                animation: "pulse 1.5s infinite",
              }}
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
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
            No materials yet
          </div>
          {/* <div style={{ fontSize: 13 }}>
            Go to <strong>Admin Panel</strong> to upload study materials for
            this subject.
          </div> */}
          <div style={{ fontSize: 13 }}>Coming Soon....</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((m) => {
            const tc = typeColors[m.type] || typeColors["PDF Notes"];
            return (
              <div
                key={m.id}
                style={{
                  background: "#fff",
                  border: "1px solid #e8ecf0",
                  borderRadius: 14,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  transition: "all 0.15s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(0,0,0,0.04)")
                }
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: tc.bg,
                    border: `1.5px solid ${tc.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {typeIcons[m.type] || "📄"}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#0f172a",
                      marginBottom: 4,
                    }}
                  >
                    {m.title}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: tc.color,
                        background: tc.bg,
                        padding: "2px 8px",
                        borderRadius: 6,
                        border: `1px solid ${tc.border}`,
                      }}
                    >
                      {m.type || "PDF Notes"}
                    </span>
                    {m.size && (
                      <span style={{ fontSize: 11, color: "#9ca3af" }}>
                        📁 {m.size}
                      </span>
                    )}
                    {m.uploadedBy && (
                      <span style={{ fontSize: 11, color: "#9ca3af" }}>
                        👤 {m.uploadedBy}
                      </span>
                    )}
                    {m.uploadDate && (
                      <span style={{ fontSize: 11, color: "#9ca3af" }}>
                        📅 {m.uploadDate}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(m.fileUrl, m.title)}
                  disabled={!m.fileUrl}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 10,
                    border: "none",
                    cursor: m.fileUrl ? "pointer" : "not-allowed",
                    fontSize: 13,
                    fontWeight: 600,
                    background: m.fileUrl ? "#2563eb" : "#e5e7eb",
                    color: m.fileUrl ? "#fff" : "#9ca3af",
                    minWidth: 110,
                    justifyContent: "center",
                  }}
                >
                  {m.fileUrl ? "⬇ Download" : "No File"}
                </button>
              </div>
            );
          })}
        </div>
      )}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </Layout>
  );
}
