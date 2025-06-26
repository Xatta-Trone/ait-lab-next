"use client";

import { Search, SortDesc, SortAsc, FileText, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MDXStoriesList from "@/components/story/mdx-stories-list";
import type { Story } from "@/utils/mdx-stories";

interface StoriesPageClientProps {
  stories: Story[];
  categories: string[];
  years: number[];
}

export function StoriesPageClient({
  stories,
  categories,
}: StoriesPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [searchInput, setSearchInput] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);

  // Debounce search query updates
  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setIsDebouncing(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Filter and search stories
  const filteredStories = useMemo(() => {
    let filtered = stories;

    // Apply search
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = stories.filter((story) => {
        const titleMatch = story.title.toLowerCase().includes(lowercaseQuery);
        const abstractMatch = story.abstract
          .toLowerCase()
          .includes(lowercaseQuery);
        const authorMatch = story.authors.some((author) =>
          author.name.toLowerCase().includes(lowercaseQuery)
        );
        const categoryMatch = story.category
          .toLowerCase()
          .includes(lowercaseQuery);

        return titleMatch || abstractMatch || authorMatch || categoryMatch;
      });
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((story) => story.category === categoryFilter);
    }

    // Apply year filter
    if (yearFilter !== "all") {
      filtered = filtered.filter(
        (story) => story.year === parseInt(yearFilter)
      );
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortOrder === "newest") {
        return b.year - a.year;
      } else {
        return a.year - b.year;
      }
    });

    return filtered;
  }, [stories, searchQuery, categoryFilter, yearFilter, sortOrder]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-4 text-sm text-muted-foreground/80">
        <div className="flex items-center gap-1">
          <span className="font-medium">Showing:</span>
          <span>
            {filteredStories.length} of {stories.length} publications
          </span>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="mb-8 glass-card p-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
              <Input
                placeholder="Search by title, author, or abstract..."
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

          <div className="md:col-span-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 flex items-center gap-2">
            {sortOrder === "newest" ? (
              <SortDesc className="text-foreground/60 h-4 w-4" />
            ) : (
              <SortAsc className="text-foreground/60 h-4 w-4" />
            )}
            <Select
              value={sortOrder}
              onValueChange={(value: "newest" | "oldest") =>
                setSortOrder(value)
              }
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filters display */}
        {(searchQuery || categoryFilter !== "all" || yearFilter !== "all") && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-foreground/70">
                Active filters:
              </span>
              {searchQuery && (
                <div className="flex items-center gap-1 bg-blue-500/10 text-blue-500 px-2 py-1 rounded-md text-xs">
                  <Search className="h-3 w-3" />
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchInput("");
                    }}
                    className="ml-1 hover:bg-blue-500/20 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </div>
              )}
              {categoryFilter !== "all" && (
                <div className="flex items-center gap-1 bg-green-500/10 text-green-600 px-2 py-1 rounded-md text-xs">
                  <FileText className="h-3 w-3" />
                  <span>{categoryFilter}</span>
                  <button
                    onClick={() => setCategoryFilter("all")}
                    className="ml-1 hover:bg-green-500/20 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </div>
              )}
              {yearFilter !== "all" && (
                <div className="flex items-center gap-1 bg-purple-500/10 text-purple-600 px-2 py-1 rounded-md text-xs">
                  <Calendar className="h-3 w-3" />
                  <span>{yearFilter}</span>
                  <button
                    onClick={() => setYearFilter("all")}
                    className="ml-1 hover:bg-purple-500/20 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchInput("");
                  setCategoryFilter("all");
                  setYearFilter("all");
                }}
                className="text-xs text-foreground/60 hover:text-foreground underline ml-2"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stories list */}
      <MDXStoriesList stories={filteredStories} />
    </>
  );
}
