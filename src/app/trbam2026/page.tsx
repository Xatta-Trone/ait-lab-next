"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Calendar, Clock, MapPin, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TRBAM2026Paper } from "@/types/trbam2026";
import trbam2026Data from "@/data/trbam2026.json";

export default function TRBAM2026Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [selectedSessionType, setSelectedSessionType] = useState<string>("all");
  const [selectedTime, setSelectedTime] = useState<string>("all");

  const papers = trbam2026Data as TRBAM2026Paper[];

  // Get unique dates, times, and session types (preserve order)
  const uniqueDates = useMemo(() => {
    const seen = new Set<string>();
    const dates: string[] = [];
    papers.forEach((p) => {
      if (!seen.has(p.date)) {
        seen.add(p.date);
        dates.push(p.date);
      }
    });
    return dates;
  }, [papers]);

  const uniqueTimes = useMemo(() => {
    const seen = new Set<string>();
    const times: string[] = [];
    papers.forEach((p) => {
      const timeStr = `${p.time[0]} - ${p.time[1]}`;
      if (!seen.has(timeStr)) {
        seen.add(timeStr);
        times.push(timeStr);
      }
    });
    return times;
  }, [papers]);

  // Filter papers based on search and filters
  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.some((author) =>
          author.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Date filter
      const matchesDate = selectedDate === "all" || paper.date === selectedDate;

      // Session type filter (check if starts with the selected type)
      const matchesSessionType =
        selectedSessionType === "all" ||
        paper.sessionType
          .toLowerCase()
          .startsWith(selectedSessionType.toLowerCase());

      // Time filter
      const paperTime = `${paper.time[0]} - ${paper.time[1]}`;
      const matchesTime = selectedTime === "all" || paperTime === selectedTime;

      return matchesSearch && matchesDate && matchesSessionType && matchesTime;
    });
  }, [papers, searchQuery, selectedDate, selectedSessionType, selectedTime]);

  // Group papers by date and time (preserve original order)
  const groupedPapers = useMemo(() => {
    const grouped: Record<string, Record<string, TRBAM2026Paper[]>> = {};
    const dateOrder: string[] = [];
    const timeSlotOrder: Record<string, string[]> = {};

    filteredPapers.forEach((paper) => {
      const date = paper.date;
      const timeSlot = `${paper.time[0]} - ${paper.time[1]}`;

      // Track date order (first occurrence)
      if (!grouped[date]) {
        grouped[date] = {};
        dateOrder.push(date);
      }

      // Track time slot order within each date (first occurrence)
      if (!grouped[date][timeSlot]) {
        grouped[date][timeSlot] = [];
        if (!timeSlotOrder[date]) {
          timeSlotOrder[date] = [];
        }
        timeSlotOrder[date].push(timeSlot);
      }

      grouped[date][timeSlot].push(paper);
    });

    // Rebuild grouped object in original order
    const orderedGrouped: Record<string, Record<string, TRBAM2026Paper[]>> = {};
    dateOrder.forEach((date) => {
      orderedGrouped[date] = {};
      timeSlotOrder[date].forEach((timeSlot) => {
        orderedGrouped[date][timeSlot] = grouped[date][timeSlot];
      });
    });

    return orderedGrouped;
  }, [filteredPapers]);

  // Create a map of date to dayOfWeek from papers
  const dateToDayOfWeek = useMemo(() => {
    const map: Record<string, string> = {};
    papers.forEach((paper) => {
      if (!map[paper.date]) {
        map[paper.date] = paper.dayOfWeek;
      }
    });
    return map;
  }, [papers]);

  const formatDate = (dateString: string) => {
    // Use dayOfWeek from JSON directly (no timezone conversion)
    const weekday = dateToDayOfWeek[dateString] || "";

    // Parse date string components directly (YYYY-MM-DD format)
    const [year, month, day] = dateString.split("-").map(Number);

    // Format date using the components directly (no Date object to avoid timezone issues)
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formatted = `${monthNames[month - 1]} ${day}, ${year}`;

    return `${weekday}, ${formatted}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-20 md:py-32">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
            TRBAM 2026
          </h1>
          <p className="text-xl text-muted-foreground mb-1">
            Transportation Research Board Annual Meeting
          </p>
          <p className="text-base text-muted-foreground">
            January 11-15, 2026 • Walter E. Washington Convention Center,
            Washington, D.C.
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              All times shown in ET (Eastern Time)
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            {papers.length} papers accepted for presentation
          </p>
        </div>

        {/* Filters Section */}
        <Card className="glass-card mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-4 w-4" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, author, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Date Filter */}
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="All Dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  {uniqueDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {formatDate(date)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Session Type Filter */}
              <Select
                value={selectedSessionType}
                onValueChange={setSelectedSessionType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Session Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Session Types</SelectItem>
                  <SelectItem value="Poster">Poster</SelectItem>
                  <SelectItem value="Lectern">Lectern</SelectItem>
                </SelectContent>
              </Select>

              {/* Time Filter */}
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="All Times" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Times</SelectItem>
                  {uniqueTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredPapers.length} of {papers.length} papers
            </div>
          </CardContent>
        </Card>

        {/* Schedule View */}
        {Object.keys(groupedPapers).length === 0 ? (
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No papers found matching your filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedPapers).map(([date, timeSlots]) => (
              <div key={date} className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2 sticky top-16 bg-background/80 backdrop-blur-sm py-2 z-10 border-b border-border/50">
                  <Calendar className="h-5 w-5 text-primary" />
                  {formatDate(date)}
                </h2>
                <div className="space-y-4">
                  {Object.entries(timeSlots).map(([timeSlot, papersInSlot]) => (
                    <div key={timeSlot} className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="font-semibold text-base">
                            {timeSlot}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {papersInSlot.length} paper
                          {papersInSlot.length !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                        {papersInSlot.map((paper) => (
                          <PaperCard key={paper.id} paper={paper} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PaperCard({ paper }: { paper: TRBAM2026Paper }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxAuthorsToShow = 3;

  return (
    <Card className="glass-card card-hover h-full flex flex-col transition-all">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="default" className="text-xs font-mono">
            {paper.id}
          </Badge>
          <Badge
            variant={
              paper.sessionType.toLowerCase().startsWith("poster")
                ? "secondary"
                : "outline"
            }
            className="text-xs"
          >
            {paper.sessionType}
          </Badge>
        </div>
        <CardTitle className="text-sm leading-relaxed font-semibold">
          {paper.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow px-4 pb-3 pt-0 space-y-2">
        {/* Time and Location */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground pb-1 border-b border-border/30">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              {paper.time[0]} - {paper.time[1]}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{paper.location}</span>
          </div>
        </div>

        {/* Authors - Compact View */}
        <div>
          <div className="flex items-center gap-1 mb-1.5 text-xs font-medium text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>
              {paper.authors.length} author
              {paper.authors.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="space-y-1.5">
            {(isExpanded
              ? paper.authors
              : paper.authors.slice(0, maxAuthorsToShow)
            ).map((author, index) => (
              <div
                key={index}
                className="border-l-2 border-primary/20 pl-2 py-0.5"
              >
                <div className="text-xs font-semibold text-foreground leading-tight">
                  {author.name}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight line-clamp-1">
                  {author.affiliation}
                </div>
              </div>
            ))}
            {paper.authors.length > maxAuthorsToShow && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-primary hover:underline mt-1 font-medium"
              >
                {isExpanded
                  ? `Show less`
                  : `+${paper.authors.length - maxAuthorsToShow} more`}
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
