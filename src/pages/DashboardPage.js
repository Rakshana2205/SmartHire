import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";

const TABS = ["Overview", "Saved Jobs", "Applications", "Profile"];

function DashboardPage() {
  const { user, logout } = useAuth();
  const { savedJobs, appliedJobs, unsaveJob } = useJobs();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">
                  {user?.name} 👋
                </h1>
                <p className="text-gray-500 font-medium">{user?.email}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="bg-green-50 text-green-600 border border-green-100 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    ✅ Active
                  </span>
                  <span className="text-gray-400 text-xs font-medium">
                    Member since {user?.joinedAt}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="border-2 border-red-100 text-red-500 hover:bg-red-50 font-bold px-5 py-2.5 rounded-xl transition-all"
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-8 border-b border-gray-100">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 font-bold text-sm transition-all border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-violet-600 text-violet-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "Overview" && "📊 "}
                {tab === "Saved Jobs" && "🔖 "}
                {tab === "Applications" && "✅ "}
                {tab === "Profile" && "👤 "}
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === "Overview" && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  label: "Saved Jobs",
                  value: savedJobs.length,
                  emoji: "🔖",
                  color: "from-violet-500 to-violet-600",
                  tab: "Saved Jobs",
                },
                {
                  label: "Applications",
                  value: appliedJobs.length,
                  emoji: "✅",
                  color: "from-pink-500 to-pink-600",
                  tab: "Applications",
                },
                {
                  label: "Profile Views",
                  value: "24",
                  emoji: "👁️",
                  color: "from-orange-500 to-orange-600",
                  tab: "Profile",
                },
              ].map((stat) => (
                <button
                  key={stat.label}
                  onClick={() => setActiveTab(stat.tab)}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-violet-200 hover:shadow-md transition-all text-left"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {stat.emoji}
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-gray-500 font-medium text-sm">
                      {stat.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Recent activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent saved */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="font-black text-gray-900">
                    🔖 Recently Saved
                  </h3>
                  <button
                    onClick={() => setActiveTab("Saved Jobs")}
                    className="text-violet-600 text-sm font-bold hover:text-violet-700"
                  >
                    View all →
                  </button>
                </div>
                {savedJobs.length === 0 ? (
                  <div className="p-10 text-center">
                    <div className="text-4xl mb-3">🔖</div>
                    <p className="font-bold text-gray-600 mb-1">
                      No saved jobs
                    </p>
                    <p className="text-gray-400 text-sm">
                      Browse and save jobs you like!
                    </p>
                    <button
                      onClick={() => navigate("/jobs")}
                      className="mt-3 text-violet-600 font-bold text-sm hover:underline"
                    >
                      Browse Jobs →
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {savedJobs.slice(0, 3).map((job) => (
                      <div
                        key={job.id}
                        className="p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-xl flex-shrink-0">
                          {job.companyLogo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-sm hover:text-violet-600 truncate">
                            {job.title}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {job.company} · {job.salary}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent applications */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="font-black text-gray-900">
                    ✅ Recent Applications
                  </h3>
                  <button
                    onClick={() => setActiveTab("Applications")}
                    className="text-violet-600 text-sm font-bold hover:text-violet-700"
                  >
                    View all →
                  </button>
                </div>
                {appliedJobs.length === 0 ? (
                  <div className="p-10 text-center">
                    <div className="text-4xl mb-3">🚀</div>
                    <p className="font-bold text-gray-600 mb-1">
                      No applications yet
                    </p>
                    <p className="text-gray-400 text-sm">
                      Start applying to your dream jobs!
                    </p>
                    <button
                      onClick={() => navigate("/jobs")}
                      className="mt-3 text-violet-600 font-bold text-sm hover:underline"
                    >
                      Find Jobs →
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {appliedJobs.slice(0, 3).map((job) => (
                      <div
                        key={job.id}
                        className="p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-xl flex-shrink-0">
                          {job.companyLogo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">
                            {job.title}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {job.company} · {job.appliedAt}
                          </p>
                        </div>
                        <span className="bg-green-50 text-green-600 border border-green-100 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                          Applied
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 bg-gradient-to-br from-violet-600 to-pink-500 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-black mb-2">Keep Going! 🚀</h3>
              <p className="text-white/70 font-medium mb-5">
                {savedJobs.length} saved · {appliedJobs.length} applied · Keep
                pushing!
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/jobs")}
                  className="bg-white text-violet-600 font-black px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all text-sm"
                >
                  Browse More Jobs →
                </button>
                <button
                  onClick={() => navigate("/jobs?category=Technology")}
                  className="bg-white/20 text-white font-bold px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all text-sm"
                >
                  Tech Jobs 💻
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SAVED JOBS TAB */}
        {activeTab === "Saved Jobs" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">
                🔖 Saved Jobs
                <span className="ml-2 text-lg font-bold text-violet-600">
                  ({savedJobs.length})
                </span>
              </h2>
              <button
                onClick={() => navigate("/jobs")}
                className="gradient-bg text-white font-bold px-5 py-2.5 rounded-full text-sm hover:shadow-lg transition-all"
              >
                Browse More →
              </button>
            </div>

            {savedJobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-20 text-center">
                <div className="text-6xl mb-4">🔖</div>
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  No saved jobs yet!
                </h3>
                <p className="text-gray-500 font-medium mb-6">
                  Browse jobs and click the save button to bookmark them here
                </p>
                <button
                  onClick={() => navigate("/jobs")}
                  className="gradient-bg text-white font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all"
                >
                  Browse Jobs →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-violet-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-2xl flex-shrink-0">
                        {job.companyLogo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-black text-gray-900 hover:text-violet-600 cursor-pointer truncate"
                          onClick={() => navigate(`/jobs/${job.id}`)}
                        >
                          {job.title}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium">
                          {job.company} · {job.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-violet-600 font-bold text-sm">
                        {job.salary}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/jobs/${job.id}`)}
                          className="bg-violet-50 text-violet-600 font-bold text-xs px-3 py-1.5 rounded-full hover:bg-violet-100 transition-all"
                        >
                          View →
                        </button>
                        <button
                          onClick={() => unsaveJob(job.id)}
                          className="bg-red-50 text-red-500 font-bold text-xs px-3 py-1.5 rounded-full hover:bg-red-100 transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* APPLICATIONS TAB */}
        {activeTab === "Applications" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">
                ✅ My Applications
                <span className="ml-2 text-lg font-bold text-pink-500">
                  ({appliedJobs.length})
                </span>
              </h2>
            </div>

            {appliedJobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-20 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  No applications yet!
                </h3>
                <p className="text-gray-500 font-medium mb-6">
                  Find jobs and click Apply Now to track your applications here
                </p>
                <button
                  onClick={() => navigate("/jobs")}
                  className="gradient-bg text-white font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all"
                >
                  Find Jobs →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {appliedJobs.map((job, i) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-violet-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center text-2xl flex-shrink-0">
                        {job.companyLogo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-black text-gray-900 text-lg hover:text-violet-600 cursor-pointer"
                          onClick={() => navigate(`/jobs/${job.id}`)}
                        >
                          {job.title}
                        </h3>
                        <p className="text-gray-500 font-medium">
                          {job.company} · {job.location}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Applied on {job.appliedAt}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="bg-green-50 text-green-600 border border-green-100 text-sm font-bold px-3 py-1.5 rounded-full">
                          ✅ Applied
                        </span>
                        <span className="text-violet-600 font-bold text-sm">
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "Profile" && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              👤 My Profile
            </h2>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-violet-600 to-pink-500 p-8 text-center">
                <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl font-black text-white mx-auto mb-4 border-4 border-white/30">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-2xl font-black text-white mb-1">
                  {user?.name}
                </h3>
                <p className="text-white/70 font-medium">{user?.email}</p>
              </div>

              {/* Profile Details */}
              <div className="p-8 space-y-5">
                {[
                  { label: "Full Name", value: user?.name, emoji: "👤" },
                  { label: "Email", value: user?.email, emoji: "📧" },
                  { label: "Member Since", value: user?.joinedAt, emoji: "📅" },
                  {
                    label: "Jobs Saved",
                    value: `${savedJobs.length} jobs`,
                    emoji: "🔖",
                  },
                  {
                    label: "Applied To",
                    value: `${appliedJobs.length} jobs`,
                    emoji: "✅",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-bold text-gray-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Logout */}
              <div className="px-8 pb-8">
                <button
                  onClick={handleLogout}
                  className="w-full border-2 border-red-100 text-red-500 hover:bg-red-50 font-black py-4 rounded-xl transition-all"
                >
                  Logout from SmartHire
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
