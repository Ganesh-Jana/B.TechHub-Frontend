// Tracks recent page visits for the Dashboard "Recently Visited" section.
// Call trackActivity() from any page when it loads with real data.

export function trackActivity({ title, subject, type, route }) {
  try {
    const KEY = "btechhub_activity";
    const existing = JSON.parse(localStorage.getItem(KEY) || "[]");

    const now = new Date();
    const timeStr = formatTime(now);

    const entry = { title, subject, type, route, time: timeStr, ts: now.getTime() };

    // Remove duplicate route, add to front, keep last 20
    const updated = [entry, ...existing.filter(e => e.route !== route)].slice(0, 20);

    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }
}

function formatTime(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // seconds

  if (diff < 60)  return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? "s" : ""} ago`;
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;
}