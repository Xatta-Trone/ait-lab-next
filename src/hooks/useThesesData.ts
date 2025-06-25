import { useQueryState } from "nuqs";
import thesesData from "../data/theses.json";
import { useDataFetching } from "./useDataFetching";
import type { Thesis } from "@/types/thesis";

export function useThesesData() {
  const {
    data: rawData,
    isLoading,
    error,
  } = useDataFetching<Thesis>(thesesData as Thesis[]);

  // Create query parameters for filtering
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [typeFilter, setTypeFilter] = useQueryState("type");
  const [yearFilter, setYearFilter] = useQueryState("year", {
    parse: (value) => (value ? parseInt(value) : null),
  });
  const [termFilter, setTermFilter] = useQueryState("term");
  const [sortOrder, setSortOrder] = useQueryState("sort", {
    defaultValue: "newest" as const,
  });

  // Pagination
  const [pageString, setPageString] = useQueryState("page", {
    defaultValue: "1",
  });
  const currentPage = pageString ? parseInt(pageString) : 1;
  const itemsPerPage = 12; // Number of theses per page

  // Sort data by year and term in descending order (latest first)
  const data = [...rawData].sort((a, b) => {
    if (a.year !== b.year) {
      return sortOrder === "newest" ? b.year - a.year : a.year - b.year;
    }
    // If same year, sort by term (Fall > Summer > Spring)
    const termOrder = { Fall: 3, Summer: 2, Spring: 1 };
    const aTermOrder = termOrder[a.term as keyof typeof termOrder] || 0;
    const bTermOrder = termOrder[b.term as keyof typeof termOrder] || 0;
    return sortOrder === "newest"
      ? bTermOrder - aTermOrder
      : aTermOrder - bTermOrder;
  });

  // Filter theses based on query parameters
  const filteredTheses = data.filter((thesis) => {
    const matchesSearch =
      !searchQuery ||
      thesis.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thesis.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = !typeFilter || thesis.type === typeFilter;
    const matchesYear = !yearFilter || thesis.year === yearFilter;
    const matchesTerm = !termFilter || thesis.term === termFilter;

    return matchesSearch && matchesType && matchesYear && matchesTerm;
  });

  // Pagination calculations
  const totalItems = filteredTheses.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Ensure currentPage is within valid range
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  // Get current page items
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredTheses.slice(startIndex, endIndex);

  // Get unique values for filters
  const types = Array.from(new Set(data.map((thesis) => thesis.type)));
  const years = Array.from(new Set(data.map((thesis) => thesis.year))).sort(
    (a, b) => b - a
  );
  const terms = Array.from(new Set(data.map((thesis) => thesis.term)));

  // Pagination functions
  const goToPage = (page: number) => {
    const newPage = Math.min(Math.max(1, page), totalPages);
    setPageString(newPage.toString());
  };

  const goToNextPage = () => {
    if (validCurrentPage < totalPages) {
      goToPage(validCurrentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (validCurrentPage > 1) {
      goToPage(validCurrentPage - 1);
    }
  };

  return {
    theses: currentPageItems,
    allFilteredTheses: filteredTheses,
    isLoading,
    error,
    types,
    years,
    terms,
    searchQuery: searchQuery || "",
    setSearchQuery,
    typeFilter: typeFilter || "",
    setTypeFilter,
    yearFilter: yearFilter || null,
    setYearFilter,
    termFilter: termFilter || "",
    setTermFilter,
    sortOrder,
    setSortOrder,
    // Pagination
    currentPage: validCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    hasNextPage: validCurrentPage < totalPages,
    hasPreviousPage: validCurrentPage > 1,
  };
}
