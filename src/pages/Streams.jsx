import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import StreamCard from "../components/StreamCard";

export default function Streams() {
  const { semId } = useParams();
  const navigate = useNavigate();
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`https://btechhub-backend-production.up.railway.app/api/streams`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setStreams(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [semId]);

  return (
    <Layout
      title={`Semester ${semId} — Select Your Stream`}
      breadcrumb={["Home", `Semester ${semId}`, "Select Stream"]}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "18px 20px",
            border: "1px solid #e8ecf0",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 20 }}>💡</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>
              Choose your engineering branch
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              Subjects and materials are organised by stream
            </div>
          </div>
        </div>

        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 110,
                  borderRadius: 14,
                  background: "#f1f5f9",
                  animation: "pulse 1.5s infinite",
                }}
              />
            ))}
          </div>
        ) : streams.length === 0 ? (
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
              No streams found
            </div>
            <div style={{ fontSize: 13 }}>Coming Soon....</div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {streams.map((stream) => (
              <StreamCard
                key={stream.id}
                stream={stream}
                onClick={() => navigate(`/subjects/${semId}/${stream.id}`)}
              />
            ))}
          </div>
        )}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </Layout>
  );
}
