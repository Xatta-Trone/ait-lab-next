/** @format */
"use client";

import React from "react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Container,
  Button,
  LinkBox,
  Flex,
  LinkOverlay,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { HiExternalLink } from "react-icons/hi";
import newsData from "@/data/news.json"; // Import news data
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";

// Animation variants for container and items
const containerVariants = {
  hidden: { opacity: 0 }, // Initially hidden
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger animations for children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 }, // Start off-screen (below)
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const RecentNews = () => {
  const { colorMode } = useColorMode();

  const bgColor = useColorModeValue("yellow.50", "gray.600");
  const headingColor = useColorModeValue("yellow.600", "white");
  const boxBg = useColorModeValue("white", "gray.700");
  const cardHeading = useColorModeValue("yellow.600", "whiteAlpha.800");
  const textCol = useColorModeValue("gray.500", "gray.400");

  // Get the five most recent news items and parse dates for sorting
  const recentNewsItems = newsData
    .map((item) => ({
      ...item,
      date: new Date(item.date), // Convert date string to Date object
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort by date descending
    .slice(0, 5); // Take the top 5 items

  return (
    <Box
      pb={40} // Padding at the bottom
      pt={"20"} // Padding at the top
      bg={bgColor} // Background color
      position={"relative"} // Position relative for custom shapes
    >
      {/* Container for the section */}
      <Container maxW="container.xl" px={{ base: "10", md: "10" }}>
        {/* Section Heading */}
        <Heading
          as="h2"
          size="lg"
          textAlign="center"
          color={headingColor}
          marginBottom={"20"} // Space below heading
          fontSize={{ base: "4xl", md: "5xl" }} // Responsive font size
        >
          Recent News
        </Heading>

        {/* Animated news list container */}
        <motion.div
          variants={containerVariants} // Apply staggered animations
          initial="hidden" // Start with hidden state
          whileInView="visible" // Animate to visible state when in view
          viewport={{ once: true, amount: 0.1 }} // Trigger animation when 10% of the section is in view
        >
          {/* Stack of news items */}
          <Stack spacing={6} my={10}>
            {recentNewsItems.map((news, index) => (
              <motion.div
                key={index}
                variants={itemVariants} // Apply animation variants to each item
                whileHover={{
                  y: -5,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", // Hover animation
                }}
              >
                {/* Individual news item card */}
                <LinkBox
                  as="article"
                  p={5} // Padding inside the card
                  shadow="md" // Box shadow
                  borderWidth="1px" // Border
                  borderRadius="md" // Rounded corners
                  bg={boxBg} // Background color
                  transition="all 0.3s ease" // Smooth transition
                  cursor={news.link ? "pointer" : "default"} // Pointer cursor if link exists
                >
                  {/* Date and title section */}
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="bold" color={textCol} fontSize="md">
                      {new Date(news.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}{" "}
                      :: {news.title}
                    </Text>
                  </Flex>

                  {/* News description */}
                  <Text color={cardHeading} fontSize="lg" fontWeight="bold">
                    {news.link ? (
                      // Link to external news source
                      <LinkOverlay href={news.link} isExternal>
                        {news.description} <ExternalLinkIcon mx="2px" />
                      </LinkOverlay>
                    ) : (
                      news.description
                    )}
                  </Text>
                </LinkBox>
              </motion.div>
            ))}
          </Stack>
        </motion.div>

        {/* Button to view all news */}
        <Box textAlign={"center"}>
          <Link href="/news">
            <Button
              variant="solid" // Solid button style
              width="fit-content" // Fit button width to content
              alignContent="center"
              size="lg" // Large button size
              _hover={{ bg: "yellow.500", color: "white" }} // Hover effect
            >
              All News
            </Button>
          </Link>
        </Box>
      </Container>

      {/* Bottom SVG Divider */}
      <Box
        position="absolute"
        bottom={-1} // Positioned at the bottom
        w={"100%"} // Full width
        overflowX={"hidden"} // Hide overflow on X-axis
        zIndex={1} // Ensure above background
        className="custom-shape-divider-bottom-1730319297"
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none" // Maintain aspect ratio
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="shape-fill"
            style={{ fill: colorMode === "light" ? "#ffffff" : "#2d3748" }} // Class for custom shape fill
          ></path>
        </svg>
      </Box>
    </Box>
  );
};

export default RecentNews;
