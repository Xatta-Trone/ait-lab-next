"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  Link,
  Flex,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react"; // Chakra UI components
import { motion, isValidMotionProp } from "framer-motion"; // Framer Motion for animations
import { chakra } from "@chakra-ui/react"; // Chakra wrapper for motion
import { FaShoppingCart } from "react-icons/fa"; // Icon for the "Order Here" button

// Create a motion-enabled Box component
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const BookSection = () => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.7)",
    "rgb(27, 30, 36, 0.7)"
  );
  const headingCol = useColorModeValue(
    "rgba(0,0,0,0.8)",
    "rgba(255, 255, 255, 0.8)"
  );
  const textColor = useColorModeValue(
    "rgba(0,0,0,0.65)",
    "rgba(255, 255, 255, 0.7)"
  );
  const buttonBg = useColorModeValue(
    "rgba(0,0,0,0.8)",
    "rgba(255, 255, 255, 0.8)"
  );
  const buttonText = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(0, 0, 0, 0.65)"
  );

  const [isInView, setIsInView] = useState(false); // State to track if the section is in view
  const sectionRef = useRef(null); // Ref to monitor section visibility

  // Use IntersectionObserver to detect when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); // Trigger animations when the section comes into view
          observer.disconnect(); // Disconnect observer after triggering
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Observe the section
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Clean up observer on unmount
      }
    };
  }, []);

  return (
    <Box pb={40} pt={"20"} bg={bgColor} position={"relative"} ref={sectionRef}>
      {/* Container for section content */}
      <Container maxW="container.xl" px={{ base: "10", md: "10" }}>
        {/* Section Heading with motion animation */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }} // Initial state before animation
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                } // Animate into view
              : {}
          }
          textAlign="center"
          mb={5}
        >
          <Heading
            as="h2"
            size="lg"
            color={headingCol}
            fontSize={{ base: "4xl", md: "5xl" }}
          >
            A New Text Book
          </Heading>
        </MotionBox>

        {/* Content layout with text and image */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Text Section */}
          <MotionBox
            flex="1"
            pr={{ md: 5 }}
            mb={{ base: 6, md: 0 }}
            initial={{ opacity: 0, x: -50 }} // Start off-screen to the left
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.8, ease: "easeOut" },
                  } // Slide into view
                : {}
            }
          >
            <Heading
              as="h3"
              size="lg"
              mb={5}
              mt={{ base: 10, lg: 0 }}
              color={textColor}
            >
              Artificial Intelligence in Highway Safety <br /> by Dr. Subasish
              Das
            </Heading>
            <Text fontSize="lg" color={textColor} lineHeight="taller" mb={6}>
              Artificial Intelligence in Highway Safety provides cutting-edge
              advances in highway safety using AI. The author is a highway
              safety expert, drawing attention to the predictive powers of AI
              techniques in solving complex problems for safety improvement.
            </Text>

            {/* Order Button */}
            <Link
              href="https://www.routledge.com/Artificial-Intelligence-in-Highway-Safety/Das/p/book/9780367436704"
              isExternal
            >
              <Button
                size="lg"
                variant="solid"
                bg={buttonBg}
                color={buttonText}
                _hover={{
                  opacity: 0.9,
                }}
                borderColor={buttonBg}
                rightIcon={<FaShoppingCart />} // Shopping cart icon
              >
                Order Here
              </Button>
            </Link>
          </MotionBox>

          {/* Image Section */}
          <MotionBox
            flexShrink={0}
            initial={{ opacity: 0, x: 50 }} // Start off-screen to the right
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
                  } // Slide into view with delay
                : {}
            }
          >
            <Image
              src="/img/aihs1.png" // Path to the book image
              alt="Artificial Intelligence in Highway Safety"
              borderRadius="sm"
              boxSize={{ base: "350px", md: "500px" }} // Responsive image size
              objectFit="contain" // Maintain image aspect ratio
            />
          </MotionBox>
        </Flex>
      </Container>

      {/* Decorative SVG shape divider */}
      <Box
        position="absolute"
        bottom={-1}
        w={"100%"}
        overflowX={"hidden"}
        zIndex={1}
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
            className="dark-fill"
            style={{ fill: colorMode === "light" ? "#2d3748" : "#1a202c" }}
          ></path>
        </svg>
      </Box>
    </Box>
  );
};

export default BookSection;
