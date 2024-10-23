/** @format */
import React from "react";
import { Box, Text, Stack, Link } from "@chakra-ui/react";

const ResearchPaperItem = (props: ResearchPaperItemProps) => {
    const {
        title,
        total_citations,
        year,
        url,
        journal,
        publisher,
        source,
        issue,
        book
    } = props;
    return (
        <Box
            p={3}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            _hover={{ shadow: "lg", transform: "translateY(-10px)" }} // Hover effect for the card
            transition="all 0.3s ease"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            {/* Image Container */}
            <Box
                overflow="hidden"
                borderRadius="md"
                height="200px"
                position="relative"
            >
                {/* Background Image with zoom effect */}
                <Box
                    height="100%"
                    backgroundImage="url('/img/research-default.jpg')" // Image path
                    backgroundSize="cover"
                    backgroundPosition="center"
                    transition="transform 0.3s ease"
                    _hover={{ transform: "scale(1.1)" }} // Apply zoom effect on image hover only
                />
            </Box>

            {/* Paper Title */}
            <Stack spacing={3} mt={4} flex="1">
                <Link href={url} isExternal _hover={{ textDecoration: "none" }}>
                    <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="primary"
                        _hover={{ color: "blue.600" }} // Hover effect for text
                    >
                        {title}
                    </Text>
                </Link>
                <Text fontSize="md" color="gray.700">
                    {journal
                        ? `${journal}`
                        : source
                            ? `${source}`
                            : issue
                                ? `${issue}`
                                : book
                                    ? `${book}`
                                    : ""}{" "}
                    {publisher ? `(${publisher})` : ""}
                </Text>
            </Stack>

            {/* Citations and Year */}
            <Stack
                direction="row"
                justifyContent="space-between"
                mt={4}
                pt={2}
                borderTop="1px solid"
                borderColor="gray.200"
            >
                <Text fontSize="sm" color="gray.600">
                    Citations: {total_citations || 0}
                </Text>
                <Text fontSize="sm" color="gray.600">
                    Year: {year}
                </Text>
            </Stack>
        </Box>
    );
};

export default ResearchPaperItem;
