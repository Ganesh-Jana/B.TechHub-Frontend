import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Streams from "./pages/Streams";
import Subjects from "./pages/Subjects";
import StudyMaterials from "./pages/StudyMaterials";
import Syllabus from "./pages/Syllabus";
import PYQ from "./pages/PYQ";
import Videos from "./pages/Videos";
import Calculator from "./pages/Calculator";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";

// Requires login
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

// Requires login AND ADMIN role
const AdminRoute = ({ children }) => {
  const { token, isAdmin } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/streams/:semId"
            element={
              <ProtectedRoute>
                <Streams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subjects/:semId/:streamId"
            element={
              <ProtectedRoute>
                <Subjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/materials/:subjectId"
            element={
              <ProtectedRoute>
                <StudyMaterials />
              </ProtectedRoute>
            }
          />
          <Route
            path="/syllabus/:subjectId"
            element={
              <ProtectedRoute>
                <Syllabus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pyq/:subjectId"
            element={
              <ProtectedRoute>
                <PYQ />
              </ProtectedRoute>
            }
          />
          <Route
            path="/videos/:subjectId"
            element={
              <ProtectedRoute>
                <Videos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calculator"
            element={
              <ProtectedRoute>
                <Calculator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
