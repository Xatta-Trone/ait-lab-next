import React from "react";
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

const ResearchPaperItemNew: React.FC<ResearchPaperItemProps> = ({
  title,
  total_citations,
  year,
  url,
  journal,
  publisher,
  img,
  authors,
  pdf_link,
}) => {
  const bgColor = useColorModeValue("white", "gray.600");
  const headingCol = useColorModeValue("gray.800", "whiteAlpha.900");
  const textCol = useColorModeValue("gray.600", "whiteAlpha.800");

  const imageUrl = img
    ? `https://raw.githubusercontent.com/Xatta-Trone/google-scholar-scrapper/refs/heads/main/${img}`
    : `New__Cr_WHBG_AIT_Logo.png`;

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
          {/* Paper Image */}
          <Box flexShrink={0} mr={6}>
            <Image
              src={imageUrl}
              alt={title}
              borderRadius="md"
              boxSize={{ base: "200px", md: "250px" }}
              objectFit="cover"
              fallbackSrc="New__Cr_WHBG_AIT_Logo.png"
            />
          </Box>

          {/* Paper Info */}
          <Box flex="1">
            <Heading
              as="h3"
              size="lg"
              mb={1}
              mt={{ base: 6, md: 0 }}
              color={headingCol}
            >
              {title}
            </Heading>

            <Text fontSize="md" color={textCol} mb={4}>
              {authors && authors.length > 100
                ? `${authors.slice(0, 100)}...`
                : authors}
            </Text>

            <Text fontSize="md" color={headingCol} mb={4}>
              {journal || "No journal information available"}
            </Text>

            {/* Year and Citations Badges */}
            <Stack direction="row" spacing={4} wrap={"wrap"}>
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
                Year: {year}
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
                Citations: {total_citations || 0}
              </Badge>
            </Stack>

            {/* View Publication Button */}
            {url && (
              <Button
                variant="solid"
                size="md"
                colorScheme="yellow"
                _hover={{ bg: "yellow.500", color: "white" }}
                as="a"
                href={url}
                target="_blank"
                mt={4}
              >
                View Publication
              </Button>
            )}
            {/* Download PDF Button */}
            {pdf_link && (
              <Button
                variant="solid"
                size="md"
                colorScheme="yellow"
                _hover={{ bg: "yellow.500", color: "white" }}
                as="a"
                mx={2}
                mt={4}
                href={`https://raw.githubusercontent.com/Xatta-Trone/ait-lab-published-papers/refs/heads/main/${pdf_link}`}
                target="_blank"
              >
                Download Author Copy
              </Button>
            )}
          </Box>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default ResearchPaperItemNew;
