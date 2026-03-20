import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { api } from "../services/api";

const tabStyle = (active) => ({
  padding: "9px 20px",
  borderRadius: 10,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  border: "none",
  transition: "all 0.2s",
  background: active ? "#2563eb" : "#f1f5f9",
  color: active ? "#fff" : "#6b7280",
});

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1.5px solid #e5e7eb",
  fontSize: 13,
  outline: "none",
  fontFamily: "inherit",
  background: "#fafafa",
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 5,
};

function SuccessMsg({ msg }) {
  if (!msg) return null;
  return (
    <div
      style={{
        background: "#f0fdf4",
        border: "1px solid #bbf7d0",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 13,
        color: "#16a34a",
        marginBottom: 14,
      }}
    >
      ✅ {msg}
    </div>
  );
}

function ErrorMsg({ msg }) {
  if (!msg) return null;
  return (
    <div
      style={{
        background: "#fff1f2",
        border: "1px solid #fecdd3",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 13,
        color: "#e11d48",
        marginBottom: 14,
      }}
    >
      ❌ {msg}
    </div>
  );
}

// ── Add Study Material ──────────────────────────────────────────────────────
function AddMaterial({ subjects }) {
  const [form, setForm] = useState({
    title: "",
    fileUrl: "",
    type: "PDF Notes",
    size: "",
    uploadedBy: "",
    subjectId: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const types = [
    "PDF Notes",
    "Lecture Slides",
    "Book Extract",
    "Lab Manual",
    "Reference Material",
  ];

  const submit = async () => {
    if (!form.title || !form.fileUrl || !form.subjectId) {
      setError("Title, PDF URL and Subject are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await fetch("http://localhost:8080/api/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...form, subjectId: parseInt(form.subjectId) }),
      });
      setSuccess("Study material added successfully!");
      setForm({
        title: "",
        fileUrl: "",
        type: "PDF Notes",
        size: "",
        uploadedBy: "",
        subjectId: form.subjectId,
      });
    } catch {
      setError("Failed to add material. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#1d4ed8",
            marginBottom: 4,
          }}
        >
          📋 How to get the PDF URL
        </div>
        <div style={{ fontSize: 12, color: "#1e40af" }}>
          1. Upload your PDF to <strong>Cloudinary.com</strong> (free) or{" "}
          <strong>Google Drive</strong>
          <br />
          2. Copy the direct link (make sure it's publicly accessible)
          <br />
          3. Paste it in the "PDF URL" field below
        </div>
      </div>

      <SuccessMsg msg={success} />
      <ErrorMsg msg={error} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={labelStyle}>Title *</label>
          <input
            style={inputStyle}
            placeholder="e.g. Unit 1 - Introduction to Data Structures"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
        </div>

        <div style={{ gridColumn: "1/-1" }}>
          <label style={labelStyle}>
            PDF URL * (from Cloudinary / Google Drive)
          </label>
          <input
            style={inputStyle}
            placeholder="https://res.cloudinary.com/your-name/raw/upload/dsa-unit1.pdf"
            value={form.fileUrl}
            onChange={(e) =>
              setForm((p) => ({ ...p, fileUrl: e.target.value }))
            }
          />
        </div>

        <div>
          <label style={labelStyle}>Subject *</label>
          <select
            style={inputStyle}
            value={form.subjectId}
            onChange={(e) =>
              setForm((p) => ({ ...p, subjectId: e.target.value }))
            }
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.subjectCode})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Type</label>
          <select
            style={inputStyle}
            value={form.type}
            onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>File Size (optional)</label>
          <input
            style={inputStyle}
            placeholder="e.g. 2.4 MB"
            value={form.size}
            onChange={(e) => setForm((p) => ({ ...p, size: e.target.value }))}
          />
        </div>

        <div>
          <label style={labelStyle}>Uploaded By (optional)</label>
          <input
            style={inputStyle}
            placeholder="e.g. Prof. Sharma"
            value={form.uploadedBy}
            onChange={(e) =>
              setForm((p) => ({ ...p, uploadedBy: e.target.value }))
            }
          />
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        style={{
          marginTop: 18,
          padding: "11px 28px",
          borderRadius: 10,
          border: "none",
          background: loading ? "#93c5fd" : "#2563eb",
          color: "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "inherit",
        }}
      >
        {loading ? "Adding..." : "➕ Add Study Material"}
      </button>
    </div>
  );
}

