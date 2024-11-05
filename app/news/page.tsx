/** @format */
"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Box,
    Container,
    Input,
    Stack,
    Text,
    Center,
    Spinner,
    Heading,
    LinkBox,
    LinkOverlay,
    Flex,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import newsData from "@/data/news.json"; // Import your news data

// Define the type for a news item
interface NewsItem {
    date: Date;
    title: string;
    description: string;
    link: string;
}

const News: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]); // Use the NewsItem type
    const [debouncing, setDebouncing] = useState<boolean>(false); // State to handle debouncing
    const debounceTimer = useRef<NodeJS.Timeout | null>(null); // Ref to store the debounce timer

    // Set dynamic page title
    useEffect(() => {
        document.title = "News | AIT Lab";
    }, []);

    // Parse dates and sort news by most recent date
    const sortedNews: NewsItem[] = newsData
        .map((item) => ({
            ...item,
            date: new Date(item.date),
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    // Apply search filter
    useEffect(() => {
        let tempNews: NewsItem[] = [...sortedNews];

        if (searchTerm) {
            tempNews = tempNews.filter((news) =>
                news.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredNews(tempNews);
    }, [searchTerm, sortedNews]);

    // Handle search input with debouncing
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setDebouncing(true);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            setSearchTerm(query);
            setDebouncing(false);
        }, 500); // 500ms debounce delay
    };

    return (
        <Box py={20}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="yellow.600">
                    News & Updates
                </Heading>

                {/* Search input */}
                <Stack mb={6} spacing={4}>
                    <Input
                        placeholder="Search news by title"
                        onChange={handleSearch}
                        bg="white"
                        borderColor="gray.300"
                    />
                </Stack>

                {debouncing ? (
                    <Center py={10}>
                        <Spinner size="xl" color="yellow.500" />
                    </Center>
                ) : filteredNews.length > 0 ? (
                    <Stack spacing={3}>
                        {filteredNews.map((news, index) => (
                            <LinkBox
                                key={index}
                                as="article"
                                p={5}
                                shadow="md"
                                borderWidth="1px"
                                borderRadius="md"
                                bg="white"
                                _hover={{ shadow: "lg", transform: "translateY(-5px)" }}
                                transition="all 0.3s ease"
                                cursor={news.link ? "pointer" : "default"}
                            >
                                <Flex justify="space-between" align="center" mb={2}>
                                    {/* Date */}
                                    <Text fontWeight="bold" color="gray.500" fontSize="md">
                                        {news.date.toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </Text>
                                </Flex>

                                {/* Title and description with optional link */}
                                <Text color="yellow.600" fontSize="lg" fontWeight="bold">
                                    {news.link ? (
                                        <LinkOverlay href={news.link} isExternal>
                                            {news.title} <ExternalLinkIcon mx="2px" />
                                        </LinkOverlay>
                                    ) : (
                                        news.title
                                    )}
                                </Text>
                                <Text color="gray.600">{news.description}</Text>
                            </LinkBox>
                        ))}
                    </Stack>
                ) : (
                    <Text>No news found</Text>
                )}
            </Container>
        </Box>
    );
};

export default News;
