"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Box, Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Spinner } from "@chakra-ui/react";
import ProjectsAndGrants from "./ProjectsAndGrants";

const Research: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    // Function to handle tab change and update the active tab
    const handleTabChange = (index: number) => {
        setActiveTab(index);
    };

    // Check URL hash and query parameters to set the active tab
    useEffect(() => {
        document.title = "Projects And Grants | AIT Lab";
        const hash = window.location.hash;

        // Handle tab selection based on URL hash
        if (hash === "#pi-co-pi") {
            setActiveTab(0); // Select PI/Co-PI tab
        } else if (hash === "#key-researcher") {
            setActiveTab(1); // Select Key Researcher tab
        } else {
            // Default to PI/Co-PI if no hash is present
            setActiveTab(0);
        }
    }, []);

    return (
        <Box py={20}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="yellow.600">
                    Projects And Grants
                </Heading>

                <Tabs index={activeTab} onChange={handleTabChange} colorScheme="yellow">
                    <TabList mb={4}>
                        <Tab>PI/Co-PI</Tab>
                        <Tab>Key Researcher</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            {activeTab === 0 && (
                                <Suspense fallback={<Spinner size="xl" color="yellow.500" />}>
                                    {/* Assign a unique key based on the active tab */}
                                    <ProjectsAndGrants key={`tab-${activeTab}`} role="PI/Co-PI" />
                                </Suspense>
                            )}
                        </TabPanel>
                        <TabPanel>
                            {activeTab === 1 && (
                                <Suspense fallback={<Spinner size="xl" color="yellow.500" />}>
                                    {/* Assign a unique key based on the active tab */}
                                    <ProjectsAndGrants key={`tab-${activeTab}`} role="Key Researcher" />
                                </Suspense>
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </Box>
    );
};

export default Research;
