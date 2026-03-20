import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function Videos() {
  const { subjectId } = useParams();
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subjectName, setSubjectName] = useState("Subject");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    fetch(
      `https://btechhub-backend-production.up.railway.app/api/videos?subjectId=${subjectId}`,
      {
        headers,
      },
    )
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setVideos(list);
        if (list.length > 0) setSelected(list[0]);
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
        if (subj) setSubjectName(subj.name);
      })
      .catch(() => {});
  }, [subjectId]);

  return (
    <Layout
      title="Video Lectures"
      breadcrumb={["Home", "Subjects", subjectName, "Videos"]}
    >
      {/* Player */}
      {selected && (
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              background: "#000",
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${selected.youtubeId}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 12,
              padding: "14px 16px",
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #e8ecf0",
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: 4,
              }}
            >
              {selected.title}
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                fontSize: 12,
                color: "#6b7280",
                flexWrap: "wrap",
              }}
            >
              {selected.channel && <span>📺 {selected.channel}</span>}
              {selected.duration && <span>⏱ {selected.duration}</span>}
              {selected.views && <span>👁 {selected.views} views</span>}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#374151",
          marginBottom: 14,
        }}
      >
        {loading
          ? "Loading..."
          : `${videos.length} Lecture Video${videos.length !== 1 ? "s" : ""}`}
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
                height: 180,
                borderRadius: 14,
                background: "#f1f5f9",
                animation: "pulse 1.5s infinite",
              }}
            />
          ))}
        </div>
      ) : videos.length === 0 ? (
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
            No videos yet
          </div>
          <div style={{ fontSize: 13 }}>Coming Soon....🤐🤐</div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
          }}
        >
          {videos.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelected(v)}
              style={{
                background: "#fff",
                border: `2px solid ${selected?.id === v.id ? "#2563eb" : "#e8ecf0"}`,
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow:
                  selected?.id === v.id
                    ? "0 0 0 4px #bfdbfe"
                    : "0 1px 4px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                if (selected?.id !== v.id)
                  e.currentTarget.style.borderColor = "#93c5fd";
              }}
              onMouseLeave={(e) => {
                if (selected?.id !== v.id)
                  e.currentTarget.style.borderColor = "#e8ecf0";
              }}
            >
              <div
                style={{
                  position: "relative",
                  background: "#1a1a2e",
                  paddingBottom: "56.25%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                  alt={v.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "rgba(239,68,68,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                    }}
                  >
                    ▶
                  </div>
                </div>
                {v.duration && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 6,
                      right: 6,
                      background: "rgba(0,0,0,0.75)",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 600,
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                  >
                    {v.duration}
                  </div>
                )}
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#0f172a",
                    marginBottom: 6,
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {v.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {v.channel && (
                    <span style={{ fontSize: 11, color: "#6b7280" }}>
                      📺 {v.channel}
                    </span>
                  )}
                  {v.views && (
                    <span style={{ fontSize: 11, color: "#6b7280" }}>
                      👁 {v.views}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </Layout>
  );
}
