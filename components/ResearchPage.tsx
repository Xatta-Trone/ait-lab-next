/** @format */
"use client";

import React, { useEffect, useState, lazy, Suspense } from "react";
import { Box, Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Spinner } from "@chakra-ui/react";

// Lazy load the components
const Grants = lazy(() => import("@/components/GrantsPage"));
const Projects = lazy(() => import("@/components/ProjectsPage"));

const Research: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    // Set the active tab based on the URL hash on load
    useEffect(() => {
        const hash = window.location.hash;
        if (hash === "#grants") {
            setActiveTab(1);
        } else {
            setActiveTab(0);
        }
    }, []);

    // Update page title based on active tab
    useEffect(() => {
        document.title = activeTab === 0 ? "Research Projects | AIT Lab" : "Research Grants | AIT Lab";
    }, [activeTab]);

    const handleTabChange = (index: number) => {
        setActiveTab(index);
        const hash = index === 0 ? "#projects" : "#grants";
        window.history.replaceState(null, "", hash);
    };

    return (
        <Box py={20}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="blue.600">
                    {activeTab === 0 ? "Research Projects" : "Research Grants"}
                </Heading>

                <Tabs index={activeTab} onChange={handleTabChange}>
                    <TabList mb={4}>
                        <Tab>Projects</Tab>
                        <Tab>Grants</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            {activeTab === 0 && (
                                <Suspense fallback={<Spinner size="xl" color="blue.500" />}>
                                    <Projects />
                                </Suspense>
                            )}
                        </TabPanel>
                        <TabPanel>
                            {activeTab === 1 && (
                                <Suspense fallback={<Spinner size="xl" color="blue.500" />}>
                                    <Grants />
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
