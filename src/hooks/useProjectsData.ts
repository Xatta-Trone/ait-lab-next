import { useQueryState } from "nuqs";
import projectsData from "../data/projects.json";
import { useDataFetching } from "./useDataFetching";
import { Project } from "@/types/project";

export function useProjectsData() {
  const { data, isLoading, error } = useDataFetching<Project>(
    projectsData as Project[]
  );

  // Create query parameters for filtering
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [statusFilter, setStatusFilter] = useQueryState("status", {
    defaultValue: "all" as const,
  });
  const [sponsorFilter, setSponsorFilter] = useQueryState("sponsor");
  const [yearFilter, setYearFilter] = useQueryState("year", {
    parse: (value) => (value ? parseInt(value) : null),
  });
  const [roleFilter, setRoleFilter] = useQueryState("role", {
    defaultValue: "all" as const,
  });

  // Pagination - fix type issues
  const [pageString, setPageString] = useQueryState("page", {
    defaultValue: "1",
  });
  // Parse page to number after retrieving it
  const currentPage = pageString ? parseInt(pageString) : 1;
  const itemsPerPage = 9; // Number of projects per page

  // Filter projects based on query parameters
  const filteredProjects = data.filter((project) => {
    // Search filter - check multiple fields
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.PI.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.sponsor.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      !statusFilter ||
      statusFilter === "all" ||
      project.status === statusFilter;

    // Sponsor filter
    const matchesSponsor =
      !sponsorFilter ||
      sponsorFilter === "all" ||
      project.sponsor === sponsorFilter;

    // Year filter
    const matchesYear =
      !yearFilter ||
      (project.start_date.year <= yearFilter &&
        project.end_date.year >= yearFilter);

    // Role filter
    const matchesRole =
      !roleFilter ||
      roleFilter === "all" ||
      (roleFilter === "pi-copi" &&
        (project.PI_role.toLowerCase() === "pi" ||
          project.PI_role.toLowerCase() === "co-pi")) ||
      (roleFilter === "key-researcher" && project.PI_role === "Key Researcher");

    return (
      matchesSearch &&
      matchesStatus &&
      matchesSponsor &&
      matchesYear &&
      matchesRole
    );
  });

  // Pagination calculations
  const totalItems = filteredProjects.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Ensure currentPage is within valid range
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  // Get current page items
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredProjects.slice(startIndex, endIndex);

  // Pagination functions
  const goToPage = (page: number) => {
    const targetPage = Math.min(Math.max(1, page), totalPages);
    setPageString(targetPage.toString()); // Convert to string when setting
  };

  const nextPage = () => goToPage(validCurrentPage + 1);
  const prevPage = () => goToPage(validCurrentPage - 1);

  // Get unique values for filters
  const statuses = Array.from(new Set(data.map((project) => project.status)));
  const sponsors = Array.from(
    new Set(data.map((project) => project.sponsor).filter(Boolean))
  );
  const years = Array.from(
    new Set(
      data.flatMap((project) => {
        const years = [];
        for (
          let year = project.start_date.year;
          year <= project.end_date.year;
          year++
        ) {
          years.push(year);
        }
        return years;
      })
    )
  ).sort((a, b) => b - a); // Sort years descending

  return {
    projects: currentPageItems,
    allFilteredProjects: filteredProjects,
    isLoading,
    error,
    statuses,
    sponsors,
    years,
    searchQuery: searchQuery || "",
    setSearchQuery,
    statusFilter: statusFilter || "all",
    setStatusFilter,
    sponsorFilter: sponsorFilter || "",
    setSponsorFilter,
    yearFilter,
    setYearFilter,
    roleFilter: roleFilter || "all",
    setRoleFilter,
    // Pagination data
    currentPage: validCurrentPage,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: validCurrentPage < totalPages,
    hasPrevPage: validCurrentPage > 1,
  };
}
