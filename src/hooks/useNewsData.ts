import { useQueryState } from "nuqs";
import newsData from "../data/news.json";
import { useDataFetching } from "./useDataFetching";
import { useMemo, useState } from "react";
import { NewsItem } from "@/types/news";

export function useNewsData() {
  // Local state as fallback for pagination
  const [localPage, setLocalPage] = useState(1);
  const [localItemsPerPage, setLocalItemsPerPage] = useState(10);

  const {
    data: rawData,
    isLoading,
    error,
  } = useDataFetching<NewsItem>(newsData as NewsItem[]);

  // Create query parameters for filtering
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [yearFilter, setYearFilter] = useQueryState("year", {
    parse: (value) => (value ? parseInt(value) : null),
  });
  const [categoryFilter, setCategoryFilter] = useQueryState("category");
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "alerts" as const,
  });

  // Add pagination state using query parameters with proper type handling
  const [pageQuery, setPageQuery] = useQueryState("page", {
    parse: (value) => (value ? parseInt(value) : 1),
    serialize: (value) => value.toString(),
  });

  const [itemsPerPageQuery, setItemsPerPageQuery] = useQueryState("perPage", {
    parse: (value) => (value ? parseInt(value) : 5),
    serialize: (value) => value.toString(),
  });

  // Ensure numeric types for pagination
  const currentPage = pageQuery !== null ? pageQuery : localPage;
  const itemsPerPage =
    itemsPerPageQuery !== null ? itemsPerPageQuery : localItemsPerPage;

  // Sort data by latest date first
  const data = useMemo(() => {
    return [...rawData].sort((a, b) => {
      // Parse dates (format "Month Day, Year")
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }, [rawData]);

  // Filter news based on query parameters
  const filteredNews = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Extract year from date (format "Month Day, Year")
      const itemYear = item.date ? parseInt(item.date.split(", ")[1]) : null;
      const matchesYear = !yearFilter || itemYear === yearFilter;

      // Extract category from title (usually first few words)
      const category = item.title.split(":")[0];
      const matchesCategory = !categoryFilter || category === categoryFilter;

      return matchesSearch && matchesYear && matchesCategory;
    });
  }, [data, searchQuery, yearFilter, categoryFilter]);

  // Calculate pagination with number type safety
  const totalPages = Math.max(1, Math.ceil(filteredNews.length / itemsPerPage));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredNews.slice(startIndex, endIndex);

  // Pagination controls with type safety
  const goToPage = (newPage: number) => {
    const targetPage = Math.max(1, newPage);
    setPageQuery(targetPage);
    setLocalPage(targetPage);
  };

  const nextPage = () => goToPage(safeCurrentPage + 1);
  const prevPage = () => goToPage(safeCurrentPage - 1);

  // Handle items per page changes
  const changeItemsPerPage = (count: number) => {
    setItemsPerPageQuery(count);
    setLocalItemsPerPage(count);
    goToPage(1); // Reset to first page when changing items per page
  };

  // Reset page when filters change
  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
    goToPage(1); // Reset to first page when search changes
  };

  const updateYearFilter = (year: number | null) => {
    setYearFilter(year);
    goToPage(1);
  };

  const updateCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    goToPage(1);
  };

  const updateActiveTab = (tab: "alerts" | "papers") => {
    setActiveTab(tab);
    goToPage(1);
  };

  // Get unique categories and years
  const categories = Array.from(
    new Set(data.map((item) => item.title.split(":")[0]))
  ).filter(Boolean);

  const years = Array.from(
    new Set(
      data
        .map((item) => {
          const date = item.date.split(", ");
          return date.length > 1 ? parseInt(date[1]) : null;
        })
        .filter(Boolean)
    )
  ).sort((a, b) => b! - a!);

  return {
    newsItems: filteredNews,
    paginatedItems,
    isLoading,
    error,
    categories,
    years,

    // Search and filters
    searchQuery: searchQuery || "",
    setSearchQuery: updateSearchQuery,
    yearFilter,
    setYearFilter: updateYearFilter,
    categoryFilter: categoryFilter || "",
    setCategoryFilter: updateCategoryFilter,
    activeTab,
    setActiveTab: updateActiveTab,

    // Pagination
    currentPage: safeCurrentPage,
    setPage: goToPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage: changeItemsPerPage,
    nextPage,
    prevPage,
    hasNextPage: safeCurrentPage < totalPages,
    hasPrevPage: safeCurrentPage > 1,
  };
}