// ── Add PYQ ─────────────────────────────────────────────────────────────────
function AddPYQ({ subjects }) {
  const [form, setForm] = useState({
    year: "",
    examType: "End Semester",
    fileUrl: "",
    pages: "",
    subjectId: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.year || !form.fileUrl || !form.subjectId) {
      setError("Year, PDF URL and Subject are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await fetch("http://localhost:8080/api/pyq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...form,
          year: parseInt(form.year),
          pages: parseInt(form.pages) || 0,
          subjectId: parseInt(form.subjectId),
        }),
      });
      setSuccess(`PYQ for ${form.year} added successfully!`);
      setForm({
        year: "",
        examType: "End Semester",
        fileUrl: "",
        pages: "",
        subjectId: form.subjectId,
      });
    } catch {
      setError("Failed to add PYQ. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          background: "#fff7ed",
          border: "1px solid #fed7aa",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#c2410c",
            marginBottom: 4,
          }}
        >
          📄 Adding PYQ Papers
        </div>
        <div style={{ fontSize: 12, color: "#9a3412" }}>
          Upload the question paper PDF to Cloudinary or Google Drive, make it
          public, then paste the link below.
        </div>
      </div>

      <SuccessMsg msg={success} />
      <ErrorMsg msg={error} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={labelStyle}>PDF URL * (question paper link)</label>
          <input
            style={inputStyle}
            placeholder="https://res.cloudinary.com/your-name/raw/upload/dsa-2024-endsem.pdf"
            value={form.fileUrl}
            onChange={(e) =>
              setForm((p) => ({ ...p, fileUrl: e.target.value }))
            }
          />
        </div>

        <div>
          <label style={labelStyle}>Subject *</label>
          <select
            style={inputStyle}
            value={form.subjectId}
            onChange={(e) =>
              setForm((p) => ({ ...p, subjectId: e.target.value }))
            }
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.subjectCode})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Exam Type</label>
          <select
            style={inputStyle}
            value={form.examType}
            onChange={(e) =>
              setForm((p) => ({ ...p, examType: e.target.value }))
            }
          >
            {["End Semester", "Mid Semester", "Unit Test", "Supplementary"].map(
              (t) => (
                <option key={t}>{t}</option>
              ),
            )}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Year *</label>
          <input
            style={inputStyle}
            type="number"
            placeholder="e.g. 2024"
            value={form.year}
            onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
          />
        </div>

        <div>
          <label style={labelStyle}>Number of Pages (optional)</label>
          <input
            style={inputStyle}
            type="number"
            placeholder="e.g. 4"
            value={form.pages}
            onChange={(e) => setForm((p) => ({ ...p, pages: e.target.value }))}
          />
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        style={{
          marginTop: 18,
          padding: "11px 28px",
          borderRadius: 10,
          border: "none",
          background: loading ? "#fdba74" : "#ea580c",
          color: "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "inherit",
        }}
      >
        {loading ? "Adding..." : "➕ Add PYQ Paper"}
      </button>
    </div>
  );
}

