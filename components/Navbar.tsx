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
import { MdDarkMode, MdLightMode } from "react-icons/md"

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

    const bgColor = useColorModeValue("yellow.600", "gray.800")

    // Determine if the navbar should be transparent
    const isHomepage = pathname === "/";

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
            bg={isHomepage && !scrolled ? "transparent" : bgColor} // Change background based on the page
            boxShadow={scrolled ? "md" : "none"}
        >
            <Container maxW="container.xl" px={{ base: "10", md: "10" }} py={scrolled ? 1 : 2}>
                <Flex h="100%" alignItems="center" justifyContent="space-between">
                    <Link href="/">
                        <Image
                            src="2.1New_White_Horizontal_AIT_Logo.png"
                            alt="AIT Lab Logo"
                            height={{ base: scrolled ? '30px' : '40px', md: scrolled ? '50px' : '70px' }}
                            objectFit="cover"
                            cursor="pointer"
                            transition="all 0.3s ease"
                            pb={{ md: scrolled ? 2 : 4 }}
                        />
                    </Link>

                    <Flex gap={6} alignItems={"center"}>
                        <HStack as="nav" spacing={4} display={{ base: "none", lg: "flex" }}>
                            {navLinks.map((item) => (
                                <Link key={item.path} href={item.path} passHref>
                                    <Text
                                        fontSize="larger"
                                        letterSpacing="wide"
                                        color="white"
                                        position="relative"
                                        // paddingBottom="3px"
                                        transition="all 0.3s ease"
                                        _before={{
                                            content: '""',
                                            position: "absolute",
                                            width: isMounted && pathname === item.path ? "100%" : "0%",
                                            height: "3px",
                                            bottom: "-3px",
                                            left: "0",
                                            backgroundColor: "white",
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

                        <Icon as={colorMode === "light" ? MdDarkMode : MdLightMode} color={"white"} fontSize={"xl"} onClick={toggleColorMode} _hover={{ color: "whiteAlpha.800" }} cursor={"pointer"} />

                        <IconButton
                            size="md"
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            aria-label="Open Menu"
                            display={{ lg: "none" }}
                            onClick={onOpen}
                            color="white"
                            transition="all 0.3s ease"
                        />
                    </Flex>

                </Flex>
            </Container>

            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <Stack as="nav" spacing={4} mt={6}>
                            {navLinks.map((item) => (
                                <Link key={item.path} href={item.path} passHref>
                                    <Text fontWeight="bold" onClick={onClose}>
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
