import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useJobs } from "../../context/JobsContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { savedJobs } = useJobs();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/");
  }

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 flex items-center justify-center text-white font-black text-lg">
              S
            </div>
            <span className="text-xl font-black gradient-text">SmartHire</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                isActive("/")
                  ? "bg-violet-50 text-violet-600"
                  : "text-gray-600 hover:text-violet-600 hover:bg-gray-50"
              }`}
            >
              🏠 Home
            </Link>
            <Link
              to="/jobs"
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                isActive("/jobs")
                  ? "bg-violet-50 text-violet-600"
                  : "text-gray-600 hover:text-violet-600 hover:bg-gray-50"
              }`}
            >
              💼 Find Jobs
            </Link>
            <Link
              to="/jobs?category=Technology"
              className="px-4 py-2 rounded-full font-semibold text-gray-600 hover:text-violet-600 hover:bg-gray-50 transition-all"
            >
              💻 Tech Jobs
            </Link>
            <Link
              to="/jobs?category=Design"
              className="px-4 py-2 rounded-full font-semibold text-gray-600 hover:text-violet-600 hover:bg-gray-50 transition-all"
            >
              🎨 Design Jobs
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Saved jobs count */}
                <Link
                  to="/dashboard"
                  className="relative flex items-center gap-2 text-gray-500 hover:text-violet-600 font-semibold transition-colors p-2 rounded-full hover:bg-violet-50"
                  title="Saved Jobs"
                >
                  <span className="text-lg">🔖</span>
                  {savedJobs.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {savedJobs.length}
                    </span>
                  )}
                </Link>

                {/* User profile → goes to dashboard */}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 bg-violet-50 hover:bg-violet-100 px-4 py-2 rounded-full transition-all border border-violet-100 hover:border-violet-200"
                >
                  <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-violet-700 font-semibold text-sm hidden sm:block">
                    {user.name?.split(" ")[0]}
                  </span>
                  <span className="text-violet-400 text-xs">▾</span>
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 font-semibold text-sm transition-colors hidden sm:block"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-violet-600 font-semibold transition-colors px-4 py-2 rounded-full hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="gradient-bg text-white px-5 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-violet-200 hover:scale-105 active:scale-95 transition-all"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
