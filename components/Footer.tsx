/** @format */

import { Box, Text, Link, Stack, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FaGoogleScholar, FaResearchgate } from "react-icons/fa6"; // Import from fa6

export default function Footer() {
    const bgColor = useColorModeValue("gray.700", "gray.800");

    return (
        <Box as="footer" bg={bgColor} color="white" py={6} borderTop={"2px"}>
            <Stack
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align="center"
                maxW="container.xl"
                mx="auto"
                px={4}
                spacing={6}
            >
                {/* Footer Links with Icons */}
                <Stack direction="row" spacing={6}>
                    <Link href="mailto:subasish@txstate.edu" isExternal fontSize="2xl">
                        <Icon as={FaEnvelope} mr={2} color="white" />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/subasishdas/"
                        isExternal
                        fontSize="2xl"
                    >
                        <Icon as={FaLinkedin} mr={2} color="white" />
                    </Link>
                    <Link href="https://github.com/subasish" isExternal fontSize="2xl">
                        <Icon as={FaGithub} mr={2} color="white" />
                    </Link>
                    <Link
                        href="https://scholar.google.com/citations?user=qK-YgxAAAAAJ&hl=en"
                        isExternal
                        fontSize="2xl"
                    >
                        <Icon as={FaGoogleScholar} mr={2} color="white" />
                    </Link>
                    <Link
                        href="https://www.researchgate.net/profile/Subasish_Das"
                        isExternal
                        fontSize="2xl"
                    >
                        <Icon as={FaResearchgate} mr={2} color="white" />
                    </Link>
                </Stack>

                {/* Copyright Information */}
                <Text fontSize="xl" color={"gray.400"} textAlign={{ base: "center", md: "right" }}>
                    &copy; {new Date().getFullYear()} AIT Lab. All rights reserved.
                </Text>
            </Stack>
        </Box>
    );
}
