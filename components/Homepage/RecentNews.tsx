/** @format */
"use client";

import React, { useRef, useEffect } from "react";
import {
    Box,
    Heading,
    Stack,
    Text,
    Container,
    Button,
    Link as ChakraLink,
    LinkBox,
    Flex,
    LinkOverlay,
} from "@chakra-ui/react";
import { HiExternalLink } from "react-icons/hi";
import newsData from "@/data/news.json"; // Adjust the import path as needed
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";

// Animation variants for staggered effect
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Staggering each child animation
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Start off-screen (down)
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const RecentNews = () => {
    useEffect(() => {
        document.title = "Recent News | Your Site Name"; // Set dynamic page title
    }, []);

    // Get the four most recent news items and parse dates for sorting
    const recentNewsItems = newsData
        .map((item) => ({
            ...item,
            date: new Date(item.date),
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 5);

    return (
        <Box pb={40} pt={"20"} bg="yellow.50" position={"relative"}>
            <Container maxW="container.xl" px={{ base: "10", md: "10" }}>
                <Heading
                    as="h2"
                    size="lg"
                    textAlign="center"
                    color="yellow.600"
                    marginBottom={"20"}
                    fontSize={{ base: "4xl", md: "5xl" }}
                >
                    Recent News
                </Heading>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }} // Trigger animation when 10% of the container is in view
                >
                    <Stack spacing={6} my={10}>
                        {recentNewsItems.map((news, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
                            >
                                <LinkBox
                                    key={index}
                                    as="article"
                                    p={5}
                                    shadow="md"
                                    borderWidth="1px"
                                    borderRadius="md"
                                    bg="white"
                                    transition="all 0.3s ease"
                                    cursor={news.link ? "pointer" : "default"}
                                >
                                    <Flex justify="space-between" align="center" mb={2}>
                                        <Text fontWeight="bold" color="gray.500" fontSize="md">
                                            {new Date(news.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })} :: {news.title}
                                        </Text>
                                    </Flex>

                                    <Text color="yellow.600" fontSize="lg" fontWeight="bold">
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
                            </motion.div>
                        ))}
                    </Stack>
                </motion.div>

                <Box textAlign={"center"}>
                    <Link href="/news">
                        <Button
                            variant="solid"
                            width="fit-content"
                            alignContent="center"
                            size="lg"
                            _hover={{ bg: "yellow.500", color: "white" }}
                        >
                            All News
                        </Button>
                    </Link>
                </Box>
            </Container>

            <Box
                position="absolute"
                bottom={0}
                w={"100%"}
                overflowX={"hidden"}
                zIndex={1}
                className="custom-shape-divider-bottom-1730319297"
            >
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
                        className="shape-fill"
                    ></path>
                </svg>
            </Box>
        </Box>
    );
};

export default RecentNews;
