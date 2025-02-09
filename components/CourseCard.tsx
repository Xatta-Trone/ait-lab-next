import { ChevronRightIcon } from "@chakra-ui/icons";
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
  List,
  ListItem,
  ListIcon,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: CourseTypes;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const bgColor = useColorModeValue("white", "gray.600");
  const headingCol = useColorModeValue("gray.800", "whiteAlpha.900");
  const textCol = useColorModeValue("gray.600", "whiteAlpha.800");
  const listCol = useColorModeValue("yellow.600", "yellow.500");
  const listHeading = useColorModeValue("gray.800", "whiteAlpha.800");

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
              backgroundColor={"#0d1925"}
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

            {/* Additional Links Section */}
            {course.lectures && course.lectures.length > 0 && (
              <>
                <Text fontSize="lg" color={listHeading} mb={1}>
                  <strong>Lectures</strong>
                </Text>
                <List mb={4}>
                  {course.lectures.map((link, index) => (
                    <ListItem key={index}>
                      <ListIcon as={ChevronRightIcon} color="yellow.600" />
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        color={listCol}
                        _hover={{
                          color: "yellow.500",
                          textDecoration: "underline",
                        }}
                      >
                        {link.label}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {/* Conditionally render prerequisite if it exists */}
            {course.prerequisite && (
              <Text fontSize="md" color={headingCol} mb={4}>
                <strong>Prerequisites:</strong>{" "}
                {course.prerequisite.courseTitle} with a minimum grade of{" "}
                {`"${course.prerequisite.grade}"`}.
              </Text>
            )}

            {/* Course Level */}
            {course.level && (
              <Text fontSize="md" color={headingCol} mb={4}>
                <strong>Level:</strong> {course.level}
              </Text>
            )}

            {/* Schedule and Term Pills */}
            <Stack direction="row" spacing={4} mb={4} wrap={"wrap"}>
              {course.schedule && (
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
              )}
              <Badge
                variant="outline"
                borderRadius={"lg"}
                fontSize="sm"
                style={{
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                  textWrap: "wrap",
                }}
              >
                Offered: {course.term}
              </Badge>
            </Stack>

            <Flex wrap={"wrap"} alignItems={"center"} gap={4}>
              {/* Course Site Link */}
              {course.courseSite && (
                <Button
                  variant="solid"
                  size="md"
                  colorScheme="yellow"
                  _hover={{ bg: "yellow.500", color: "white" }}
                  as="a"
                  href={course.courseSite}
                  target="_blank"
                >
                  Course Site
                </Button>
              )}

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
            </Flex>
          </Box>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default CourseCard;
