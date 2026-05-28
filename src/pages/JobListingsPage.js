import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useJobSearch from "../hooks/useJobSearch";
import SkeletonCard from "../components/SkeletonCard";

const JOB_TYPES = ["All", "Full Time", "Part Time", "Remote", "Contract"];
const CATEGORIES = [
  "All",
  "Technology",
  "Design",
  "Marketing",
  "Data",
  "Management",
  "Mobile",
];
const LOCATIONS = [
  "All",
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Remote",
];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-50 to-pink-50 border border-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
            {job.companyLogo}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-violet-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-500 text-sm font-medium">{job.company}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
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

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span>📍 {job.location}</span>
        <span>💼 {job.experience}</span>
        <span>🕐 {job.posted}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-50 text-gray-600 border border-gray-100 text-xs px-2.5 py-1 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <span className="text-violet-600 font-bold">{job.salary}</span>
        <span className="text-sm font-bold text-violet-600 group-hover:gap-2 transition-all">
          View Details →
        </span>
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
        active
          ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200"
          : "bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-600"
      }`}
    >
      {label}
    </button>
  );
}

function JobListingsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const {
    search,
    setSearch,
    category,
    setCategory,
    jobType,
    setJobType,
    location,
    setLocation,
    sortBy,
    setSortBy,
    filteredJobs,
    clearFilters,
    hasFilters,
  } = useJobSearch();

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    const categoryQuery = searchParams.get("category") || "All";
    if (searchQuery) setSearch(searchQuery);
    if (categoryQuery !== "All") setCategory(categoryQuery);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Find Your Perfect Job 🔍
          </h1>
          <p className="text-gray-500 font-medium">
            {filteredJobs.length} jobs found
            {search && ` for "${search}"`}
            {category !== "All" && ` in ${category}`}
          </p>

          {/* Search Bar */}
          <div className="mt-6 flex gap-3 max-w-2xl">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs, skills or companies..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-violet-300 outline-none font-medium text-gray-800 bg-gray-50 focus:bg-white transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-semibold transition-all ${
                showFilters
                  ? "border-violet-300 bg-violet-50 text-violet-600"
                  : "border-gray-100 bg-white text-gray-600 hover:border-violet-300"
              }`}
            >
              🎛️ Filters
              {hasFilters && (
                <span className="bg-violet-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  !
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-gray-900">Filter Jobs</h3>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-500 hover:text-red-600 font-semibold"
                >
                  Clear All ✕
                </button>
              )}
            </div>

            <div className="mb-6">
              <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <FilterChip
                    key={cat}
                    label={cat}
                    active={category === cat}
                    onClick={() => setCategory(cat)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                Job Type
              </p>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map((type) => (
                  <FilterChip
                    key={type}
                    label={type}
                    active={jobType === type}
                    onClick={() => setJobType(type)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                Location
              </p>
              <div className="flex flex-wrap gap-2">
                {LOCATIONS.map((loc) => (
                  <FilterChip
                    key={loc}
                    label={loc}
                    active={location === loc}
                    onClick={() => setLocation(loc)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active filters */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-500 font-medium">
              Active filters:
            </span>
            {search && (
              <span className="flex items-center gap-1 bg-violet-50 text-violet-700 border border-violet-100 text-sm px-3 py-1 rounded-full font-semibold">
                🔍 {search}
                <button onClick={() => setSearch("")} className="ml-1">
                  ✕
                </button>
              </span>
            )}
            {category !== "All" && (
              <span className="flex items-center gap-1 bg-violet-50 text-violet-700 border border-violet-100 text-sm px-3 py-1 rounded-full font-semibold">
                📂 {category}
                <button onClick={() => setCategory("All")} className="ml-1">
                  ✕
                </button>
              </span>
            )}
            {jobType !== "All" && (
              <span className="flex items-center gap-1 bg-violet-50 text-violet-700 border border-violet-100 text-sm px-3 py-1 rounded-full font-semibold">
                💼 {jobType}
                <button onClick={() => setJobType("All")} className="ml-1">
                  ✕
                </button>
              </span>
            )}
            {location !== "All" && (
              <span className="flex items-center gap-1 bg-violet-50 text-violet-700 border border-violet-100 text-sm px-3 py-1 rounded-full font-semibold">
                📍 {location}
                <button onClick={() => setLocation("All")} className="ml-1">
                  ✕
                </button>
              </span>
            )}
          </div>
        )}

        {/* Sort + count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 font-medium">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredJobs.length}
            </span>{" "}
            jobs
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 border-gray-100 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 outline-none focus:border-violet-300 bg-white cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Job Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              No jobs found!
            </h3>
            <p className="text-gray-500 font-medium mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobListingsPage;
