/** @format */
"use client"; // Enables client-side rendering for this component

import React, { useEffect } from "react";
import Head from "next/head"; // Import Head for managing metadata
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
import { ExternalLinkIcon } from "@chakra-ui/icons"; // Icon for external links
import talksData from "@/data/talk.json"; // Import talks data

const Talk = () => {
    // Dynamically set the document title when the component mounts
    useEffect(() => {
        document.title = "Talks | AIT Lab";
    }, []);

    // Sort talks data by year in descending order
    const sortedTalks = talksData.items.sort((a, b) => b.year - a.year);

    return (
        <>
            {/* Metadata for SEO and social sharing */}
            <Head>
                <title>Talks & Media | AIT Lab</title>
                <meta
                    name="description"
                    content="Explore the latest talks and media appearances by AIT Lab and Dr. Subasish Das, featuring discussions on artificial intelligence, transportation safety, and spatiotemporal modeling."
                />
                <meta
                    name="keywords"
                    content="AIT Lab Talks, Media Appearances, Dr. Subasish Das, AI Talks, Transportation Safety, Spatiotemporal Modeling"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://ait-lab.vercel.app/talks" />
                <meta name="theme-color" content="#b7791f" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="Talks & Media | AIT Lab" />
                <meta
                    property="og:description"
                    content="Discover talks and media features by AIT Lab and Dr. Subasish Das, exploring AI, transportation safety, and advanced research."
                />
                <meta property="og:url" content="https://ait-lab.vercel.app/talks" />
                <meta property="og:site_name" content="AIT Lab" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:image" content="/logo_big_black.png" />
                <meta property="og:image:alt" content="AIT Lab Logo" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Talks & Media | AIT Lab" />
                <meta
                    name="twitter:description"
                    content="Stay updated with AIT Lab's latest talks and media features on AI and transportation safety."
                />
                <meta name="twitter:image" content="/logo_big_black.png" />
            </Head>

            {/* Page Content */}
            <Box py={20}>
                <Container maxW="container.xl">
                    {/* Main Heading */}
                    <Heading as="h1" size="2xl" mb={6} color="yellow.600">
                        Talks & Media
                    </Heading>

                    {/* List of Talks */}
                    <Stack spacing={3}>
                        {sortedTalks.map((talk, index) => (
                            <LinkBox
                                key={index}
                                as="article"
                                p={5}
                                shadow="md"
                                borderWidth="1px"
                                borderRadius="md"
                                bg="white"
                                _hover={{ shadow: "lg", transform: "translateY(-5px)" }} // Hover effect for elevation
                                transition="all 0.3s ease"
                                cursor={talk.link ? "pointer" : "default"} // Cursor changes if there's a link
                            >
                                {/* Flex container for group and year */}
                                <Flex justify="space-between" align="center" mb={2}>
                                    {/* Badge for group type */}
                                    <Badge
                                        variant="solid"
                                        colorScheme={talk.group === "media" ? "blackAlpha" : "gray"}
                                        fontSize="md"
                                    >
                                        {talk.group}
                                    </Badge>

                                    {/* Year of the talk */}
                                    <Text fontWeight="bold" color="gray.500" fontSize="md">
                                        {talk.year}
                                    </Text>
                                </Flex>

                                {/* Content of the talk with optional link */}
                                <Text color="gray.700" fontSize="lg">
                                    {talk.link ? (
                                        <LinkOverlay href={talk.link} isExternal>
                                            {talk.content} <ExternalLinkIcon mx="2px" /> {/* External link icon */}
                                        </LinkOverlay>
                                    ) : (
                                        talk.content
                                    )}
                                </Text>
                            </LinkBox>
                        ))}
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default Talk; // Export the Talk component
