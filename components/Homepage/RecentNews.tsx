import React from "react";
import { Box, Heading, Stack, Text, Link, Container } from "@chakra-ui/react";

const RecentNews = () => {
    // Example recent news data, replace this with actual data or fetch from an API
    const newsItems = [
        {
            title: "New Project Launched",
            date: "October 25, 2024",
            link: "/news/new-project-launched",
        },
        {
            title: "Research Collaboration Announcement",
            date: "October 22, 2024",
            link: "/news/research-collaboration",
        },
        {
            title: "Upcoming Workshop on AI",
            date: "October 18, 2024",
            link: "/news/upcoming-workshop-ai",
        },
        {
            title: "Conference Participation",
            date: "October 15, 2024",
            link: "/news/conference-participation",
        },
    ];

    return (
        <Box py={20} bg="gray.50" >
            <Container maxW={"container.xl"}>
                <Heading as="h2" size="lg" textAlign="center" color={"blue.600"} marginX={10}>
                    Recent News
                </Heading>
                <Stack spacing={4} mt={10}>
                    {newsItems.map((item, index) => (
                        <Box key={index} p={4} bg="white" borderRadius="md" shadow="md">
                            <Link href={item.link} isExternal>
                                <Text fontWeight="bold" color="blue.600">
                                    {item.title}
                                </Text>
                            </Link>
                            <Text fontSize="sm" color="gray.500">
                                {item.date}
                            </Text>
                        </Box>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default RecentNews;
