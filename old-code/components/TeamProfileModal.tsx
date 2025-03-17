/** @format */

import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    Center,
    HStack,
    useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaGlobe, FaLinkedin, FaLinkedinIn, FaOrcid, FaResearchgate, FaTwitter } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";

interface TeamProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    member: TeamMembers;
}

const TeamProfileModal: React.FC<TeamProfileModalProps> = ({ isOpen, onClose, member }) => {
    const textCol = useColorModeValue("gray.800", "whiteAlpha.800")
    const headingColor = useColorModeValue("yellow.600", "whiteAlpha.900");
    const iconCol = useColorModeValue("#333", "whiteAlpha.600")

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
            <ModalContent>
                <ModalHeader>{member?.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight="bold" mb={2} color={headingColor}>
                        {member?.label}
                    </Text>
                    <Text mb={4} color={textCol}>{member?.description}</Text>

                    {/* Links Section */}
                    <HStack spacing={3} mt={3} align="center">
                        {member.email && (
                            <Link href={`mailto:${member.email}`} target="_blank" color="gray.700">
                                <FaEnvelope size="22px" />
                            </Link>
                        )}
                        {member.linkedin && (
                            <Link href={member.linkedin} target="_blank" color="gray.700">
                                <FaLinkedinIn size="22px" color="#0e76a8" />
                            </Link>
                        )}
                        {member.github && (
                            <Link href={member.github} target="_blank" color="gray.700">
                                <FaGithub size="22px" color={iconCol} />
                            </Link>
                        )}
                        {member.googleScholar && (
                            <Link href={member.googleScholar} target="_blank" color="gray.700">
                                <SiGooglescholar size="22px" />
                            </Link>
                        )}
                        {member.researchGate && (
                            <Link href={member.researchGate} target="_blank" color="gray.700">
                                <FaResearchgate size="22px" color="#00ccbb" />
                            </Link>
                        )}
                        {member.orcid && (
                            <Link href={member.orcid} target="_blank" color="gray.700">
                                <FaOrcid size="22px" color="#A7CF36" />
                            </Link>
                        )}
                        {member.twitter && (
                            <Link href={member.twitter} target="_blank" color="gray.700">
                                <FaTwitter size="22px" color="#1DA1F2" />
                            </Link>
                        )}
                        {member.websites &&
                            member.websites.length > 0 &&
                            member.websites.map((website, index) => (
                                <Link key={index} href={website} target="_blank" color="gray.700">
                                    <FaGlobe size="22px" />
                                </Link>
                            ))}
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" variant="outline" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TeamProfileModal;
