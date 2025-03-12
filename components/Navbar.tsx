"use client";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import navLinks from "@/data/navLinks.json";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Image,
  Box,
  Container,
  Flex,
  HStack,
  Stack,
  Text,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Icon,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update background colors for glassmorphic effect
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.7)", // Light mode - semi-transparent yellow
    "rgba(27, 27, 27, 0.7)" // Dark mode - semi-transparent gray
  );
  const logo = useColorModeValue(
    "2.1New_Horizontal_AIT_Logo.png",
    "2.1New_White_Horizontal_AIT_Logo.png"
  );
  const textCol = useColorModeValue(
    "rgba(0, 0, 0, 0.7)",
    "rgba(255, 255, 255, 0.9)"
  );
  const borderColor = useColorModeValue(
    "rgb(216, 216, 216)", // Light mode border
    "rgba(200, 200, 200, 0.34)" // Dark mode border
  );

  // Determine if the navbar should be transparent
  const isHomepage = pathname === "/home";

  return (
    <Box
      w="100%"
      position="fixed"
      top={0}
      left={0}
      zIndex={10}
      transition="all 0.3s ease"
      height={scrolled ? "60px" : "80px"}
      pt={scrolled ? 1 : 2}
      pb={scrolled ? 2 : 3}
      bg={isHomepage && !scrolled ? "transparent" : bgColor}
      backdropFilter={isHomepage && !scrolled ? "none" : "blur(10px)"}
      borderBottom="1px solid"
      borderColor={isHomepage && !scrolled ? "transparent" : borderColor}
      boxShadow={scrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none"}
      style={{
        WebkitBackdropFilter: isHomepage && !scrolled ? "none" : "blur(10px)",
      }}
    >
      <Container
        maxW="container.xl"
        px={{ base: "10", md: "10" }}
        py={scrolled ? 1 : 2}
        alignItems={"center"}
      >
        <Flex minH="100%" alignItems="center" justifyContent="space-between">
          <Link href="/">
            <Image
              src={logo}
              alt="AIT Lab Logo"
              height={{
                base: scrolled ? "30px" : "40px",
                md: scrolled ? "50px" : "70px",
              }}
              objectFit="cover"
              cursor="pointer"
              transition="all 0.3s ease"
              pb={{ md: scrolled ? 2 : 4 }}
            />
          </Link>

          <Flex gap={6} alignItems={"center"} mb={{ md: scrolled ? 2 : 4 }}>
            <HStack as="nav" spacing={4} display={{ base: "none", lg: "flex" }}>
              {navLinks.map((item) => (
                <Link key={item.path} href={item.path} passHref>
                  <Text
                    fontSize="larger"
                    letterSpacing="wide"
                    color={isHomepage && !scrolled ? "white" : textCol}
                    fontWeight="medium"
                    position="relative"
                    transition="all 0.3s ease"
                    textShadow={
                      isHomepage && !scrolled
                        ? "0 1px 3px rgba(0,0,0,0.3)"
                        : "none"
                    }
                    _before={{
                      content: '""',
                      position: "absolute",
                      width:
                        isMounted && pathname === item.path ? "100%" : "0%",
                      height: "3px",
                      bottom: "-3px",
                      left: "0",
                      backgroundColor:
                        isHomepage && !scrolled ? "white" : "currentColor",
                      transition: "width 0.3s ease-in-out",
                    }}
                    _hover={{
                      _before: {
                        width: "100%",
                      },
                    }}
                  >
                    {item.name}
                  </Text>
                </Link>
              ))}
            </HStack>

            <Icon
              as={colorMode === "light" ? MdDarkMode : MdLightMode}
              color={isHomepage && !scrolled ? "white" : textCol}
              fontSize={"xl"}
              onClick={toggleColorMode}
              _hover={{
                color: colorMode === "dark" ? "whiteAlpha.800" : "black",
              }}
              cursor={"pointer"}
            />

            <IconButton
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Open Menu"
              display={{ lg: "none" }}
              onClick={onOpen}
              color={isHomepage && !scrolled ? "white" : textCol}
              bg="transparent"
              _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
              transition="all 0.3s ease"
              border={"none"}
            />
          </Flex>
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.2)" />
        <DrawerContent
          bg={useColorModeValue(
            "rgba(255, 255, 255, 0.8)",
            "rgba(26, 32, 44, 0.8)"
          )}
          backdropFilter="blur(16px)"
          borderRight="1px solid"
          borderColor={borderColor}
        >
          <DrawerCloseButton />
          <DrawerBody>
            <Stack as="nav" spacing={4} mt={6}>
              {navLinks.map((item) => (
                <Link key={item.path} href={item.path} passHref>
                  <Text fontWeight="bold" onClick={onClose} color={textCol}>
                    {item.name}
                  </Text>
                </Link>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Navbar;
