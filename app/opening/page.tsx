/** @format */
"use client"; // Enables client-side rendering for this component

import React, { useEffect } from "react";
import Head from "next/head"; // Import Head for metadata management
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
import { FaCheckCircle } from "react-icons/fa"; // Import check icon for list items

const Openings = () => {
    // Set the page title dynamically when the component mounts
    useEffect(() => {
        document.title = "Openings - Artificial Intelligence in Transportation Lab (AIT Lab)";
    }, []);

    return (
        <>
            {/* Metadata for SEO and social sharing */}
            <Head>
                <title>Openings - Artificial Intelligence in Transportation Lab (AIT Lab)</title>
                <meta
                    name="description"
                    content="Explore the latest openings at AIT Lab, including GRA and GIA positions in the Civil Engineering program under Dr. Subasish Das."
                />
                <meta
                    name="keywords"
                    content="AIT Lab Openings, GRA positions, Civil Engineering Jobs, Research Positions, Dr. Subasish Das, Texas State University"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://ait-lab.vercel.app/opening" />
                <meta name="theme-color" content="#b7791f" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="icon" href="/New_AIT_Favicon.png" />
                <meta property="og:title" content="Openings - Artificial Intelligence in Transportation Lab (AIT Lab)" />
                <meta
                    property="og:description"
                    content="Discover exciting opportunities at AIT Lab, including GRA and GIA positions in Civil Engineering, focusing on AI, spatiotemporal modeling, and transportation safety."
                />
                <meta property="og:url" content="https://ait-lab.vercel.app/opening" />
                <meta property="og:site_name" content="AIT Lab" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:image" content="/logo_big_black.png" />
                <meta property="og:image:alt" content="AIT Lab Logo" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Openings - Artificial Intelligence in Transportation Lab (AIT Lab)" />
                <meta
                    name="twitter:description"
                    content="Explore GRA and GIA opportunities at AIT Lab in cutting-edge research areas such as AI and transportation safety."
                />
                <meta name="twitter:image" content="/logo_big_black.png" />
            </Head>

            {/* Page Content */}
            <Box py={20}>
                <Container maxW="container.xl">
                    {/* Main heading */}
                    <Heading as="h1" size="2xl" mb={6} color="yellow.600">
                        Openings
                    </Heading>

                    {/* Introduction text */}
                    <Text fontSize="lg" mb={4}>
                        The Ingram School of Engineering (ISOE) invites applications for
                        several highly motivated M.S./Ph.D. GIA/GRA positions under the
                        supervision of Dr. Subasish Das in the Civil Engineering program. The
                        prospective student will focus on a combination of three research
                        thrusts:
                    </Text>

                    {/* Research Thrusts List */}
                    <List spacing={3} mb={4}>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="yellow.500" /> {/* Check icon */}
                            Causal Artificial Intelligence
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="yellow.500" />
                            Advanced Spatiotemporal Modeling
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="yellow.500" />
                            Transportation Safety and Operation
                        </ListItem>
                    </List>

                    {/* Responsibilities Section */}
                    <Text fontSize="lg" mb={4}>
                        The responsibilities of the GRA include:
                    </Text>

                    <List spacing={3} mb={4}>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="yellow.500" />
                            Assist in writing literature review
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="yellow.500" />
                            Develop spatiotemporal models
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="yellow.500" />
                            Apply different AI algorithms
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="yellow.500" />
                            Maintain codes and repositories in GitHub
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="yellow.500" />
                            Build and maintain complex web applications for real-time
                            spatiotemporal data stream
                        </ListItem>
                    </List>

                    {/* Additional Information */}
                    <Text fontSize="lg" mb={4}>
                        Please see the PDF for the open position of Ph.D. GRA.
                    </Text>

                    {/* PDF Download Button */}
                    <Link
                        href="https://subasish.github.io/ait_lab/pdfs/GRA_Position%20Details_Fall22.pdf"
                        isExternal
                    >
                        <Button
                            size="lg"
                            colorScheme="yellow"
                            variant="solid"
                            _hover={{ bg: "yellow.500", color: "white" }}
                        >
                            Download PDF
                        </Button>
                    </Link>
                </Container>
            </Box>
        </>
    );
};

export default Openings; // Export the Openings component