// ── Add Video ────────────────────────────────────────────────────────────────
function AddVideo({ subjects }) {
  const [form, setForm] = useState({
    title: "",
    youtubeId: "",
    channel: "",
    duration: "",
    views: "",
    subjectId: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const extractYoutubeId = (url) => {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/\s]{11})/);
    return match ? match[1] : url;
  };

  const submit = async () => {
    if (!form.title || !form.youtubeId || !form.subjectId) {
      setError("Title, YouTube ID/URL and Subject are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    const ytId = extractYoutubeId(form.youtubeId);
    try {
      await fetch("http://localhost:8080/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...form,
          youtubeId: ytId,
          subjectId: parseInt(form.subjectId),
        }),
      });
      setSuccess("Video added successfully!");
      setForm({
        title: "",
        youtubeId: "",
        channel: "",
        duration: "",
        views: "",
        subjectId: form.subjectId,
      });
    } catch {
      setError("Failed to add video. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#dc2626",
            marginBottom: 4,
          }}
        >
          ▶️ Adding YouTube Videos
        </div>
        <div style={{ fontSize: 12, color: "#b91c1c" }}>
          Go to the YouTube video → copy the URL (e.g.
          https://youtube.com/watch?v=abc123) → paste below. The video ID will
          be extracted automatically.
        </div>
      </div>

      <SuccessMsg msg={success} />
      <ErrorMsg msg={error} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={labelStyle}>Video Title *</label>
          <input
            style={inputStyle}
            placeholder="e.g. Data Structures Full Course"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
        </div>

        <div style={{ gridColumn: "1/-1" }}>
          <label style={labelStyle}>YouTube URL or Video ID *</label>
          <input
            style={inputStyle}
            placeholder="https://youtube.com/watch?v=abc123  OR  just  abc123"
            value={form.youtubeId}
            onChange={(e) =>
              setForm((p) => ({ ...p, youtubeId: e.target.value }))
            }
          />
        </div>

        <div>
          <label style={labelStyle}>Subject *</label>
          <select
            style={inputStyle}
            value={form.subjectId}
            onChange={(e) =>
              setForm((p) => ({ ...p, subjectId: e.target.value }))
            }
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.subjectCode})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Channel Name (optional)</label>
          <input
            style={inputStyle}
            placeholder="e.g. Abdul Bari"
            value={form.channel}
            onChange={(e) =>
              setForm((p) => ({ ...p, channel: e.target.value }))
            }
          />
        </div>

        <div>
          <label style={labelStyle}>Duration (optional)</label>
          <input
            style={inputStyle}
            placeholder="e.g. 45:30"
            value={form.duration}
            onChange={(e) =>
              setForm((p) => ({ ...p, duration: e.target.value }))
            }
          />
        </div>

        <div>
          <label style={labelStyle}>Views (optional)</label>
          <input
            style={inputStyle}
            placeholder="e.g. 1.2M"
            value={form.views}
            onChange={(e) => setForm((p) => ({ ...p, views: e.target.value }))}
          />
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        style={{
          marginTop: 18,
          padding: "11px 28px",
          borderRadius: 10,
          border: "none",
          background: loading ? "#fca5a5" : "#dc2626",
          color: "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "inherit",
        }}
      >
        {loading ? "Adding..." : "➕ Add Video"}
      </button>
    </div>
  );
}

