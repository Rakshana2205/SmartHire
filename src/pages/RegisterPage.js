import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/authService";

function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPass, setShowPass] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = "Full name is required!";
    } else if (form.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters!";
    }
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
    if (!form.confirmPassword) {
      errs.confirmPassword = "Please confirm your password!";
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match!";
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
      const { user, token } = registerUser(form);
      login(user, token);
      navigate("/dashboard");
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

  const strength =
    form.password.length === 0
      ? 0
      : form.password.length < 6
        ? 1
        : form.password.length < 10
          ? 2
          : 3;

  const strengthColors = ["", "bg-red-400", "bg-yellow-400", "bg-green-400"];
  const strengthLabels = ["", "Weak", "Medium", "Strong"];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 relative overflow-hidden items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center px-12">
          <div className="text-8xl mb-6">🚀</div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Start Your Career Journey Today!
          </h2>
          <p className="text-white/70 text-lg font-medium leading-relaxed mb-10">
            Join 50,000+ professionals who found their dream job through
            SmartHire!
          </p>
          <div className="space-y-4">
            {[
              "✅ Free account — always",
              "✅ Apply to unlimited jobs",
              "✅ Save your favourite listings",
              "✅ Track all your applications",
            ].map((item) => (
              <div
                key={item}
                className="bg-white/15 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20 text-white font-semibold text-left"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-white font-black text-lg">
              S
            </div>
            <span className="text-xl font-black gradient-text">SmartHire</span>
          </Link>

          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-gray-500 font-medium mb-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-600 font-bold hover:text-violet-700"
            >
              Sign in →
            </Link>
          </p>

          {apiError && (
            <div className="bg-red-50 border border-red-100 text-red-600 font-semibold px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
              <span>⚠️</span>
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Rakshana S"
                className={`w-full px-4 py-3.5 rounded-xl border-2 outline-none font-medium transition-all ${
                  errors.name
                    ? "border-red-300 bg-red-50"
                    : "border-gray-100 bg-gray-50 focus:border-violet-300 focus:bg-white"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm font-semibold mt-1.5">
                  ⚠️ {errors.name}
                </p>
              )}
            </div>

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
                    ? "border-red-300 bg-red-50"
                    : "border-gray-100 bg-gray-50 focus:border-violet-300 focus:bg-white"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-semibold mt-1.5">
                  ⚠️ {errors.email}
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
                      ? "border-red-300 bg-red-50"
                      : "border-gray-100 bg-gray-50 focus:border-violet-300 focus:bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1.5 mb-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          i <= strength
                            ? strengthColors[strength]
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs font-semibold ${
                      strength === 1
                        ? "text-red-500"
                        : strength === 2
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {strengthLabels[strength]} password
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="text-red-500 text-sm font-semibold mt-1.5">
                  ⚠️ {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className={`w-full px-4 py-3.5 rounded-xl border-2 outline-none font-medium transition-all ${
                  errors.confirmPassword
                    ? "border-red-300 bg-red-50"
                    : form.confirmPassword &&
                        form.password === form.confirmPassword
                      ? "border-green-300 bg-green-50"
                      : "border-gray-100 bg-gray-50 focus:border-violet-300 focus:bg-white"
                }`}
              />
              {form.confirmPassword &&
                form.password === form.confirmPassword && (
                  <p className="text-green-500 text-sm font-semibold mt-1.5">
                    ✅ Passwords match!
                  </p>
                )}
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm font-semibold mt-1.5">
                  ⚠️ {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-pink-500 text-white font-black py-4 rounded-xl hover:shadow-lg hover:shadow-violet-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 mt-2"
            >
              {loading ? "⏳ Creating account..." : "Create Free Account 🚀"}
            </button>

            <p className="text-center text-gray-400 text-xs font-medium">
              By signing up you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
