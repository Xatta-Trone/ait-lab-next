import { useQueryState } from "nuqs";
import coursesData from "../data/courses.json";
import { useDataFetching } from "./useDataFetching";
import { Course } from "@/types/course";

export function useCoursesData() {
  const { data, isLoading, error } = useDataFetching<Course>(
    coursesData as Course[]
  );

  // Create query parameters for filtering
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [levelFilter, setLevelFilter] = useQueryState("level");
  const [termFilter, setTermFilter] = useQueryState("term");

  const totalItems = data.length;

  // Filter courses based on query parameters
  const filteredCourses = data.filter((course) => {
    const matchesSearch =
      !searchQuery ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = !levelFilter || course.level === levelFilter;
    const matchesTerm = !termFilter || course.term.includes(termFilter);

    return matchesSearch && matchesLevel && matchesTerm;
  });

  // Get unique values for filters
  const levels = Array.from(new Set(data.map((course) => course.level)));

  // Extract all terms from course.term (which may have multiple terms separated by commas)
  const allTerms = data.flatMap((course) =>
    course.term.split(", ").map((term) => term.trim())
  );
  const terms = Array.from(new Set(allTerms)).filter(Boolean);

  return {
    courses: filteredCourses,
    isLoading,
    error,
    levels,
    terms,
    searchQuery: searchQuery || "",
    setSearchQuery,
    levelFilter: levelFilter || "",
    setLevelFilter,
    termFilter: termFilter || "",
    setTermFilter,
    totalItems,
  };
}
