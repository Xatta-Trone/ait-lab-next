import { useQueryState } from "nuqs";
import storiesData from "../data/paperStories.json";
import { useDataFetching } from "./useDataFetching";
import { useMemo } from "react";
import { PaperStory } from "@/types/story";

export function useStoriesData() {
  const { data, isLoading, error } = useDataFetching<PaperStory>(
    storiesData as PaperStory[]
  );

  // Create query parameters for filtering and search
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [categoryFilter, setCategoryFilter] = useQueryState("category");
  const [yearFilter, setYearFilter] = useQueryState("year", {
    parse: (value) => (value ? parseInt(value) : null),
  });
  const [sortOrder, setSortOrder] = useQueryState("sort", {
    defaultValue: "newest" as const,
  });

  // Pagination
  const [pageString, setPageString] = useQueryState("page", {
    defaultValue: "1",
  });
  const currentPage = pageString ? parseInt(pageString) : 1;
  const itemsPerPage = 9; // Number of stories per page

  // Filter and search logic
  const filteredStories = useMemo(() => {
    if (!data) return [];

    return data.filter((story) => {
      // Search filter
      if (searchQuery) {
        const searchTerm = searchQuery.toLowerCase();
        const matchesSearch =
          story.title.toLowerCase().includes(searchTerm) ||
          story.abstract.toLowerCase().includes(searchTerm) ||
          story.authors.some((author) =>
            author.toLowerCase().includes(searchTerm)
          ) ||
          story.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          story.category.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;
      }

      // Category filter
      if (categoryFilter && categoryFilter !== "all") {
        if (story.category !== categoryFilter) return false;
      }

      // Year filter
      if (yearFilter) {
        if (story.year !== yearFilter) return false;
      }

      return true;
    });
  }, [data, searchQuery, categoryFilter, yearFilter]);

  // Sort logic
  const sortedStories = useMemo(() => {
    if (!filteredStories) return [];

    return [...filteredStories].sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return (
            new Date(b.publication_date).getTime() -
            new Date(a.publication_date).getTime()
          );
        case "oldest":
          return (
            new Date(a.publication_date).getTime() -
            new Date(b.publication_date).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "citations":
          return b.citations - a.citations;
        default:
          return 0;
      }
    });
  }, [filteredStories, sortOrder]);

  // Pagination logic
  const totalItems = sortedStories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const paginatedStories = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedStories.slice(startIndex, endIndex);
  }, [sortedStories, validCurrentPage, itemsPerPage]);

  // Navigation functions
  const goToPage = (page: number) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    setPageString(targetPage.toString());
  };

  const nextPage = () => goToPage(validCurrentPage + 1);
  const prevPage = () => goToPage(validCurrentPage - 1);

  // Get unique values for filters
  const categories = Array.from(
    new Set(data?.map((story) => story.category).filter(Boolean) || [])
  );

  const years = Array.from(
    new Set(data?.map((story) => story.year) || [])
  ).sort((a, b) => b - a);

  return {
    data: data || [],
    stories: paginatedStories,
    allFilteredStories: sortedStories,
    isLoading,
    error,
    categories,
    years,
    searchQuery: searchQuery || "",
    setSearchQuery,
    categoryFilter: categoryFilter || "",
    setCategoryFilter,
    yearFilter,
    setYearFilter,
    sortOrder,
    setSortOrder,
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
