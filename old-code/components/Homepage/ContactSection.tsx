"use client";

import {
  Box,
  chakra,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"; // Chakra UI components
import quickLinks from "@/data/navLinks.json"; // Import quick links data
import { isValidMotionProp, motion } from "framer-motion"; // Framer Motion for animations
import { useEffect, useRef, useState } from "react";

// Create a MotionBox using chakra and motion
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const ContactSection = () => {
  const bgColor = useColorModeValue("gray.700", "gray.800");
  const textCol = "rgba(255, 255, 255, 0.7)";
  const headingColor = "rgba(255, 255, 255, 0.8)";
  const logo = useColorModeValue(
    "/New_GC_White_AIT_Logo.png",
    "/Free_New_White_AIT_Logo.png"
  );

  const [isInView, setIsInView] = useState(false); // State to track if the section is in view
  const sectionRef = useRef<HTMLDivElement | null>(null); // Ref to monitor section visibility

  // IntersectionObserver to trigger animations when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); // Trigger animation when the section is visible
          observer.disconnect(); // Disconnect observer to optimize performance
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Start observing the section
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Clean up observer on unmount
      }
    };
  }, []);

  return (
    <Box bg={bgColor} color={"white"} py={40} ref={sectionRef}>
      <Container maxW="container.xl" mx="auto" px={{ base: "10", md: "10" }}>
        <Flex
          direction={{ base: "column", lg: "row" }} // Responsive layout for mobile and desktop
          justify="space-between"
          align="flex-start"
          gap={{ base: 8, md: 4 }}
        >
          {/* Logo Section */}
          <VStack
            align="flex-start"
            w={{ base: "100%", md: "60%", lg: "33%", xl: "40%" }} // Adjust width for responsiveness
            spacing={4}
          >
            <MotionBox
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    }
                  : {}
              } // Animate when in view
              initial={{ opacity: 0, y: 50 }} // Initial state before animation
            >
              <Image
                // src="/Free_New_White_AIT_Logo.png"
                src={logo}
                // src="/New_WH_Circle_AIT_Logo.png"
                // src="/New_WHBG_AIT_Logo.png"
                alt="Artificial Intelligence in Highway Safety"
                borderRadius="xl"
                width={"100%"}
                objectFit="contain" // Maintain aspect ratio
              />
            </MotionBox>
          </VStack>

          {/* Contact Section */}
          <MotionBox
            initial={{ opacity: 0, y: 50 }} // Start off-screen
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  }
                : {}
            }
          >
            <VStack
              align="flex-start"
              spacing={2}
              w={{ base: "100%", md: "auto" }}
              maxW="full"
            >
              <Heading
                size="xl"
                mb={6}
                as={"h4"}
                color={headingColor}
                mt={{ base: 20, lg: 0 }}
              >
                Contact Us
              </Heading>
              <Text mb={4} color={textCol}>
                Artificial Intelligence in Transportation Lab,
                <br />
                Roy F Mitte Building, Room #5246,
                <br />
                Texas State University, San Marcos, TX 78666
              </Text>
              <Link
                href="mailto:subasish@txstate.edu" // Email link
                isExternal
              >
                <Text
                  color={headingColor}
                  position="relative"
                  paddingBottom="3px"
                  _before={{
                    content: '""',
                    position: "absolute",
                    width: "0%", // Initial underline width
                    height: "2px",
                    bottom: "-2px",
                    left: "0",
                    backgroundColor: textCol,
                    transition: "width 0.3s ease-in-out", // Smooth transition
                  }}
                  _hover={{
                    _before: { width: "100%" }, // Expand underline on hover
                  }}
                >
                  subasish@txstate.edu
                </Text>
              </Link>
            </VStack>
          </MotionBox>

          {/* Quick Links Section */}
          <MotionBox
            initial={{ opacity: 0, y: 50 }} // Start off-screen
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  }
                : {}
            }
          >
            <VStack
              align="flex-start"
              spacing={2}
              w={{ base: "100%", md: "auto" }}
              maxW="full"
            >
              <Heading
                size="xl"
                mb={6}
                as={"h4"}
                mt={{ base: 10, lg: 0 }}
                color={headingColor}
              >
                Quick Links
              </Heading>
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.path}>
                  <Text
                    color={headingColor}
                    position="relative"
                    paddingBottom="3px"
                    _before={{
                      content: '""',
                      position: "absolute",
                      width: "0%", // Initial underline width
                      height: "2px",
                      bottom: "-2px",
                      left: "0",
                      backgroundColor: textCol,
                      transition: "width 0.3s ease-in-out", // Smooth transition
                    }}
                    _hover={{
                      _before: { width: "100%" }, // Expand underline on hover
                    }}
                  >
                    {link.name}
                  </Text>
                </Link>
              ))}
            </VStack>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
};

export default ContactSection;
