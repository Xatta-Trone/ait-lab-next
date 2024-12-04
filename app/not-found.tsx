/** @format */

"use client"; // Indicates this component is a client-side React component

import { Box, Button, Container, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation"; // Next.js hook for navigation

// Component to display a 404 error page
const NotFoundPage = () => {
    const router = useRouter(); // Hook for navigating programmatically
    const bgColor = useColorModeValue("white", "gray.700")
    const headingColor = useColorModeValue("yellow.600", "whiteAlpha.900");
    const textCol = useColorModeValue("gray.700", "whiteAlpha.800")

    return (
        <Box bgColor={bgColor} minH={"100%"}>
            <Container maxW="container.md" py={20} textAlign="center" >
                {/* Heading for the 404 error */}
                <Heading as="h1" size="2xl" color={headingColor} mb={4}>
                    404 - Page Not Found
                </Heading>

                {/* Message to inform the user that the page doesn't exist */}
                <Text fontSize="lg" color={textCol} mb={6}>
                    Sorry, the page you are looking for does not exist.
                </Text>

                {/* Button to navigate back to the homepage */}
                <Button
                    onClick={() => router.push("/")} // Redirect to the homepage
                    colorScheme="yellow"
                    size="lg"
                    _hover={{ color: "white", backgroundColor: "yellow.600" }} // Hover styling
                >
                    Go Back to Homepage
                </Button>
            </Container>
        </Box>
    );
};

export default NotFoundPage; // Export the component as the default export
