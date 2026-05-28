import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import jobs from "../data/jobs";

const CATEGORIES = [
  {
    label: "Technology",
    emoji: "💻",
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
    count: 480,
  },
  {
    label: "Design",
    emoji: "🎨",
    bg: "bg-pink-50",
    text: "text-pink-600",
    border: "border-pink-100",
    count: 230,
  },
  {
    label: "Marketing",
    emoji: "📢",
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-100",
    count: 180,
  },
  {
    label: "Data",
    emoji: "📊",
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-100",
    count: 290,
  },
  {
    label: "Management",
    emoji: "👔",
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-100",
    count: 150,
  },
  {
    label: "Mobile",
    emoji: "📱",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-100",
    count: 120,
  },
];

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-50 to-pink-50 border border-gray-100 flex items-center justify-center text-2xl">
          {job.companyLogo}
        </div>
        <div className="flex items-center gap-2">
          {job.featured && (
            <span className="bg-amber-50 text-amber-600 border border-amber-100 text-xs font-bold px-2.5 py-1 rounded-full">
              ⭐ Featured
            </span>
          )}
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${
              job.type === "Full Time"
                ? "bg-green-50 text-green-600 border-green-100"
                : "bg-blue-50 text-blue-600 border-blue-100"
            }`}
          >
            {job.type}
          </span>
        </div>
      </div>

      <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-violet-600 transition-colors">
        {job.title}
      </h3>
      <p className="text-gray-500 text-sm mb-3 font-medium flex items-center gap-1">
        <span>{job.company}</span>
        <span className="text-gray-300">·</span>
        <span>📍 {job.location}</span>
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="bg-gray-50 text-gray-600 border border-gray-100 text-xs px-2.5 py-1 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <span className="text-violet-600 font-bold text-sm">{job.salary}</span>
        <span className="text-gray-400 text-xs font-medium">{job.posted}</span>
      </div>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const featuredJobs = jobs.filter((j) => j.featured);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      {/* Categories Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-violet-600 font-bold text-sm uppercase tracking-widest mb-3">
              Explore Categories
            </p>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
              Find jobs in your area of expertise from top companies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => navigate(`/jobs?category=${cat.label}`)}
                className={`group p-5 rounded-2xl ${cat.bg} border ${cat.border} hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center`}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </div>
                <p className={`font-bold text-sm ${cat.text}`}>{cat.label}</p>
                <p className="text-gray-400 text-xs mt-1">{cat.count} jobs</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-violet-600 font-bold text-sm uppercase tracking-widest mb-3">
                Top Picks
              </p>
              <h2 className="text-4xl font-black text-gray-900 mb-2">
                Featured Jobs ✨
              </h2>
              <p className="text-gray-500 font-medium">
                Hand-picked from top companies hiring right now
              </p>
            </div>
            <button
              onClick={() => navigate("/jobs")}
              className="hidden md:flex items-center gap-2 text-violet-600 hover:text-violet-700 font-bold border-2 border-violet-200 hover:border-violet-300 px-6 py-3 rounded-full transition-all hover:bg-violet-50"
            >
              View All Jobs →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <button
              onClick={() => navigate("/jobs")}
              className="text-violet-600 font-bold border-2 border-violet-200 px-8 py-3 rounded-full hover:bg-violet-50 transition-all"
            >
              View All Jobs →
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-600 font-bold text-sm uppercase tracking-widest mb-3">
              Simple Process
            </p>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              How SmartHire Works
            </h2>
            <p className="text-gray-500 text-lg font-medium">
              Land your dream job in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                emoji: "🔍",
                title: "Search Jobs",
                desc: "Browse thousands of verified job listings from top companies across India",
                color: "from-violet-500 to-violet-600",
                bg: "bg-violet-50",
              },
              {
                step: "02",
                emoji: "📝",
                title: "Apply Easily",
                desc: "One-click apply with your SmartHire profile. No lengthy forms needed",
                color: "from-pink-500 to-pink-600",
                bg: "bg-pink-50",
              },
              {
                step: "03",
                emoji: "🎉",
                title: "Get Hired",
                desc: "Connect with top employers and land your perfect role faster than ever",
                color: "from-orange-500 to-orange-600",
                bg: "bg-orange-50",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative text-center p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg`}
                >
                  {item.emoji}
                </div>
                <div className="absolute top-6 right-6 text-5xl font-black text-gray-50">
                  {item.step}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-violet-600 to-pink-600 rounded-3xl p-12 text-center overflow-hidden">
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/3" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30">
                🚀 Join 50,000+ professionals
              </div>
              <h2 className="text-4xl font-black text-white mb-4 leading-tight">
                Ready to find your
                <br />
                dream job?
              </h2>
              <p className="text-white/80 text-lg mb-10 font-medium">
                Create your free account and start applying to top companies
                today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/register")}
                  className="bg-white text-violet-600 font-black px-8 py-4 rounded-2xl hover:shadow-xl hover:scale-105 transition-all"
                >
                  Get Started Free ✨
                </button>
                <button
                  onClick={() => navigate("/jobs")}
                  className="bg-white/15 text-white font-bold px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/25 transition-all"
                >
                  Browse Jobs →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-black text-lg">
                S
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                SmartHire
              </span>
            </div>

            <p className="text-gray-500 text-sm font-medium">
              © 2026 SmartHire · Built with ❤️ by Rakshana S
            </p>

            <div className="flex gap-6">
              {["Privacy", "Terms", "Contact"].map((link) => {
                return (
                  <span
                    key={link}
                    className="text-gray-500 hover:text-white transition-colors text-sm font-medium cursor-pointer"
                  >
                    {link}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
