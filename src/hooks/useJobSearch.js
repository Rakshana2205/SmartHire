import { useState, useMemo } from "react";
import useDebounce from "./useDebounce";
import jobs from "../data/jobs";

function useJobSearch() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [location, setLocation] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const debouncedSearch = useDebounce(search, 400);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    if (category !== "All") {
      result = result.filter((job) => job.category === category);
    }

    if (jobType !== "All") {
      result = result.filter((job) => job.type === jobType);
    }

    if (location !== "All") {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase()),
      );
    }

    if (sortBy === "newest") {
      result = result.sort((a, b) => a.id - b.id);
    } else if (sortBy === "oldest") {
      result = result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [debouncedSearch, category, jobType, location, sortBy]);

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setJobType("All");
    setLocation("All");
    setSortBy("newest");
  }

  const hasFilters =
    search || category !== "All" || jobType !== "All" || location !== "All";

  return {
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
  };
}

export default useJobSearch;
