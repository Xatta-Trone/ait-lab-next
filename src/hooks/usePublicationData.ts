import { ResearchPaper } from "@/types/publication";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export function usePublicationData() {
  const [data, setData] = useState<ResearchPaper[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Manual fetch implementation instead of using useDataFetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Xatta-Trone/google-scholar-scrapper/main/scholar-data-qK-YgxAAAAAJ.json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setLastUpdated(result.last_updated_utc);
        setData(Array.isArray(result.data) ? result.data : []);
        console.log("Fetched publication data:", result.data);
      } catch (e) {
        console.error("Error fetching publication data:", e);
        setError(e instanceof Error ? e : new Error("Unknown error occurred"));
        // Initialize with empty array on error
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Create query parameters for filtering
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [journalFilter, setJournalFilter] = useQueryState("journal");
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
  const itemsPerPage = 15; // Number of publications per page

  // Filter publications based on query parameters
  const filteredPublications = data.filter((publication) => {
    // Search filter - check multiple fields
    const matchesSearch =
      !searchQuery ||
      publication.title
        .toLowerCase()
        .includes(searchQuery?.toLowerCase() || "") ||
      (publication.authors
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase() || "") ??
        false) ||
      (publication.journal
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase() || "") ??
        false) ||
      (publication.publisher
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase() || "") ??
        false);

    // Year filter
    const matchesYear = !yearFilter || publication.year === yearFilter;

    // Journal/publisher filter
    const matchesJournal =
      !journalFilter ||
      journalFilter === "all" ||
      publication.journal === journalFilter ||
      publication.publisher === journalFilter;

    return matchesSearch && matchesYear && matchesJournal;
  });

  // Sort publications
  const sortedPublications = [...filteredPublications].sort((a, b) => {
    const dateA = new Date(a.date_added).getTime();
    const dateB = new Date(b.date_added).getTime();

    if (sortOrder === "newest") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  // Pagination calculations
  const totalItems = sortedPublications.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Ensure currentPage is within valid range
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  // Get current page items
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = sortedPublications.slice(startIndex, endIndex);

  // Pagination functions
  const goToPage = (page: number) => {
    const targetPage = Math.min(Math.max(1, page), totalPages);
    setPageString(targetPage.toString());
  };

  const nextPage = () => goToPage(validCurrentPage + 1);
  const prevPage = () => goToPage(validCurrentPage - 1);

  // Get unique values for filters
  const journals = Array.from(
    new Set(
      data
        .map((publication) => publication.journal || publication.publisher)
        .filter(Boolean)
    )
  );

  const years = Array.from(
    new Set(data.map((publication) => publication.year))
  ).sort((a, b) => {
    // Handle empty strings and null values
    if (!a && !b) return 0;        // both empty/null
    if (!a) return 1;              // push a to end
    if (!b) return -1;             // push b to end
    return b - a;                  // normal descending sort
  });

  // const dates = Array.from(
  //   new Set(
  //     data
  //       .map((publication) => publication.date_added)
  //       .filter((date): date is string => typeof date === 'string')
  //   )
  // ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return {
    lastUpdated,
    publications: currentPageItems,
    allFilteredPublications: sortedPublications,
    isLoading,
    error,
    journals,
    years,
    searchQuery: searchQuery || "",
    setSearchQuery,
    journalFilter: journalFilter || "",
    setJournalFilter,
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
