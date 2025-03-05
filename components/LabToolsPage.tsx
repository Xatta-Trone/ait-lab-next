"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Box,
  Container,
  Input,
  Stack,
  Text,
  Spinner,
  Heading,
  Center,
  useColorModeValue,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import LabToolsCard from "./LabToolsCard";
import labToolsData from "@/data/lab_tools.json";

const typedLabToolsData: LabTools[] = labToolsData as LabTools[];

const LabToolsPage: React.FC = () => {
  const bgColor = useColorModeValue("white", "gray.700");
  const headingColor = useColorModeValue("yellow.600", "whiteAlpha.900");
  const inputBg = useColorModeValue("white", "gray.600");
  const inputBorder = useColorModeValue("gray.200", "gray.500");
  const placeHolderColor = useColorModeValue("gray.500", "whiteAlpha.700");
  const textCol = useColorModeValue("gray.500", "gray.400");

  const router = useRouter();
  const searchParams = useSearchParams();

  // State management
  const [filteredTools, setFilteredTools] = useState<LabTools[]>([]);
  const [displayedTools, setDisplayedTools] = useState<LabTools[]>([]);
  const [searching, setSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const toolsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);

  // Update initial state to use URL params
  const initialSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState(initialSearchTerm);

  // Add new state and ref
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Add tab state
  const [selectedTab, setSelectedTab] = useState(0);

  // Initialize tab based on URL hash
  useEffect(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === "#web") {
      setSelectedTab(1);
    } else {
      setSelectedTab(0); // Default to Shiny tools
      if (!hash) {
        window.location.hash = "shiny";
      }
    }
  }, []);

  // Update URL without causing rerender
  const updateURLSilently = useCallback((search: string, tab: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);

    const hash = tab === 0 ? "#shiny" : "#web";
    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}${hash}`
      : `${window.location.pathname}${hash}`;

    window.history.replaceState({ ...window.history.state }, "", newUrl);
  }, []);

  // Set initial search from URL
  useEffect(() => {
    const urlSearchTerm = searchParams.get("search") || "";
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
      setDebouncedSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);

  /**
   * Handles the search input, updates the search term state, and filters tools.
   */
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      setSearching(true);

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        setDebouncedSearchTerm(value);
        setSearching(false);
        updateURLSilently(value, selectedTab);
      }, 500);
    },
    [selectedTab, updateURLSilently]
  );

  /**
   * Filters the LabTools data based on the search term.
   * Runs every time the search term changes.
   */
  useEffect(() => {
    let tempTools = [...typedLabToolsData];

    // Filter by search term
    if (debouncedSearchTerm) {
      const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
      tempTools = tempTools.filter(
        (tool) =>
          tool.title.toLowerCase().includes(lowerSearchTerm) ||
          tool.project.toLowerCase().includes(lowerSearchTerm) ||
          tool.description.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Filter by tool type
    tempTools = tempTools.filter((tool) =>
      selectedTab === 0 ? tool.type === "shiny" : tool.type === "web"
    );

    setFilteredTools(tempTools);
    setDisplayedTools(tempTools.slice(0, toolsPerPage));
    setHasMore(tempTools.length > toolsPerPage);
    setIsLoading(false);
  }, [debouncedSearchTerm, selectedTab]);

  // Add cleanup for debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  /**
   * Loads more tools as the user scrolls.
   */
  const loadMoreTools = () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    setTimeout(() => {
      const nextTools = filteredTools.slice(
        displayedTools.length,
        displayedTools.length + toolsPerPage
      );

      setDisplayedTools((prev) => [...prev, ...nextTools]);
      setHasMore(
        displayedTools.length + nextTools.length < filteredTools.length
      );
      setIsLoadingMore(false);
    }, 500);
  };

  // Handle tab change
  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    setIsLoading(true);
    // Reset displayed tools when changing tabs
    setDisplayedTools([]);
    updateURLSilently(searchTerm, index);
  };

  return (
    <Box py={20} minH={"100%"} bgColor={bgColor}>
      <Container maxW="container.xl">
        <Heading as="h1" size="2xl" mb={6} color={headingColor}>
          AIT Lab Tools
        </Heading>

        <Tabs
          variant="line"
          onChange={handleTabChange}
          mb={6}
          index={selectedTab}
        >
          <TabList mb="1em">
            <Tab _selected={{ color: "yellow.500", borderColor: "yellow.500" }}>
              Shiny Tools
            </Tab>
            <Tab _selected={{ color: "yellow.500", borderColor: "yellow.500" }}>
              Web Tools
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              {/* Search Input */}
              <Stack mb={6} spacing={4}>
                <Input
                  placeholder="Search Shiny tools"
                  value={searchTerm}
                  onChange={handleSearch}
                  bg={inputBg}
                  borderColor={inputBorder}
                  _placeholder={{ color: placeHolderColor }}
                />
              </Stack>

              {/* Tools List */}
              {searching || isLoading ? (
                <Center py={10}>
                  <Spinner size="xl" color="yellow.500" />
                </Center>
              ) : (
                <Box>
                  {displayedTools.length > 0 ? (
                    <Stack spacing={6}>
                      {displayedTools.map((tool, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <LabToolsCard {...tool} />
                        </motion.div>
                      ))}
                    </Stack>
                  ) : (
                    <Text textAlign={"center"} color={textCol}>
                      No tools found
                    </Text>
                  )}

                  {!searching && hasMore ? (
                    <Center py={6}>
                      <Button
                        onClick={loadMoreTools}
                        variant="solid"
                        size="md"
                        _hover={{ bg: "yellow.500", color: "white" }}
                      >
                        {isLoadingMore && (
                          <Center py={6} mr={2}>
                            <Spinner color="white" />
                          </Center>
                        )}
                        See More
                      </Button>
                    </Center>
                  ) : (
                    <Text align={"center"} color={textCol} mt={6}>
                      End of list.
                    </Text>
                  )}
                </Box>
              )}
            </TabPanel>

            <TabPanel p={0}>
              {/* Search Input */}
              <Stack mb={6} spacing={4}>
                <Input
                  placeholder="Search Web tools"
                  value={searchTerm}
                  onChange={handleSearch}
                  bg={inputBg}
                  borderColor={inputBorder}
                  _placeholder={{ color: placeHolderColor }}
                />
              </Stack>

              {/* Tools List */}
              {searching || isLoading ? (
                <Center py={10}>
                  <Spinner size="xl" color="yellow.500" />
                </Center>
              ) : (
                <Box>
                  {displayedTools.length > 0 ? (
                    <Stack spacing={6}>
                      {displayedTools.map((tool, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <LabToolsCard {...tool} />
                        </motion.div>
                      ))}
                    </Stack>
                  ) : (
                    <Text textAlign={"center"} color={textCol}>
                      No tools found
                    </Text>
                  )}

                  {!searching && hasMore ? (
                    <Center py={6}>
                      <Button
                        onClick={loadMoreTools}
                        variant="solid"
                        size="md"
                        _hover={{ bg: "yellow.500", color: "white" }}
                      >
                        {isLoadingMore && (
                          <Center py={6} mr={2}>
                            <Spinner color="white" />
                          </Center>
                        )}
                        See More
                      </Button>
                    </Center>
                  ) : (
                    <Text align={"center"} color={textCol} mt={6}>
                      End of list.
                    </Text>
                  )}
                </Box>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default LabToolsPage;
