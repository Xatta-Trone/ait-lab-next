/** @format */
"use client";

import React, { useEffect } from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    List,
    ListItem,
    ListIcon,
    Link,
    Button,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa"; // Import icon

const Openings = () => {
    // Set dynamic page title
    useEffect(() => {
        document.title = "Openings | AIT Lab";
    }, []);

    return (
        <Box py={8}>
            <Container maxW="container.xl">
                {/* Heading */}
                <Heading as="h1" size="2xl" mb={6} color="blue.600">
                    Openings
                </Heading>

                {/* Introduction */}
                <Text fontSize="lg" mb={4}>
                    The Ingram School of Engineering (ISOE) invites applications for
                    several highly motivated M.S./Ph.D. GIA/GRA positions under the
                    supervision of Dr. Subasish Das in the Civil Engineering program. The
                    prospective student will focus on a combination of three research
                    thrusts:
                </Text>

                {/* Research Thrusts */}
                <List spacing={3} mb={4}>
                    <ListItem>
                        <ListIcon as={FaCheckCircle} color="blue.500" />
                        Causal Artificial Intelligence
                    </ListItem>
                    <ListItem>
                        <ListIcon as={FaCheckCircle} color="blue.500" />
                        Advanced Spatiotemporal Modeling
                    </ListItem>
                    <ListItem>
                        <ListIcon as={FaCheckCircle} color="blue.500" />
                        Transportation Safety and Operation
                    </ListItem>
                </List>

                {/* Responsibilities */}
                <Text fontSize="lg" mb={4}>
                    The responsibilities of the GRA include:
                </Text>

                <List spacing={3} mb={4}>
                    <ListItem>
                        <ListIcon as={FaCheckCircle} color="blue.500" />
                        Assist in writing literature review
                    </ListItem>
                    <ListItem>
                        <ListIcon as={FaCheckCircle} color="blue.500" />
                        Develop spatiotemporal models
                    </ListItem>
                    <ListItem>
                        <ListIcon as={FaCheckCircle} color="blue.500" />
                        Apply different AI algorithms
                    </ListItem>
                    <ListItem>
                        <ListIcon as={FaCheckCircle} color="blue.500" />
                        Maintain codes and repositories in GitHub
                    </ListItem>
                    <ListItem>
                        <ListIcon as={FaCheckCircle} color="blue.500" />
                        Build and maintain complex web applications for real-time
                        spatiotemporal data stream
                    </ListItem>
                </List>

                {/* Call to Action */}
                <Text fontSize="lg" mb={4}>
                    Please see the PDF for the open position of Ph.D. GRA.
                </Text>

                {/* Download PDF Button */}
                <Link
                    href="https://subasish.github.io/ait_lab/pdfs/GRA_Position%20Details_Fall22.pdf"
                    isExternal
                >
                    <Button
                        size="lg"
                        colorScheme="blue"
                        variant="solid"
                        _hover={{ bg: "blue.500", color: "white" }}
                    >
                        Download PDF
                    </Button>
                </Link>
            </Container>
        </Box>
    );
};

export default Openings;
