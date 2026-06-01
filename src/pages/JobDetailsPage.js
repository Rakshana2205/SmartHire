import { useToast } from "../components/Toast";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobs from "../data/jobs";
import { useJobs } from "../context/JobsContext";
import { useAuth } from "../context/AuthContext";

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveJob, unsaveJob, applyJob, isJobSaved, isJobApplied } = useJobs();
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [animateSave, setAnimateSave] = useState(false);
  const { addToast } = useToast();
  const job = jobs.find((j) => j.id === parseInt(id));

  const similarJobs = jobs
    .filter((j) => j.category === job?.category && j.id !== job?.id)
    .slice(0, 3);

  useEffect(() => {
    if (job) {
      setSaved(isJobSaved(job.id));
      setApplied(isJobApplied(job.id));
      window.scrollTo(0, 0);
    }
  }, [isJobApplied, isJobSaved, job]);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Job not found!
          </h2>
          <p className="text-gray-500 mb-6 font-medium">
            This job may have been removed
          </p>
          <button
            onClick={() => navigate("/jobs")}
            className="bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold px-8 py-3 rounded-full"
          >
            Browse All Jobs
          </button>
        </div>
      </div>
    );
  }

  function handleSave() {
    setAnimateSave(true);
    setTimeout(() => setAnimateSave(false), 600);
    if (saved) {
      unsaveJob(job.id);
      setSaved(false);
      addToast("Job removed from saved list", "info");
    } else {
      saveJob(job);
      setSaved(true);
      addToast("Job saved successfully! 🔖", "success");
    }
  }

  function handleApply() {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowModal(true);
  }

  function confirmApply() {
    applyJob(job);
    setApplied(true);
    setShowModal(false);
    addToast("Application submitted successfully! 🚀", "success");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Apply for this job?
              </h3>
              <p className="text-gray-500 font-medium">
                You're applying for <strong>{job.title}</strong> at{" "}
                <strong>{job.company}</strong>
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{job.companyLogo}</span>
                <div>
                  <p className="font-bold text-gray-900">{job.title}</p>
                  <p className="text-gray-500 text-sm">
                    {job.company} · {job.location}
                  </p>
                </div>
              </div>
              <p className="text-violet-600 font-bold text-sm">{job.salary}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:border-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmApply}
                className="flex-1 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all"
              >
                Confirm Apply! ✅
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-violet-600 font-semibold transition-colors"
          >
            ← Back to Jobs
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-50 to-pink-50 border border-gray-100 flex items-center justify-center text-3xl">
                    {job.companyLogo}
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-gray-900 mb-1">
                      {job.title}
                    </h1>
                    <p className="text-gray-500 font-semibold">{job.company}</p>
                  </div>
                </div>
                {job.featured && (
                  <span className="bg-amber-50 text-amber-600 border border-amber-100 text-xs font-bold px-3 py-1.5 rounded-full">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* Job Meta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: "📍", label: "Location", value: job.location },
                  { icon: "💼", label: "Job Type", value: job.type },
                  { icon: "📅", label: "Experience", value: job.experience },
                  { icon: "💰", label: "Salary", value: job.salary },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-gray-50 rounded-xl p-3 text-center"
                  >
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-xs text-gray-400 font-medium mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-sm font-bold text-gray-800">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-violet-50 text-violet-700 border border-violet-100 text-sm px-3 py-1.5 rounded-full font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleApply}
                  disabled={applied}
                  className={`flex-1 font-bold py-3.5 rounded-xl transition-all ${
                    applied
                      ? "bg-green-50 text-green-600 border-2 border-green-100 cursor-not-allowed"
                      : "bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:shadow-lg hover:shadow-violet-200 hover:scale-105 active:scale-95"
                  }`}
                >
                  {applied ? "✅ Already Applied!" : "🚀 Apply Now"}
                </button>
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 font-bold transition-all ${
                    animateSave ? "scale-125" : "scale-100"
                  } ${
                    saved
                      ? "bg-pink-50 text-pink-500 border-pink-200"
                      : "bg-white text-gray-500 border-gray-200 hover:border-pink-300 hover:text-pink-500"
                  }`}
                >
                  {saved ? "❤️" : "🤍"}
                  {saved ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-black text-gray-900 mb-4">
                About this Role 📋
              </h2>
              <p className="text-gray-600 leading-relaxed font-medium mb-6">
                {job.description}
              </p>

              <h3 className="text-lg font-black text-gray-900 mb-4">
                Requirements ✅
              </h3>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-gray-600 font-medium">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4">
                About Company 🏢
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-50 to-pink-50 flex items-center justify-center text-2xl">
                  {job.companyLogo}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{job.company}</p>
                  <p className="text-gray-400 text-sm">{job.category}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Location</span>
                  <span className="font-semibold text-gray-700">
                    {job.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Job Type</span>
                  <span className="font-semibold text-gray-700">
                    {job.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Posted</span>
                  <span className="font-semibold text-gray-700">
                    {job.posted}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Apply Card */}
            {!applied && (
              <div className="bg-gradient-to-br from-violet-600 to-pink-500 rounded-2xl p-6 text-white">
                <h3 className="font-black text-lg mb-2">Ready to Apply? 🚀</h3>
                <p className="text-white/80 text-sm font-medium mb-4">
                  Join thousands who found their dream job on SmartHire!
                </p>
                <button
                  onClick={handleApply}
                  className="w-full bg-white text-violet-600 font-black py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all"
                >
                  Apply Now →
                </button>
              </div>
            )}

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-black text-gray-900 mb-4">
                  Similar Jobs 👀
                </h3>
                <div className="space-y-4">
                  {similarJobs.map((sj) => (
                    <div
                      key={sj.id}
                      onClick={() => navigate(`/jobs/${sj.id}`)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-50 to-pink-50 flex items-center justify-center text-xl flex-shrink-0">
                        {sj.companyLogo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm group-hover:text-violet-600 transition-colors truncate">
                          {sj.title}
                        </p>
                        <p className="text-gray-400 text-xs font-medium">
                          {sj.company} · {sj.salary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
