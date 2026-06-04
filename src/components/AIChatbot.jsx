import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are BTechHub AI Assistant — a helpful study assistant for B.Tech engineering students. 
You help students with:
- Subject doubts across all engineering branches (CSE, IT, ECE, EE, ME, Civil)
- Concepts from all 8 semesters
- Exam preparation tips
- Understanding difficult topics
- General study questions

Keep answers clear, concise and student-friendly. Use examples where helpful.
If asked about something unrelated to studies, politely redirect to academic topics.`;

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://b-techhub-backend-6.onrender.com/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            messages: updatedMessages,
          }),
        },
      );

      const data = await response.json();
      const reply =
        data.content?.[0]?.text || "Sorry, I couldn't get a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError("");
  };

  return (
    <>
      <style>{`
        .chat-bubble-btn {
          width: 56px; height: 56px; border-radius: 50%;
          background: #2563eb; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(37,99,235,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          flex-shrink: 0;
        }
        .chat-bubble-btn:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(37,99,235,0.5); }

        .chat-window {
          position: fixed; bottom: 90px; right: 24px;
          width: 380px; height: 520px;
          background: #fff; border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          display: flex; flex-direction: column;
          overflow: hidden; z-index: 1000;
          animation: slideUp 0.25s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        @media (max-width: 480px) {
          .chat-window {
            width: calc(100vw - 32px); right: 16px;
            bottom: 80px; height: 70vh;
          }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .chat-header {
          background: linear-gradient(135deg, #1e1b4b, #2563eb);
          padding: 16px 18px;
          display: flex; align-items: center; gap: 10; justify-content: space-between;
        }
        .chat-messages {
          flex: 1; overflow-y: auto; padding: 16px;
          display: flex; flex-direction: column; gap: 10;
          background: #f8fafc;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

        .msg-user {
          align-self: flex-end; max-width: 80%;
          background: #2563eb; color: #fff;
          padding: 10px 14px; border-radius: 16px 16px 4px 16px;
          font-size: 13px; line-height: 1.5;
        }
        .msg-ai {
          align-self: flex-start; max-width: 85%;
          background: #fff; color: #1e293b;
          padding: 10px 14px; border-radius: 16px 16px 16px 4px;
          font-size: 13px; line-height: 1.6;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          white-space: pre-wrap;
        }
        .msg-error {
          align-self: center; font-size: 12px;
          color: #e11d48; background: #fff1f2;
          padding: 6px 12px; border-radius: 8px;
        }

        .typing-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #94a3b8; display: inline-block; margin: 0 2px;
          animation: typingBounce 1.2s infinite ease-in-out;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingBounce {
          0%,80%,100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }

        .chat-input-area {
          padding: 12px 14px;
          border-top: 1px solid #e8ecf0;
          background: #fff;
          display: flex; gap: 8px; align-items: flex-end;
        }
        .chat-input {
          flex: 1; padding: 10px 14px; border-radius: 12px;
          border: 1.5px solid #e5e7eb; font-size: 13px;
          outline: none; resize: none; max-height: 100px;
          font-family: inherit; line-height: 1.5;
          transition: border-color 0.2s;
        }
        .chat-input:focus { border-color: #2563eb; }
        .send-btn {
          width: 38px; height: 38px; border-radius: 10px;
          background: #2563eb; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background 0.2s;
        }
        .send-btn:hover:not(:disabled) { background: #1d4ed8; }
        .send-btn:disabled { background: #93c5fd; cursor: not-allowed; }
      `}</style>

      {/* Floating button */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        {/* Tooltip */}
        {!isOpen && (
          <div
            style={{
              background: "#1e293b",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              padding: "6px 12px",
              borderRadius: 20,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              fontFamily: "inherit",
            }}
          >
            Ask AI Doubt 🎓
          </div>
        )}

        <button
          className="chat-bubble-btn"
          onClick={() => setIsOpen((o) => !o)}
        >
          {isOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="10" r="1" fill="#fff" />
              <circle cx="12" cy="10" r="1" fill="#fff" />
              <circle cx="15" cy="10" r="1" fill="#fff" />
            </svg>
          )}
        </button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                🎓
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                  BTechHub AI
                </div>
                <div style={{ fontSize: 11, color: "#93c5fd" }}>
                  Ask your study doubts
                </div>
              </div>
            </div>
            <button
              onClick={clearChat}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: 8,
                padding: "5px 10px",
                color: "#93c5fd",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Clear
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div style={{ textAlign: "center", padding: "20px 10px" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>👋</div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: 4,
                  }}
                >
                  Hi! I'm BTechHub AI
                </div>
                <div
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 16 }}
                >
                  Ask me anything about your B.Tech subjects
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  {[
                    "Explain Data Structures in simple terms",
                    "What is the difference between TCP and UDP?",
                    "How does a PN junction work?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                        inputRef.current?.focus();
                      }}
                      style={{
                        background: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        borderRadius: 10,
                        padding: "8px 12px",
                        fontSize: 12,
                        color: "#2563eb",
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "inherit",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#dbeafe")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#eff6ff")
                      }
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === "user" ? "msg-user" : "msg-ai"}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div
                className="msg-ai"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "12px 14px",
                }}
              >
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}

            {error && <div className="msg-error">{error}</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Ask a study doubt..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
