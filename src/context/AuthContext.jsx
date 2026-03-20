import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null"),
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "USER");

  // On first load, re-fetch role from backend (in case it was changed in DB)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;

    fetch("https://btechhub-backend-production.up.railway.app/api/auth/me", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.role) {
          setRole(data.role);
          localStorage.setItem("role", data.role);
          // also sync latest user info
          setUser((prev) => ({ ...prev, ...data }));
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...JSON.parse(localStorage.getItem("user") || "{}"),
              ...data,
            }),
          );
        }
      })
      .catch(() => {});
  }, []);

  const login = (tokenValue, userData) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(tokenValue);
    setUser(userData);

    // Fetch role right after login
    fetch("https://btechhub-backend-production.up.railway.app/api/auth/me", {
      headers: { Authorization: `Bearer ${tokenValue}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.role) {
          setRole(data.role);
          localStorage.setItem("role", data.role);
        }
      })
      .catch(() => {});
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setToken(null);
    setUser(null);
    setRole("USER");
  };

  // Convenience helper used throughout the app
  const isAdmin = role === "ADMIN";

  return (
    <AuthContext.Provider value={{ token, user, role, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
