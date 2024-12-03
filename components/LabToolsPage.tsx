"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Box, Container, Input, Stack, Text, Button, Center, Spinner, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import LabToolsCard from "./LabToolsCard";
import labToolsData from "@/data/lab_tools.json";

const typedLabToolsData: LabTools[] = labToolsData as LabTools[];

const LabToolsPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filteredTools, setFilteredTools] = useState<LabTools[]>([]);
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1", 10));
    const [isPageChanging, setIsPageChanging] = useState(false);

    const toolsPerPage = 10;
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updateURL = useCallback(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("search", searchTerm);
        params.set("page", currentPage.toString());

        router.push(`?${params.toString()}`);
    }, [router, searchTerm, currentPage]);

    useEffect(() => {
        updateURL();
    }, [updateURL]);

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const query = e.target.value;
            setSearchTerm(query);
            setSearching(true);

            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            searchTimeoutRef.current = setTimeout(() => {
                setSearching(false);
            }, 500);
        },
        []
    );

    useEffect(() => {
        let tempTools = [...typedLabToolsData];

        // Apply search filter
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            tempTools = tempTools.filter((tool) =>
                tool.title.toLowerCase().includes(lowerSearchTerm) ||
                tool.project.toLowerCase().includes(lowerSearchTerm) ||
                tool.description.toLowerCase().includes(lowerSearchTerm)
            );
        }

        setFilteredTools(tempTools);
    }, [searchTerm]);

    // Pagination Logic
    const indexOfLastTool = currentPage * toolsPerPage;
    const indexOfFirstTool = indexOfLastTool - toolsPerPage;
    const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);
    const totalPages = Math.ceil(filteredTools.length / toolsPerPage);

    const handlePageChange = (page: number) => {
        setIsPageChanging(true);
        setCurrentPage(page);
    };

    useEffect(() => {
        if (isPageChanging) {
            const timer = setTimeout(() => {
                setIsPageChanging(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isPageChanging]);

    return (
        <Box py={20}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="yellow.600">
                    AIT Lab Tools
                </Heading>

                <Stack mb={6} spacing={4}>
                    <Input
                        placeholder="Search by title, project, or description"
                        value={searchTerm}
                        onChange={handleSearch}
                        bg="white"
                        borderColor="gray.300"
                    />
                </Stack>

                {(searching || isPageChanging) && (
                    <Center py={10}>
                        <Spinner size="xl" color="yellow.500" />
                    </Center>
                )}

                <Box>
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

                    {!searching && !isPageChanging && currentTools.length === 0 && (
                        <Text>No tools found</Text>
                    )}

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
