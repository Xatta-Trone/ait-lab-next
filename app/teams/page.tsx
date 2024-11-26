/** @format */
"use client"; // Enables client-side rendering for this component

import React, { useEffect, useState, forwardRef } from "react";
import Head from "next/head"; // Import Head for managing metadata
import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import framer-motion for animations
import TeamProfileCard from "@/components/TeamProfileCard"; // Component for individual team member cards
import TeamProfileModal from "@/components/TeamProfileModal"; // Modal component for detailed member view
import teamData from "@/data/team.json"; // Data for current team members
import alumniData from "@/data/alumni.json"; // Data for alumni
import fellowData from "@/data/fellow.json"; // Data for fellows

// Create a motion-enabled version of GridItem for animations
const MotionGridItem = motion(
    forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof GridItem>>(
        (props, ref) => <GridItem ref={ref} {...props} />
    )
);

// Animation variants for the staggered slide-in effect
const cardVariants = {
    hidden: { opacity: 0, x: 100 }, // Card starts off-screen to the right
    visible: (i: number) => ({
        opacity: 1,
        x: 0, // Moves into view
        transition: { delay: i * 0.2, duration: 0.6 }, // Delays each card for a staggered effect
    }),
};

const Team: React.FC = () => {
    // Dynamically update the page title
    useEffect(() => {
        document.title = "Team | AIT Lab";
    }, []);

    // State to manage the selected team member for the modal
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Show the modal with detailed information for a selected member
    const handleShowMore = (member: any) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    // Close the modal and clear the selected member
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    return (
        <>
            {/* Metadata for SEO and social sharing */}
            <Head>
                <title>Team | AIT Lab</title>
                <meta
                    name="description"
                    content="Meet the brilliant team members, fellows, and alumni of AIT Lab, contributing to cutting-edge research in artificial intelligence and transportation safety."
                />
                <meta
                    name="keywords"
                    content="AIT Lab Team, Fellows, Alumni, Artificial Intelligence Research, Transportation Safety, Advanced Research"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://ait-lab.vercel.app/teams" />
                <meta name="theme-color" content="#b7791f" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="Team | AIT Lab" />
                <meta
                    property="og:description"
                    content="Explore the profiles of the AIT Lab team, including current members, fellows, and alumni, contributing to groundbreaking research."
                />
                <meta property="og:url" content="https://ait-lab.vercel.app/teams" />
                <meta property="og:site_name" content="AIT Lab" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:image" content="/logo_big_black.png" />
                <meta property="og:image:alt" content="AIT Lab Logo" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Team | AIT Lab" />
                <meta
                    name="twitter:description"
                    content="Learn about the dedicated team of researchers, fellows, and alumni driving innovation at AIT Lab."
                />
                <meta name="twitter:image" content="/logo_big_black.png" />
            </Head>

            {/* Page Content */}
            <Box py={20}>
                <Container maxW="container.xl">
                    {/* Current Team Section */}
                    <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={10} mb={12}>
                        <GridItem>
                            <Heading as="h1" size="2xl" mb={6} color="yellow.600">
                                Current Team
                            </Heading>
                        </GridItem>
                        <GridItem>
                            {teamData.map((member, index) => (
                                <MotionGridItem
                                    key={index}
                                    custom={index} // Custom index for stagger effect
                                    initial="hidden"
                                    animate="visible"
                                    variants={cardVariants} // Animation variants
                                >
                                    <TeamProfileCard member={member} onShowMore={handleShowMore} />
                                </MotionGridItem>
                            ))}
                        </GridItem>
                    </Grid>

                    {/* Fellows Section */}
                    <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={10} mb={12}>
                        <GridItem>
                            <Heading as="h1" size="2xl" mb={6} color="yellow.600">
                                Fellows
                            </Heading>
                        </GridItem>
                        <GridItem>
                            {fellowData.map((member, index) => (
                                <MotionGridItem
                                    key={index}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={cardVariants}
                                >
                                    <TeamProfileCard member={member} onShowMore={handleShowMore} />
                                </MotionGridItem>
                            ))}
                        </GridItem>
                    </Grid>

                    {/* Alumni Section */}
                    <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={10} mb={12}>
                        <GridItem>
                            <Heading as="h1" size="2xl" mb={6} color="yellow.600">
                                Alumni
                            </Heading>
                        </GridItem>
                        <GridItem>
                            {alumniData.map((alumni, index) => (
                                <Box
                                    key={index}
                                    borderBottom="1px solid"
                                    borderColor="gray.200"
                                    pb={2}
                                    pt={2}
                                >
                                    {/* Alumni Details */}
                                    <Text fontWeight="bold" fontSize="lg" color="gray.600">
                                        {alumni.name}
                                        <Text as="span" fontWeight="300" color="gray.500">
                                            {" "}
                                            - {alumni.label}
                                            {alumni.subject.length > 0 && `, ${alumni.subject}`}
                                            {alumni.duration.length > 0 && ` (${alumni.duration})`}
                                        </Text>
                                    </Text>
                                </Box>
                            ))}
                        </GridItem>
                    </Grid>

                    {/* Modal for Detailed Profile View */}
                    {selectedMember && (
                        <TeamProfileModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            member={selectedMember}
                        />
                    )}
                </Container>
            </Box>
        </>
    );
};

export default Team; // Export the Team component
