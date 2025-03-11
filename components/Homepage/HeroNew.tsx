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
  const textCol = useColorModeValue(
    "rgba(0,0,0,0.65)",
    "rgba(255, 255, 255, 0.7)"
  );
  const headingColor = useColorModeValue(
    "rgba(0,0,0,0.8)",
    "rgba(255, 255, 255, 0.8)"
  );
  const radialGradient = useColorModeValue(
    "radial-gradient(circle at center, rgba(255, 224, 130, 0.1), rgba(255, 236, 179, 0.01))",
    "radial-gradient(circle at center, rgba(27, 27, 27, 0.7), rgba(25, 25, 25, 0.01))"
  );
  const buttonText = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(0, 0, 0, 0.65)"
  );
  const { colorMode } = useColorMode();

  return (
    <Box
      position="relative" // Set the hero section relative for layering effects
      zIndex={1} // Ensure this content appears above any background effects like particles or videos
      display="flex" // Use flexbox for centering content
      justifyContent="center" // Horizontally center content
      height="calc(100vh + 90px)" // Full viewport height minus navbar height
      backgroundImage={radialGradient}
      backgroundSize="cover"
      alignItems={"center"}
      backgroundPosition={"center"}
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
          fontSize={{ base: "lg", md: "xl" }} // Responsive font sizes
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
            bgColor={headingColor}
            color={buttonText}
            variant={"solid"}
            _hover={{ bgColor: headingColor, color: buttonText, opacity: 0.9 }}
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
            _hover={{
              color: buttonText,
              backgroundColor: headingColor,
            }}
            borderColor={headingColor}
          >
            Publications
          </Button>
        </Box>
      </Container>
      {/* Bottom divider */}
      <Box
        position="absolute"
        bottom={-2.5}
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
            style={{ fill: colorMode === "light" ? "#ffffff" : "#1b1e24" }}
          ></path>
        </svg>
      </Box>
    </Box>
  );
};

export default HeroNew;
