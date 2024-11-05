/** @format */

import React from "react";
import {
    Box,
    Flex,
    Image,
    Heading,
    Text,
    Stack,
    Badge,
    Link,
    Button,
} from "@chakra-ui/react";

const ProjectCard = (props: { project: ProjectTypes }) => {
    const { project } = props;
    return (
        <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            _hover={{
                shadow: "xl",
                transform: "translateY(-10px)",
            }}
            transition="all 0.3s ease-in-out"
            width="100%"
        >
            <Flex direction={{ base: "column", md: "row" }} alignItems="center" wrap={"wrap"}>
                {/* project Image */}
                <Box flexShrink={0} mr={6}>
                    <Image
                        src={`/img/projects/${project.image}`}
                        alt={project.title}
                        borderRadius="md"
                        boxSize={{ base: "200px", md: "250px" }}
                        objectFit="contain"
                        fallbackSrc="/img/projects/default.png"
                    />
                </Box>

                {/* project Info */}
                <Box flex="1">
                    <Heading as="h3" size="lg" mb={2}>
                        {project.number && `${project.number} : `}
                        {project.title}
                    </Heading>
                    <Text fontSize="md" color="gray.700" mb={4}>
                        {project.description}
                    </Text>

                    {/* PI and Co-PI Information */}
                    <Text fontSize="md" color="gray.600" mb={4}>
                        <strong>{project.PI_role === "Co-PI" ? "Co-PI" : project.PI_role === "Key Researcher" ? "Key Researcher" : "PI"}:</strong>{" "}
                        {project.PI}
                    </Text>

                    {/* project Metadata */}
                    <Stack direction="row" spacing={4} mb={4} wrap={"wrap"}>
                        <Badge variant="outline" fontSize="sm" borderRadius={"lg"} paddingY={"2px"} paddingX={"5px"}>
                            Status: {project.status}
                        </Badge>
                        <Badge variant="outline" fontSize="sm" borderRadius={"lg"} paddingY={"2px"} paddingX={"5px"}>
                            {project.start_date.month} {project.start_date.year} - {project.end_date.month} {project.end_date.year}
                        </Badge>
                        <Badge variant="outline" fontSize="sm" borderRadius={"lg"} paddingY={"2px"} paddingX={"5px"}>
                            Sponsor: {project.sponsor}
                        </Badge>
                    </Stack>

                    {/* Link to project Details */}
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
            </Flex>
        </Box>
    );
};

export default ProjectCard;
