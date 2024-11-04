/** @format */
"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { Box, Container, Input, Select, Stack, Text, Button, Center, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import grantsData from "@/data/grants.json";
import GrantCard from "@/components/GrantCard";
import { useRouter } from "next/navigation";

// Type the imported grants data
const typedGrantsData: GrantTypes[] = grantsData as GrantTypes[];

const Grants: React.FC = () => {
    const router = useRouter();
    const [grants, setGrants] = useState<GrantTypes[]>(typedGrantsData);
    const [filteredGrants, setFilteredGrants] = useState<GrantTypes[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByStatus, setSortByStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncing, setDebouncing] = useState(false); // New state for debouncing
    const grantsPerPage = 15;

    // Create a ref to store the debounce timer
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    // Update URL with hash and query params
    const updateURL = useCallback(() => {
        const queryParams = new URLSearchParams();
        queryParams.set("page", currentPage.toString());
        if (searchTerm) queryParams.set("q", searchTerm);
        if (sortByStatus) queryParams.set("status", sortByStatus);

        // Construct URL with hash and query parameters
        const url = `#grants?${queryParams.toString()}`;
        router.push(url, { scroll: false });
    }, [currentPage, searchTerm, sortByStatus, router]);

    // Handle initial load and URL params
    useEffect(() => {
        const hash = window.location.hash;
        if (hash.startsWith("#grants")) {
            const urlParams = new URLSearchParams(hash.split("?")[1]);
            const page = parseInt(urlParams.get("page") || "1", 10);
            const query = urlParams.get("q") || "";
            const status = urlParams.get("status") || "";

            setCurrentPage(page);
            setSearchTerm(query);
            setSortByStatus(status);
        }
    }, []);

    // Apply search and filter logic
    useEffect(() => {
        let tempGrants = [...grants];

        if (searchTerm) {
            tempGrants = tempGrants.filter((grant) =>
                grant.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortByStatus) {
            tempGrants = tempGrants.filter((grant) => grant.status === sortByStatus);
        }

        setFilteredGrants(tempGrants);
        updateURL();
    }, [grants, searchTerm, sortByStatus, currentPage, updateURL]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setDebouncing(true); // Start debouncing

        // Clear the previous debounce timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set a new debounce timer
        debounceTimer.current = setTimeout(() => {
            setSearchTerm(query);
            setDebouncing(false); // End debouncing
        }, 500); // Delay of 500ms
    };

    const handleSortByStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortByStatus(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Pagination Logic
    const indexOfLastGrant = currentPage * grantsPerPage;
    const indexOfFirstGrant = indexOfLastGrant - grantsPerPage;
    const currentGrants = filteredGrants.slice(indexOfFirstGrant, indexOfLastGrant);
    const totalPages = Math.ceil(filteredGrants.length / grantsPerPage);

    return (
        <Box py={8}>
            <Container maxW="container.xl" >
                <Stack mb={6} direction={{ base: "column", md: "row" }} spacing={4}>
                    <Input
                        placeholder="Search by title"
                        defaultValue={searchTerm}
                        onChange={handleSearch}
                        bg="white"
                        borderColor="gray.300"
                    />
                    <Select
                        placeholder="Sort by Status"
                        value={sortByStatus}
                        onChange={handleSortByStatus}
                        bg="white"
                        borderColor="gray.300"
                    >
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </Select>
                </Stack>

                {debouncing ? (
                    <Center py={10}>
                        <Spinner size="xl" color="yellow.500" />
                    </Center>
                ) : currentGrants.length > 0 ? (
                    <Stack spacing={6}>
                        {currentGrants.map((grant, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <GrantCard grant={grant} />
                            </motion.div>
                        ))}
                    </Stack>
                ) : (
                    <Text>No grants found</Text>
                )}

                <Stack direction="row" justify="center" mt={8}>
                    {currentPage > 1 && (
                        <Button onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
                    )}
                    <Center>
                        Page {currentPage} of {totalPages}
                    </Center>
                    {currentPage < totalPages && (
                        <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default Grants;
