/** @format */
"use client";

import React, { useEffect } from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    Badge,
    LinkBox,
    LinkOverlay,
    Stack,
    Flex,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons"; // Import the external link icon
import newsData from "@/data/news.json"; // Import your news data

const News = () => {
    // Set dynamic page title
    useEffect(() => {
        document.title = "News | AIT Lab";
    }, []);

    // Parse dates and sort news by most recent date
    const sortedNews = newsData
        .map((item) => ({
            ...item,
            date: new Date(item.date),
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime());


    return (
        <Box py={20}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="blue.600">
                    News & Updates
                </Heading>

                {/* List of news */}
                <Stack spacing={3}>
                    {sortedNews.map((news, index) => (
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
                            cursor={news.link ? "pointer" : "default"} // If there is a link, make the cursor pointer
                        >
                            <Flex justify="space-between" align="center" mb={2}>
                                {/* Badge for News */}
                                {/* <Badge variant="solid" colorScheme="teal" fontSize="md">
                                    News
                                </Badge> */}

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
                            <Text color="blue.600" fontSize="lg" fontWeight="bold">
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
            </Container>
        </Box>
    );
};

export default News;
