import React from "react";
import { Box, Heading, Text, Button, SimpleGrid, Container } from "@chakra-ui/react";
import Link from "next/link";

const ProspectiveStudents = () => {
    // Example job listings data
    const positions = [
        "Graduate Research Assistant",
        "Internship Opportunities",
        "Data Analyst",
        "Undergraduate Research Assistant",
        "Software Developer",
        "Lab Technician",
    ];

    return (
        <Box py={20} position={"relative"}>
            <Container maxW="container.xl" display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Heading as="h2" size="lg" mb={4} textAlign="center" color={"blue.600"}>
                    Opportunities for Prospective Students
                </Heading>
                <Text textAlign="center" mb={6}>
                    Join our team and contribute to innovative research projects. Below are the positions available:
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacingY={5} spacingX={10} w={"100%"} mb={5}>
                    {positions.map((position, index) => (
                        <Box key={index} p={4} bg="white" borderRadius="md" shadow="md">
                            <Text fontSize="md" fontWeight="bold">
                                {position}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>

                <Link href="/opening">
                    <Button
                        variant="solid"
                        width="fit-content"
                        alignContent="center"
                        mt={4}
                        size="lg"
                        _hover={{ bg: "blue.500", color: "white" }}
                    >
                        Learn More
                    </Button>
                </Link>
            </Container>


            <Box position="absolute" bottom={-10} w={"100%"} overflowX={"hidden"} zIndex={1} className="custom-shape-divider-bottom-1730319297">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="gray-fill"></path>
                </svg>
            </Box>

        </Box>
    );
};

export default ProspectiveStudents;
