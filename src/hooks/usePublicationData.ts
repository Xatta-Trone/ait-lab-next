import { ResearchPaper } from "@/types/publication";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export function usePublicationData() {
  const [data, setData] = useState<ResearchPaper[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const parsePublicationDate = (publication?: string | number) => {
    if (!publication) {
      return {
        year: 0,
        month: 0,
        day: 0,
      };
    }

    const value = String(publication).trim();
    const parts = value.split(/[/-]/).map((part) => parseInt(part, 10));

    if (parts.length === 3 && parts.every((part) => !Number.isNaN(part))) {
      return {
        year: parts[0],
        month: parts[1],
        day: parts[2],
      };
    }

    if (parts.length === 2 && parts.every((part) => !Number.isNaN(part))) {
      return {
        year: parts[0],
        month: parts[1],
        day: 0,
      };
    }

    const year = parseInt(value, 10);
    if (!Number.isNaN(year)) {
      return {
        year,
        month: 0,
        day: 0,
      };
    }

    const fallback = new Date(value);
    if (!Number.isNaN(fallback.getTime())) {
      return {
        year: fallback.getFullYear(),
        month: fallback.getMonth() + 1,
        day: fallback.getDate(),
      };
    }

    return {
      year: 0,
      month: 0,
      day: 0,
    };
  };

  const getPublicationSortKey = (publication: ResearchPaper) => {
    const parsedPublicationDate = parsePublicationDate(
      publication.publication_date || publication.year
    );

    const parsedDateAdded = parsePublicationDate(publication.date_added);

    return {
      publicationYear: parsedPublicationDate.year,
      publicationMonth: parsedPublicationDate.month,
      publicationDay: parsedPublicationDate.day,
      dateAddedYear: parsedDateAdded.year,
      dateAddedMonth: parsedDateAdded.month,
      dateAddedDay: parsedDateAdded.day,
    };
  };

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
        // console.log("Fetched publication data:", result.data);
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
    const sortKeyA = getPublicationSortKey(a);
    const sortKeyB = getPublicationSortKey(b);

    if (sortOrder === "newest") {
      if (sortKeyB.publicationYear !== sortKeyA.publicationYear) {
        return sortKeyB.publicationYear - sortKeyA.publicationYear;
      }

      if (sortKeyB.publicationMonth !== sortKeyA.publicationMonth) {
        return sortKeyB.publicationMonth - sortKeyA.publicationMonth;
      }

      if (sortKeyB.publicationDay !== sortKeyA.publicationDay) {
        return sortKeyB.publicationDay - sortKeyA.publicationDay;
      }

      if (sortKeyB.dateAddedYear !== sortKeyA.dateAddedYear) {
        return sortKeyB.dateAddedYear - sortKeyA.dateAddedYear;
      }

      if (sortKeyB.dateAddedMonth !== sortKeyA.dateAddedMonth) {
        return sortKeyB.dateAddedMonth - sortKeyA.dateAddedMonth;
      }

      return sortKeyB.dateAddedDay - sortKeyA.dateAddedDay;
    } else {
      if (sortKeyA.publicationYear !== sortKeyB.publicationYear) {
        return sortKeyA.publicationYear - sortKeyB.publicationYear;
      }

      if (sortKeyA.publicationMonth !== sortKeyB.publicationMonth) {
        return sortKeyA.publicationMonth - sortKeyB.publicationMonth;
      }

      if (sortKeyA.publicationDay !== sortKeyB.publicationDay) {
        return sortKeyA.publicationDay - sortKeyB.publicationDay;
      }

      if (sortKeyA.dateAddedYear !== sortKeyB.dateAddedYear) {
        return sortKeyA.dateAddedYear - sortKeyB.dateAddedYear;
      }

      if (sortKeyA.dateAddedMonth !== sortKeyB.dateAddedMonth) {
        return sortKeyA.dateAddedMonth - sortKeyB.dateAddedMonth;
      }

      return sortKeyA.dateAddedDay - sortKeyB.dateAddedDay;
    }
  });

//   const normalizeDate = (publication: ResearchPaper): number => {
//   const raw = publication.publication_date || publication.year;
//   if (!raw) return 0;

//   const str = String(raw).trim();

//   // "2026/4/17"
//   if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(str)) {
//     const [y, m, d] = str.split("/");
//     return new Date(parseInt(y), parseInt(m) - 1, parseInt(d)).getTime();
//   }

//   // "2024/5"
//   if (/^\d{4}\/\d{1,2}$/.test(str)) {
//     const [y, m] = str.split("/");
//     return new Date(parseInt(y), parseInt(m) - 1, 1).getTime();
//   }

//   // "2026" — year only, use date_added as tiebreaker
//   if (/^\d{4}$/.test(str)) {
//     return new Date(parseInt(str), 0, 1).getTime();
//   }

//   return new Date(str).getTime() || 0;
// };

// const sortedPublications = [...filteredPublications].sort((a, b) => {
//   const dateA = normalizeDate(a);
//   const dateB = normalizeDate(b);

//   if (dateA !== dateB) {
//     return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
//   }

//   // Tiebreak with date_added
//   const addedA = a.date_added ? new Date(a.date_added).getTime() : 0;
//   const addedB = b.date_added ? new Date(b.date_added).getTime() : 0;
//   return sortOrder === "newest" ? addedB - addedA : addedA - addedB;
// });

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
    if (!a && !b) return 0; // both empty/null
    if (!a) return 1; // push a to end
    if (!b) return -1; // push b to end
    return b - a; // normal descending sort
  });

  // const dates = Array.from(
  //   new Set(
  //     data
  //       .map((publication) => publication.date_added)
  //       .filter((date): date is string => typeof date === 'string')
  //   )
  // ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  //

  return {
    data,
    lastUpdated,
    publications: currentPageItems,
    allFilteredPublications: sortedPublications,
    isLoading,
    error,
    years,
    journals,
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
