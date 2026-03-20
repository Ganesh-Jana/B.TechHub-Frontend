import { useState } from "react";
import Layout from "../components/Layout";

// ─── Yearly Marks % Convert ──────────────────────────────────────────────────
function YearlyMarksCalculator() {
  const [oddSemCGPA, setOddSemCGPA] = useState("");
  const [oddSemSubjects, setOddSemSubjects] = useState("");
  const [endSemCGPA, setEndSemCGPA] = useState("");
  const [endSemSubjects, setEndSemSubjects] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
    background: "#fafafa",
    color: "#111827",
  };

  const calculate = () => {
    setError("");
    setResult(null);

    const oCGPA = parseFloat(oddSemCGPA);
    const oSub = parseInt(oddSemSubjects);
    const eCGPA = parseFloat(endSemCGPA);
    const eSub = parseInt(endSemSubjects);

    if (!oCGPA || !oSub || !eCGPA || !eSub) {
      setError("Please fill in all four fields.");
      return;
    }
    if (oCGPA > 10 || eCGPA > 10) {
      setError("CGPA cannot exceed 10.");
      return;
    }

    const totalSubjects = oSub + eSub;
    // Weighted average CGPA across both semesters
    const overallCGPA = (oCGPA * oSub + eCGPA * eSub) / totalSubjects;
    // Total marks: each subject = 100 marks
    const totalMaxMarks = totalSubjects * 100;
    // Convert CGPA → marks per subject using standard formula: marks = CGPA * 9.5
    const obtainedMarks = overallCGPA * 9.5 * totalSubjects;
    const overallPct = (obtainedMarks / totalMaxMarks) * 100;

    const grade =
      overallPct >= 90
        ? "O (Outstanding)"
        : overallPct >= 80
          ? "A+ (Excellent)"
          : overallPct >= 70
            ? "A (Very Good)"
            : overallPct >= 60
              ? "B+ (Good)"
              : overallPct >= 50
                ? "B (Average)"
                : overallPct >= 40
                  ? "C (Pass)"
                  : "F (Fail)";

    const gradeColor =
      overallPct >= 80
        ? "#16a34a"
        : overallPct >= 60
          ? "#2563eb"
          : overallPct >= 40
            ? "#d97706"
            : "#dc2626";

    setResult({
      overallCGPA: overallCGPA.toFixed(2),
      totalSubjects,
      totalMaxMarks,
      obtainedMarks: obtainedMarks.toFixed(1),
      overallPct: overallPct.toFixed(2),
      grade,
      gradeColor,
    });
  };

  const reset = () => {
    setOddSemCGPA("");
    setOddSemSubjects("");
    setEndSemCGPA("");
    setEndSemSubjects("");
    setResult(null);
    setError("");
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        border: "1px solid #e8ecf0",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            flexShrink: 0,
          }}
        >
          🎓
        </div>
        <div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.3px",
            }}
          >
            Yearly Marks % Convert
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.8)",
              marginTop: 2,
            }}
          >
            Marks Calculator for Scholarship
          </div>
        </div>
      </div>

      <div style={{ padding: "24px" }}>
        {/* Odd Sem */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                color: "#2563eb",
              }}
            >
              O
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
              Odd Semester
            </span>
            <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#6b7280",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                CGPA (0–10)
              </label>
              <input
                type="number"
                placeholder="e.g. 8.5"
                min="0"
                max="10"
                step="0.01"
                value={oddSemCGPA}
                onChange={(e) => setOddSemCGPA(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2563eb";
                  e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#6b7280",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                No. of Subjects
              </label>
              <input
                type="number"
                placeholder="e.g. 6"
                min="1"
                max="20"
                value={oddSemSubjects}
                onChange={(e) => setOddSemSubjects(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2563eb";
                  e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>
        </div>

        {/* End Sem */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                color: "#16a34a",
              }}
            >
              E
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
              End Semester
            </span>
            <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#6b7280",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                CGPA (0–10)
              </label>
              <input
                type="number"
                placeholder="e.g. 7.8"
                min="0"
                max="10"
                step="0.01"
                value={endSemCGPA}
                onChange={(e) => setEndSemCGPA(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "#16a34a";
                  e.target.style.boxShadow = "0 0 0 3px rgba(22,163,74,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#6b7280",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                No. of Subjects
              </label>
              <input
                type="number"
                placeholder="e.g. 7"
                min="1"
                max="20"
                value={endSemSubjects}
                onChange={(e) => setEndSemSubjects(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "#16a34a";
                  e.target.style.boxShadow = "0 0 0 3px rgba(22,163,74,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>
        </div>

        {error && (
          <div
            style={{
              background: "#fff1f2",
              border: "1px solid #fecdd3",
              borderRadius: 10,
              padding: "9px 14px",
              fontSize: 13,
              color: "#e11d48",
              marginBottom: 14,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={reset}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              border: "1.5px solid #e5e7eb",
              background: "#fff",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: "#6b7280",
            }}
          >
            ↺ Reset
          </button>
          <button
            onClick={calculate}
            style={{
              flex: 1,
              padding: "11px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg, #0ea5e9, #2563eb)",
              color: "#fff",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.01em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Calculate Marks & Percentage
          </button>
        </div>

        {/* Result */}
        {result && (
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                background: "linear-gradient(135deg, #0c1445, #1e3a5f)",
                borderRadius: 14,
                padding: "20px",
                marginBottom: 10,
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#93c5fd",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Overall Percentage
                </div>
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-2px",
                    lineHeight: 1,
                  }}
                >
                  {result.overallPct}%
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: result.gradeColor,
                    marginTop: 6,
                    background: "rgba(255,255,255,0.08)",
                    display: "inline-block",
                    padding: "3px 14px",
                    borderRadius: 100,
                  }}
                >
                  {result.grade}
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8,
                }}
              >
                {[
                  { label: "Overall CGPA", value: result.overallCGPA },
                  { label: "Obtained Marks", value: result.obtainedMarks },
                  { label: "Total Marks", value: result.totalMaxMarks },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      borderRadius: 10,
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{ fontSize: 11, color: "#9ca3af", textAlign: "center" }}
            >
              Formula: Obtained Marks = Overall CGPA × 9.5 × Total Subjects
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Mid Sem Grade (%) Calculator ───────────────────────────────────────────
const SEMESTER_OPTIONS = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
];

function MidSemCalculator() {
  const [uptoSem, setUptoSem] = useState("");
  const [semData, setSemData] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSemSelect = (val) => {
    setUptoSem(val);
    setResult(null);
    setError("");
    const count = parseInt(val.replace("Semester ", ""));
    setSemData(
      Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        label: `Semester ${i + 1}`,
        cgpa: "",
      })),
    );
  };

  const updateCGPA = (id, val) =>
    setSemData((prev) =>
      prev.map((s) => (s.id === id ? { ...s, cgpa: val } : s)),
    );

  const calculate = () => {
    setError("");
    setResult(null);
    const valid = semData.filter((s) => s.cgpa !== "");
    if (valid.length !== semData.length) {
      setError("Please enter CGPA for all semesters.");
      return;
    }
    for (const s of valid) {
      if (parseFloat(s.cgpa) > 10 || parseFloat(s.cgpa) < 0) {
        setError("CGPA must be between 0 and 10.");
        return;
      }
    }
    const avgCGPA =
      valid.reduce((a, s) => a + parseFloat(s.cgpa), 0) / valid.length;
    // Rule: Percentage = (CGPA - 0.75) * 10
    const percentage = (avgCGPA - 0.75) * 10;

    const grade =
      percentage >= 90
        ? "O (Outstanding)"
        : percentage >= 80
          ? "A+ (Excellent)"
          : percentage >= 70
            ? "A (Very Good)"
            : percentage >= 60
              ? "B+ (Good)"
              : percentage >= 50
                ? "B (Average)"
                : percentage >= 40
                  ? "C (Pass)"
                  : "F (Fail)";

    const gradeColor =
      percentage >= 80
        ? "#16a34a"
        : percentage >= 60
          ? "#2563eb"
          : percentage >= 40
            ? "#d97706"
            : "#dc2626";

    setResult({
      avgCGPA: avgCGPA.toFixed(2),
      percentage: percentage.toFixed(2),
      grade,
      gradeColor,
      count: valid.length,
    });
  };

  const reset = () => {
    setUptoSem("");
    setSemData([]);
    setResult(null);
    setError("");
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        border: "1px solid #e8ecf0",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            flexShrink: 0,
          }}
        >
          🧑‍💼
        </div>
        <div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.3px",
            }}
          >
            Mid Sem Grade (%) Calculator
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.8)",
              marginTop: 2,
            }}
          >
            For Placement and Other Form Fill Up
          </div>
        </div>
      </div>

      <div style={{ padding: "24px" }}>
        {/* Formula info */}
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 20,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 16 }}>📐</span>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#166534" }}>
              Formula used:{" "}
            </span>
            <span style={{ fontSize: 12, color: "#166534" }}>
              Percentage = (CGPA − 0.75) × 10
            </span>
          </div>
        </div>

        {/* Semester selector */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#0f172a",
              display: "block",
              marginBottom: 8,
            }}
          >
            Select Semester (Up to)
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
            }}
          >
            {SEMESTER_OPTIONS.map((sem) => (
              <button
                key={sem}
                onClick={() => handleSemSelect(sem)}
                style={{
                  padding: "8px 6px",
                  borderRadius: 10,
                  cursor: "pointer",
                  border: `1.5px solid ${uptoSem === sem ? "#059669" : "#e5e7eb"}`,
                  background: uptoSem === sem ? "#f0fdf4" : "#fafafa",
                  fontSize: 12,
                  fontWeight: uptoSem === sem ? 700 : 500,
                  color: uptoSem === sem ? "#059669" : "#6b7280",
                  transition: "all 0.15s",
                }}
              >
                {sem.replace("Semester ", "Sem ")}
              </button>
            ))}
          </div>
        </div>

        {/* CGPA inputs per semester */}
        {semData.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                Enter CGPA for each semester
              </span>
              <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 10,
              }}
            >
              {semData.map((s) => (
                <div key={s.id}>
                  <label
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#6b7280",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {s.label} CGPA
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="number"
                      placeholder="0.00 – 10.00"
                      min="0"
                      max="10"
                      step="0.01"
                      value={s.cgpa}
                      onChange={(e) => updateCGPA(s.id, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px 10px 36px",
                        borderRadius: 10,
                        border: "1.5px solid #e5e7eb",
                        fontSize: 13,
                        outline: "none",
                        fontFamily: "inherit",
                        background: "#fafafa",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#059669";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(5,150,105,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 11,
                        fontWeight: 800,
                        color: "#059669",
                        background: "#f0fdf4",
                        borderRadius: 4,
                        padding: "1px 4px",
                      }}
                    >
                      S{s.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!uptoSem && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: "#9ca3af",
              fontSize: 13,
            }}
          >
            👆 Select a semester above to get started
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#fff1f2",
              border: "1px solid #fecdd3",
              borderRadius: 10,
              padding: "9px 14px",
              fontSize: 13,
              color: "#e11d48",
              marginBottom: 14,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {semData.length > 0 && (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={reset}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                border: "1.5px solid #e5e7eb",
                background: "#fff",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                color: "#6b7280",
              }}
            >
              ↺ Reset
            </button>
            <button
              onClick={calculate}
              style={{
                flex: 1,
                padding: "11px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Calculate Average Grade & Percentage
            </button>
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                background: "linear-gradient(135deg, #052e16, #065f46)",
                borderRadius: 14,
                padding: "20px",
                marginBottom: 10,
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#6ee7b7",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Overall Percentage
                </div>
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-2px",
                    lineHeight: 1,
                  }}
                >
                  {result.percentage}%
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: result.gradeColor,
                    marginTop: 6,
                    background: "rgba(255,255,255,0.1)",
                    display: "inline-block",
                    padding: "3px 14px",
                    borderRadius: 100,
                  }}
                >
                  {result.grade}
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {[
                  { label: "Average CGPA", value: result.avgCGPA },
                  { label: "Semesters Counted", value: result.count },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{ fontSize: 10, color: "#6ee7b7", marginTop: 2 }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{ fontSize: 11, color: "#9ca3af", textAlign: "center" }}
            >
              Percentage = ({result.avgCGPA} − 0.75) × 10 ={" "}
              <strong>{result.percentage}%</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Calculator() {
  const [active, setActive] = useState(null);

  const cards = [
    {
      key: "yearly",
      icon: "🎓",
      title: "Yearly Marks % Convert",
      subtitle: "Marks Calculator for Scholarship",
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
      hoverGlow: "rgba(14,165,233,0.2)",
    },
    {
      key: "midsem",
      icon: "🧑‍💼",
      title: "Mid Sem Grade (%) Calculator",
      subtitle: "For Placement and Other Form Fill Up",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      hoverGlow: "rgba(16,185,129,0.2)",
    },
  ];

  return (
    <Layout title="Academic Calculators" breadcrumb={["Home", "Calculators"]}>
      <style>{`
        .calc-option-card { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .calc-option-card:hover { transform: translateY(-3px); }
        @media (max-width: 768px) { .calc-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 24px" }}>
        Select a calculator below to get started.
      </p>

      {/* Selector cards */}
      <div
        className="calc-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.key}
            className="calc-option-card"
            onClick={() => setActive(active === card.key ? null : card.key)}
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: `2px solid ${active === card.key ? "transparent" : "#e8ecf0"}`,
              boxShadow:
                active === card.key
                  ? `0 0 0 3px ${card.hoverGlow}, 0 8px 24px ${card.hoverGlow}`
                  : "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                background: card.gradient,
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 2,
                  }}
                >
                  {card.subtitle}
                </div>
              </div>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  color: "#fff",
                  flexShrink: 0,
                  transition: "transform 0.2s",
                  transform:
                    active === card.key ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ▾
              </div>
            </div>
            {/* Active indicator bar */}
            {active === card.key && (
              <div style={{ height: 3, background: card.gradient }} />
            )}
          </div>
        ))}
      </div>

      {/* Calculator panels */}
      {active === "yearly" && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <YearlyMarksCalculator />
        </div>
      )}
      {active === "midsem" && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <MidSemCalculator />
        </div>
      )}

      {!active && (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#9ca3af",
            background: "#fff",
            borderRadius: 16,
            border: "1.5px dashed #e5e7eb",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 10 }}>🧮</div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#374151",
              marginBottom: 4,
            }}
          >
            Choose a calculator above
          </div>
          <div style={{ fontSize: 13 }}>
            Click either card to expand and start calculating
          </div>
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </Layout>
  );
}
