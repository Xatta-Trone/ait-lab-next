/** @format */

"use client"; // Indicates this component is a client-side React component

import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation"; // Next.js hook for navigation

// Component to display a 404 error page
const NotFoundPage = () => {
    const router = useRouter(); // Hook for navigating programmatically

    return (
        <Container maxW="container.md" py={20} textAlign="center">
            {/* Heading for the 404 error */}
            <Heading as="h1" size="2xl" color="yellow.600" mb={4}>
                404 - Page Not Found
            </Heading>

            {/* Message to inform the user that the page doesn't exist */}
            <Text fontSize="lg" color="gray.700" mb={6}>
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
    );
};

export default NotFoundPage; // Export the component as the default export
