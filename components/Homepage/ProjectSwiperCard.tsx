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
            _hover={{ shadow: "lg", transform: "translateY(-10px)" }}
            transition="all 0.3s ease"
            height="400px" // Set a fixed height for all cards
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            textAlign="left"
        >
            {/* Image Container */}
            <Box overflow="hidden" borderRadius="md" height="200px" position="relative">
                <Image
                    src={`/img/projects/${project.image}`}
                    alt={project.title}
                    borderRadius="md"
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    fallbackSrc="/img/projects/default.png"
                    transition="transform 0.3s ease"
                    _hover={{ transform: "scale(1.1)" }}
                />
            </Box>

            {/* Project Title */}
            <Stack spacing={1} my={"5"} flex="1" justify="center">
                {project.link ? (
                    <Link href={project.link} isExternal>
                        <Heading as="h3" size={{ base: "sm", md: "md" }} _hover={{ color: "yellow.600" }}>
                            {project.number && `${project.number} : `} {/* Fixed template literal */}
                            {project.title}
                        </Heading>
                    </Link>
                ) : (
                    <Heading as="h3" size={{ base: "sm", md: "md" }}>
                        {project.number && `${project.number} : `}
                        {project.title}
                    </Heading>
                )}
            </Stack>

            {/* Link to Project Details */}
            {project.link && (
                <Link href={project.link} isExternal>
                    <Button
                        variant="solid"
                        size="md"
                        _hover={{ bg: "yellow.500", color: "white" }}
                    >
                        View Details
                    </Button>
                </Link>
            )}
        </Box>
    );
};

export default ProjectSwiperCard;
