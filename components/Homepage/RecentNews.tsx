"use client"
import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Heading,
    Stack,
    Text,
    Link,
    Container,
    Button,
} from "@chakra-ui/react";
import { HiExternalLink } from "react-icons/hi";
import newsData from "@/data/news.json"; // Adjust the import path as needed
import { motion, isValidMotionProp } from "framer-motion"; // Import framer-motion
import { chakra } from "@chakra-ui/react"; // Import chakra

// Create a motion-enabled version of Box
const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

// Animation variant for staggered slide-in effect
const newsItemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start off-screen (down)
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.5 },
    }),
};

const RecentNews = () => {
    useEffect(() => {
        document.title = "Recent News | Your Site Name"; // Set dynamic page title
    }, []);

    // Get the four most recent news items and parse dates for sorting
    const recentNewsItems = newsData
        .map((item) => ({
            ...item,
            date: new Date(item.date),
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 4);

    // State to track whether the component is in view
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect(); // Stop observing after entering the view
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the section is in view
            }
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
        <Box pb={40} pt={"20"} bg="gray.50" position={"relative"} ref={sectionRef}>
            <Container maxW="container.xl" px={20}>
                <Heading
                    as="h2"
                    size="lg"
                    textAlign="center"
                    color="blue.600"
                    marginBottom={"20"}
                    fontSize={{ base: "4xl", md: "5xl" }}
                >
                    Recent News
                </Heading>
                <Stack spacing={4} my={10}>
                    {recentNewsItems.map((item, index) => (
                        <MotionBox
                            key={index}
                            p={6}
                            bg="white"
                            borderRadius="md"
                            shadow="md"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"} // Trigger animation based on inView state
                            custom={index} // Custom index for staggered effect
                            variants={newsItemVariants}
                            _hover={{ shadow: "lg", transform: "translateY(-5px)" }}
                            transition="all 0.3s ease"
                        >
                            {/* Title */}
                            <Text fontWeight="bold" fontSize="lg" color="blue.600" mb={2}>
                                {item.title}
                            </Text>

                            {/* Description */}
                            <Text fontSize="md" color="gray.700" mb={3}>
                                {item.description}
                            </Text>

                            {/* Date */}
                            <Text fontSize="sm" color="gray.500" mb={4}>
                                {item.date.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </Text>

                            {/* "Read More" button if link exists */}
                            {item.link && (
                                <Link href={item.link} isExternal>
                                    <Button
                                        rightIcon={<HiExternalLink />}
                                        variant="outline"
                                        _hover={{ color: "white", backgroundColor: "blue.600" }}
                                    >
                                        Read More
                                    </Button>
                                </Link>
                            )}
                        </MotionBox>
                    ))}
                </Stack>

                <Box textAlign={"center"}>
                    <Link href="/news" target={"_blank"}>
                        <Button
                            variant="solid"
                            width="fit-content"
                            alignContent="center"
                            size="lg"
                            _hover={{ bg: "blue.500", color: "white" }}
                        >
                            All News
                        </Button>
                    </Link>
                </Box>
            </Container>

            <Box position="absolute" bottom={0} w={"100%"} overflowX={"hidden"} zIndex={1} className="custom-shape-divider-bottom-1730319297">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </Box>
        </Box>
    );
};

export default RecentNews;
