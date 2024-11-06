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
    Center,
} from "@chakra-ui/react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import ResearchPaperItem from "@/components/ResearchPaperItem";
import { motion } from "framer-motion";

const ResearchPapers: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [papers, setPapers] = useState<ResearchPaper[]>([]);
    const [lastUpdated, setLastUpdated] = useState("");
    const [filteredPapers, setFilteredPapers] = useState<ResearchPaper[]>([]);
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByYear, setSortByYear] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isPageChanging, setIsPageChanging] = useState(false);
    const papersPerPage = 20;
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        document.title = "Research Papers | AIT Lab";

        const fetchPapers = async () => {
            try {
                const response = await axios.get(
                    "https://raw.githubusercontent.com/Xatta-Trone/google-scholar-scrapper/refs/heads/main/scholar-data-qK-YgxAAAAAJ.json"
                );
                setPapers(response.data.data || []);

                // Convert the last updated timestamp to a human-readable format
                const updatedDate = new Date(response.data.last_updated_utc);
                setLastUpdated(
                    updatedDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                );
            } catch (error) {
                console.error("Error fetching research papers:", error);
            }
        };
        fetchPapers();
    }, []);

    useEffect(() => {
        const search = searchParams.get("search") || "";
        const year = searchParams.get("year") || "";
        const page = parseInt(searchParams.get("page") || "1", 10);

        setSearchTerm(search);
        setSortByYear(year);
        setCurrentPage(page);
    }, [searchParams]);

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const searchQuery = e.target.value;
            setSearchTerm(searchQuery);
            setSearching(true);

            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            searchTimeoutRef.current = setTimeout(() => {
                updateURL(searchQuery, sortByYear, 1);
                setSearching(false);
            }, 500);
        },
        [sortByYear]
    );

    useEffect(() => {
        let tempPapers = [...papers];

        if (searchTerm) {
            tempPapers = tempPapers.filter(
                (paper) =>
                    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (paper.authors &&
                        paper.authors.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (sortByYear) {
            tempPapers = tempPapers.sort((a, b) =>
                sortByYear === "asc" ? a.year - b.year : b.year - a.year
            );
        }

        setFilteredPapers(tempPapers);
    }, [papers, searchTerm, sortByYear]);

    // Pagination Logic
    const indexOfLastPaper = currentPage * papersPerPage;
    const indexOfFirstPaper = indexOfLastPaper - papersPerPage;
    const currentPapers = filteredPapers.slice(indexOfFirstPaper, indexOfLastPaper);
    const totalPages = Math.ceil(filteredPapers.length / papersPerPage);

    const updateURL = useCallback(
        (search: string, year: string, page: number) => {
            const searchParams = new URLSearchParams();
            if (search) searchParams.set("search", search);
            if (year) searchParams.set("year", year);
            if (page) searchParams.set("page", page.toString());

            router.push(`?${searchParams.toString()}`);
        },
        [router]
    );

    const handleSortYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortByYear(e.target.value);
        updateURL(searchTerm, e.target.value, 1);
    };

    const handlePageChange = (page: number) => {
        setIsPageChanging(true);
        setCurrentPage(page);
        updateURL(searchTerm, sortByYear, page);
    };

    // Effect to handle loading state after page change
    useEffect(() => {
        if (isPageChanging) {
            const timer = setTimeout(() => {
                setIsPageChanging(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isPageChanging]);

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
        <Box py={20}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="yellow.600">
                    Research Papers
                </Heading>

                <Text fontSize="sm" color="gray.600" mb={2}>
                    Last Updated: {lastUpdated} from Google Scholar
                </Text>

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

                {(searching || isPageChanging) && (
                    <Box textAlign="center" py={6}>
                        <Spinner size="xl" color="yellow.500" />
                    </Box>
                )}

                <Box>
                    {!searching && !isPageChanging && filteredPapers.length > 0 && (
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

                            <Stack mt={8} direction="row" spacing={4} justify="center">
                                {currentPage > 1 && (
                                    <Button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        colorScheme="yellow" _hover={{ color: "white", backgroundColor: "primary" }}
                                    >
                                        Previous
                                    </Button>
                                )}
                                <Center>
                                    Page {currentPage} of {totalPages}
                                </Center>
                                {currentPage < totalPages && (
                                    <Button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        colorScheme="yellow" _hover={{ color: "white", backgroundColor: "primary" }}
                                    >
                                        Next
                                    </Button>
                                )}
                            </Stack>
                        </>
                    )}

                    {!searching && !isPageChanging && filteredPapers.length === 0 && (
                        <Text textAlign="center" py={6}>
                            No results found.
                        </Text>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default ResearchPapers;
