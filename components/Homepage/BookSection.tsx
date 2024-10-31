"use client"
import React from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    Image,
    Button,
    Link,
    Flex,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const BookSection = () => {
    return (
        <Box pb={20} pt={"20"} bg="gray.50" position={"relative"}>

            <Container maxW="container.xl">
                <Heading as="h2" size="lg" textAlign="center" color="blue.600" marginBottom={"5"} style={{ fontSize: "var(--chakra-fontSizes-5xl)" }}>
                    A New Text Book
                </Heading>

                <Flex
                    direction={{ base: "column", md: "row" }} // Stack on mobile, row on desktop
                    alignItems="center" // Center items vertically
                    justifyContent="space-between" // Space between columns
                >
                    {/* Text Section */}
                    <Box flex="1" pr={{ md: 5 }} mb={{ base: 6, md: 0 }}>
                        <Heading as={"h3"} size={"lg"} mb={5}>Artificial Intelligence in Highway Safety By Dr. Subasish Das</Heading>
                        <Text fontSize="lg" color="gray.700" lineHeight="taller" mb={6}>
                            Artificial Intelligence in Highway Safety provides cutting-edge
                            advances in highway safety using AI. The author is a highway
                            safety expert, drawing attention to the predictive powers of AI
                            techniques in solving complex problems for safety improvement.
                        </Text>

                        {/* Order Button */}
                        <Link
                            href="https://www.routledge.com/Artificial-Intelligence-in-Highway-Safety/Das/p/book/9780367436704"
                            isExternal
                        >
                            <Button
                                size="lg"
                                variant="outline"
                                _hover={{ color: "white", backgroundColor: "blue.600" }}
                                rightIcon={<ExternalLinkIcon />}
                            >
                                Order The Book
                            </Button>
                        </Link>
                    </Box>

                    {/* Image Section */}
                    <Box flexShrink={0}>
                        <Image
                            src="/img/aihs1.png"
                            alt="Artificial Intelligence in Highway Safety"
                            borderRadius="sm"
                            boxSize={{ base: "350px", md: "500px" }} // Responsive image size
                            objectFit="contain"
                        />
                    </Box>
                </Flex>
            </Container>

            <Box position="absolute" bottom={-10} w={"100%"} overflowX={"hidden"} zIndex={1} className="custom-shape-divider-bottom-1730319297">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </Box>

        </Box>
    );
};

export default BookSection;
