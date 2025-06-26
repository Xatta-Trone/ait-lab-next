import { useQueryState } from "nuqs";
import paperStoriesData from "../data/paperStories.json";
import { useDataFetching } from "./useDataFetching";
import type { PaperStory } from "@/types/paperStory";

export function usePaperStoriesData() {
  const {
    data: rawData,
    isLoading,
    error,
  } = useDataFetching<PaperStory>(paperStoriesData as PaperStory[]);

  // Create query parameters for filtering
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [categoryFilter, setCategoryFilter] = useQueryState("category");
  const [yearFilter, setYearFilter] = useQueryState("year", {
    parse: (value) => (value ? parseInt(value) : null),
  });
  const [tagFilter, setTagFilter] = useQueryState("tag");
  const [sortOrder, setSortOrder] = useQueryState("sort", {
    defaultValue: "newest" as const,
  });

  // Pagination
  const [pageString, setPageString] = useQueryState("page", {
    defaultValue: "1",
  });
  const currentPage = pageString ? parseInt(pageString) : 1;
  const itemsPerPage = 12; // Number of stories per page

  // Sort data
  const data = [...rawData].sort((a, b) => {
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
      case "citations":
        return b.citations - a.citations;
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return (
          new Date(b.publication_date).getTime() -
          new Date(a.publication_date).getTime()
        );
    }
  });

  // Filter stories based on query parameters
  const filteredStories = data.filter((story) => {
    const matchesSearch =
      !searchQuery ||
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.authors.some((author) =>
        author.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      story.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      !categoryFilter || story.category === categoryFilter;
    const matchesYear = !yearFilter || story.year === yearFilter;
    const matchesTag = !tagFilter || story.tags.includes(tagFilter);

    // Only show published stories by default
    const isPublished = story.status === "published";

    return (
      matchesSearch &&
      matchesCategory &&
      matchesYear &&
      matchesTag &&
      isPublished
    );
  });

  // Pagination calculations
  const totalItems = filteredStories.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Ensure currentPage is within valid range
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  // Get current page items
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredStories.slice(startIndex, endIndex);

  // Get unique values for filters
  const categories = Array.from(new Set(data.map((story) => story.category)));
  const years = Array.from(new Set(data.map((story) => story.year))).sort(
    (a, b) => b - a
  );
  const tags = Array.from(new Set(data.flatMap((story) => story.tags))).sort();

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

  // Get story by slug
  const getStoryBySlug = (slug: string): PaperStory | undefined => {
    return data.find(
      (story) => story.slug === slug && story.status === "published"
    );
  };

  // Get related stories
  const getRelatedStories = (
    currentSlug: string,
    relatedSlugs?: string[]
  ): PaperStory[] => {
    if (!relatedSlugs || relatedSlugs.length === 0) return [];

    return data.filter(
      (story) =>
        relatedSlugs.includes(story.slug) &&
        story.slug !== currentSlug &&
        story.status === "published"
    );
  };

  return {
    stories: currentPageItems,
    allFilteredStories: filteredStories,
    isLoading,
    error,
    categories,
    years,
    tags,
    searchQuery: searchQuery || "",
    setSearchQuery,
    categoryFilter: categoryFilter || "",
    setCategoryFilter,
    yearFilter: yearFilter || null,
    setYearFilter,
    tagFilter: tagFilter || "",
    setTagFilter,
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
    // Individual story functions
    getStoryBySlug,
    getRelatedStories,
  };
}
