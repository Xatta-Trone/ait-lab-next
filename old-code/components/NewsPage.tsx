/** @format */
"use client";

import React, { useEffect, useState, Suspense } from "react";
import {
  Box,
  Container,
  Heading,
  Spinner,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import NewsContainer from "./NewsContainer";

const News: React.FC = () => {
  const bgColor = useColorModeValue("white", "gray.700");
  const headingColor = useColorModeValue("yellow.600", "whiteAlpha.900");

  const [activeTab, setActiveTab] = useState(0);

  // Function to handle tab change and update the active tab
  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  // Check URL hash and query parameters to set the active tab
  useEffect(() => {
    document.title =
      "News - Artificial Intelligence in Transportation Lab (AIT Lab)";
    const hash = window.location.hash;

    // Handle tab selection based on URL hash
    if (hash === "#alert") {
      setActiveTab(0);
    } else if (hash === "#papers") {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, []);

  return (
    <Box py={20} minH={"100vh"} bgColor={bgColor}>
      <Container maxW="container.xl">
        <Heading as="h1" size="2xl" mb={6} color={headingColor}>
          News & Updates
        </Heading>

        <Tabs index={activeTab} onChange={handleTabChange} colorScheme="yellow">
          <TabList mb={4}>
            <Tab>Alerts</Tab>
            <Tab>Papers</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {activeTab === 0 && (
                <Suspense fallback={<Spinner size="xl" color="yellow.500" />}>
                  {/* Assign a unique key based on the active tab */}
                  <NewsContainer key={`tab-${activeTab}`} type="alert" />
                </Suspense>
              )}
            </TabPanel>
            <TabPanel>
              {activeTab === 1 && (
                <Suspense fallback={<Spinner size="xl" color="yellow.500" />}>
                  {/* Assign a unique key based on the active tab */}
                  <NewsContainer key={`tab-${activeTab}`} type="all" />
                </Suspense>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default News;
