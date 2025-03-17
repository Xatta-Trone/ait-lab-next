"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Heading, Text, Button, SimpleGrid, Container } from "@chakra-ui/react";
import Link from "next/link";
import { motion, isValidMotionProp } from "framer-motion"; // Import Framer Motion for animations
import { chakra } from "@chakra-ui/react"; // Chakra wrapper for custom motion components

// Create a motion-enabled Chakra Box component
const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const ProspectiveStudents = () => {
    // List of positions available at AIT Lab
    const positions = [
        "Undergraduate Research Assistant",
        "Graduate Instructional Assistant",
        "Graduate Research Assistant",
        "Doctoral Instructional Assistant",
        "Doctoral Research Assistant"
    ];

    const [isInView, setIsInView] = useState(false); // Track if the section is in view
    const sectionRef = useRef<HTMLDivElement | null>(null); // Ref for the section container

    // Observer for detecting if the section is in the viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true); // Trigger animations when in view
                    observer.disconnect(); // Stop observing after initial trigger
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <Box
            pb={40} // Padding at the bottom
            pt={"20"} // Padding at the top
            position={"relative"} // Relative positioning for the section
            ref={sectionRef} // Reference for IntersectionObserver
        >
            <Container
                maxW="container.xl" // Maximum width of the container
                display={"flex"} // Flexbox layout
                flexDirection={"column"} // Stack children vertically
                alignItems={"center"} // Center align content
                px={{ base: "10", md: "10" }} // Padding for responsive layout
            >
                {/* Header Section */}
                <MotionBox
                    as="header"
                    initial={{ opacity: 0, y: 50 }} // Initial animation state
                    animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } : {}}
                    textAlign="center"
                    mb={5} // Margin at the bottom
                >
                    <Heading
                        as="h2"
                        size="lg"
                        color="yellow.600"
                        fontSize={{ base: "4xl", md: "5xl" }} // Responsive font sizes
                    >
                        Prospective Students
                    </Heading>
                </MotionBox>

                {/* Description Section */}
                <MotionBox
                    initial={{ opacity: 0, y: 30 }} // Initial animation state
                    animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } } : {}}
                    textAlign="center"
                    mb={20} // Margin at the bottom
                >
                    <Text>
                        Students interested in the AIT Lab should first read through the lab research areas prior to contacting Dr. Das by email. We are currently seeking applications for student research assistants at undergraduate, graduate, and doctoral levels.
                    </Text>
                </MotionBox>

                {/* Positions Section */}
                <SimpleGrid
                    columns={{ base: 1, md: 2 }} // Responsive grid layout
                    spacingY={5} // Vertical spacing between items
                    spacingX={10} // Horizontal spacing between items
                    w={"100%"} // Full width
                    mb={5} // Margin at the bottom
                >
                    {positions.map((position, index) => (
                        <MotionBox
                            key={index}
                            p={4} // Padding inside the box
                            bg="white" // Background color
                            borderRadius="md" // Rounded corners
                            shadow="md" // Box shadow
                            initial={{ opacity: 0, y: 20 }} // Initial animation state
                            animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" } } : {}}
                        >
                            <Text fontSize="md" fontWeight="bold">
                                {position}
                            </Text>
                        </MotionBox>
                    ))}
                </SimpleGrid>

                {/* Call-to-Action Button */}
                <MotionBox
                    initial={{ opacity: 0 }} // Initial animation state
                    animate={isInView ? { opacity: 1, transition: { duration: 0.6, delay: 0.8, ease: "easeOut" } } : {}}
                >
                    <Link href="/opening"> {/* Link to the openings page */}
                        <Button
                            variant="solid"
                            width="fit-content" // Button width fits the content
                            alignContent="center"
                            mt={4} // Margin at the top
                            size="lg" // Large button size
                            _hover={{ bg: "yellow.500", color: "white" }} // Hover effects
                        >
                            Learn More
                        </Button>
                    </Link>
                </MotionBox>
            </Container>

            {/* Bottom SVG Divider */}
            <Box
                position="absolute" // Positioned absolutely at the bottom
                bottom={0}
                w={"100%"} // Full width
                overflowX={"hidden"} // Hide horizontal overflow
                zIndex={1} // Positioned above the background
                className="custom-shape-divider-bottom-1730319297" // Custom class for styling
            >
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none" // Maintain aspect ratio
                >
                    <path
                        d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
                        className="yellow-fill" // Custom CSS class for fill color
                    ></path>
                </svg>
            </Box>
        </Box>
    );
};

export default ProspectiveStudents;
