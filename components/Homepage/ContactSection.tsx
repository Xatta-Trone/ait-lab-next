"use client";

import { Box, Container, Flex, Heading, Link, Text, VStack } from "@chakra-ui/react";
import quickLinks from "@/data/navLinks.json";

const ContactSection = () => {
    return (
        <Box bg="white" py={20}>
            <Container maxW="container.xl" mx="auto" px={{ base: 4, md: 8 }}>
                <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align="flex-start"
                    gap={{ base: 8, md: 4 }}
                >
                    {/* Logo Section - fixed to 33% of container width */}
                    <VStack
                        align="flex-start"
                        w={{ base: "100%", md: "33%" }}
                        spacing={4}
                    >
                        <Heading size="md">AIT Lab</Heading>
                        <Text>
                            AIT lab has the experience of handling more than $7 million in research funds. The lab aims to support federal and state agencies in solving transportation problems through AI applications. We have developed several user-friendly web tools, widely used by stakeholders. The lab also believes in open-source contributions, with active GitHub projects.
                        </Text>
                    </VStack>

                    {/* Contact Section - auto width */}
                    <VStack
                        align="flex-start"
                        spacing={2}
                        w={{ base: "100%", md: "auto" }}
                        maxW="full"
                    >
                        <Heading size="sm" mb={2}>
                            Contact
                        </Heading>
                        <Text>Address: 601 University Drive, San Marcos, TX</Text>
                        <Text>Email: info@aitlab.com</Text>
                    </VStack>

                    {/* Quick Links Section - auto width */}
                    <VStack
                        align="flex-start"
                        spacing={2}
                        w={{ base: "100%", md: "auto" }}
                        maxW="full"
                    >
                        <Heading size="sm" mb={2}>
                            Quick Links
                        </Heading>
                        {quickLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.path}
                                color="blue.300"
                                _hover={{ color: "blue.500" }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </VStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default ContactSection;