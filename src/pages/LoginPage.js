import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPass, setShowPass] = useState(false);

  function validate() {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Please enter a valid email!";
    }
    if (!form.password) {
      errs.password = "Password is required!";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters!";
    }
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setApiError("");
    try {
      const { user, token } = loginUser(form);
      login(user, token);
      navigate("/");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 relative overflow-hidden items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center px-12">
          <div className="text-8xl mb-6">👋</div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Welcome Back to SmartHire!
          </h2>
          <p className="text-white/70 text-lg font-medium leading-relaxed">
            Your dream job is waiting. Sign in and continue your journey to
            success!
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { num: "1,200+", label: "Active Jobs" },
              { num: "500+", label: "Companies" },
              { num: "50K+", label: "Job Seekers" },
              { num: "95%", label: "Success Rate" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <p className="text-2xl font-black text-white">{stat.num}</p>
                <p className="text-white/70 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-white font-black text-lg">
              S
            </div>
            <span className="text-xl font-black gradient-text">SmartHire</span>
          </Link>

          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Sign in to your account
          </h1>
          <p className="text-gray-500 font-medium mb-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-violet-600 font-bold hover:text-violet-700"
            >
              Sign up free →
            </Link>
          </p>

          {/* API Error */}
          {apiError && (
            <div className="bg-red-50 border border-red-100 text-red-600 font-semibold px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
              <span>⚠️</span>
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-3.5 rounded-xl border-2 outline-none font-medium transition-all ${
                  errors.email
                    ? "border-red-300 bg-red-50 focus:border-red-400"
                    : "border-gray-100 bg-gray-50 focus:border-violet-300 focus:bg-white"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-semibold mt-1.5 flex items-center gap-1">
                  <span>⚠️</span> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className={`w-full px-4 py-3.5 rounded-xl border-2 outline-none font-medium transition-all pr-12 ${
                    errors.password
                      ? "border-red-300 bg-red-50 focus:border-red-400"
                      : "border-gray-100 bg-gray-50 focus:border-violet-300 focus:bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm font-semibold mt-1.5 flex items-center gap-1">
                  <span>⚠️</span> {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-pink-500 text-white font-black py-4 rounded-xl hover:shadow-lg hover:shadow-violet-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 mt-2"
            >
              {loading ? "⏳ Signing in..." : "Sign In →"}
            </button>
          </form>

          {/* Demo account */}
          <div className="mt-6 p-4 bg-violet-50 rounded-xl border border-violet-100">
            <p className="text-violet-700 text-sm font-bold mb-1">
              🧪 Don't have an account?
            </p>
            <p className="text-violet-600 text-sm font-medium">
              Click{" "}
              <Link to="/register" className="font-bold underline">
                Sign Up
              </Link>{" "}
              to create one free — takes 30 seconds!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
