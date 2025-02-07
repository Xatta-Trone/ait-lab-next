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
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const toolsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);

  // Add new state and ref
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  /**
   * Updates the URL query parameters whenever the search term changes.
   */
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    router.push(`?${params.toString()}`);
  }, [router, searchTerm]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  /**
   * Handles the search input, updates the search term state, and filters tools.
   */
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearching(true);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setDebouncedSearchTerm(value);
      setSearching(false);
    }, 500);
  }, []);

  /**
   * Filters the LabTools data based on the search term.
   * Runs every time the search term changes.
   */
  useEffect(() => {
    let tempTools = [...typedLabToolsData];

    if (debouncedSearchTerm) {
      const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
      tempTools = tempTools.filter(
        (tool) =>
          tool.title.toLowerCase().includes(lowerSearchTerm) ||
          tool.project.toLowerCase().includes(lowerSearchTerm) ||
          tool.description.toLowerCase().includes(lowerSearchTerm)
      );
    }

    setFilteredTools(tempTools);
    setDisplayedTools(tempTools.slice(0, toolsPerPage));
    setHasMore(tempTools.length > toolsPerPage);
    setIsLoading(false);
  }, [debouncedSearchTerm]);

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

  return (
    <Box py={20} minH={"100%"} bgColor={bgColor}>
      <Container maxW="container.xl">
        {/* Page title */}
        <Heading as="h1" size="2xl" mb={6} color={headingColor}>
          AIT Lab Tools
        </Heading>

        {/* Search Input */}
        <Stack mb={6} spacing={4}>
          <Input
            placeholder="Search by title, project, or description"
            value={searchTerm}
            onChange={handleSearch}
            bg={inputBg}
            borderColor={inputBorder}
            _placeholder={{ color: placeHolderColor }}
          />
        </Stack>

        {/* Loading Spinner */}
        {searching || isLoading ? (
          <Center py={10}>
            <Spinner size="xl" color="yellow.500" />
          </Center>
        ) : (
          <Box>
            {/* Tools List */}
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
      </Container>
    </Box>
  );
};

export default LabToolsPage;
