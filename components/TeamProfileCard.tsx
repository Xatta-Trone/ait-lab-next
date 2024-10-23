/** @format */

import React from "react";
import {
    Box,
    Flex,
    Image,
    Stack,
    Text,
    Link,
    Button,
    HStack,
    Heading,
} from "@chakra-ui/react";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaGlobe,
    FaEnvelope,
    FaResearchgate,
    FaOrcid,
} from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";

// Define the interface for the TeamProfileCard props
interface TeamProfileCardProps {
    member: TeamMembers; // Update the type to use TeamMembers
    onShowMore: (member: TeamMembers) => void;
}

// Define the structure for the member data
interface TeamMembers {
    name: string;
    label: string;
    description?: string; // Optional
    email?: string;
    linkedin?: string;
    github?: string;
    googleScholar?: string;
    researchGate?: string;
    orcid?: string;
    twitter?: string;
    websites?: string[]; // Updated type to reflect an array of strings
    subject?: string; // Used for alumni
    duration?: string; // Used for alumni
    image?: string; // Optional property
}

const TeamProfileCard: React.FC<TeamProfileCardProps> = ({ member, onShowMore }) => {
    // Limit description to 50 words
    const MAX_WORD_COUNT = 50;
    const words = member.description ? member.description.split(" ") : [];
    const isDescriptionLong = words.length > MAX_WORD_COUNT;
    const descriptionToShow = isDescriptionLong
        ? words.slice(0, MAX_WORD_COUNT).join(" ") + "..."
        : member.description;

    return (
        <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            mb={8}
            transition="all 0.3s ease-in-out"
            _hover={{
                shadow: "xl",
                transform: "translateY(-10px)",
            }} // Card hover effect
        >
            <Flex
                direction={{ base: "column", md: "row" }} // Stack column on smaller devices
                alignItems="start"
            >
                {/* Image with hover scale animation */}
                <Image
                    src={member.image ? `/img/team/${member.image}` : "/img/team/default.png"}
                    alt={member.name}
                    maxW={{ base: "10rem", md: "20rem", lg: "9rem" }} // Responsive width for small, medium, large screens
                    height={{ base: "15rem", lg: "15rem" }} // Responsive height for small and large screens
                    objectFit="contain" // Ensure the image fits fully and is visible
                    objectPosition="center" // Center the image
                    mx="auto" // Center the image on small screens
                    transition="transform 0.3s linear"
                    _hover={{
                        transform: "scale(1.05)",
                    }} // Image hover effect
                    onError={(e) => {
                        const target = e.target as HTMLImageElement; // Cast to HTMLImageElement
                        target.src = "/img/team/default.png"; // Fallback to default image
                    }}
                />
                <Stack spacing={3} flex="1" ml={{ md: 6 }}>
                    {/* Name as a Heading */}
                    <Heading as="h3" size="lg" color="blue.800">
                        {member.name}
                    </Heading>
                    {/* Label as a smaller Heading */}
                    <Heading as="h4" size="sm" color="gray.500">
                        {member.label}
                    </Heading>

                    {/* Shortened Description with Show more Button */}
                    <Text fontSize="sm" color="gray.600">
                        {descriptionToShow}
                        {isDescriptionLong && (
                            <Button
                                variant="link"
                                color="blue.500"
                                ml={2}
                                _hover={{ textDecoration: "underline", color: "blue.700" }} // Button hover effect
                                onClick={() => onShowMore(member)} // Open modal on click
                                display="inline"
                            >
                                Show More
                            </Button>
                        )}
                    </Text>

                    {/* Contact and Social Links */}
                    <HStack spacing={3} mt="auto" align="center">
                        {member.email && (
                            <Link
                                href={`mailto:${member.email}`}
                                isExternal
                                color="gray.700"
                                _hover={{
                                    color: "blue.600",
                                    transform: "scale(1.1)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <FaEnvelope size="22px" />
                            </Link>
                        )}
                        {member.linkedin && (
                            <Link
                                href={member.linkedin}
                                isExternal
                                color="gray.700"
                                _hover={{
                                    color: "blue.600",
                                    transform: "scale(1.1)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <FaLinkedin size="22px" color="#0e76a8" />
                            </Link>
                        )}
                        {member.github && (
                            <Link
                                href={member.github}
                                isExternal
                                color="gray.700"
                                _hover={{
                                    color: "blue.600",
                                    transform: "scale(1.1)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <FaGithub size="22px" color="#333" />
                            </Link>
                        )}
                        {member.googleScholar && (
                            <Link
                                href={member.googleScholar}
                                isExternal
                                color="gray.700"
                                _hover={{
                                    color: "blue.600",
                                    transform: "scale(1.1)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <SiGooglescholar size="22px" />
                            </Link>
                        )}
                        {member.researchGate && (
                            <Link
                                href={member.researchGate}
                                isExternal
                                color="gray.700"
                                _hover={{
                                    color: "blue.600",
                                    transform: "scale(1.1)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <FaResearchgate size="22px" color="#00ccbb" />
                            </Link>
                        )}
                        {member.orcid && (
                            <Link
                                href={member.orcid}
                                isExternal
                                color="gray.700"
                                _hover={{
                                    color: "blue.600",
                                    transform: "scale(1.1)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <FaOrcid size="22px" color="#A7CF36" />
                            </Link>
                        )}
                        {member.twitter && (
                            <Link
                                href={member.twitter}
                                isExternal
                                color="gray.700"
                                _hover={{
                                    color: "blue.600",
                                    transform: "scale(1.1)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <FaTwitter size="22px" color="#1DA1F2" />
                            </Link>
                        )}
                        {member.websites &&
                            member.websites.map((website, index) => (
                                <Link
                                    key={index}
                                    href={website}
                                    isExternal
                                    color="gray.700"
                                    _hover={{
                                        color: "blue.600",
                                        transform: "scale(1.1)",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <FaGlobe size="22px" />
                                </Link>
                            ))}
                    </HStack>
                </Stack>
            </Flex>
        </Box>
    );
};

export default TeamProfileCard;
