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

const GrantCard = (props: { grant: GrantTypes }) => {
    const { grant } = props;
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
            <Flex direction="row" alignItems="center">
                {/* Grant Image */}
                <Box flexShrink={0} mr={6}>
                    <Image
                        src={`/img/grants/${grant.image}`}
                        alt={grant.title}
                        borderRadius="md"
                        boxSize={{ base: "200px", md: "250px" }}
                        objectFit="contain"
                        fallbackSrc="/img/grants/default.png"
                    />
                </Box>

                {/* Grant Info */}
                <Box flex="1">
                    <Heading as="h3" size="lg" mb={2}>
                        {grant.title}
                    </Heading>
                    <Text fontSize="md" color="gray.700" mb={4}>
                        {grant.description}
                    </Text>

                    {/* PI and Co-PI Information */}
                    <Text fontSize="md" color="gray.600" mb={4}>
                        <strong>{grant.PI_role === "Co-PI" ? "Co-PI" : "PI"}:</strong>{" "}
                        {grant.PI}
                    </Text>

                    {/* Grant Metadata */}
                    <Stack direction="row" spacing={4} mb={4}>
                        <Badge variant="solid" colorScheme="teal" fontSize="sm">
                            Status: {grant.status}
                        </Badge>
                        <Badge variant="solid" colorScheme="blue" fontSize="sm">
                            Budget: {grant.budget}
                        </Badge>
                        <Badge variant="solid" colorScheme="purple" fontSize="sm">
                            Duration: {grant.start_year} - {grant.end_year}
                        </Badge>
                    </Stack>

                    {/* Link to Grant Details */}
                    {grant.link && (
                        <Link href={grant.link} isExternal>
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
            </Flex>
        </Box>
    );
};

export default GrantCard;