"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    Box,
    Container,
    Input,
    Stack,
    Text,
    Spinner,
    Heading,
    Center,
    useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import LabToolsCard from "./LabToolsCard";
import labToolsData from "@/data/lab_tools.json";

const typedLabToolsData: LabTools[] = labToolsData as LabTools[];

const LabToolsPage: React.FC = () => {
    const bgColor = useColorModeValue("white", "gray.700");
    const headingColor = useColorModeValue("yellow.600", "whiteAlpha.900");
    const inputBg = useColorModeValue("white", "gray.600");
    const inputBorder = useColorModeValue("gray.200", "gray.500");
    const placeHolderColor = useColorModeValue("gray.500", "whiteAlpha.700");

    const router = useRouter();
    const searchParams = useSearchParams();

    // State management
    const [filteredTools, setFilteredTools] = useState<LabTools[]>([]);
    const [displayedTools, setDisplayedTools] = useState<LabTools[]>([]);
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const toolsPerPage = 10;
    const observer = useRef<IntersectionObserver | null>(null);

    /**
     * Updates the URL query parameters whenever the search term changes.
     */
    const updateURL = useCallback(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("search", searchTerm);
        router.push(`?${params.toString()}`);
    }, [router, searchTerm]);

    useEffect(() => {
        updateURL();
    }, [updateURL]);

    /**
     * Handles the search input, updates the search term state, and filters tools.
     */
    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const query = e.target.value;
            setSearchTerm(query);
            setSearching(true);

            // Simulate a debounce effect
            setTimeout(() => {
                setSearching(false);
            }, 300);
        },
        []
    );

    /**
     * Filters the LabTools data based on the search term.
     * Runs every time the search term changes.
     */
    useEffect(() => {
        let tempTools = [...typedLabToolsData];

        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            tempTools = tempTools.filter((tool) =>
                tool.title.toLowerCase().includes(lowerSearchTerm) ||
                tool.project.toLowerCase().includes(lowerSearchTerm) ||
                tool.description.toLowerCase().includes(lowerSearchTerm)
            );
        }

        setFilteredTools(tempTools);
        setDisplayedTools(tempTools.slice(0, toolsPerPage));
        setHasMore(tempTools.length > toolsPerPage);
    }, [searchTerm]);

    /**
     * Loads more tools as the user scrolls.
     */
    const loadMoreTools = () => {
        if (isLoadingMore || !hasMore) return;

        setIsLoadingMore(true);

        setTimeout(() => {
            const nextTools = filteredTools.slice(
                displayedTools.length,
                displayedTools.length + toolsPerPage
            );

            setDisplayedTools((prev) => [...prev, ...nextTools]);
            setHasMore(displayedTools.length + nextTools.length < filteredTools.length);
            setIsLoadingMore(false);
        }, 500);
    };

    /**
     * Sets up the Intersection Observer to detect when the user reaches the bottom of the tools list.
     */
    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMoreTools();
                }
            },
            { root: null, rootMargin: "0px", threshold: 1.0 }
        );

        if (observer.current && document.querySelector("#infinite-scroll-trigger")) {
            observer.current.observe(document.querySelector("#infinite-scroll-trigger")!);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [loadMoreTools]);

    return (
        <Box py={20} minH={"100%"} bgColor={bgColor}>
            <Container maxW="container.xl">
                {/* Page title */}
                <Heading as="h1" size="2xl" mb={6} color={headingColor}>
                    AIT Lab Tools
                </Heading>

                {/* Search Input */}
                <Stack mb={6} spacing={4}>
                    <Input
                        placeholder="Search by title, project, or description"
                        value={searchTerm}
                        onChange={handleSearch}
                        bg={inputBg}
                        borderColor={inputBorder}
                        _placeholder={{ color: placeHolderColor }}
                    />
                </Stack>

                {/* Loading Spinner */}
                {searching && (
                    <Center py={10}>
                        <Spinner size="xl" color="yellow.500" />
                    </Center>
                )}

                {/* Tools List */}
                <Box>
                    {!searching && displayedTools.length > 0 && (
                        <Stack spacing={6}>
                            {displayedTools.map((tool, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <LabToolsCard {...tool} />
                                </motion.div>
                            ))}
                        </Stack>
                    )}

                    {!searching && displayedTools.length === 0 && (
                        <Text textAlign={"center"}>No tools found</Text>
                    )}

                    {/* Infinite Scroll Trigger */}
                    {hasMore && (
                        <div
                            id="infinite-scroll-trigger"
                            style={{ height: "1px", visibility: "hidden" }}
                        ></div>
                    )}

                    {isLoadingMore && (
                        <Center py={6}>
                            <Spinner size="xl" color="yellow.500" />
                        </Center>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default LabToolsPage;
