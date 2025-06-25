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
import { useThesesData } from "@/hooks/useThesesData";
import ThesesList from "@/components/theses/theses-list";
import { Spinner } from "@/components/ui/spinner";

export default function ThesesPage() {
  const {
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    sortOrder,
    setSortOrder,
    allFilteredTheses: filteredTheses,
    isLoading,
    theses,
    types,
  } = useThesesData();

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
          title={
            <span className="gradient-text">Theses and Dissertations</span>
          }
          subtitle="Explore the theses and dissertations produced by our students"
        />

        <div className="flex flex-wrap items-center justify-between mb-4 text-sm text-muted-foreground/80">
          <div className="flex items-center gap-1">
            <span className="font-medium">Showing:</span>
            <span>
              {theses.length} of {filteredTheses.length} theses & dissertations
            </span>
          </div>
        </div>
        {/* Search and filter section */}
        <div className="mb-8 glass-card p-6 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
                <Input
                  placeholder="Search by title or author..."
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
            <div>
              <Select
                value={typeFilter || "all"}
                onValueChange={(value) =>
                  setTypeFilter(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "dissertation"
                        ? "Ph.D. Dissertation"
                        : "Master's Thesis"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

        {/* Theses list */}
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Spinner />
          </div>
        ) : !isLoading && filteredTheses.length > 0 ? (
          <ThesesList />
        ) : (
          <div className="text-center py-16 glass-card rounded-xl">
            <BookOpen className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
            <h3 className="text-xl font-medium mb-2">
              No theses or dissertations found
            </h3>
            <p className="text-foreground/60 mb-6">
              We couldn&apos;t find any theses or dissertations matching your
              search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchInput("");
              }}
              className="text-blue-500 hover:underline"
            >
              Clear search and show all theses
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