// ── Manage Subjects ──────────────────────────────────────────────────────────
function ManageSubjects({ subjects, onSubjectsChanged }) {
  const [semesters, setSemesters] = useState([]);
  const [streams, setStreams] = useState([]);
  const [form, setForm] = useState({
    name: "",
    subjectCode: "",
    credits: "",
    semesterId: "",
    streamId: "",
  });
  const [search, setSearch] = useState("");
  const [filterSem, setFilterSem] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState(null); // subject to delete
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/semesters", { headers })
      .then((r) => r.json())
      .then((d) => setSemesters(Array.isArray(d) ? d : []))
      .catch(() => {});
    fetch("http://localhost:8080/api/streams", { headers })
      .then((r) => r.json())
      .then((d) => setStreams(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  const addSubject = async () => {
    if (!form.name || !form.subjectCode || !form.semesterId || !form.streamId) {
      setError("Name, Subject Code, Semester and Stream are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:8080/api/subjects", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: form.name,
          subjectCode: form.subjectCode,
          credits: parseInt(form.credits) || 3,
          semesterId: parseInt(form.semesterId),
          streamId: parseInt(form.streamId),
        }),
      });
      if (!res.ok) throw new Error();
      setSuccess(`Subject "${form.name}" added successfully!`);
      setForm({
        name: "",
        subjectCode: "",
        credits: "",
        semesterId: form.semesterId,
        streamId: form.streamId,
      });
      onSubjectsChanged();
    } catch {
      setError("Failed to add subject. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const deleteSubject = async (subject) => {
    setDeleting(subject.id);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(
        `http://localhost:8080/api/subjects/${subject.id}`,
        {
          method: "DELETE",
          headers,
        },
      );
      if (!res.ok) throw new Error();
      setSuccess(`Subject "${subject.name}" deleted successfully!`);
      setConfirmDelete(null);
      onSubjectsChanged();
    } catch {
      setError(
        "Failed to delete subject. It may have materials linked to it — delete those first from MySQL.",
      );
      setConfirmDelete(null);
    } finally {
      setDeleting(null);
    }
  };

  const getSemName = (id) =>
    semesters.find((s) => s.id === id)?.name || `Sem ${id}`;
  const getStreamCode = (id) =>
    streams.find((s) => s.id === id)?.code || `Stream ${id}`;

  const filtered = subjects
    .filter(
      (s) =>
        filterSem === "all" ||
        s.semester?.id === parseInt(filterSem) ||
        subjects.indexOf(s) > -1,
    )
    .filter(
      (s) =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.subjectCode?.toLowerCase().includes(search.toLowerCase()),
    );

  const semGroups = {};
  filtered.forEach((s) => {
    const key = s.semesterId || "other";
    if (!semGroups[key]) semGroups[key] = [];
    semGroups[key].push(s);
  });

  return (
    <div>
      {/* Add Subject Form */}
      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: "20px",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 18 }}>➕</span> Add New Subject
        </div>

        <SuccessMsg msg={success} />
        <ErrorMsg msg={error} />

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>Subject Name *</label>
            <input
              style={inputStyle}
              placeholder="e.g. Data Structures & Algorithms"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div>
            <label style={labelStyle}>Subject Code *</label>
            <input
              style={inputStyle}
              placeholder="e.g. CS301"
              value={form.subjectCode}
              onChange={(e) =>
                setForm((p) => ({ ...p, subjectCode: e.target.value }))
              }
            />
          </div>
          <div>
            <label style={labelStyle}>Credits</label>
            <input
              style={inputStyle}
              type="number"
              placeholder="e.g. 4"
              min="1"
              max="6"
              value={form.credits}
              onChange={(e) =>
                setForm((p) => ({ ...p, credits: e.target.value }))
              }
            />
          </div>
          <div>
            <label style={labelStyle}>Semester *</label>
            <select
              style={inputStyle}
              value={form.semesterId}
              onChange={(e) =>
                setForm((p) => ({ ...p, semesterId: e.target.value }))
              }
            >
              <option value="">-- Select Semester --</option>
              {semesters.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Stream / Branch *</label>
            <select
              style={inputStyle}
              value={form.streamId}
              onChange={(e) =>
                setForm((p) => ({ ...p, streamId: e.target.value }))
              }
            >
              <option value="">-- Select Stream --</option>
              {streams.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={addSubject}
          disabled={loading}
          style={{
            marginTop: 16,
            padding: "10px 24px",
            borderRadius: 10,
            border: "none",
            background: loading ? "#93c5fd" : "#2563eb",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "inherit",
          }}
        >
          {loading ? "Adding..." : "➕ Add Subject"}
        </button>
      </div>

      {/* Subject List */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
            All Subjects{" "}
            <span style={{ fontSize: 12, fontWeight: 400, color: "#6b7280" }}>
              ({subjects.length} total)
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {/* Search */}
            <input
              style={{ ...inputStyle, width: 200, padding: "7px 12px" }}
              placeholder="🔍 Search subjects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Semester filter */}
            <select
              style={{ ...inputStyle, width: 160, padding: "7px 12px" }}
              value={filterSem}
              onChange={(e) => setFilterSem(e.target.value)}
            >
              <option value="all">All Semesters</option>
              {semesters.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {subjects.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: 32,
              color: "#9ca3af",
              background: "#f9fafb",
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
            <div>No subjects yet. Add one above.</div>
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: 24,
              color: "#9ca3af",
              background: "#f9fafb",
              borderRadius: 12,
            }}
          >
            No subjects match your search.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map((subject) => (
              <div
                key={subject.id}
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
                    "0 2px 8px rgba(0,0,0,0.07)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  📚
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#0f172a",
                      marginBottom: 4,
                    }}
                  >
                    {subject.name}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#2563eb",
                        background: "#eff6ff",
                        padding: "2px 8px",
                        borderRadius: 6,
                        border: "1px solid #bfdbfe",
                      }}
                    >
                      {subject.subjectCode}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "#6b7280",
                        background: "#f1f5f9",
                        padding: "2px 8px",
                        borderRadius: 6,
                      }}
                    >
                      {subject.credits || 3} Credits
                    </span>
                    {subject.semesterId && (
                      <span
                        style={{
                          fontSize: 11,
                          color: "#7c3aed",
                          background: "#faf5ff",
                          padding: "2px 8px",
                          borderRadius: 6,
                          border: "1px solid #ddd6fe",
                        }}
                      >
                        Sem {subject.semesterId}
                      </span>
                    )}
                    {subject.streamId && (
                      <span
                        style={{
                          fontSize: 11,
                          color: "#059669",
                          background: "#f0fdf4",
                          padding: "2px 8px",
                          borderRadius: 6,
                          border: "1px solid #bbf7d0",
                        }}
                      >
                        {getStreamCode(subject.streamId)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => setConfirmDelete(subject)}
                  disabled={deleting === subject.id}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 8,
                    border: "1.5px solid #fecdd3",
                    background: "#fff1f2",
                    color: "#e11d48",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    flexShrink: 0,
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#e11d48";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff1f2";
                    e.currentTarget.style.color = "#e11d48";
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: "28px 32px",
              maxWidth: 420,
              width: "100%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{ fontSize: 40, textAlign: "center", marginBottom: 12 }}
            >
              ⚠️
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#0f172a",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Delete Subject?
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#6b7280",
                textAlign: "center",
                marginBottom: 6,
              }}
            >
              You are about to delete:
            </div>
            <div
              style={{
                background: "#fff1f2",
                border: "1px solid #fecdd3",
                borderRadius: 10,
                padding: "10px 16px",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                {confirmDelete.name}
              </div>
              <div style={{ fontSize: 12, color: "#e11d48" }}>
                {confirmDelete.subjectCode}
              </div>
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#dc2626",
                background: "#fff1f2",
                borderRadius: 8,
                padding: "8px 12px",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              ⚠️ This will also delete all materials, PYQs, videos and syllabus
              linked to this subject!
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setConfirmDelete(null)}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: 10,
                  border: "1.5px solid #e5e7eb",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#374151",
                  fontFamily: "inherit",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => deleteSubject(confirmDelete)}
                disabled={deleting === confirmDelete.id}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: 10,
                  border: "none",
                  background: "#dc2626",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "inherit",
                }}
              >
                {deleting === confirmDelete.id ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Upload Syllabus PDF ──────────────────────────────────────────────────────
function UploadSyllabusPdf({ subjects }) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);

  const token = localStorage.getItem("token");

  // Show current PDF when subject changes
  const handleSubjectChange = (id) => {
    setSelectedSubject(id);
    setSuccess("");
    setError("");
    const subj = subjects.find((s) => s.id === parseInt(id));
    setCurrentUrl(subj?.syllabusPdfUrl || null);
    setPdfUrl(subj?.syllabusPdfUrl || "");
  };

  const submit = async () => {
    if (!selectedSubject) {
      setError("Please select a subject.");
      return;
    }
    if (!pdfUrl) {
      setError("Please enter a PDF URL.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(
        `http://localhost:8080/api/subjects/${selectedSubject}/syllabus-pdf`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ syllabusPdfUrl: pdfUrl }),
        },
      );
      if (!res.ok) throw new Error();
      setSuccess(
        "Syllabus PDF uploaded successfully! Students can now download it.",
      );
      setCurrentUrl(pdfUrl);
    } catch {
      setError("Failed to upload. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#166534",
            marginBottom: 4,
          }}
        >
          📋 How to upload Syllabus PDF
        </div>
        <div style={{ fontSize: 12, color: "#166534", lineHeight: 1.7 }}>
          1. Upload the syllabus PDF to <strong>Cloudinary.com</strong> (free)
          or Google Drive (make public)
          <br />
          2. Copy the direct PDF link
          <br />
          3. Select the subject below and paste the link → Save
        </div>
      </div>

      <SuccessMsg msg={success} />
      <ErrorMsg msg={error} />

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={labelStyle}>Select Subject *</label>
          <select
            style={inputStyle}
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.subjectCode})
              </option>
            ))}
          </select>
        </div>

        {/* Show current PDF if exists */}
        {currentUrl && (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 10,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 18 }}>📄</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#166534" }}>
                Current Syllabus PDF
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#6b7280",
                  wordBreak: "break-all",
                }}
              >
                {currentUrl}
              </div>
            </div>
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                color: "#2563eb",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Preview ↗
            </a>
          </div>
        )}

        <div>
          <label style={labelStyle}>
            Syllabus PDF URL * (from Cloudinary / Google Drive)
          </label>
          <input
            style={inputStyle}
            placeholder="https://res.cloudinary.com/your-name/raw/upload/syllabus-cs301.pdf"
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
          />
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
            Paste the new URL to replace the existing one, or paste for the
            first time.
          </div>
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading || !selectedSubject}
        style={{
          marginTop: 18,
          padding: "11px 28px",
          borderRadius: 10,
          border: "none",
          background: loading
            ? "#6ee7b7"
            : !selectedSubject
              ? "#e5e7eb"
              : "#16a34a",
          color: !selectedSubject ? "#9ca3af" : "#fff",
          cursor: loading || !selectedSubject ? "not-allowed" : "pointer",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "inherit",
        }}
      >
        {loading ? "Saving..." : "💾 Save Syllabus PDF"}
      </button>
    </div>
  );
}

