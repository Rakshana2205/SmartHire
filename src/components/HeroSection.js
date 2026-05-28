import { useState } from "react";
import { useNavigate } from "react-router-dom";

const POPULAR_SEARCHES = [
  "React Developer",
  "UI Designer",
  "Data Scientist",
  "Product Manager",
  "DevOps Engineer",
];

function HeroSection() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/jobs?search=${search}`);
  }

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Top accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400" />

      {/* Background blobs — subtle! */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-50 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-50 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            1,200+ jobs available right now
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
            Find Your Perfect
            <span className="block mt-2 bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              Career Match ✨
            </span>
          </h1>

          <p className="text-xl text-gray-500 mb-10 font-medium leading-relaxed max-w-2xl">
            SmartHire connects talented professionals with amazing companies.
            Search from 1,200+ verified job listings across India.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch}>
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white border-2 border-gray-100 rounded-2xl shadow-lg shadow-gray-100 max-w-2xl mb-6">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Job title, skills or company..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-800 font-medium outline-none bg-gray-50 focus:bg-white transition-colors text-base"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-violet-200 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
              >
                Search Jobs 🚀
              </button>
            </div>
          </form>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-400 text-sm font-medium">Popular:</span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => navigate(`/jobs?search=${term}`)}
                className="bg-gray-100 hover:bg-violet-50 hover:text-violet-600 text-gray-600 text-sm px-4 py-1.5 rounded-full font-medium transition-all border border-transparent hover:border-violet-200"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                number: "1,200+",
                label: "Active Jobs",
                emoji: "💼",
                color: "text-violet-600",
              },
              {
                number: "500+",
                label: "Companies",
                emoji: "🏢",
                color: "text-pink-500",
              },
              {
                number: "50K+",
                label: "Job Seekers",
                emoji: "👥",
                color: "text-orange-500",
              },
              {
                number: "95%",
                label: "Success Rate",
                emoji: "🎯",
                color: "text-green-500",
              },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className={`text-3xl ${stat.color} font-black`}>
                  {stat.emoji}
                </div>
                <div>
                  <div className={`text-2xl font-black ${stat.color}`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
