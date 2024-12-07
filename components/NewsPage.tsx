/** @format */
"use client";

import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Container,
    Heading,
    Input,
    Stack,
    Text,
    Button,
    Center,
    Spinner,
    LinkBox,
    LinkOverlay,
    Flex,
    useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useRouter, useSearchParams } from "next/navigation";
import newsData from "@/data/news.json";

interface NewsItem {
    date: string;
    title: string;
    description: string;
    link: string;
}

const News: React.FC = () => {

    const bgColor = useColorModeValue("white", "gray.700")
    const headingColor = useColorModeValue("yellow.600", "whiteAlpha.900");
    const inputBg = useColorModeValue("white", "gray.600");
    const inputBorder = useColorModeValue("gray.200", "gray.500");
    const placeHolderColor = useColorModeValue("gray.500", "whiteAlpha.700")
    const cardBgColor = useColorModeValue("white", "gray.600");
    const cardHeading = useColorModeValue("yellow.600", "whiteAlpha.800")
    const textCol = useColorModeValue("gray.500", "gray.400")

    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("q") || "");
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
    const [debouncing, setDebouncing] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(
        parseInt(searchParams.get("page") || "1", 10)
    );
    const newsPerPage = 10;
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    // Sort news by most recent date
    const sortedNews: NewsItem[] = newsData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Filter news based on search term with debouncing
    useEffect(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        setDebouncing(true);

        debounceTimer.current = setTimeout(() => {
            const filtered = sortedNews.filter((news) =>
                news.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setFilteredNews(filtered);
            setCurrentPage(1); // Reset to the first page
            setDebouncing(false);

            // Update the URL with the search query and reset page to 1
            const params = new URLSearchParams();
            if (searchTerm) params.set("q", searchTerm);
            params.set("page", "1");
            router.replace(`?${params.toString()}`);
        }, 500);

        // Clean up debounce timer on unmount
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [searchTerm, sortedNews, router]);

    // Load search term and page from URL on initial render
    useEffect(() => {
        const query = searchParams.get("q");
        const page = parseInt(searchParams.get("page") || "1", 10);

        if (query) setSearchTerm(query);
        if (page) setCurrentPage(page);
    }, [searchParams]);

    // Pagination Logic
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
    const totalPages = Math.ceil(filteredNews.length / newsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);

        window.scrollTo({ top: 0, behavior: "smooth" });

        // Update the URL with the new page number
        const params = new URLSearchParams();
        if (searchTerm) params.set("q", searchTerm);
        params.set("page", page.toString());
        router.replace(`?${params.toString()}`);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Box py={20} minH={"100%"} bgColor={bgColor}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color={headingColor}>
                    News & Updates
                </Heading>

                {/* Search input */}
                <Stack mb={6} spacing={4}>
                    <Input
                        placeholder="Search news by title"
                        value={searchTerm}
                        onChange={handleSearch}
                        bg={inputBg}
                        borderColor={inputBorder}
                        _placeholder={{ color: placeHolderColor }}
                    />
                </Stack>

                {debouncing ? (
                    <Center py={10}>
                        <Spinner size="xl" color="yellow.500" />
                    </Center>
                ) : currentNews.length > 0 ? (
                    <Stack spacing={3}>
                        {currentNews.map((news, index) => (
                            <LinkBox
                                key={index}
                                as="article"
                                p={5}
                                shadow="md"
                                borderWidth="1px"
                                borderRadius="md"
                                bg={cardBgColor}
                                _hover={{ shadow: "lg", transform: "translateY(-5px)" }}
                                transition="all 0.3s ease"
                                cursor={news.link ? "pointer" : "default"}
                            >
                                <Flex justify="space-between" align="center" mb={2}>
                                    <Text fontWeight="bold" color={textCol} fontSize="md">
                                        {new Date(news.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })} :: {news.title}
                                    </Text>
                                </Flex>

                                <Text color={cardHeading} fontSize="lg" fontWeight="bold">
                                    {news.link ? (
                                        <LinkOverlay href={news.link} isExternal>
                                            {news.description} <ExternalLinkIcon mx="2px" />
                                        </LinkOverlay>
                                    ) : (
                                        news.description
                                    )}
                                </Text>
                                {/* <Text color="gray.600">{news.description}</Text> */}
                            </LinkBox>
                        ))}
                    </Stack>
                ) : (
                    <Text>No news found</Text>
                )}

                {/* Pagination Controls */}
                <Stack direction="row" justify="center" mt={8}>
                    {currentPage > 1 && (
                        <Button onClick={() => handlePageChange(currentPage - 1)} _hover={{ color: "white", backgroundColor: "primary" }}>Previous</Button>
                    )}
                    <Center>
                        Page {currentPage} of {totalPages}
                    </Center>
                    {currentPage < totalPages && (
                        <Button onClick={() => handlePageChange(currentPage + 1)} _hover={{ color: "white", backgroundColor: "primary" }}>Next</Button>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default News;
