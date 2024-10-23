import { Box, Flex, Heading, Text, Stack, Badge, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface CourseCardProps {
    course: CourseTypes;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
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
                    transform: "translateY(-10px)",
                }}
                transition="all 0.3s ease-in-out"
                width="100%"
            >
                <Flex direction="column">
                    <Heading as="h3" size="lg" mb={2}>
                        {course.title}
                    </Heading>
                    <Text fontSize="md" color="gray.700" mb={4}>
                        {course.description}
                    </Text>
                    <Text fontSize="md" color="gray.700" mb={4}>
                        Prerequisite: {course.prerequisite.courseTitle} with a minimum grade of {`"${course.prerequisite.grade}"`}.
                    </Text>

                    {/* Schedule and Term Pills */}
                    <Stack direction="row" spacing={4} mb={4}>
                        <Badge variant="solid" colorScheme="green" fontSize="sm">
                            Schedule: {course.schedule}
                        </Badge>
                        <Badge variant="solid" colorScheme="blue" fontSize="sm">
                            Term: {course.term}
                        </Badge>
                    </Stack>

                    {/* Link to full course list */}
                    <Button
                        variant="solid"
                        size="md"
                        colorScheme="blue"
                        _hover={{ bg: "blue.500", color: "white" }}
                        as="a"
                        href="https://example.com/full-courses"
                        width={"fit-content"}
                    >
                        Full Course List
                    </Button>
                </Flex>
            </Box>
        </motion.div>
    );
};

export default CourseCard;
