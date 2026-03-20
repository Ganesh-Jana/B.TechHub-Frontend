import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function PYQ() {
  const { subjectId } = useParams();
  const [pyqs, setPyqs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [subjectName, setSubjectName] = useState("Subject");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    fetch(
      `https://btechhub-backend-production.up.railway.app/api/pyq?subjectId=${subjectId}`,
      { headers },
    )
      .then((r) => r.json())
      .then((data) => setPyqs(Array.isArray(data) ? data : []))
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
        if (subj) setSubjectName(subj.name);
      })
      .catch(() => {});
  }, [subjectId]);

  const examTypes = [
    "All",
    ...new Set(pyqs.map((p) => p.examType).filter(Boolean)),
  ];
  const filtered =
    filter === "All" ? pyqs : pyqs.filter((p) => p.examType === filter);

  const byYear = filtered.reduce((acc, p) => {
    const y = p.year || "Unknown";
    if (!acc[y]) acc[y] = [];
    acc[y].push(p);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => b - a);
  const minYear = years.length ? years[years.length - 1] : "—";
  const maxYear = years.length ? years[0] : "—";

  const handleOpen = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout
      title="Previous Year Question Papers"
      breadcrumb={["Home", "Subjects", subjectName, "PYQ"]}
    >
      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          {
            icon: "📝",
            label: "Total Papers",
            value: loading ? "..." : pyqs.length,
          },
          {
            icon: "📅",
            label: "Years Covered",
            value: loading
              ? "..."
              : years.length > 0
                ? `${minYear}–${maxYear}`
                : "—",
          },
          {
            icon: "📄",
            label: "Exam Types",
            value: loading
              ? "..."
              : [...new Set(pyqs.map((p) => p.examType).filter(Boolean))].join(
                  " + ",
                ) || "—",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "14px 16px",
              border: "1px solid #e8ecf0",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}
      >
        {examTypes.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: "7px 16px",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 13,
              border: `1.5px solid ${filter === t ? "#2563eb" : "#e5e7eb"}`,
              background: filter === t ? "#eff6ff" : "#fff",
              color: filter === t ? "#2563eb" : "#6b7280",
              fontWeight: filter === t ? 600 : 400,
              transition: "all 0.15s",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 72,
                borderRadius: 12,
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
            No PYQ papers yet
          </div>
          <div style={{ fontSize: 13 }}>Coming Soon....</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {years.map((year) => (
            <div key={year}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    background: "#0f172a",
                    color: "#fff",
                    borderRadius: 8,
                    padding: "4px 12px",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {year}
                </div>
                <div style={{ flex: 1, height: 1, background: "#e8ecf0" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {byYear[year].map((paper) => (
                  <div
                    key={paper.id}
                    style={{
                      background: "#fff",
                      border: "1px solid #e8ecf0",
                      borderRadius: 12,
                      padding: "14px 18px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      transition: "box-shadow 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.08)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "none")
                    }
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        flexShrink: 0,
                        background:
                          paper.examType === "End Semester"
                            ? "#eff6ff"
                            : "#fff7ed",
                        border: `1.5px solid ${paper.examType === "End Semester" ? "#bfdbfe" : "#fed7aa"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                      }}
                    >
                      📝
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0f172a",
                          marginBottom: 3,
                        }}
                      >
                        {subjectName} — {paper.examType || "Question Paper"}
                      </div>
                      <div
                        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color:
                              paper.examType === "End Semester"
                                ? "#2563eb"
                                : "#ea580c",
                            background:
                              paper.examType === "End Semester"
                                ? "#eff6ff"
                                : "#fff7ed",
                            padding: "2px 8px",
                            borderRadius: 6,
                            border: `1px solid ${paper.examType === "End Semester" ? "#bfdbfe" : "#fed7aa"}`,
                          }}
                        >
                          {paper.examType || "Exam"}
                        </span>
                        {paper.pages > 0 && (
                          <span style={{ fontSize: 11, color: "#9ca3af" }}>
                            📄 {paper.pages} pages
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => handleOpen(paper.fileUrl)}
                        disabled={!paper.fileUrl}
                        style={{
                          padding: "7px 14px",
                          borderRadius: 8,
                          border: "1px solid #e5e7eb",
                          background: "#f9fafb",
                          cursor: paper.fileUrl ? "pointer" : "not-allowed",
                          fontSize: 12,
                          color: "#374151",
                          fontWeight: 500,
                        }}
                      >
                        👁 Preview
                      </button>
                      <button
                        onClick={() => handleOpen(paper.fileUrl)}
                        disabled={!paper.fileUrl}
                        style={{
                          padding: "7px 14px",
                          borderRadius: 8,
                          border: "none",
                          background: paper.fileUrl ? "#2563eb" : "#e5e7eb",
                          color: paper.fileUrl ? "#fff" : "#9ca3af",
                          cursor: paper.fileUrl ? "pointer" : "not-allowed",
                          fontSize: 12,
                          fontWeight: 600,
                          minWidth: 100,
                        }}
                      >
                        ⬇ Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </Layout>
  );
}
