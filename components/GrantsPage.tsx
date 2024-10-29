/** @format */
"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import framer-motion for animations
import grantsData from "@/data/grants.json"; // Importing the data directly from the JSON file
import GrantCard from "@/components/GrantCard"; // Import the GrantCard component

// Type the imported grants data
const typedGrantsData: GrantTypes[] = grantsData as GrantTypes[];

const Grants: React.FC = () => {
    const [grants, setGrants] = useState<GrantTypes[]>([]); // Set the state type to GrantTypes[]

    // Set initial grants data from JSON and sort by status and recency
    useEffect(() => {
        // Set dynamic page title
        // document.title = "Research Grants | AIT Lab";

        let sortedGrants = [...typedGrantsData];

        // Sort grants by status ("ongoing" first, then "completed") and by "end_year" (recent first)
        sortedGrants = sortedGrants.sort((a, b) => {
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

        setGrants(sortedGrants);
    }, []);

    return (
        <Box py={8}>
            <Container maxW="container.xl">
                <Heading as="h2" size="xl" mb={6} color="blue.600">
                    Research Grants
                </Heading>

                {/* Grants */}
                <Box>
                    {grants.length > 0 && (
                        <Stack spacing={6}>
                            {grants.map((grant, index) => (
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
                                    <GrantCard grant={grant} /> {/* Assuming GrantCard accepts a grant prop of type GrantTypes */}
                                </motion.div>
                            ))}
                        </Stack>
                    )}

                    {/* No Grants Found */}
                    {grants.length === 0 && (
                        <Box textAlign="center" py={6}>
                            <Text color="gray.700">No grants found</Text>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default Grants;