// ── Main Admin Panel ─────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [tab, setTab] = useState("subjects");
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  const loadSubjects = () => {
    setLoadingSubjects(true);
    fetch("http://localhost:8080/api/subjects", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setSubjects(Array.isArray(data) ? data : []);
        setLoadingSubjects(false);
      })
      .catch(() => setLoadingSubjects(false));
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const tabs = [
    { key: "subjects", label: "📚 Manage Subjects" },
    { key: "syllabus", label: "📋 Syllabus PDF" },
    { key: "material", label: "📄 Study Material" },
    { key: "pyq", label: "📝 PYQ Paper" },
    { key: "video", label: "▶️ Video" },
  ];

  return (
    <Layout title="Admin Panel" breadcrumb={["Home", "Admin"]}>
      <style>{`
        select:focus, input:focus { border-color: #2563eb !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); outline: none; }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b, #312e81)",
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          🛠️
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>
            Admin Panel
          </div>
          <div style={{ fontSize: 13, color: "#a5b4fc" }}>
            Manage subjects, materials, PYQs and videos
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: "9px 18px",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              border: "none",
              transition: "all 0.2s",
              fontFamily: "inherit",
              background: tab === t.key ? "#2563eb" : "#f1f5f9",
              color: tab === t.key ? "#fff" : "#6b7280",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "28px",
          border: "1px solid #e8ecf0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {loadingSubjects ? (
          <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>
            Loading...
          </div>
        ) : (
          <>
            {tab === "subjects" && (
              <ManageSubjects
                subjects={subjects}
                onSubjectsChanged={loadSubjects}
              />
            )}
            {tab === "syllabus" &&
              (subjects.length === 0 ? (
                <div
                  style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}
                >
                  Add subjects first from the <strong>Manage Subjects</strong>{" "}
                  tab.
                </div>
              ) : (
                <UploadSyllabusPdf subjects={subjects} />
              ))}
            {tab === "material" &&
              (subjects.length === 0 ? (
                <div
                  style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}
                >
                  Add subjects first from the <strong>Manage Subjects</strong>{" "}
                  tab.
                </div>
              ) : (
                <AddMaterial subjects={subjects} />
              ))}
            {tab === "pyq" &&
              (subjects.length === 0 ? (
                <div
                  style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}
                >
                  Add subjects first from the <strong>Manage Subjects</strong>{" "}
                  tab.
                </div>
              ) : (
                <AddPYQ subjects={subjects} />
              ))}
            {tab === "video" &&
              (subjects.length === 0 ? (
                <div
                  style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}
                >
                  Add subjects first from the <strong>Manage Subjects</strong>{" "}
                  tab.
                </div>
              ) : (
                <AddVideo subjects={subjects} />
              ))}
          </>
        )}
      </div>
    </Layout>
  );
}
