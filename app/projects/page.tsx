/** @format */
"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import framer-motion for animations
import projectsData from "@/data/projects.json"; // Importing the data directly from the JSON file
import ProjectCard from "@/components/ProjectCard"; // Import the ProjectCard component

// Type the imported projects data
const typedProjectsData: ProjectTypes[] = projectsData as ProjectTypes[];

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<ProjectTypes[]>([]); // Set the state type to ProjectTypes[]

    // Set initial projects data from JSON and sort by status and recency
    useEffect(() => {
        // Set dynamic page title
        document.title = "Research Grants | AIT Lab";

        let sortedProjects = [...typedProjectsData];

        // Sort projects by status ("ongoing" first, then "completed") and by "end_year" (recent first)
        sortedProjects = sortedProjects.sort((a, b) => {
            // Prioritize by status: "ongoing" first, then "completed"
            const statusOrder: { [key: string]: number } = { ongoing: 1, completed: 2 };

            // Compare by status first
            const statusA = statusOrder[a.status.toLowerCase()] || 3;
            const statusB = statusOrder[b.status.toLowerCase()] || 3;

            if (statusA !== statusB) {
                return statusA - statusB;
            }

            // If statuses are the same, sort by end_year (most recent first)
            return b.end_year - a.end_year;
        });

        setProjects(sortedProjects);
    }, []);

    return (
        <Box py={8}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="blue.600">
                    Research Grants
                </Heading>

                {/* Projects */}
                <Box>
                    {projects.length > 0 && (
                        <Stack spacing={6}>
                            {projects.map((project, index) => (
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
                                    <ProjectCard project={project} /> {/* Assuming ProjectCard accepts a project prop of type ProjectTypes */}
                                </motion.div>
                            ))}
                        </Stack>
                    )}

                    {/* No Projects Found */}
                    {projects.length === 0 && (
                        <Box textAlign="center" py={6}>
                            <Text color="gray.700">No projects found</Text>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default Projects;
