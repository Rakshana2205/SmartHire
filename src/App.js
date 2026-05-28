import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { JobsProvider } from "./context/JobsContext";
import { ToastProvider } from "./components/Toast";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import JobListingsPage from "./pages/JobListingsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import useScrollTop from "./hooks/useScrollTop";

function WithNav({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}

function ScrollToTop() {
  useScrollTop();
  return null;
}

function App() {
  return (
    <AuthProvider>
      <JobsProvider>
        <ToastProvider>
          <BrowserRouter>
          <ScrollToTop />
            <Routes>
              <Route
                path="/"
                element={
                  <WithNav>
                    <HomePage />
                  </WithNav>
                }
              />

              <Route
                path="/jobs"
                element={
                  <WithNav>
                    <JobListingsPage />
                  </WithNav>
                }
              />

              <Route
                path="/jobs/:id"
                element={
                  <WithNav>
                    <JobDetailsPage />
                  </WithNav>
                }
              />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <WithNav>
                      <DashboardPage />
                    </WithNav>
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </JobsProvider>
    </AuthProvider>
  );
}

export default App;
