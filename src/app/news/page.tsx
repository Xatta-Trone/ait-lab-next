"use client";

import { Search, Bell, FileText, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsItemCard from "@/components/news/news-card";
import type { NewsItem } from "@/types/news";
import SectionHeading from "@/components/ui/section-heading";
import { useNewsData } from "@/hooks/useNewsData";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

// Categorization functions to maintain consistent filtering logic
const isAlert = (item: NewsItem): boolean =>
  item.title.toLowerCase().includes("funding") ||
  item.title.toLowerCase().includes("achievement") ||
  item.title.toLowerCase().includes("alert");

const isPaper = (item: NewsItem): boolean =>
  item.title.toLowerCase().includes("paper") ||
  item.title.toLowerCase().includes("conference") ||
  item.description.toLowerCase().includes("paper") ||
  item.description.toLowerCase().includes("published");

export default function NewsPage() {
  // Track the active tab for pagination
  const [activeTab, setActiveTab] = useState<"alerts" | "papers">("alerts");

  // Use the enhanced hook with pagination
  const {
    newsItems: filteredNews,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    currentPage,
    setPage,
    itemsPerPage,
  } = useNewsData();

  // Add state for debounced input
  const [searchInput, setSearchInput] = useState(searchQuery);
  // Track debouncing state
  const [isDebouncing, setIsDebouncing] = useState(false);

  // Only set debouncing to true when user actually types something new
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue !== searchInput) {
      setIsDebouncing(true);
      setSearchInput(newValue);
    }
  };

  // Debounce search query updates
  useEffect(() => {
    // Don't run debounce logic on initial mount
    if (searchInput === searchQuery && !isDebouncing) return;

    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setIsDebouncing(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, setSearchQuery, searchQuery, isDebouncing]);

  // First, categorize the complete filtered data
  const allAlerts = filteredNews.filter(isAlert);
  const allPapers = filteredNews.filter(isPaper);

  // Determine which category to display based on active tab
  const activeItems = activeTab === "alerts" ? allAlerts : allPapers;

  // Calculate the correct total pages for the active category
  const activeTotalPages = Math.max(
    1,
    Math.ceil(activeItems.length / itemsPerPage)
  );

  // Reset page when switching tabs or when it exceeds the available pages
  useEffect(() => {
    // If current page is beyond max pages for this tab, reset to page 1
    if (currentPage > activeTotalPages) {
      setPage(1);
    }
  }, [activeTab, activeTotalPages, currentPage, setPage]);

  // Ensure currentPage is within valid range
  const safeCurrentPage = Math.min(Math.max(1, currentPage), activeTotalPages);

  // Then apply pagination to the correct category
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedActiveItems = activeItems.slice(startIndex, endIndex);

  // Group news by month
  const groupNewsByMonth = (items: NewsItem[]) => {
    const grouped: Record<string, NewsItem[]> = {};

    items.forEach((item) => {
      const dateParts = item.date.split(" ");
      const monthYear = `${dateParts[0]} ${dateParts[2]}`;

      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }

      grouped[monthYear].push(item);
    });

    return grouped;
  };

  const groupedItems = groupNewsByMonth(paginatedActiveItems);

  // Get months in order (most recent first)
  const getMonthsInOrder = (groupedItems: Record<string, NewsItem[]>) => {
    return Object.keys(groupedItems).sort((a, b) => {
      const aDate = new Date(a + " 1");
      const bDate = new Date(b + " 1");
      return bDate.getTime() - aDate.getTime();
    });
  };

  const monthsInOrder = getMonthsInOrder(groupedItems);

  // Render pagination UI using the calculated pagination state
  const renderPagination = () => {
    if (activeTotalPages <= 1) return null;

    // Pagination flags based on current active tab context
    const hasNextPage = safeCurrentPage < activeTotalPages;
    const hasPrevPage = safeCurrentPage > 1;

    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => hasPrevPage && setPage(safeCurrentPage - 1)}
              className={!hasPrevPage ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {Array.from({ length: activeTotalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={safeCurrentPage === i + 1}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => hasNextPage && setPage(safeCurrentPage + 1)}
              className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16 md:py-24">
        <SectionHeading
          title={<span className="gradient-text">News & Updates</span>}
          subtitle="Stay updated with the latest news, achievements, and publications from our lab"
        />

        {/* Search section */}
        <div className="mb-8 glass-card p-6 rounded-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
            <Input
              placeholder="Search news by title, description, or date..."
              value={searchInput}
              onChange={handleSearchInputChange}
              className="pl-10 bg-background/50"
            />
            {isDebouncing && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="h-4 w-4 border-t-2 border-foreground/60 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">
            Error loading news data
          </div>
        ) : (
          /* Tabs for news categories */
          <Tabs
            defaultValue="alerts"
            className="mb-8"
            onValueChange={(value) => {
              setActiveTab(value as "alerts" | "papers");
              setPage(1); // Reset to page 1 when changing tabs
            }}
          >
            <TabsList className="glass-card">
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                Alerts & Achievements
              </TabsTrigger>
              <TabsTrigger value="papers" className="flex items-center gap-2">
                Papers & Presentations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="alerts" className="mt-6">
              {activeTab === "alerts" && paginatedActiveItems.length > 0 ? (
                <>
                  <div className="space-y-12">
                    {monthsInOrder.map((month) => (
                      <div key={month}>
                        <div className="flex items-center gap-3 mb-6">
                          <Calendar className="h-5 w-5 text-blue-500" />
                          <h2 className="text-xl font-bold">{month}</h2>
                          <div className="h-px flex-grow bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                        </div>
                        <div className="space-y-6">
                          {groupedItems[month].map((item, index) => (
                            <NewsItemCard
                              key={`alert-${month}-${index}`}
                              newsItem={item}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {renderPagination()}
                </>
              ) : (
                <div className="text-center py-16 glass-card rounded-xl">
                  <Bell className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No alerts found</h3>
                  <p className="text-foreground/60 mb-6">
                    We couldn&apos;t find any alerts or achievements matching
                    your search criteria.
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

            <TabsContent value="papers" className="mt-6">
              {activeTab === "papers" && paginatedActiveItems.length > 0 ? (
                <>
                  <div className="space-y-12">
                    {monthsInOrder.map((month) => (
                      <div key={month}>
                        <div className="flex items-center gap-3 mb-6">
                          <Calendar className="h-5 w-5 text-blue-500" />
                          <h2 className="text-xl font-bold">{month}</h2>
                          <div className="h-px flex-grow bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                        </div>
                        <div className="space-y-6">
                          {groupedItems[month].map((item, index) => (
                            <NewsItemCard
                              key={`paper-${month}-${index}`}
                              newsItem={item}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {renderPagination()}
                </>
              ) : (
                <div className="text-center py-16 glass-card rounded-xl">
                  <FileText className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No papers found</h3>
                  <p className="text-foreground/60 mb-6">
                    We couldn&apos;t find any papers or presentations matching
                    your search criteria.
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
        )}
      </div>
    </div>
  );
}
