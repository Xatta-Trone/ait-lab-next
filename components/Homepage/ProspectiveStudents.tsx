"use client"
import React, { useEffect, useRef, useState } from "react";
import { Box, Heading, Text, Button, SimpleGrid, Container } from "@chakra-ui/react";
import Link from "next/link";
import { motion, isValidMotionProp } from "framer-motion"; // Import Framer Motion
import { chakra } from "@chakra-ui/react"; // Import chakra for custom motion components

// Chakra wrapper for Framer Motion with custom prop forwarding
const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const ProspectiveStudents = () => {
    const positions = [
        "Undergraduate Research Assistant",
        "Graduate Instructional Assistant",
        "Graduate Research Assistant",
        "Doctoral Instructional Assistant",
        "Doctoral Research Assistant"
    ];

    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
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
        <Box pb={40} pt={"20"} position={"relative"} ref={sectionRef}>
            <Container maxW="container.xl" display={"flex"} flexDirection={"column"} alignItems={"center"} px={20}>
                <MotionBox
                    as="header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } : {}}
                    textAlign="center"
                    mb={5}
                >
                    <Heading as="h2" size="lg" color="blue.600" fontSize={{ base: "4xl", md: "5xl" }}>
                        Prospective Students
                    </Heading>
                </MotionBox>

                <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } } : {}}
                    textAlign="center"
                    mb={20}
                >
                    <Text>
                        Students interested in the AIT Lab should first read through the lab research areas prior to contacting Dr. Das by email. We are currently seeking applications for student research assistants at undergraduate, graduate, and doctoral levels.
                    </Text>
                </MotionBox>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacingY={5} spacingX={10} w={"100%"} mb={5}>
                    {positions.map((position, index) => (
                        <MotionBox
                            key={index}
                            p={4}
                            bg="white"
                            borderRadius="md"
                            shadow="md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" } } : {}}
                        >
                            <Text fontSize="md" fontWeight="bold">
                                {position}
                            </Text>
                        </MotionBox>
                    ))}
                </SimpleGrid>

                <MotionBox
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1, transition: { duration: 0.6, delay: 0.8, ease: "easeOut" } } : {}}
                >
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
                </MotionBox>
            </Container>

            <Box position="absolute" bottom={0} w={"100%"} overflowX={"hidden"} zIndex={1} className="custom-shape-divider-bottom-1730319297">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="gray-fill"></path>
                </svg>
            </Box>
        </Box>
    );
};

export default ProspectiveStudents;
