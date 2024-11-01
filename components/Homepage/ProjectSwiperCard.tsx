import React from "react";
import { Box, Text, Stack, Link, Button, Image, Heading } from "@chakra-ui/react";

const ProjectSwiperCard = (props: { project: ProjectTypes }) => {
    const { project } = props;

    return (
        <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            _hover={{ shadow: "lg", transform: "translateY(-10px)" }} // Hover effect for the card
            transition="all 0.3s ease"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            textAlign="left"
        >
            {/* Image Container */}
            <Box overflow="hidden" borderRadius="md" height="200px" position="relative">
                <Image
                    src={`/img/projects/${project.image}`} // Image path
                    alt={project.title}
                    borderRadius="md"
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    fallbackSrc="/img/projects/default.png" // Fallback image
                    transition="transform 0.3s ease"
                    _hover={{ transform: "scale(1.1)" }} // Zoom effect on hover
                />
            </Box>

            {/* Project Title and Description */}
            <Stack spacing={1} my={"5"} flex="1">
                {project.link ? (
                    <Link href={project.link} isExternal>
                        <Heading as="h3" size={{ base: "sm", md: "md" }} mb={2} _hover={{ color: "blue.600" }}>
                            {project.number && `${project.number} : `} {/* Fixed template literal */}
                            {project.title}
                        </Heading>
                    </Link>
                ) : (
                    <Heading as="h3" size={{ base: "sm", md: "md" }} mb={2}>
                        {project.number && `${project.number} : `} {/* Fixed template literal */}
                        {project.title}
                    </Heading>
                )}
                <Text fontSize="md" color="gray.700" noOfLines={2}> {/* Truncate description */}
                    {project.description}
                </Text>
            </Stack>

            {/* Link to Project Details */}
            {project.link && (
                <Link href={project.link} isExternal>
                    <Button
                        variant="solid"
                        size="md"
                        _hover={{ bg: "blue.500", color: "white" }}
                    >
                        View Details
                    </Button>
                </Link>
            )}
        </Box>
    );
};

export default ProjectSwiperCard;
