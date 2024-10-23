/** @format */
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Box,
    Container,
    Text,
    Input,
    Stack,
    Button,
    SimpleGrid,
    Select,
    Spinner,
    Heading,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams from next/navigation
import axios from "axios";
import ResearchPaperItem from "@/components/ResearchPaperItem"; // Import the ResearchPaperItem component
import { motion } from "framer-motion"; // Import framer-motion for animations

const ResearchPapers = () => {
    const searchParams = useSearchParams(); // Get search parameters from the URL
    const [papers, setPapers] = useState<any[]>([]); // State to store research papers
    const [lastUpdated, setLastUpdated] = useState(""); // State to store last updated timestamp
    const [filteredPapers, setFilteredPapers] = useState<any[]>([]); // State for filtered papers
    const [searching, setSearching] = useState(false); // State for showing searching animation
    const [searchTerm, setSearchTerm] = useState(""); // State for the search term
    const [sortByYear, setSortByYear] = useState(""); // State for sorting by year
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [isPageChanging, setIsPageChanging] = useState(false); // State for showing spinner during pagination
    const [isSorting, setIsSorting] = useState(false); // State for showing spinner when sorting
    const papersPerPage = 20; // Number of papers per page
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for the debounce timer

    // Fetch research papers from an external source
    useEffect(() => {
        // Set dynamic page title
        document.title = "Research Papers | AIT Lab";

        const fetchPapers = async () => {
            try {
                const response = await axios.get(
                    "https://raw.githubusercontent.com/Xatta-Trone/google-scholar-scrapper/refs/heads/main/scholar-data-qK-YgxAAAAAJ.json"
                );
                setPapers(response.data.data || []); // Set the fetched papers
                setLastUpdated(response.data.last_updated_utc); // Set the last updated timestamp
            } catch (error) {
                console.error("Error fetching research papers:", error);
            }
        };
        fetchPapers();
    }, []);

    // Sync URL parameters with component state
    useEffect(() => {
        setSearchTerm(searchParams.get("search") || ""); // Get search term from URL
        setSortByYear(searchParams.get("year") || ""); // Get sort order from URL
        setCurrentPage(parseInt(searchParams.get("page") || "1", 10)); // Get current page from URL
    }, [searchParams]);

    // Handle searching with debounce
    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const searchQuery = e.target.value; // Get current search term
            setSearchTerm(searchQuery);
            setSearching(true); // Indicate that searching is in progress

            // Clear existing timeout
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            // Set new debounce timeout
            searchTimeoutRef.current = setTimeout(() => {
                updateURL(searchQuery, sortByYear, 1); // Update URL with new search term
                setSearching(false); // End searching state
            }, 500); // 500ms debounce
        },
        [sortByYear] // Depend on sortByYear
    );

    // Filter papers based on search and sort criteria
    useEffect(() => {
        let tempPapers = [...papers]; // Create a copy of the papers array

        // Filter by search term
        if (searchTerm) {
            tempPapers = tempPapers.filter(
                (paper) =>
                    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (paper.authors &&
                        paper.authors.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Sort papers by year
        if (sortByYear) {
            tempPapers = tempPapers.sort((a, b) =>
                sortByYear === "asc" ? a.year - b.year : b.year - a.year
            );
        }

        setFilteredPapers(tempPapers); // Update the filtered papers state
        // Reset sorting and pagination states
        setIsSorting(false);
        setIsPageChanging(false);
    }, [papers, searchTerm, sortByYear]);

    // Pagination Logic
    const indexOfLastPaper = currentPage * papersPerPage;
    const indexOfFirstPaper = indexOfLastPaper - papersPerPage;
    const currentPapers = filteredPapers.slice(
        indexOfFirstPaper,
        indexOfLastPaper
    ); // Get current papers for the current page
    const totalPages = Math.ceil(filteredPapers.length / papersPerPage); // Calculate total pages

    // Function to update the URL with new search parameters
    const updateURL = useCallback(
        (search: string, year: string, page: number) => {
            const searchParams = new URLSearchParams(); // Create a new URLSearchParams instance
            if (search) searchParams.set("search", search); // Add search term to params
            if (year) searchParams.set("year", year); // Add year to params
            if (page) searchParams.set("page", page.toString()); // Add page number to params
            // Update the URL without reloading the page
            window.history.pushState({}, '', `?${searchParams.toString()}`);
        },
        []
    );

    // Handle sorting by year
    const handleSortYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsSorting(true); // Show spinner while sorting
        setSortByYear(e.target.value); // Set the sort order
        updateURL(searchTerm, e.target.value, 1); // Update URL with new sort order
    };

    // Define motion variants for animations
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
            },
        }),
    };

    return (
        <Box py={8}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="blue.600">
                    Research Papers
                </Heading>

                {/* Source and Last Updated Timestamp */}
                <Text fontSize="sm" color="gray.600" mb={2}>
                    Last Updated: {lastUpdated} from Google Scholar
                </Text>

                {/* Search and Sorting */}
                <Stack mb={6} direction={{ base: "column", md: "row" }} spacing={4}>
                    <Input
                        placeholder="Search by title, author"
                        value={searchTerm}
                        onChange={handleSearch}
                        bg="white"
                        borderColor="gray.300"
                        color="gray.700"
                    />
                    <Select
                        placeholder="Sort by Year"
                        value={sortByYear}
                        onChange={handleSortYearChange}
                        bg="white"
                        borderColor="gray.300"
                        color="gray.700"
                    >
                        <option value="asc" style={{ color: "black" }}>
                            Oldest First
                        </option>
                        <option value="desc" style={{ color: "black" }}>
                            Newest First
                        </option>
                    </Select>
                </Stack>

                {/* Loading Animation while Searching or Changing Pages */}
                {(searching || isPageChanging || isSorting) && (
                    <Box textAlign="center" py={6}>
                        <Spinner size="xl" color="blue.500" />
                    </Box>
                )}

                {/* Papers */}
                <Box>
                    {!searching && !isPageChanging && !isSorting && filteredPapers.length > 0 && (
                        <>
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                                {currentPapers.map((paper, index) => (
                                    <motion.div
                                        key={index}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        variants={variants}
                                    >
                                        <ResearchPaperItem
                                            title={paper.title}
                                            total_citations={paper.total_citations}
                                            year={paper.year}
                                            url={paper.url}
                                            journal={paper.journal}
                                            publisher={paper.publisher}
                                            source={paper.source}
                                            issue={paper.issue}
                                            book={paper.book}
                                        />
                                    </motion.div>
                                ))}
                            </SimpleGrid>

                            {/* Pagination Buttons */}
                            <Stack mt={8} direction="row" spacing={4} justify="center">
                                {currentPage > 1 && (
                                    <Button
                                        onClick={() => {
                                            setIsPageChanging(true);
                                            setCurrentPage(currentPage - 1);
                                            updateURL(searchTerm, sortByYear, currentPage - 1);
                                        }}
                                        colorScheme="blue"
                                        _hover={{ bg: "blue.600", color: "white" }}
                                    >
                                        Previous
                                    </Button>
                                )}
                                {currentPage < totalPages && (
                                    <Button
                                        onClick={() => {
                                            setIsPageChanging(true);
                                            setCurrentPage(currentPage + 1);
                                            updateURL(searchTerm, sortByYear, currentPage + 1);
                                        }}
                                        colorScheme="blue"
                                        _hover={{ bg: "blue.600", color: "white" }}
                                    >
                                        Next
                                    </Button>
                                )}
                            </Stack>
                        </>
                    )}
                    {!searching && !isPageChanging && !isSorting && filteredPapers.length === 0 && (
                        <Text textAlign="center" color="gray.500">
                            No papers found.
                        </Text>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default ResearchPapers;
