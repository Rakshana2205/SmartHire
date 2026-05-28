import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-9xl mb-6 animate-bounce">🔍</div>

        <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>

        <h2 className="text-2xl font-black text-gray-700 mb-4">
          Oops! Page not found
        </h2>

        <p className="text-gray-500 font-medium mb-10 text-lg leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-violet-600 to-pink-500 text-white font-black px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-violet-200 hover:scale-105 transition-all"
          >
            Go Home 🏠
          </button>
          <button
            onClick={() => navigate("/jobs")}
            className="bg-white text-gray-700 font-black px-8 py-4 rounded-2xl border-2 border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all"
          >
            Browse Jobs 💼
          </button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4">
          {[
            { emoji: "💼", label: "Find Jobs", path: "/jobs" },
            { emoji: "🔐", label: "Login", path: "/login" },
            { emoji: "🚀", label: "Sign Up", path: "/register" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="p-4 bg-white rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-md transition-all group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                {item.emoji}
              </div>
              <p className="text-sm font-bold text-gray-600 group-hover:text-violet-600 transition-colors">
                {item.label}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
