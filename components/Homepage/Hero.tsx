"use client"; // This component uses client-side rendering

import { Box, Container, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'; // Chakra UI components
import React from 'react';
import { HiMiniArrowRightCircle } from 'react-icons/hi2'; // Icon for list items

const Hero = () => {
    return (
        <Box
            position="relative" // Set the hero section relative for layering effects
            zIndex={1} // Ensure this content appears above any background effects like particles or videos
            display="flex" // Use flexbox for centering content
            justifyContent="center" // Horizontally center content
            height="calc(100vh - 80px)" // Full viewport height minus navbar height
            alignItems="center" // Vertically center content
        >
            <Container maxW="container.xl" px={{ base: "10", md: "10" }}> {/* Responsive container */}
                {/* Main Heading */}
                <Heading
                    color="whiteAlpha.900" // Text color for contrast against background
                    textAlign="left" // Align heading text to the left
                    as="h1" // Semantic HTML tag for primary heading
                    size={{ base: '2xl', md: "3xl" }} // Responsive font sizes
                    pb="20px" // Add padding below the heading
                    lineHeight={1.2} // Adjust line height for readability
                >
                    Artificial Intelligence in <br /> Transportation Lab {/* Line break for emphasis */}
                </Heading>

                {/* Key Features List */}
                <List
                    spacing={2} // Add spacing between list items
                    textAlign="left" // Align list items to the left
                    color="white" // Text color for visibility
                    mt={4} // Margin above the list
                    fontSize={{ base: "xl", md: "2xl" }} // Responsive font sizes
                    lineHeight={1.2} // Adjust line height for readability
                >
                    {/* First Feature */}
                    <ListItem>
                        <ListIcon as={HiMiniArrowRightCircle} color="white" /> {/* Arrow icon */}
                        Casual Artificial Intelligence
                    </ListItem>

                    {/* Second Feature */}
                    <ListItem>
                        <ListIcon as={HiMiniArrowRightCircle} color="white" />
                        Transportation Safety and Operations
                    </ListItem>

                    {/* Third Feature */}
                    <ListItem>
                        <ListIcon as={HiMiniArrowRightCircle} color="white" />
                        Infrastructure readiness for disruptive technologies
                    </ListItem>
                </List>
            </Container>
        </Box>
    );
};

export default Hero;
