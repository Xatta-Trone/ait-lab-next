import React from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    Badge,
    Button,
    Image,
    List,
    ListItem,
    ListIcon,
    Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "@chakra-ui/icons";

const LabToolsCard: React.FC<LabTools> = ({
    title,
    project,
    description,
    latestProjectLink,
    links,
    image,
}) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 50 }, // Initial hidden state
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 }, // Smooth transition
                },
            }}
        >
            <Box
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="lg"
                bg="white"
                _hover={{
                    shadow: "xl",
                    transform: "translateY(-10px)", // Hover effect: Elevate and move up slightly
                }}
                transition="all 0.3s ease-in-out"
                width="100%"
            >
                <Flex direction={["column", "row"]} alignItems="center" wrap={"wrap"}>
                    {/* Tool Image */}
                    <Box flexShrink={0} mr={6}>
                        <Image
                            src={`/img/lab_tools/${image}`} // Dynamic path for the image
                            alt={title}
                            borderRadius="md"
                            boxSize={{ base: "200px", md: "250px" }} // Responsive sizing
                            objectFit="cover"
                            fallbackSrc="/New_AIT_Favicon.png" // Default fallback image
                        />
                    </Box>

                    {/* Tool Information */}
                    <Box flex="1">
                        {/* Tool Title */}
                        <Heading as="h3" size="lg" mb={2} mt={{ base: 6, md: 0 }}>
                            {title}
                        </Heading>

                        {/* Tool Description */}
                        <Text fontSize="md" color="gray.700" mb={4}>
                            {description}
                        </Text>

                        {/* Additional Links Section */}
                        {links.length > 0 && (
                            <>
                                <Text fontSize="lg" color="gray.600" mb={1}>
                                    <strong>Links</strong>
                                </Text>
                                <List mb={4}>
                                    {links.map((link, index) => (
                                        <ListItem key={index}>
                                            <ListIcon as={ChevronRightIcon} color="yellow.600" />
                                            <Link
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                color="yellow.600"
                                                _hover={{ color: "yellow.500", textDecoration: "underline" }}
                                            >
                                                {link.label}
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )}

                        {/* Project Badge */}
                        {project && (
                            <Stack direction="row" spacing={4} mb={4} wrap={"wrap"}>
                                <Badge
                                    variant="outline"
                                    fontSize="sm"
                                    borderRadius={"lg"}
                                    style={{ padding: "2px 8px" }}
                                >
                                    {project}
                                </Badge>
                            </Stack>
                        )}

                        {/* View Tool Button */}
                        {latestProjectLink && (
                            <Button
                                variant="solid"
                                size="md"
                                colorScheme="yellow"
                                _hover={{ bg: "yellow.500", color: "white" }}
                                as="a"
                                href={latestProjectLink}
                                target="_blank"
                            >
                                View Tool
                            </Button>
                        )}
                    </Box>
                </Flex>
            </Box>
        </motion.div>
    );
};

export default LabToolsCard;
