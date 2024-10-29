import React from "react";
import { Box, Heading, Stack, Text, Link, Container, Icon, Button } from "@chakra-ui/react";
import { HiExternalLink } from "react-icons/hi";

const RecentNews = () => {
    // Example recent news data, replace this with actual data or fetch from an API
    const newsItems = [
        {
            title: "New Project Launched",
            description: "We are excited to announce the launch of our new project focused on enhancing user experience.",
            date: "October 25, 2024",
            link: "/news/new-project-launched",
        },
        {
            title: "Research Collaboration Announcement",
            description: "We are collaborating with several institutions to advance research in AI and machine learning.",
            date: "October 22, 2024",
            link: "/news/research-collaboration",
        },
        {
            title: "Upcoming Workshop on AI",
            description: "Join us for a workshop on the latest trends in AI, featuring industry experts.",
            date: "October 18, 2024",
            link: null, // No link for this news item
        },
        {
            title: "Conference Participation",
            description: "Our team will participate in the upcoming conference to share our latest findings.",
            date: "October 15, 2024",
            link: "/news/conference-participation",
        },
    ];

    return (
        <Box py={20} bg="gray.50">
            <Container maxW={"container.xl"}>
                <Heading as="h2" size="lg" textAlign="center" color={"blue.600"} mb={10}>
                    Recent News
                </Heading>
                <Stack spacing={4} mt={10}>
                    {newsItems.map((item, index) => (
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
                                        colorScheme="blue"
                                        variant="outline"
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
