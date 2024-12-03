"use client";

import { Box, Container, Heading, useColorMode, useColorModeValue } from '@chakra-ui/react'; // Chakra UI components
import React from 'react';
import ProjectsSwiper from './ProjectsSwiper'; // Import the Swiper component for project cards

const ProjectsSection = () => {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue("white", "gray.700");
    const headingColor = useColorModeValue("yellow.600", "white");
    return (
        <>
            {/* Projects Section */}
            <Box
                bg={bgColor} // Background color of the section
                pb={40} // Padding at the bottom of the section
                pt={"14"} // Padding at the top of the section
                position={"relative"} // Set relative positioning for the section
                zIndex={3}
            >
                {/* Section Content */}
                <Container
                    maxWidth={"container.xl"} // Set the maximum width of the container
                    textAlign={"center"} // Center align the content
                    px={{ base: "10", md: "10" }} // Padding for responsive design
                >
                    {/* Section Heading */}
                    <Heading
                        as={"h2"} // Semantic HTML tag for heading
                        color={headingColor} // Text color
                        marginBottom={"20"} // Space below the heading
                        fontSize={{ base: "4xl", md: "5xl" }} // Responsive font size
                    >
                        Projects
                    </Heading>

                    {/* Swiper Component for Projects */}
                    <Box>
                        <ProjectsSwiper /> {/* Render the Swiper for showcasing project cards */}
                    </Box>
                </Container>

                {/* Decorative SVG Divider */}
                <Box
                    position="absolute" // Position the divider absolutely
                    bottom={0} // Align the divider at the bottom
                    w={"100%"} // Full width
                    overflowX={"hidden"} // Hide overflow on the x-axis
                    zIndex={1} // Position above the background
                    className="custom-shape-divider-bottom-1730319297" // Custom CSS class for styling
                >
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none" // Preserve aspect ratio of the SVG
                    >
                        <path
                            d="M1200 120L0 16.48 0 0 1200 0 1200 120z" // Path for the SVG shape
                            className="yellow-fill" style={{ fill: colorMode === 'light' ? "#fffff0" : "#4a5568" }} // Custom CSS class for fill color
                        ></path>
                    </svg>
                </Box>
            </Box>
        </>
    );
};

export default ProjectsSection;
