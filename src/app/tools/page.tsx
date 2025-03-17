"use client";

import { Search, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToolCard from "@/components/tools/tool-card";
import SectionHeading from "@/components/ui/section-heading";
import { useLabToolsData } from "@/hooks/useLabToolsData";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { useState, useEffect } from "react";

export default function ToolsPage() {
  const {
    isLoading,
    tools: currentPageTools,
    allFilteredTools: filteredTools,
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    hasNextPage,
    hasPrevPage,
  } = useLabToolsData();

  // Add state for debounced input
  const [searchInput, setSearchInput] = useState(searchQuery);
  // Track debouncing state
  const [isDebouncing, setIsDebouncing] = useState(false);

  // Debounce search query updates
  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setIsDebouncing(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, setSearchQuery]);

  // Get tools by type from filtered tools
  const shinyTools = filteredTools.filter((tool) => tool.type === "shiny");
  const webTools = filteredTools.filter((tool) => tool.type === "web");

  // Update the current tab based on the type filter
  const currentTab = typeFilter || "all";

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16 md:py-24">
        <SectionHeading
          title={<span className="gradient-text">Research Tools</span>}
          subtitle="Interactive tools and applications developed by our lab"
        />

        {/* Search section */}
        <div className="mb-8 glass-card p-6 rounded-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
            <Input
              placeholder="Search tools by title, project, or description..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 bg-background/50"
            />
            {isDebouncing && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="h-4 w-4 border-t-2 border-foreground/60 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs for tool type filtering */}
        <Tabs
          value={currentTab}
          onValueChange={(value) => setTypeFilter(value === "all" ? "" : value)}
          className="mb-8"
        >
          <TabsList className="glass-card">
            <TabsTrigger value="all">All Tools</TabsTrigger>
            <TabsTrigger value="shiny">Shiny Tools</TabsTrigger>
            <TabsTrigger value="web">Web Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Spinner />
              </div>
            ) : !isLoading && filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPageTools.map((tool, index) => (
                  <ToolCard key={index} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 glass-card rounded-xl">
                <Wrench className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
                <h3 className="text-xl font-medium mb-2">No tools found</h3>
                <p className="text-foreground/60 mb-6">
                  We couldn&apos;t find any tools matching your search criteria.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-500 hover:underline"
                >
                  Clear search and show all tools
                </button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="shiny" className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Spinner />
              </div>
            ) : !isLoading && shinyTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPageTools
                  .filter((tool) => tool.type === "shiny")
                  .map((tool, index) => (
                    <ToolCard key={`shiny-${index}`} tool={tool} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-16 glass-card rounded-xl">
                <Wrench className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  No Shiny tools found
                </h3>
                <p className="text-foreground/60 mb-6">
                  We couldn&apos;t find any Shiny tools matching your search
                  criteria.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-500 hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="web" className="mt-6">
            {webTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPageTools
                  .filter((tool) => tool.type === "web")
                  .map((tool, index) => (
                    <ToolCard key={`web-${index}`} tool={tool} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-16 glass-card rounded-xl">
                <Wrench className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
                <h3 className="text-xl font-medium mb-2">No Web tools found</h3>
                <p className="text-foreground/60 mb-6">
                  We couldn&apos;t find any Web tools matching your search
                  criteria.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-500 hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Pagination Component */}
        {filteredTools.length > 0 && totalPages > 1 && (
          <Pagination className="my-8">
            <PaginationContent>
              {hasPrevPage && (
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      prevPage();
                    }}
                  />
                </PaginationItem>
              )}

              {/* Generate page links */}
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1;

                // Show current page, first, last, and neighbors
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={pageNumber === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (pageNumber === 2 || pageNumber === totalPages - 1) {
                  // Show ellipsis for breaks in sequence
                  return <PaginationEllipsis key={pageNumber} />;
                }
                return null;
              })}

              {hasNextPage && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      nextPage();
                    }}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
