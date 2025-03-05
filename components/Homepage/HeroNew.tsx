"use client"; // This component uses client-side rendering

import {
  Box,
  Button,
  Container,
  Heading,
  List,
  ListIcon,
  ListItem,
  useColorMode,
  useColorModeValue,
  Link,
} from "@chakra-ui/react"; // Chakra UI components
import React from "react";
import { HiMiniArrowRightCircle } from "react-icons/hi2"; // Icon for list items
import { FaProjectDiagram, FaBook } from "react-icons/fa"; // Icons for buttons

const HeroNew = () => {
  const bgGradient = useColorModeValue(
    "linear(to-b, rgba(183, 121, 31, 0.9), rgba(183, 121, 31, 0.6), rgba(183, 121, 31, 0.9))",
    "linear(to-b, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9))"
  );
  const textCol = useColorModeValue("black", "white");
  const headingColor = useColorModeValue("yellow.600", "white");
  const bgColor = useColorModeValue("yellow.50", "gray.600");
  const { colorMode } = useColorMode();

  return (
    <Box
      position="relative" // Set the hero section relative for layering effects
      zIndex={1} // Ensure this content appears above any background effects like particles or videos
      display="flex" // Use flexbox for centering content
      justifyContent="center" // Horizontally center content
      height="calc(100vh + 90px)" // Full viewport height minus navbar height
      // Vertically center content
      //   backgroundImage={`${bgGradient}, url(./hero.png)`}
      alignItems={"center"}
      backgroundPosition={"center"}
      backgroundColor={bgColor}
    >
      <Container maxW="container.xl" px={{ base: "5", md: "10" }} w={"full"}>
        {" "}
        {/* Responsive container */}
        {/* Main Heading */}
        <Heading
          color={headingColor} // Text color for contrast against background
          textAlign="center" // Align heading text to the left
          as="h1" // Semantic HTML tag for primary heading
          size={{ base: "2xl", md: "3xl" }} // Responsive font sizes
          pb="20px" // Add padding below the heading
          lineHeight={1.2} // Adjust line height for readability
        >
          Artificial Intelligence in <br /> Transportation Lab{" "}
          {/* Line break for emphasis */}
        </Heading>
        {/* Key Features List */}
        <List
          spacing={2} // Add spacing between list items
          textAlign="center" // Align list items to the left
          color={textCol} // Text color for visibility
          mt={4} // Margin above the list
          fontSize={{ base: "xl", md: "2xl" }} // Responsive font sizes
          lineHeight={1.2} // Adjust line height for readability
        >
          {/* First Feature */}
          <ListItem>
            <ListIcon as={HiMiniArrowRightCircle} color={textCol} />
            {/* Arrow icon */}
            Causal Artificial Intelligence
          </ListItem>

          {/* Second Feature */}
          <ListItem>
            <ListIcon as={HiMiniArrowRightCircle} color={textCol} />
            Transportation Safety and Operations
          </ListItem>

          {/* Third Feature */}
          <ListItem>
            <ListIcon as={HiMiniArrowRightCircle} color={textCol} />
            Infrastructure readiness for disruptive technologies
          </ListItem>
        </List>
        <Box
          display="flex"
          justifyContent="center"
          gap={4}
          mt={8}
          flexWrap={"wrap"}
        >
          <Button
            as={Link}
            href="/projects-and-grants"
            size="lg"
            colorScheme="yellow"
            variant={"solid"}
            leftIcon={<FaProjectDiagram />}
          >
            View Projects
          </Button>
          <Button
            as={Link}
            href="/publication"
            size="lg"
            variant="outline"
            leftIcon={<FaBook />}
            color={headingColor}
            _hover={{ color: "white", backgroundColor: "yellow.600" }}
          >
            Publications
          </Button>
        </Box>
      </Container>
      {/* Bottom divider */}
      <Box
        position="absolute"
        bottom={-3}
        w="100%"
        overflowX="hidden"
        zIndex={-1}
        className="custom-shape-divider-bottom-1730319297"
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="shape-fill"
            style={{ fill: colorMode === "light" ? "#ffffff" : "#2d3748" }}
          ></path>
        </svg>
      </Box>
    </Box>
  );
};

export default HeroNew;
