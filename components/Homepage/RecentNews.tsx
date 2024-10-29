import React from "react";
import { Box, Heading, Stack, Text, Link, Container, Button } from "@chakra-ui/react";
import { HiExternalLink } from "react-icons/hi";
import newsData from "@/data/news.json"; // Adjust the import path as needed

const RecentNews = () => {
    // Get the four most recent news items
    const recentNewsItems = newsData.slice(0, 4); // Assuming the newsData is sorted by date in descending order

    return (
        <Box py={20} bg="gray.50">
            <Container maxW={"container.xl"}>
                <Heading as="h2" size="lg" textAlign="center" color={"blue.600"} mb={10}>
                    Recent News
                </Heading>
                <Stack spacing={4} mt={10}>
                    {recentNewsItems.map((item, index) => (
                        <Box key={index} p={4} bg="white" borderRadius="md" shadow="md">
                            <Text fontWeight="bold" color="blue.600">
                                {item.title}
                            </Text>
                            <Text fontSize="md" color="gray.700" mb={1}>
                                {item.description} {/* Brief description of the news */}
                            </Text>
                            <Text fontSize="sm" color="gray.500" mb={2}>
                                {item.date}
                            </Text>

                            {/* Conditional rendering of the button */}
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
        </Box>
    );
};

export default RecentNews;
