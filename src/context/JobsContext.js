import { createContext, useState, useContext } from "react";

const JobsContext = createContext();

export function JobsProvider({ children }) {
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem("smarthire-saved");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedJobs, setAppliedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem("smarthire-applied");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  function saveJob(job) {
    const updated = [...savedJobs, job];
    setSavedJobs(updated);
    localStorage.setItem("smarthire-saved", JSON.stringify(updated));
  }

  function unsaveJob(jobId) {
    const updated = savedJobs.filter((j) => j.id !== jobId);
    setSavedJobs(updated);
    localStorage.setItem("smarthire-saved", JSON.stringify(updated));
  }

  function applyJob(job) {
    if (appliedJobs.find((j) => j.id === job.id)) return;
    const updated = [
      ...appliedJobs,
      { ...job, appliedAt: new Date().toLocaleDateString() },
    ];
    setAppliedJobs(updated);
    localStorage.setItem("smarthire-applied", JSON.stringify(updated));
  }

  function isJobSaved(jobId) {
    return savedJobs.some((j) => j.id === jobId);
  }

  function isJobApplied(jobId) {
    return appliedJobs.some((j) => j.id === jobId);
  }

  return (
    <JobsContext.Provider
      value={{
        savedJobs,
        appliedJobs,
        saveJob,
        unsaveJob,
        applyJob,
        isJobSaved,
        isJobApplied,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  return useContext(JobsContext);
}

export default JobsContext;
