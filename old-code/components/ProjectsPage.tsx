/** @format */
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Container, Input, Select, Stack, Text, Button, Center, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import projectsData from "@/data/projects.json";
import ProjectCard from "@/components/ProjectCard";
import { useRouter } from "next/navigation";

// Type the imported projects data
const typedProjectsData: ProjectTypes[] = projectsData as ProjectTypes[];

const Projects: React.FC = () => {
    const router = useRouter();
    const [projects, setProjects] = useState<ProjectTypes[]>(typedProjectsData);
    const [filteredProjects, setFilteredProjects] = useState<ProjectTypes[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByStatus, setSortByStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncing, setDebouncing] = useState(false); // New state to track if debouncing is active
    const projectsPerPage = 15;

    // Create a ref to store the debounce timer
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const updateURL = useCallback(() => {
        const queryParams = new URLSearchParams();
        queryParams.set("page", currentPage.toString());
        if (searchTerm) queryParams.set("q", searchTerm);
        if (sortByStatus) queryParams.set("status", sortByStatus);

        const url = `#projects?${queryParams.toString()}`;
        router.push(url, { scroll: false });
    }, [currentPage, searchTerm, sortByStatus, router]);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash.startsWith("#projects")) {
            const urlParams = new URLSearchParams(hash.split("?")[1]);
            const page = parseInt(urlParams.get("page") || "1", 10);
            const query = urlParams.get("q") || "";
            const status = urlParams.get("status") || "";

            setCurrentPage(page);
            setSearchTerm(query);
            setSortByStatus(status);
        }
    }, []);

    useEffect(() => {
        let tempProjects = [...projects];

        if (searchTerm) {
            tempProjects = tempProjects.filter(
                (project) =>
                    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.sponsor.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortByStatus) {
            tempProjects = tempProjects.filter((project) => project.status === sortByStatus);
        }

        setFilteredProjects(tempProjects);
        updateURL();
    }, [projects, searchTerm, sortByStatus, currentPage, updateURL]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setDebouncing(true); // Start debouncing

        // Clear the previous debounce timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set a new debounce timer
        debounceTimer.current = setTimeout(() => {
            setSearchTerm(query);
            setDebouncing(false); // End debouncing
        }, 500); // Delay of 500ms
    };

    const handleSortByStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortByStatus(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    return (
        <Box py={8}>
            <Container maxW="container.xl">
                <Stack mb={6} direction={{ base: "column", md: "row" }} spacing={4}>
                    <Input
                        placeholder="Search by title or sponsor"
                        defaultValue={searchTerm}
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
                ) : currentProjects.length > 0 ? (
                    <Stack spacing={6}>
                        {currentProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </Stack>
                ) : (
                    <Text>No projects found</Text>
                )}

                <Stack direction="row" justify="center" mt={8}>
                    {currentPage > 1 && (
                        <Button onClick={() => handlePageChange(currentPage - 1)} _hover={{ color: "white", backgroundColor: "primary" }}>Previous</Button>
                    )}
                    <Center>
                        Page {currentPage} of {totalPages}
                    </Center>
                    {currentPage < totalPages && (
                        <Button onClick={() => handlePageChange(currentPage + 1)} _hover={{ color: "white", backgroundColor: "primary" }}>Next</Button>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default Projects;
