import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children, title, breadcrumb }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ marginLeft: 240, flex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }} className="main-content">
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main style={{ marginTop: 64, padding: "28px 28px", flex: 1 }}>
          {(title || breadcrumb) && (
            <div style={{ marginBottom: 24 }}>
              {breadcrumb && (
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6, display: "flex", gap: 6, alignItems: "center" }}>
                  {breadcrumb.map((b, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {i > 0 && <span style={{ color: "#d1d5db" }}>›</span>}
                      <span style={{ color: i === breadcrumb.length - 1 ? "#374151" : "#9ca3af", fontWeight: i === breadcrumb.length - 1 ? 500 : 400 }}>{b}</span>
                    </span>
                  ))}
                </div>
              )}
              {title && (
                <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.3px", margin: 0 }}>{title}</h1>
              )}
            </div>
          )}
          {children}
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @media (max-width: 768px) {
          .main-content { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
