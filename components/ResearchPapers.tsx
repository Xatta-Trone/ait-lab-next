"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Container,
    Text,
    Input,
    Stack,
    Select,
    Spinner,
    Heading,
    Center,
    SimpleGrid,
    useColorModeValue,
} from "@chakra-ui/react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import ResearchPaperItemNew from "./ResearchPaperItemNew";

const ResearchPapers: React.FC = () => {
    const bgColor = useColorModeValue("white", "gray.700");
    const headingColor = useColorModeValue("yellow.600", "whiteAlpha.900");
    const inputBg = useColorModeValue("white", "gray.600");
    const inputBorder = useColorModeValue("gray.200", "gray.500");
    const placeHolderColor = useColorModeValue("gray.500", "whiteAlpha.700");

    const searchParams = useSearchParams();
    const router = useRouter();

    const [papers, setPapers] = useState<ResearchPaper[]>([]);
    const [lastUpdated, setLastUpdated] = useState("");
    const [filteredPapers, setFilteredPapers] = useState<ResearchPaper[]>([]);
    const [displayedPapers, setDisplayedPapers] = useState<ResearchPaper[]>([]);
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchParams.get("q") || "");
    const [sortByYear, setSortByYear] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const papersPerPage = 10;
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const response = await axios.get(
                    "https://raw.githubusercontent.com/Xatta-Trone/google-scholar-scrapper/refs/heads/main/scholar-data-qK-YgxAAAAAJ.json"
                );
                setPapers(response.data.data || []);
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

    // Sync search term with query parameter on initial load
    useEffect(() => {
        const q = searchParams.get("q") || "";
        const year = searchParams.get("year") || "desc";
        setSearchTerm(q);
        setSortByYear(year);
    }, [searchParams]);

    // Debounce search term updates
    useEffect(() => {
        setIsLoading(true);
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        let tempPapers = [...papers];

        if (debouncedSearchTerm) {
            tempPapers = tempPapers.filter(
                (paper) =>
                    paper.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                    (paper.authors &&
                        paper.authors.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
            );
        }

        if (sortByYear) {
            tempPapers = tempPapers.sort((a, b) =>
                sortByYear === "asc" ? a.year - b.year : b.year - a.year
            );
        }

        setFilteredPapers(tempPapers);
        setDisplayedPapers(tempPapers.slice(0, papersPerPage));
        setHasMore(tempPapers.length > papersPerPage);
    }, [papers, debouncedSearchTerm, sortByYear]);

    const loadMorePapers = () => {
        if (!hasMore || isLoadingMore) return;
        setIsLoadingMore(true);

        setTimeout(() => {
            const nextPapers = filteredPapers.slice(
                displayedPapers.length,
                displayedPapers.length + papersPerPage
            );
            setDisplayedPapers((prev) => [...prev, ...nextPapers]);
            setHasMore(displayedPapers.length + nextPapers.length < filteredPapers.length);
            setIsLoadingMore(false);
        }, 500);
    };

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMorePapers();
                }
            },
            { root: null, rootMargin: "0px", threshold: 1.0 }
        );

        if (observer.current && document.querySelector("#load-more-trigger")) {
            observer.current.observe(document.querySelector("#load-more-trigger")!);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [loadMorePapers]);

    // Update URL with query parameters
    const updateURL = (search: string, year: string) => {
        const params = new URLSearchParams();
        if (search) params.set("q", search);
        if (year) params.set("year", year);

        router.push(`?${params.toString()}`);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        updateURL(e.target.value, sortByYear);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortByYear(e.target.value);
        updateURL(searchTerm, e.target.value);
    };

    return (
        <Box py={20} backgroundColor={bgColor} minH={'90vh'}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color={headingColor}>
                    Research Papers
                </Heading>
                <Text fontSize="sm" color={placeHolderColor} mb={2}>
                    Last Updated: {lastUpdated} from Google Scholar
                </Text>

                <Stack mb={6} direction={{ base: "column", md: "row" }} spacing={4}>
                    <Input
                        placeholder="Search by title, author"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        bg={inputBg}
                        borderColor={inputBorder}
                        _placeholder={{ color: placeHolderColor }}
                    />
                    <Select
                        placeholder="Sort by Year"
                        value={sortByYear}
                        onChange={handleSortChange}
                        bg={inputBg}
                        borderColor={inputBorder}
                    >
                        <option value="asc">Oldest First</option>
                        <option value="desc">Newest First</option>
                    </Select>
                </Stack>

                {isLoading && (
                    <Center py={6}>
                        <Spinner size="xl" color="yellow.500" />
                    </Center>
                )}

                <SimpleGrid columns={{ base: 1 }} spacing={6}>
                    {displayedPapers.map((paper, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ResearchPaperItemNew {...paper} />
                        </motion.div>
                    ))}
                </SimpleGrid>

                {isLoadingMore && (
                    <Center py={6}>
                        <Spinner size="xl" color="yellow.500" />
                    </Center>
                )}

                <div id="load-more-trigger" style={{ height: "1px" }}></div>
            </Container>
        </Box>
    );
};

export default ResearchPapers;
