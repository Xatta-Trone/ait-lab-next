import { useQueryState } from "nuqs";
import labToolsData from "../data/lab_tools.json";
import { useDataFetching } from "./useDataFetching";
import { useMemo } from "react";
import type { LabTool, LabToolBranch } from "@/types/tool";

const BRANCH_ORDER: LabToolBranch[] = [
  "Point",
  "Segment",
  "Area",
  "Route",
  "Resource",
  "Other",
];

export function useLabToolsData() {
  const {
    data: rawData,
    isLoading,
    error,
  } = useDataFetching<LabTool>(labToolsData as LabTool[]);

  // Create query parameters for filtering
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [projectFilter, setProjectFilter] = useQueryState("project");
  const [branchFilter, setBranchFilter] = useQueryState("branch");

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

  // Base filtering (everything except data-branch)
  const baseFilteredTools = data.filter((tool) => {
    const matchesSearch =
      !searchQuery ||
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tool.project || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = !projectFilter || tool.project === projectFilter;

    return matchesSearch && matchesProject;
  });

  // Branch counts (respecting base filters, ignoring current branch selection)
  const branchCounts = useMemo(() => {
    const counts: Record<LabToolBranch, number> = {
      Point: 0,
      Segment: 0,
      Area: 0,
      Route: 0,
      Resource: 0,
      Other: 0,
    };

    for (const tool of baseFilteredTools) {
      counts[tool.dataBranch] += 1;
    }

    return counts;
  }, [baseFilteredTools]);

  const availableBranches = useMemo(() => {
    return BRANCH_ORDER.filter((branch) => branchCounts[branch] > 0);
  }, [branchCounts]);

  // Final filtering including branch selection
  const filteredTools = baseFilteredTools.filter((tool) => {
    const matchesBranch =
      !branchFilter || tool.dataBranch === (branchFilter as LabToolBranch);
    return matchesBranch;
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
  const projects = Array.from(
    new Set(data.map((tool) => tool.project).filter(Boolean)),
  );

  return {
    tools: currentPageItems,
    allFilteredTools: filteredTools,
    baseFilteredTools,
    isLoading,
    error,
    projects,
    searchQuery: searchQuery || "",
    setSearchQuery,
    projectFilter: projectFilter || "",
    setProjectFilter,
    branchFilter: branchFilter || "",
    setBranchFilter,
    branchCounts,
    availableBranches,
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
