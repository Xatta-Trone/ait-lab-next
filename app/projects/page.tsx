"use client";

import ProjectCard from '@/components/ProjectCard';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import projectsData from "@/data/projects.json";
import { Box, Button, Center, Container, Heading, Input, Select, Spinner, Stack, Text } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from 'next/navigation';

const typedProjectsData: ProjectTypes[] = projectsData as ProjectTypes[];

const Projects = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [projects, setProjects] = useState<ProjectTypes[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<ProjectTypes[]>([]);
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByStatus, setSortByStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 15;
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Set initial data from json 
    useEffect(() => {
        document.title = "Projects | AIT Lab";

        let sortedProjects = [...typedProjectsData];

        // Sort projects by status ("ongoing" first, then "completed") and by "end_year" (recent first)
        sortedProjects.sort((a, b) => {
            const statusOrder: { [key: string]: number } = { ongoing: 1, completed: 2 };
            const statusA = statusOrder[a.status.toLowerCase()] || 3;
            const statusB = statusOrder[b.status.toLowerCase()] || 3;

            if (statusA !== statusB) {
                return statusA - statusB;
            }
            return b.start_date.year - a.end_date.year;
        });

        setProjects(sortedProjects);
    }, []);

    useEffect(() => {
        const search = searchParams.get("search") || "";
        const status = searchParams.get("status") || "";
        const page = parseInt(searchParams.get("page") || "1", 10);

        setSearchTerm(search);
        setSortByStatus(status);
        setCurrentPage(page);
    }, [searchParams]);

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value;
        setSearchTerm(searchQuery);
        setSearching(true);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            updateURL(searchQuery, sortByStatus, 1);
            setSearching(false);
        }, 500);
    }, [sortByStatus]);

    useEffect(() => {
        let tempProjects = [...projects];

        if (searchTerm) {
            tempProjects = tempProjects.filter(
                (project) =>
                    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.sponsor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.number.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortByStatus) {
            tempProjects = tempProjects.filter((item) => item.status === sortByStatus);
        }

        setFilteredProjects(tempProjects);
    }, [projects, searchTerm, sortByStatus]);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const updateURL = useCallback((search: string, status: string, page: number) => {
        const searchParams = new URLSearchParams();
        if (search) searchParams.set("search", search);
        if (status) searchParams.set("status", status);
        if (page) searchParams.set("page", page.toString());

        router.push(`?${searchParams.toString()}`);
    }, [router]);

    const handleSortByStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortByStatus(e.target.value);
        updateURL(searchTerm, e.target.value, 1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateURL(searchTerm, sortByStatus, page);
    };

    return (
        <Box py={8}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="blue.600">
                    Projects
                </Heading>

                <Stack mb={6} direction={{ base: "column", md: "row" }} spacing={4}>
                    <Input
                        placeholder="Search by title, project number, sponsor"
                        value={searchTerm}
                        onChange={handleSearch}
                        bg="white"
                        borderColor="gray.300"
                        color="gray.700"
                    />
                    <Select
                        placeholder="Sort by Status"
                        value={sortByStatus}
                        onChange={handleSortByStatus}
                        bg="white"
                        borderColor="gray.300"
                        color="gray.700"
                    >
                        <option value="ongoing" style={{ color: "black" }}>
                            Ongoing
                        </option>
                        <option value="completed" style={{ color: "black" }}>
                            Completed
                        </option>
                    </Select>
                </Stack>

                {searching && (
                    <Box textAlign="center" py={6}>
                        <Spinner size="xl" color="blue.500" />
                    </Box>
                )}

                {/* Projects */}
                {!searching && filteredProjects.length > 0 && (
                    <Box>
                        {currentProjects.length > 0 ? (
                            <Stack spacing={6}>
                                {currentProjects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            hidden: { opacity: 0, y: 50 },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                transition: { duration: 0.5 },
                                            },
                                        }}
                                    >
                                        <ProjectCard project={project} />
                                    </motion.div>
                                ))}
                            </Stack>
                        ) : (
                            <Box textAlign="center" py={6}>
                                <Text color="gray.700">No projects found for this search.</Text>
                            </Box>
                        )}

                        <Stack mt={8} direction="row" spacing={4} justify="center">
                            {currentPage > 1 && (
                                <Button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    colorScheme="blue"
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
                                    colorScheme="blue"
                                >
                                    Next
                                </Button>
                            )}
                        </Stack>
                    </Box>
                )}

                {/* No Projects Found */}
                {!searching && filteredProjects.length === 0 && (
                    <Text textAlign="center" py={6}>
                        No results found.
                    </Text>
                )}
            </Container>
        </Box>
    );
};

export default Projects;
