import { usePublicationData } from "@/hooks/usePublicationData";
import PublicationCard from "./publication-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function PublicationsList() {
  const {
    publications,
    isLoading,
    error,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = usePublicationData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg">Loading publications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-red-500">
          Error loading publications: {error.message}
        </p>
      </div>
    );
  }

  if (publications.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg">No publications found.</p>
      </div>
    );
  }

  // Function to generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Calculate range of pages to show
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after page 1 if needed
    if (startPage > 2) {
      pages.push("ellipsis-start");
    }

    // Add pages in the middle
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push("ellipsis-end");
    }

    // Always show last page if there are more than 1 pages
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publications.map((publication) => (
          <PublicationCard key={publication.title} publication={publication} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="my-8">
          <PaginationContent>
            {hasPrevPage && (
              <PaginationItem>
                <PaginationPrevious onClick={prevPage} href="#" />
              </PaginationItem>
            )}

            {getPageNumbers().map((page, index) => {
              if (page === "ellipsis-start" || page === "ellipsis-end") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => goToPage(page as number)}
                    href="#"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {hasNextPage && (
              <PaginationItem>
                <PaginationNext onClick={nextPage} href="#" />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
