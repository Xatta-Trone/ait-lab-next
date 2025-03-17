"use client";

import { useState, useEffect } from "react";
import { Search, BookOpen, GraduationCap, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import CourseCard from "@/components/course/course-card";
import SectionHeading from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { useCoursesData } from "@/hooks/useCoursesData";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function CoursesPage() {
  // Use the courses data hook instead of direct import
  const {
    courses: filteredCourses,
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    termFilter,
    setTermFilter,
    isLoading,
  } = useCoursesData();

  // Add state for debounced inputs
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

  // Custom pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 courses per page

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, levelFilter, termFilter]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get paginated courses
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Pagination functions
  const goToPage = (page: number) => {
    const targetPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(targetPage);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Extract current term courses (Fall 2024 and Spring 2025)
  const currentTermCourses = paginatedCourses.filter(
    (course) =>
      course.term.includes("Fall 2024") || course.term.includes("Spring 2025")
  );

  // Extract previous term courses
  const previousTermCourses = paginatedCourses.filter(
    (course) =>
      !course.term.includes("Fall 2024") &&
      !course.term.includes("Spring 2025") &&
      (course.term.includes("Fall 2022") ||
        course.term.includes("Spring 2023") ||
        course.term.includes("Fall 2023") ||
        course.term.includes("Spring 2024"))
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16 md:py-24">
        <SectionHeading
          title={<span className="gradient-text">Courses</span>}
          subtitle="Transportation engineering and safety courses offered by our faculty"
        />

        {/* Search section */}
        <div className="mb-8 glass-card p-6 rounded-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
            <Input
              placeholder="Search courses by title, description, term, or level..."
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

          {/* Course level legend */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-1">
              <Badge
                className={`${
                  levelFilter === "Undergraduate"
                    ? "bg-blue-500"
                    : "bg-blue-500/70"
                } text-white cursor-pointer hover:bg-blue-600`}
                onClick={() =>
                  setLevelFilter(
                    levelFilter === "Undergraduate" ? "" : "Undergraduate"
                  )
                }
              >
                Undergraduate
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge
                className={`${
                  levelFilter === "Graduate"
                    ? "bg-purple-500"
                    : "bg-purple-500/70"
                } text-white cursor-pointer hover:bg-purple-600`}
                onClick={() =>
                  setLevelFilter(levelFilter === "Graduate" ? "" : "Graduate")
                }
              >
                Graduate
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge
                className={`${
                  levelFilter === "Ph.D. (Graduate)"
                    ? "bg-amber-500"
                    : "bg-amber-500/70"
                } text-white cursor-pointer hover:bg-amber-600`}
                onClick={() =>
                  setLevelFilter(
                    levelFilter === "Ph.D. (Graduate)" ? "" : "Ph.D. (Graduate)"
                  )
                }
              >
                Ph.D. (Graduate)
              </Badge>
            </div>
          </div>
        </div>

        {/* Courses list */}
        {isLoading ? (
          <div className="text-center py-16 glass-card rounded-xl">
            <Spinner />
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="space-y-12">
            {/* Current Term Courses */}
            {currentTermCourses.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold">Latest Offerings</h2>
                  <div className="h-px flex-grow bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                  <span className="text-foreground/60 text-sm">
                    {currentTermCourses.length} course
                    {currentTermCourses.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentTermCourses.map((course, index) => (
                    <CourseCard key={`current-${index}`} course={course} />
                  ))}
                </div>
              </div>
            )}

            {/* Previous Term Courses */}
            {previousTermCourses.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold">Previous Offerings</h2>
                  <div className="h-px flex-grow bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                  <span className="text-foreground/60 text-sm">
                    {previousTermCourses.length} course
                    {previousTermCourses.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {previousTermCourses.map((course, index) => (
                    <CourseCard key={`previous-${index}`} course={course} />
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {hasPrevPage && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={prevPage}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => goToPage(i + 1)}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {hasNextPage && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={nextPage}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-xl">
            <BookOpen className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
            <h3 className="text-xl font-medium mb-2">No courses found</h3>
            <p className="text-foreground/60 mb-6">
              We couldn&apos;t find any courses matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setLevelFilter("");
                setTermFilter("");
              }}
              className="text-blue-500 hover:underline"
            >
              Clear search and show all courses
            </button>
          </div>
        )}

        {/* Course stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center glass-card shrink-0 bg-blue-500/10">
                <GraduationCap className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Course Offerings</h3>
            </div>
            <p className="text-foreground/70 mb-4">
              Our faculty offers a variety of transportation engineering and
              safety courses at undergraduate and graduate levels.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-blue-500/10 rounded-md text-center">
                <p className="text-sm font-medium">Undergraduate</p>
                <p className="text-lg font-bold text-blue-500">
                  {
                    filteredCourses.filter((c) => c.level === "Undergraduate")
                      .length
                  }
                </p>
              </div>
              <div className="p-2 bg-amber-500/10 rounded-md text-center">
                <p className="text-sm font-medium">Ph.D.</p>
                <p className="text-lg font-bold text-amber-500">
                  {
                    filteredCourses.filter(
                      (c) => c.level === "Ph.D. (Graduate)"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center glass-card shrink-0 bg-blue-500/10">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Course Schedule</h3>
            </div>
            <p className="text-foreground/70 mb-4">
              Our courses are offered in various formats including in-person,
              hybrid, and online. Check the course details for specific
              scheduling information.
            </p>
            <p className="text-foreground/70">
              For more information about course registration, prerequisites, and
              scheduling, please visit the
              <Link
                href="http://mycatalog.txstate.edu/courses/ce/"
                className="text-blue-500 hover:underline mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Texas State University course catalog
              </Link>
              or contact the Civil Engineering department.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
