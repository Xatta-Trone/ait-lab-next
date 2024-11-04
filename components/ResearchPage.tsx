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
        document.title = activeTab === 0 ? "Research Projects | AIT Lab" : "Research Grants | AIT Lab";
    }, [activeTab]);

    return (
        <Box py={20}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="blue.600">
                    {activeTab === 0 ? "Research Projects" : "Research Grants"}
                </Heading>

                <Tabs variant="soft-rounded" colorScheme="blue" onChange={(index) => setActiveTab(index)}>
                    <TabList mb={4}>
                        <Tab>Projects</Tab>
                        <Tab>Grants</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Projects />
                        </TabPanel>
                        <TabPanel>
                            <Grants />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </Box>
    );
};

export default Research;
