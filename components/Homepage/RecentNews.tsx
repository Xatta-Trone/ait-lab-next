import React from "react";
import {
    Box,
    Heading,
    Stack,
    Text,
    Link,
    Container,
    Button,
    Flex,
} from "@chakra-ui/react";
import { HiExternalLink } from "react-icons/hi";
import newsData from "@/data/news.json"; // Adjust the import path as needed

const RecentNews = () => {
    // Get the four most recent news items and parse dates for sorting
    const recentNewsItems = newsData
        .map((item) => ({
            ...item,
            date: new Date(item.date),
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 4);

    return (
        <Box pb={20} pt={"20"} bg="gray.50" position={"relative"}>
            <Container maxW="container.xl">
                <Heading as="h2" size="lg" textAlign="center" color="blue.600" marginBottom={"20"} style={{ fontSize: "var(--chakra-fontSizes-5xl)" }}>
                    Recent News
                </Heading>
                <Stack spacing={4} mt={10}>
                    {recentNewsItems.map((item, index) => (
                        <Box
                            key={index}
                            p={6}
                            bg="white"
                            borderRadius="md"
                            shadow="md"
                            _hover={{ shadow: "lg", transform: "translateY(-5px)" }}
                            transition="all 0.3s ease"
                        >
                            {/* Title */}
                            <Text fontWeight="bold" fontSize="lg" color="blue.600" mb={2}>
                                {item.title}
                            </Text>

                            {/* Description */}
                            <Text fontSize="md" color="gray.700" mb={3}>
                                {item.description}
                            </Text>

                            {/* Date */}
                            <Text fontSize="sm" color="gray.500" mb={4}>
                                {item.date.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </Text>

                            {/* "Read More" button if link exists */}
                            {item.link && (
                                <Link href={item.link} isExternal>
                                    <Button
                                        rightIcon={<HiExternalLink />}
                                        variant="outline"
                                        _hover={{ color: "white", backgroundColor: "blue.600" }}
                                    >
                                        Read More
                                    </Button>
                                </Link>
                            )}
                        </Box>
                    ))}
                </Stack>
            </Container>


            <Box position="absolute" bottom={-10} w={"100%"} overflowX={"hidden"} zIndex={1} className="custom-shape-divider-bottom-1730319297">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </Box>

        </Box >
    );
};

export default RecentNews;
