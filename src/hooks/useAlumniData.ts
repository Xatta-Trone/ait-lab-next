import { useQueryState } from "nuqs";
import alumniData from "../data/alumni.json";
import { useDataFetching } from "./useDataFetching";
import { Alumnus } from "@/types/team";

export function useAlumniData() {
  const { data, isLoading, error } = useDataFetching<Alumnus>(
    alumniData as Alumnus[]
  );

  // Create query parameters for filtering
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [degreeFilter, setDegreeFilter] = useQueryState("degree");
  const [yearFilter, setYearFilter] = useQueryState("year");

  // Filter alumni based on query parameters
  const filteredAlumni = data.filter((alumnus) => {
    const matchesSearch =
      !searchQuery ||
      alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumnus.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDegree = !degreeFilter || alumnus.label === degreeFilter;

    // Extract year(s) from duration (format could be "2022" or "2022-2023")
    const years = alumnus.duration.split("-");
    const matchesYear = !yearFilter || years.includes(yearFilter);

    return matchesSearch && matchesDegree && matchesYear;
  });

  // Get unique values for filters
  const degrees = Array.from(new Set(data.map((alumnus) => alumnus.label)));

  // Extract all years from duration (could be single year or range)
  const allYears = data.flatMap((alumnus) => {
    const yearRange = alumnus.duration.split("-");
    if (yearRange.length === 1) return [yearRange[0]];

    // Handle ranges like "2020-2022"
    const start = parseInt(yearRange[0]);
    const end = parseInt(yearRange[1]);
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push(year.toString());
    }
    return years;
  });

  const years = Array.from(new Set(allYears)).sort((a, b) =>
    b.localeCompare(a)
  );

  return {
    alumni: filteredAlumni,
    isLoading,
    error,
    degrees,
    years,
    searchQuery: searchQuery || "",
    setSearchQuery,
    degreeFilter: degreeFilter || "",
    setDegreeFilter,
    yearFilter: yearFilter || "",
    setYearFilter,
  };
}
