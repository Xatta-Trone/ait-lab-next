"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Box, Container, Input, Stack, Text, Button, Center, Spinner, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import LabToolsCard from "./LabToolsCard";
import labToolsData from "@/data/lab_tools.json";

// Define the typed LabTools data structure
const typedLabToolsData: LabTools[] = labToolsData as LabTools[];

const LabToolsPage: React.FC = () => {
    // Set the document title dynamically
    useEffect(() => {
        document.title = "Tools | AIT Lab";
    });

    const router = useRouter();
    const searchParams = useSearchParams();

    // State to manage filtered tools based on search input
    const [filteredTools, setFilteredTools] = useState<LabTools[]>([]);

    // State to manage search and pagination behavior
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || ""); // Initialize with query string, if present
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1", 10)); // Initialize pagination
    const [isPageChanging, setIsPageChanging] = useState(false);

    const toolsPerPage = 10; // Number of tools to display per page
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Reference for debounce timer

    /**
     * Updates the URL query parameters whenever the search term or page changes.
     * This ensures the URL reflects the current state of the page.
     */
    const updateURL = useCallback(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("search", searchTerm); // Add search term to query params
        params.set("page", currentPage.toString()); // Add current page to query params

        router.push(`?${params.toString()}`);
    }, [router, searchTerm, currentPage]);

    // Run the URL update effect whenever the search term or page changes
    useEffect(() => {
        updateURL();
    }, [updateURL]);

    /**
     * Handles the search input, updates the search term state, and implements debounce to avoid excessive filtering.
     * @param e - Input change event
     */
    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const query = e.target.value;
            setSearchTerm(query);
            setSearching(true);

            // Clear the debounce timer if it exists
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            // Set a new debounce timer
            searchTimeoutRef.current = setTimeout(() => {
                setSearching(false);
            }, 500); // Wait 500ms before applying the search filter
        },
        []
    );

    /**
     * Filters the LabTools data based on the search term.
     * Runs every time the search term changes.
     */
    useEffect(() => {
        let tempTools = [...typedLabToolsData]; // Clone the tools array

        // Apply search filter
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase(); // Convert search term to lowercase
            tempTools = tempTools.filter((tool) =>
                tool.title.toLowerCase().includes(lowerSearchTerm) ||
                tool.project.toLowerCase().includes(lowerSearchTerm) ||
                tool.description.toLowerCase().includes(lowerSearchTerm)
            );
        }

        setFilteredTools(tempTools); // Update the filtered tools state
    }, [searchTerm]);

    /**
     * Calculates the tools to display on the current page and manages pagination.
     */
    const indexOfLastTool = currentPage * toolsPerPage; // Calculate index of last tool on the page
    const indexOfFirstTool = indexOfLastTool - toolsPerPage; // Calculate index of first tool on the page
    const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool); // Slice the filtered tools for the current page
    const totalPages = Math.ceil(filteredTools.length / toolsPerPage); // Calculate the total number of pages

    /**
     * Handles page changes for the pagination buttons.
     * @param page - Page number to navigate to
     */
    const handlePageChange = (page: number) => {
        setIsPageChanging(true); // Set page-changing state
        setCurrentPage(page); // Update the current page
    };

    // Adds a slight delay effect when changing pages for smooth transitions
    useEffect(() => {
        if (isPageChanging) {
            const timer = setTimeout(() => {
                setIsPageChanging(false); // Reset page-changing state
            }, 500); // 500ms delay for smoother transitions

            return () => clearTimeout(timer); // Clear the timer on component unmount
        }
    }, [isPageChanging]);

    return (
        <Box py={20}>
            <Container maxW="container.xl">
                {/* Page title */}
                <Heading as="h1" size="2xl" mb={6} color="yellow.600">
                    AIT Lab Tools
                </Heading>

                {/* Search Input */}
                <Stack mb={6} spacing={4}>
                    <Input
                        placeholder="Search by title, project, or description"
                        value={searchTerm}
                        onChange={handleSearch}
                        bg="white"
                        borderColor="gray.300"
                    />
                </Stack>

                {/* Loading Spinner */}
                {(searching || isPageChanging) && (
                    <Center py={10}>
                        <Spinner size="xl" color="yellow.500" />
                    </Center>
                )}

                {/* Tools List */}
                <Box>
                    {/* Display filtered tools */}
                    {!searching && !isPageChanging && currentTools.length > 0 && (
                        <Stack spacing={6}>
                            {currentTools.map((tool, index) => (
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

                    {/* No tools found message */}
                    {!searching && !isPageChanging && currentTools.length === 0 && (
                        <Text textAlign={"center"}>No tools found</Text>
                    )}

                    {/* Pagination Controls */}
                    <Stack direction="row" justify="center" mt={8}>
                        {currentPage > 1 && (
                            <Button onClick={() => handlePageChange(currentPage - 1)} _hover={{ color: "white", backgroundColor: "primary" }}>
                                Previous
                            </Button>
                        )}
                        <Center>
                            Page {currentPage} of {totalPages}
                        </Center>
                        {currentPage < totalPages && (
                            <Button onClick={() => handlePageChange(currentPage + 1)} _hover={{ color: "white", backgroundColor: "primary" }}>
                                Next
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default LabToolsPage;
