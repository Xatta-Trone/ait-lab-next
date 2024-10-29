/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Grants from "@/components/GrantsPage";
import Projects from "@/components/ProjectsPage";

const Research: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    // Update page title based on active tab
    useEffect(() => {
        document.title = activeTab === 0 ? "Research Grants | AIT Lab" : "Projects | AIT Lab";
    }, [activeTab]);

    return (
        <Box py={8}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="blue.600">
                    Research
                </Heading>

                <Tabs variant="soft-rounded" colorScheme="blue" onChange={(index) => setActiveTab(index)}>
                    <TabList mb={4}>
                        <Tab>Grants</Tab>
                        <Tab>Projects</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Grants />
                        </TabPanel>
                        <TabPanel>
                            <Projects />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </Box>
    );
};

export default Research;
