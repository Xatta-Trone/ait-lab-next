// ProjectSwiperCard.tsx
import React from "react";
import { Box, Flex, Image, Heading, Text, Stack, Badge, Link, Button } from "@chakra-ui/react";

const ProjectSwiperCard = (props: { project: ProjectTypes }) => {
    const { project } = props;

    return (
        <Box
            p={{ base: 4, md: 5 }} // Responsive padding
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            _hover={{
                shadow: "xl",
                transform: "translateY(-10px)",
            }}
            transition="all 0.3s ease-in-out"
            maxWidth="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
        >
            {/* Project Image */}
            <Box flexShrink={0} mb={4}>
                <Image
                    src={`/img/projects/${project.image}`}
                    alt={project.title}
                    borderRadius="md"
                    boxSize={{ base: "180px", md: "250px" }} // Responsive sizing
                    objectFit="contain"
                    fallbackSrc="/img/projects/default.png"
                />
            </Box>

            {/* Project Info */}
            <Box textAlign="left" width={"100%"} display={"flex"} flexDirection={"column"} flexGrow={1}>
                <Box>
                    {/* Clickable Project Title */}
                    {project.link ? (
                        <Link href={project.link} isExternal>
                            <Heading as="h3" size={{ base: "sm", md: "md" }} mb={2} _hover={{ color: "blue.600" }}>
                                {project.number && `${project.number} : `}
                                {project.title}
                            </Heading>
                        </Link>
                    ) : (
                        <Heading as="h3" size={{ base: "sm", md: "md" }} mb={2}>
                            {project.number && `${project.number} : `}
                            {project.title}
                        </Heading>
                    )}
                </Box>
                <Box flexGrow={1}>
                    <Text fontSize={{ base: "small", md: "sm" }} color="gray.700" mb={4}>
                        {project.description}
                    </Text>

                    {/* PI and Co-PI Information */}
                    <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" mb={4}>
                        <strong>
                            {project.PI_role === "Co-PI" ? "Co-PI" : project.PI_role === "Key Researcher" ? "Key Researcher" : "PI"}:
                        </strong>{" "}
                        {project.PI}
                    </Text>

                    {/* Project Metadata */}
                    <Stack direction="row" spacing={2} mb={4} justify="left" wrap={"wrap"}>
                        <Badge variant="outline" colorScheme="blue" fontSize="sm">
                            Status: {project.status}
                        </Badge>
                        <Badge variant="outline" colorScheme="blue" fontSize="sm">
                            {project.start_date.month} {project.start_date.year} - {project.end_date.month} {project.end_date.year}
                        </Badge>
                        <Badge variant="outline" colorScheme="blue" fontSize="sm">
                            Sponsor: {project.sponsor}
                        </Badge>
                    </Stack>

                    {/* Link to project Details */}
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
            </Box>
        </Box>
    );
};

export default ProjectSwiperCard;
