"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Box, Container, Input, Select, Stack, Text, Button, Center, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import projectsData from "@/data/projs_and_grants.json";
import ProjectCard from "@/components/ProjectCard";
import GrantCard from "@/components/GrantCard";

// Type the imported projects data
const typedProjectsData: ProjectTypes[] = projectsData.projects as ProjectTypes[];
const typedGrantsData: GrantTypes[] = projectsData.grants as GrantTypes[];

const ProjectsAndGrants: React.FC<{ role: string }> = ({ role }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByStatus, setSortByStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncing, setDebouncing] = useState(false);
    const [filteredData, setFilteredData] = useState<(ProjectTypes | GrantTypes)[]>([]);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const dataPerPage = 10;

    // Combine and memoize the data
    const combinedData = useMemo(() => {
        return [...typedProjectsData, ...typedGrantsData];
    }, [typedProjectsData, typedGrantsData]);

    // Search handler with debouncing
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchTerm(query);
        setDebouncing(true);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            setDebouncing(false);
        }, 300);
    };

    // Sort handler
    const handleSortByStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value;
        setSortByStatus(status);
        setCurrentPage(1);
    };

    // Pagination handler
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // URL Update handler
    const updateURL = useCallback(() => {
        const queryParams = new URLSearchParams();
        queryParams.set("page", currentPage.toString());
        if (searchTerm) queryParams.set("q", searchTerm);
        if (sortByStatus) queryParams.set("status", sortByStatus);

        // Dynamically set the hash based on the role
        const hash = role === "PI/Co-PI" ? "#pi-co-pi" : role === "Key Researcher" ? "#key-researcher" : "";

        window.history.replaceState(null, "", `${window.location.pathname}?${queryParams.toString()}${hash}`);
    }, [currentPage, searchTerm, sortByStatus, role]);


    // Parse query string and hash when the page loads
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const page = parseInt(urlParams.get("page") || "1", 10);
        const query = urlParams.get("q") || "";
        const status = urlParams.get("status") || "";
        if (page) setCurrentPage(page);
        if (query) setSearchTerm(query);
        if (status) setSortByStatus(status);
    }, []);

    // Ensure the component is mounted before using window.location
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true); // Set mounted to true after the component is rendered on the client
        }
    }, []);

    useEffect(() => {
        let filtered = combinedData;

        // Apply search filter
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((item) => {
                const normalizedSearchTerm = lowerSearchTerm.replace(/\s+/g, '');

                if (isProject(item)) {
                    const normalizedProjectNumber = item.number.replace(/\s+/g, '').toLowerCase();
                    return (
                        normalizedProjectNumber.includes(normalizedSearchTerm) ||
                        item.title.toLowerCase().includes(lowerSearchTerm) ||
                        item.description.toLowerCase().includes(lowerSearchTerm) ||
                        item.sponsor.toLowerCase().includes(lowerSearchTerm)
                    );
                } else if (isGrant(item)) {
                    return (
                        item.title.toLowerCase().includes(lowerSearchTerm) ||
                        item.description.toLowerCase().includes(lowerSearchTerm) ||
                        item.PI.toLowerCase().includes(lowerSearchTerm)
                    );
                }
                return false;
            });
        }

        // Apply role filter
        if (role) {
            filtered = filtered.filter(item =>
                role === "PI/Co-PI"
                    ? ["PI", "Co-PI", "Instructional PI", "Institutional PI"].includes(item.PI_role)
                    : role === "Key Researcher"
                        ? item.PI_role === "Key Researcher"
                        : true
            );
        }

        // Apply status filter
        if (sortByStatus) {
            filtered = filtered.filter(item => item.status === sortByStatus);
        }

        setFilteredData(filtered);
        updateURL(); // Call the updated URL handler
    }, [combinedData, searchTerm, role, sortByStatus, currentPage, updateURL]);


    const indexOfLastItem = currentPage * dataPerPage;
    const indexOfFirstItem = indexOfLastItem - dataPerPage;

    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / dataPerPage);

    // Type guard to distinguish between ProjectTypes and GrantTypes
    const isProject = (item: ProjectTypes | GrantTypes): item is ProjectTypes => {
        return 'number' in item;  // 'number' is a unique field for ProjectTypes
    };

    const isGrant = (item: ProjectTypes | GrantTypes): item is GrantTypes => {
        return 'budget' in item;  // 'budget' is a unique field for GrantTypes
    };

    if (!isMounted) return null; // Prevent rendering during SSR

    return (
        <Box py={8}>
            <Container maxW="container.xl">
                <Stack mb={6} direction={{ base: "column", md: "row" }} spacing={4}>
                    <Input
                        placeholder="Search by title, sponsor, description, or project number"
                        value={searchTerm}
                        onChange={handleSearch}
                        bg="white"
                        borderColor="gray.300"
                    />
                    <Select
                        placeholder="Sort by Status"
                        value={sortByStatus}
                        onChange={handleSortByStatus}
                        bg="white"
                        borderColor="gray.300"
                    >
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </Select>
                </Stack>

                {debouncing ? (
                    <Center py={10}>
                        <Spinner size="xl" color="yellow.500" />
                    </Center>
                ) : filteredData.length === 0 ? (
                    <Text>No data found</Text>
                ) : (
                    <Stack spacing={6}>
                        {currentData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {isProject(item) ? (
                                    <ProjectCard project={item} />
                                ) : isGrant(item) ? (
                                    <GrantCard grant={item} />
                                ) : null}
                            </motion.div>
                        ))}
                    </Stack>
                )}

                <Stack direction="row" justify="center" mt={8}>
                    {currentPage > 1 && (
                        <Button onClick={() => handlePageChange(currentPage - 1)} _hover={{ color: "white", backgroundColor: "primary" }} >
                            Previous
                        </Button>
                    )}
                    <Center>
                        Page {currentPage} of {totalPages}
                    </Center>
                    {currentPage < totalPages && (
                        <Button onClick={() => handlePageChange(currentPage + 1)} _hover={{ color: "white", backgroundColor: "primary" }} >
                            Next
                        </Button>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default ProjectsAndGrants;
