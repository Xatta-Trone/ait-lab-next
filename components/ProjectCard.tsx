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
  useColorModeValue,
} from "@chakra-ui/react";

const ProjectCard = (props: { project: ProjectTypes }) => {
  const { project } = props;

  const bgColor = useColorModeValue("white", "gray.600");
  const headingCol = useColorModeValue("gray.800", "whiteAlpha.900");
  const textCol = useColorModeValue("gray.600", "whiteAlpha.800");

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg={bgColor}
      _hover={{
        shadow: "xl",
        transform: "translateY(-10px)",
      }}
      transition="all 0.3s ease-in-out"
      width="100%"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        wrap={"wrap"}
      >
        {/* project Image */}
        <Box flexShrink={0} mr={6}>
          <Image
            src={`/img/stock_projs/${project.image}`}
            // src={`/img/new_proj_grant/${project.image}`}
            alt={project.title}
            borderRadius="md"
            boxSize={{ base: "200px", md: "250px" }}
            objectFit="cover"
            fallbackSrc="/AIT_Favicon.png"
            backgroundColor={"white"}
          />
        </Box>

        {/* project Info */}
        <Box flex="1">
          <Heading
            as="h3"
            size="lg"
            mb={2}
            mt={{ base: 6, md: 0 }}
            color={headingCol}
          >
            {project.number && `${project.number} : `}
            {project.title}
          </Heading>
          <Text fontSize="md" color={headingCol} mb={4}>
            {project.description}
          </Text>

          {/* PI and Co-PI Information */}
          <Text fontSize="md" color={textCol} mb={4}>
            <strong>
              {project.PI_role === "Co-PI"
                ? "Co-Principal Investigator"
                : project.PI_role === "Key Researcher"
                ? "Key Researcher"
                : "Principal Investigator"}
              :
            </strong>{" "}
            {project.PI}
          </Text>

          {/* project Metadata */}
          <Stack direction="row" spacing={4} mb={4} wrap={"wrap"}>
            <Badge
              variant="outline"
              fontSize="sm"
              borderRadius={"lg"}
              style={{
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "2px",
                paddingBottom: "2px",
              }}
            >
              Status: {project.status}
            </Badge>
            <Badge
              variant="outline"
              fontSize="sm"
              borderRadius={"lg"}
              style={{
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "2px",
                paddingBottom: "2px",
              }}
            >
              {project.start_date.month} {project.start_date.year} -{" "}
              {project.end_date.month} {project.end_date.year}
            </Badge>
            {project.sponsor && (
              <Badge
                variant="outline"
                fontSize="sm"
                borderRadius={"lg"}
                style={{
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}
              >
                Sponsor: {project.sponsor}
              </Badge>
            )}
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
