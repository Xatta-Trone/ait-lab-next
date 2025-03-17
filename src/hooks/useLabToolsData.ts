import { useQueryState } from "nuqs";
import labToolsData from "../data/lab_tools.json";
import { useDataFetching } from "./useDataFetching";
import { useMemo } from "react";
import { LabTool } from "@/types/tool";

export function useLabToolsData() {
  const {
    data: rawData,
    isLoading,
    error,
  } = useDataFetching<LabTool>(labToolsData as LabTool[]);

  // Create query parameters for filtering
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [typeFilter, setTypeFilter] = useQueryState("type");
  const [projectFilter, setProjectFilter] = useQueryState("project");

  // Pagination - add pagination state
  const [pageString, setPageString] = useQueryState("page", {
    defaultValue: "1",
  });
  // Parse page to number after retrieving it
  const currentPage = pageString ? parseInt(pageString) : 1;
  const itemsPerPage = 9; // Number of tools per page

  // Sort by date in descending order (latest first)
  // Sort data by latest date first
  const data = useMemo(() => {
    return [...rawData].sort((a, b) => {
      // Parse dates (format "Month Day, Year")
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }, [rawData]);

  // Filter lab tools based on query parameters
  const filteredTools = data.filter((tool) => {
    const matchesSearch =
      !searchQuery ||
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = !typeFilter || tool.type === typeFilter;
    const matchesProject = !projectFilter || tool.project === projectFilter;

    return matchesSearch && matchesType && matchesProject;
  });

  // Pagination calculations
  const totalItems = filteredTools.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Ensure currentPage is within valid range
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  // Get current page items
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredTools.slice(startIndex, endIndex);

  // Pagination functions
  const goToPage = (page: number) => {
    const targetPage = Math.min(Math.max(1, page), totalPages);
    setPageString(targetPage.toString());
  };

  const nextPage = () => goToPage(validCurrentPage + 1);
  const prevPage = () => goToPage(validCurrentPage - 1);

  // Get unique values for filters
  const types = Array.from(new Set(data.map((tool) => tool.type)));
  const projects = Array.from(
    new Set(data.map((tool) => tool.project).filter(Boolean))
  );

  return {
    tools: currentPageItems,
    allFilteredTools: filteredTools,
    isLoading,
    error,
    types,
    projects,
    searchQuery: searchQuery || "",
    setSearchQuery,
    typeFilter: typeFilter || "",
    setTypeFilter,
    projectFilter: projectFilter || "",
    setProjectFilter,
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
