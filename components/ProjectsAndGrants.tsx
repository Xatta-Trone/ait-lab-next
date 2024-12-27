"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
    Box,
    Container,
    Input,
    Select,
    Stack,
    Text,
    Center,
    Spinner,
    useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import projectsData from "@/data/stock_projs_grants.json";
import ProjectCard from "@/components/ProjectCard";
import GrantCard from "@/components/GrantCard";

const typedProjectsData: ProjectTypes[] = projectsData.projects as ProjectTypes[];
const typedGrantsData: GrantTypes[] = projectsData.grants as GrantTypes[];

const ProjectsAndGrants: React.FC<{ role: string }> = ({ role }) => {
    const inputBg = useColorModeValue("white", "gray.600");
    const inputBorder = useColorModeValue("gray.200", "gray.500");
    const placeHolderColor = useColorModeValue("gray.500", "whiteAlpha.700");

    const [searchTerm, setSearchTerm] = useState("");
    const [sortByStatus, setSortByStatus] = useState("");
    const [filteredData, setFilteredData] = useState<(ProjectTypes | GrantTypes)[]>([]);
    const [displayedData, setDisplayedData] = useState<(ProjectTypes | GrantTypes)[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const dataPerPage = 10;
    const observer = useRef<IntersectionObserver | null>(null);

    const combinedData = useMemo(() => [...typedProjectsData, ...typedGrantsData], []);

    // Parse query parameters and hash on initial render
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("q") || "";
        const status = params.get("status") || "";

        setSearchTerm(query);
        setSortByStatus(status);
    }, []);

    // Update URL dynamically
    const updateURL = useCallback(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("q", searchTerm);
        if (sortByStatus) params.set("status", sortByStatus);

        const hash = role === "PI/Co-PI" ? "#pi-co-pi" : "#key-researcher";
        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}?${params.toString()}${hash}`
        );
    }, [searchTerm, sortByStatus, role]);

    // Apply filters to data
    const applyFilters = useCallback(() => {
        let filtered = combinedData;

        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((item) => {
                const normalizedSearchTerm = lowerSearchTerm.replace(/\s+/g, "");
                if ("number" in item) {
                    const normalizedProjectNumber = item.number.replace(/\s+/g, "").toLowerCase();
                    return (
                        normalizedProjectNumber.includes(normalizedSearchTerm) ||
                        item.title.toLowerCase().includes(lowerSearchTerm) ||
                        item.description.toLowerCase().includes(lowerSearchTerm) ||
                        item.sponsor.toLowerCase().includes(lowerSearchTerm)
                    );
                } else {
                    return (
                        item.title.toLowerCase().includes(lowerSearchTerm) ||
                        item.description.toLowerCase().includes(lowerSearchTerm) ||
                        item.PI.toLowerCase().includes(lowerSearchTerm)
                    );
                }
            });
        }

        if (role) {
            filtered = filtered.filter((item) =>
                role === "PI/Co-PI"
                    ? ["PI", "Co-PI", "Instructional PI", "Institutional PI"].includes(item.PI_role)
                    : item.PI_role === "Key Researcher"
            );
        }

        if (sortByStatus) {
            filtered = filtered.filter((item) => item.status === sortByStatus);
        }

        setFilteredData(filtered);
        setDisplayedData(filtered.slice(0, dataPerPage));
        setHasMore(filtered.length > dataPerPage);
        updateURL();
    }, [combinedData, searchTerm, role, sortByStatus, updateURL]);

    useEffect(() => {
        if (!isSearching) {
            applyFilters();
        }
    }, [applyFilters, isSearching]);

    const loadMoreData = () => {
        if (!hasMore || isLoadingMore) return;

        setIsLoadingMore(true);

        setTimeout(() => {
            const nextData = filteredData.slice(
                displayedData.length,
                displayedData.length + dataPerPage
            );
            setDisplayedData((prev) => [...prev, ...nextData]);
            setHasMore(displayedData.length + nextData.length < filteredData.length);
            setIsLoadingMore(false);
        }, 500);
    };

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) loadMoreData();
            },
            { root: null, rootMargin: "0px", threshold: 1.0 }
        );

        const triggerElement = document.querySelector("#load-more-trigger");
        if (triggerElement) {
            observer.current.observe(triggerElement);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [loadMoreData]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsSearching(true);

        setTimeout(() => {
            setIsSearching(false);
        }, 500);
    };

    const handleSortByStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortByStatus(e.target.value);
    };

    return (
        <Box py={8}>
            <Container maxW="container.xl">
                <Stack mb={6} direction={{ base: "column", md: "row" }} spacing={4}>
                    <Input
                        placeholder="Search by title, sponsor, description, or project number"
                        value={searchTerm}
                        onChange={handleSearch}
                        bg={inputBg}
                        borderColor={inputBorder}
                        _placeholder={{ color: placeHolderColor }}
                    />
                    <Select
                        placeholder="Sort by Status"
                        value={sortByStatus}
                        onChange={handleSortByStatus}
                        bg={inputBg}
                        borderColor={inputBorder}
                    >
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </Select>
                </Stack>

                {isSearching && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Center py={4}>
                            <Spinner size="lg" color="yellow.500" />
                        </Center>
                    </motion.div>
                )}

                {displayedData.length > 0 ? (
                    <Stack spacing={6}>
                        {displayedData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {"number" in item ? (
                                    <ProjectCard project={item} />
                                ) : (
                                    <GrantCard grant={item} />
                                )}
                            </motion.div>
                        ))}
                    </Stack>
                ) : (
                    <Text>No data found</Text>
                )}

                {hasMore && <div id="load-more-trigger" style={{ height: "1px" }}></div>}

                {isLoadingMore && (
                    <Center py={6}>
                        <Spinner size="xl" color="yellow.500" />
                    </Center>
                )}
            </Container>
        </Box>
    );
};

export default ProjectsAndGrants;
