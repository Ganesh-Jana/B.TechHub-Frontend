import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function Syllabus() {
  const { subjectId } = useParams();
  const [modules, setModules] = useState([]);
  const [openModules, setOpenModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectName, setSubjectName] = useState("Subject");
  const [syllabusPdfUrl, setSyllabusPdfUrl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    fetch(
      `https://btechhub-backend-production.up.railway.app/api/syllabus?subjectId=${subjectId}`,
      {
        headers,
      },
    )
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setModules(list);
        if (list.length > 0)
          setOpenModules([list[0].moduleNumber || list[0].id]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch(`https://btechhub-backend-production.up.railway.app/api/subjects`, {
      headers,
    })
      .then((r) => r.json())
      .then((data) => {
        const subj = Array.isArray(data)
          ? data.find((s) => s.id === parseInt(subjectId))
          : null;
        if (subj) {
          setSubjectName(subj.name);
          setSyllabusPdfUrl(subj.syllabusPdfUrl || null);
        }
      })
      .catch(() => {});
  }, [subjectId]);

  const toggle = (key) =>
    setOpenModules((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  const allKeys = modules.map((m) => m.moduleNumber || m.id);

  const totalTopics = modules.reduce((sum, m) => {
    const topicList = Array.isArray(m.topics)
      ? m.topics
      : typeof m.topics === "string"
        ? m.topics.split("|").filter(Boolean)
        : [];
    return sum + topicList.length;
  }, 0);

  const colors = [
    "#2563eb",
    "#16a34a",
    "#7c3aed",
    "#ea580c",
    "#0d9488",
    "#db2777",
    "#d97706",
  ];

  return (
    <Layout
      title="Syllabus"
      breadcrumb={["Home", "Subjects", subjectName, "Syllabus"]}
    >
      {/* PDF Download Banner — always visible when URL exists */}
      {syllabusPdfUrl && (
        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: 14,
            padding: "16px 20px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              📄
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1d4ed8" }}>
                Syllabus PDF Available
              </div>
              <div style={{ fontSize: 12, color: "#3b82f6" }}>
                Download the complete official syllabus document
              </div>
            </div>
          </div>
          <a
            href={syllabusPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 22px",
              borderRadius: 10,
              background: "#2563eb",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            ⬇ Download Syllabus PDF
          </a>
        </div>
      )}

      {/* Stats + Expand/Collapse — only show if modules exist */}
      {modules.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #e8ecf0",
              borderRadius: 12,
              padding: "10px 20px",
              display: "flex",
              gap: 24,
            }}
          >
            {[
              { label: "Modules", value: modules.length },
              { label: "Total Topics", value: totalTopics },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setOpenModules(allKeys)}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "#fff",
                cursor: "pointer",
                fontSize: 12,
                color: "#374151",
                fontWeight: 500,
              }}
            >
              Expand All
            </button>
            <button
              onClick={() => setOpenModules([])}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "#fff",
                cursor: "pointer",
                fontSize: 12,
                color: "#374151",
                fontWeight: 500,
              }}
            >
              Collapse All
            </button>
          </div>
        </div>
      )}

      {/* Modules */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 64,
                borderRadius: 14,
                background: "#f1f5f9",
                animation: "pulse 1.5s infinite",
              }}
            />
          ))}
        </div>
      ) : modules.length === 0 ? (
        /* Only show empty state if there is also no PDF */
        !syllabusPdfUrl && (
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
            <div style={{ fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              No syllabus added yet
            </div>
            <div style={{ fontSize: 13 }}>Coming Soon....😉😉</div>
          </div>
        )
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {modules.map((module, index) => {
            const key = module.moduleNumber || module.id;
            const isOpen = openModules.includes(key);
            const c = colors[index % colors.length];
            const topicList = Array.isArray(module.topics)
              ? module.topics
              : typeof module.topics === "string"
                ? module.topics
                    .split("|")
                    .map((t) => t.trim())
                    .filter(Boolean)
                : [];
            return (
              <div
                key={module.id}
                style={{
                  background: "#fff",
                  border: "1px solid #e8ecf0",
                  borderRadius: 14,
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  borderLeft: `4px solid ${c}`,
                }}
              >
                <button
                  onClick={() => toggle(key)}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "none")
                  }
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      flexShrink: 0,
                      background: c + "15",
                      border: `1.5px solid ${c}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 800,
                      color: c,
                    }}
                  >
                    M{module.moduleNumber || index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      Module {module.moduleNumber || index + 1}: {module.title}
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                      {topicList.length} topic
                      {topicList.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 16,
                      color: "#9ca3af",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  >
                    ▾
                  </span>
                </button>

                {isOpen && topicList.length > 0 && (
                  <div style={{ padding: "0 20px 16px 20px" }}>
                    <div
                      style={{ borderTop: "1px solid #f3f4f6", paddingTop: 12 }}
                    >
                      {topicList.map((topic, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "6px 0",
                            borderBottom:
                              i < topicList.length - 1
                                ? "1px solid #f9fafb"
                                : "none",
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: c,
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ fontSize: 13, color: "#374151" }}>
                            {topic}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </Layout>
  );
}
