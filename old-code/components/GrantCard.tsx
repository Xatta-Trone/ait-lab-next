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

const GrantCard = (props: { grant: GrantTypes }) => {
  const bgColor = useColorModeValue("white", "gray.600");
  const headingCol = useColorModeValue("gray.800", "whiteAlpha.900");
  const textCol = useColorModeValue("gray.600", "whiteAlpha.800");

  const { grant } = props;
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
        {/* Grant Image */}
        <Box flexShrink={0} mr={6}>
          <Image
            src={`/img/stock_projs/${grant.image}`}
            // src={`/img/new_proj_grant/${grant.image}`}
            alt={grant.title}
            borderRadius="md"
            boxSize={{ base: "200px", md: "250px" }}
            objectFit="cover"
            fallbackSrc="/AIT_Favicon.png"
            backgroundColor={"white"}
          />
        </Box>

        {/* Grant Info */}
        <Box flex="1">
          <Heading
            as="h3"
            size="lg"
            mb={2}
            mt={{ base: 6, md: 0 }}
            color={headingCol}
          >
            {grant.title}
          </Heading>
          <Text fontSize="md" color={headingCol} mb={4}>
            {grant.description}
          </Text>

          {/* PI and Co-PI Information */}
          <Text fontSize="md" color={textCol} mb={4}>
            <strong>
              {grant.PI_role === "Co-PI"
                ? "Co-Principal Investigator"
                : "Principal Investigator"}
              :
            </strong>{" "}
            {grant.PI}
          </Text>

          {/* Grant Metadata */}
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
              Status: {grant.status}
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
              Budget: {grant.budget}
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
              Duration: {grant.start_year} - {grant.end_year}
            </Badge>
          </Stack>

          {/* Link to Grant Details */}
          {grant.link && (
            <Link href={grant.link} isExternal>
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

export default GrantCard;
