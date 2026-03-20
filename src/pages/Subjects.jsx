import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import SubjectCard from "../components/SubjectCard";

export default function Subjects() {
  const { semId, streamId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch stream info
    fetch(`http://localhost:8080/api/streams`, { headers })
      .then((r) => r.json())
      .then((data) => {
        const found = Array.isArray(data)
          ? data.find((s) => s.id === parseInt(streamId))
          : null;
        setStream(found || null);
      })
      .catch(() => {});

    // Fetch subjects
    fetch(
      `http://localhost:8080/api/subjects?semesterId=${semId}&streamId=${streamId}`,
      { headers },
    )
      .then((r) => r.json())
      .then((data) => setSubjects(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [semId, streamId]);

  return (
    <Layout
      title={`Semester ${semId} — ${stream?.code || "Subjects"}`}
      breadcrumb={[
        "Home",
        `Semester ${semId}`,
        stream?.code || "Stream",
        "Subjects",
      ]}
    >
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {stream && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              border: "1px solid #e8ecf0",
              borderRadius: 10,
              padding: "8px 14px",
              fontSize: 13,
            }}
          >
            <span>{stream.icon}</span>
            <span style={{ fontWeight: 600, color: "#374151" }}>
              {stream.name}
            </span>
          </div>
        )}
        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: 10,
            padding: "8px 14px",
            fontSize: 12,
            color: "#2563eb",
            fontWeight: 600,
          }}
        >
          {loading
            ? "Loading..."
            : `${subjects.length} Subject${subjects.length !== 1 ? "s" : ""}`}
        </div>
      </div>

      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 140,
                borderRadius: 14,
                background: "#f1f5f9",
                animation: "pulse 1.5s infinite",
              }}
            />
          ))}
        </div>
      ) : subjects.length === 0 ? (
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
            No subjects found
          </div>
          <div style={{ fontSize: 13 }}>Coming Soon....</div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
          }}
        >
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      )}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </Layout>
  );
}
