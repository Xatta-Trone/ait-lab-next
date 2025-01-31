import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Badge,
  Button,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: CourseTypes;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const bgColor = useColorModeValue("white", "gray.600");
  const headingCol = useColorModeValue("gray.800", "whiteAlpha.900");
  const textCol = useColorModeValue("gray.600", "whiteAlpha.800");
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
        bg={bgColor}
        _hover={{
          shadow: "xl",
          transform: "translateY(-10px)",
        }}
        transition="all 0.3s ease-in-out"
        width="100%"
      >
        <Flex direction={["column", "row"]} alignItems="center">
          {/* Course Image */}
          <Box flexShrink={0} mr={6}>
            <Image
              src={`/img/courses/${course.image}`}
              alt={course.title}
              borderRadius="md"
              boxSize={{ base: "200px", md: "250px" }}
              objectFit="contain"
              fallbackSrc="/AIT_Favicon.png"
              backgroundColor={"white"}
            />
          </Box>

          {/* Course Info */}
          <Box flex="1">
            <Heading
              as="h3"
              size="lg"
              mb={2}
              mt={{ base: 6, md: 0 }}
              color={headingCol}
            >
              {course.title}
            </Heading>

            <Text fontSize="md" mb={4} color={textCol}>
              {course.description}
            </Text>

            {/* Conditionally render prerequisite if it exists */}
            {course.prerequisite && (
              <Text fontSize="md" color={headingCol} mb={4}>
                <strong>Prerequisites:</strong>{" "}
                {course.prerequisite.courseTitle} with a minimum grade of{" "}
                {`"${course.prerequisite.grade}"`}.
              </Text>
            )}

            {/* Schedule and Term Pills */}
            <Stack direction="row" spacing={4} mb={4} wrap={"wrap"}>
              <Badge
                variant="outline"
                borderRadius={"lg"}
                fontSize="sm"
                style={{
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}
              >
                Schedule: {course.schedule}
              </Badge>
              <Badge
                variant="outline"
                borderRadius={"lg"}
                fontSize="sm"
                style={{
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}
              >
                Term: {course.term}
              </Badge>
            </Stack>

            {/* Link to full course list */}
            <Button
              variant="solid"
              size="md"
              colorScheme="yellow"
              _hover={{ bg: "yellow.500", color: "white" }}
              as="a"
              href="http://mycatalog.txstate.edu/courses/ce/"
              width={"fit-content"}
              target="_blank"
            >
              Full Course List
            </Button>
          </Box>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default CourseCard;
