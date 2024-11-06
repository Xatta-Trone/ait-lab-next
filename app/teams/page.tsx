/** @format */
"use client";

import React, { useEffect, useState, forwardRef } from "react";
import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import framer-motion
import TeamProfileCard from "@/components/TeamProfileCard";
import TeamProfileModal from "@/components/TeamProfileModal";
import teamData from "@/data/team.json";
import alumniData from "@/data/alumni.json";
import fellowData from "@/data/fellow.json";

// Create a motion-enabled version of GridItem with explicit typing
const MotionGridItem = motion(
    forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof GridItem>>(
        (props, ref) => <GridItem ref={ref} {...props} />
    )
);

// Animation variant for staggered slide-in effect
const cardVariants = {
    hidden: { opacity: 0, x: 100 }, // Start off-screen (right)
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.2, duration: 0.6 }, // Delay each card for stagger effect
    }),
};

const Team: React.FC = () => {
    // Set dynamic page title
    useEffect(() => {
        document.title = "Team | AIT Lab";
    }, []);

    const [selectedMember, setSelectedMember] = useState<any>(null); // Use any for flexibility
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleShowMore = (member: any) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    return (
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
                                custom={index} // Custom index for staggered effect
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
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

                {/* Alumni Section with Grid Layout */}
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

                {/* Modal */}
                {selectedMember && (
                    <TeamProfileModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        member={selectedMember}
                    />
                )}
            </Container>
        </Box>
    );
};

export default Team;
