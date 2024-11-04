/** @format */
"use client";

import React, { useState, useEffect, Suspense, lazy } from "react";
import { Box, Container, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import framer-motion for animations
import grantsData from "@/data/grants.json"; // Importing the data directly from the JSON file

// Lazy load the GrantCard component
const GrantCard = lazy(() => import("@/components/GrantCard"));

// Type the imported grants data
const typedGrantsData: GrantTypes[] = grantsData as GrantTypes[];

const Grants: React.FC = () => {
    const [grants, setGrants] = useState<GrantTypes[]>([]); // Set the state type to GrantTypes[]

    // Set initial grants data from JSON and sort by status and recency
    useEffect(() => {
        let sortedGrants = [...typedGrantsData];

        // Sort grants by status ("ongoing" first, then "completed") and by "end_year" (recent first)
        sortedGrants = sortedGrants.sort((a, b) => {
            const statusOrder: { [key: string]: number } = { ongoing: 1, completed: 2 };
            const statusA = statusOrder[a.status.toLowerCase()] || 3;
            const statusB = statusOrder[b.status.toLowerCase()] || 3;

            if (statusA !== statusB) {
                return statusA - statusB;
            }
            return b.end_year - a.end_year;
        });

        setGrants(sortedGrants);
    }, []);

    return (
        <Box py={8}>
            <Container maxW="container.xl">
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
                                    <Suspense fallback={<Text>Loading...</Text>}>
                                        <GrantCard grant={grant} />
                                    </Suspense>
                                </motion.div>
                            ))}
                        </Stack>
                    )}

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
