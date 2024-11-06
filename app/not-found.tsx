/** @format */

"use client";

import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
    const router = useRouter();

    return (
        <Container maxW="container.md" py={20} textAlign="center">
            <Heading as="h1" size="2xl" color="yellow.600" mb={4}>
                404 - Page Not Found
            </Heading>
            <Text fontSize="lg" color="gray.700" mb={6}>
                Sorry, the page you are looking for does not exist.
            </Text>
            <Button
                onClick={() => router.push("/")}
                colorScheme="yellow"
                size="lg"
                _hover={{ color: "white", backgroundColor: "yellow.600" }}
            >
                Go Back to Homepage
            </Button>
        </Container>
    );
};

export default NotFoundPage;
