"use client";

import { Search, Filter, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/projects/project-card";
import SectionHeading from "@/components/ui/section-heading";
import { useProjectsData } from "@/hooks/useProjectsData";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";

export default function ProjectsPage() {
  const {
    isLoading,
    projects,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    // Pagination
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = useProjectsData();

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

  // Update role filter when tabs change
  const handleTabChange = (value: string) => {
    setRoleFilter(value);
    goToPage(1); // Reset to first page when changing tabs
  };

  // Generate page numbers for pagination
  const renderPaginationItems = () => {
    const items = [];

    // Always show first page
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink
          onClick={() => goToPage(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // If there are many pages, add an ellipsis after page 1
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show current page and neighbors
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i <= currentPage + 1 && i >= currentPage - 1) {
        items.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink
              onClick={() => goToPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // If there are many pages, add an ellipsis before the last page
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink
            onClick={() => goToPage(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  // Pagination component
  const PaginationControls = () => (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={prevPage}
            className={!hasPrevPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationNext
            onClick={nextPage}
            className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  const ProjectsGrid = () => (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <Spinner />
        </div>
      ) : !isLoading && projects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.title + project.number + project.PI}
                project={project}
              />
            ))}
          </div>
          <PaginationControls />
        </>
      ) : (
        <div className="text-center py-16 glass-card rounded-xl">
          <BookOpen className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-foreground/60 mb-6">
            We couldn&apos;t find any projects matching your search criteria.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="text-blue-500 hover:underline"
          >
            Clear search and show all projects
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16 md:py-24">
        <SectionHeading
          title={<span className="gradient-text">Research Projects</span>}
          subtitle="Explore our ongoing and completed research projects"
        />

        {/* Search and filter section */}
        <div className="mb-8 glass-card p-6 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
                <Input
                  placeholder="Search projects by title, description, number, PI, or sponsor..."
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
              <Filter className="text-foreground/60 h-4 w-4" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="ongoing">Ongoing Projects</SelectItem>
                  <SelectItem value="completed">Completed Projects</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs for PI role filtering */}
        <Tabs
          defaultValue={roleFilter}
          value={roleFilter}
          onValueChange={handleTabChange}
          className="mb-8"
        >
          <TabsList className="glass-card">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="pi-copi">PI/Co-PI</TabsTrigger>
            <TabsTrigger value="key-researcher">Key Researcher</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ProjectsGrid />
          </TabsContent>

          <TabsContent value="pi-copi" className="mt-6">
            <ProjectsGrid />
          </TabsContent>

          <TabsContent value="key-researcher" className="mt-6">
            <ProjectsGrid />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
