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
import talksData from "@/data/talk.json";

const Talk = () => {
    // Set dynamic page title
    useEffect(() => {
        document.title = "Talks | AIT Lab";
    }, []);

    // Access the items array and sort by year in descending order  
    const sortedTalks = talksData.items.sort((a, b) => b.year - a.year);

    return (
        <Box py={20}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="yellow.600">
                    Talks & Media
                </Heading>

                {/* List of talks */}
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
                            _hover={{ shadow: "lg", transform: "translateY(-5px)" }}
                            transition="all 0.3s ease"
                            cursor={talk.link ? "pointer" : "default"} // If there is a link, make the cursor pointer
                        >
                            <Flex justify="space-between" align="center" mb={2}>
                                {/* Badge for the group */}
                                <Badge
                                    variant="solid"
                                    colorScheme={talk.group === "media" ? "blackAlpha" : "gray"}
                                    fontSize="md"
                                >
                                    {talk.group}
                                </Badge>

                                {/* Year */}
                                <Text fontWeight="bold" color="gray.500" fontSize="md">
                                    {talk.year}
                                </Text>
                            </Flex>

                            {/* Content and optional link */}
                            <Text color="gray.700" fontSize="lg">
                                {talk.link ? (
                                    <LinkOverlay href={talk.link} isExternal>
                                        {talk.content} <ExternalLinkIcon mx="2px" />
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
    );
};

export default Talk;
