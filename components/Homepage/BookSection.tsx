"use client"
import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Heading, Text, Image, Button, Link, Flex } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const BookSection = () => {
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef(null);

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
        <Box pb={40} pt={"20"} bg="gray.50" position={"relative"} ref={sectionRef}>
            <Container maxW="container.xl" px={20}>
                <MotionBox
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } : {}}
                    textAlign="center"
                    mb={5}
                >
                    <Heading as="h2" size="lg" color="blue.600" fontSize={{ base: "4xl", md: "5xl" }}>
                        A New Text Book
                    </Heading>
                </MotionBox>

                <Flex direction={{ base: "column", lg: "row" }} alignItems="center" justifyContent="space-between">
                    {/* Text Section */}
                    <MotionBox
                        flex="1"
                        pr={{ md: 5 }}
                        mb={{ base: 6, md: 0 }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } : {}}
                    >
                        <Heading as="h3" size="lg" mb={5} mt={{ base: 10, lg: 0 }}>
                            Artificial Intelligence in Highway Safety <br /> by Dr. Subasish Das
                        </Heading>
                        <Text fontSize="lg" color="gray.700" lineHeight="taller" mb={6}>
                            Artificial Intelligence in Highway Safety provides cutting-edge advances in highway safety
                            using AI. The author is a highway safety expert, drawing attention to the predictive powers
                            of AI techniques in solving complex problems for safety improvement.
                        </Text>

                        {/* Order Button */}
                        <Link href="https://www.routledge.com/Artificial-Intelligence-in-Highway-Safety/Das/p/book/9780367436704" isExternal>
                            <Button
                                size="lg"
                                variant="solid"
                                _hover={{ bg: "blue.500", color: "white" }}
                                rightIcon={<FaShoppingCart />}
                            >
                                Order The Book
                            </Button>
                        </Link>
                    </MotionBox>

                    {/* Image Section */}
                    <MotionBox
                        flexShrink={0}
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } } : {}}
                    >
                        <Image
                            src="/img/aihs1.png"
                            alt="Artificial Intelligence in Highway Safety"
                            borderRadius="sm"
                            boxSize={{ base: "350px", md: "500px" }}
                            objectFit="contain"
                        />
                    </MotionBox>
                </Flex>
            </Container>

            <Box
                position="absolute"
                bottom={0}
                w={"100%"}
                overflowX={"hidden"}
                zIndex={1}
                className="custom-shape-divider-bottom-1730319297"
            >
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </Box>
        </Box>
    );
};

export default BookSection;
