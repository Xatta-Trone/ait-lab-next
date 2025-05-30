"use client";

import { Search, SortDesc, SortAsc, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionHeading from "@/components/ui/section-heading";
import { usePublicationData } from "@/hooks/usePublicationData";
import PublicationsList from "@/components/publication/publications-list";
import { Spinner } from "@/components/ui/spinner";

export default function PublicationsPage() {
  const {
    lastUpdated,
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
    allFilteredPublications: filteredPublications,
    isLoading,
    publications: _publications,
  } = usePublicationData();

  // console.log("Current page:", currentPage);
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16 md:py-24">
        <SectionHeading
          title={<span className="gradient-text">Research Publications</span>}
          subtitle="Explore our scholarly contributions to transportation research"
        />

        <div className="flex flex-wrap items-center justify-between mb-4 text-sm text-muted-foreground/80">
          <div className="flex items-center gap-1">
            <span className="font-medium">Showing:</span>
            <span>
              {_publications.length} of {filteredPublications.length}{" "}
              publications
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Last Updated:</span>
            {lastUpdated && (
              <time dateTime={new Date(lastUpdated).toISOString()}>
                {new Date(lastUpdated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </div>
        </div>
        {/* Search and sort section */}
        <div className="mb-8 glass-card p-6 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
                <Input
                  placeholder="Search publications by title, authors, journal, or year..."
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
            <div className="flex items-center gap-2">
              {sortOrder === "newest" ? (
                <SortDesc className="text-foreground/60 h-4 w-4" />
              ) : (
                <SortAsc className="text-foreground/60 h-4 w-4" />
              )}
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Sort by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Publications list */}
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Spinner />
          </div>
        ) : !isLoading && filteredPublications.length > 0 ? (
          <PublicationsList />
        ) : (
          <div className="text-center py-16 glass-card rounded-xl">
            <BookOpen className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
            <h3 className="text-xl font-medium mb-2">No publications found</h3>
            <p className="text-foreground/60 mb-6">
              We couldn&apos;t find any publications matching your search
              criteria.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-blue-500 hover:underline"
            >
              Clear search and show all publications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
