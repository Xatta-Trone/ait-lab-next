/** @format */
"use client";

import { HamburgerIcon, CloseIcon, useDisclosure } from "@chakra-ui/icons";
import navLinks from "@/data/navLinks.json"; // Import the nav_links from JSON
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
} from "@chakra-ui/react";
import { usePathname } from "next/navigation"; // Updated: usePathname instead of useRouter

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const pathname = usePathname(); // Get current path
    const [isMounted, setIsMounted] = useState(false); // State to check if mounted

    // Ensure we're on the client-side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Box bg="blue.600" w="100%">
            {/* Container to constrain content within container.xl */}
            <Container maxW="container.xl">
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    {/* Logo: Clickable to Home */}
                    <Link href="/">
                        <Image
                            src="/img/logo-white.png" // Path to logo in the public folder
                            alt="AIT Lab Logo"
                            boxSize="70px"
                            objectFit="contain"
                            cursor="pointer"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <HStack as="nav" spacing={4} display={{ base: "none", lg: "flex" }}>
                        {navLinks.map((item) => (
                            <Link key={item.path} href={item.path} passHref>
                                <Text
                                    fontSize="larger"
                                    letterSpacing="wide"
                                    color="white"
                                    position="relative"
                                    paddingBottom="3px"
                                    _before={{
                                        content: '""',
                                        position: "absolute",
                                        width: isMounted && pathname === item.path ? "100%" : "0%", // Active link check after mounting
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

                    {/* Mobile Menu Toggle */}
                    <IconButton
                        size="md"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label="Open Menu"
                        display={{ lg: "none" }}
                        onClick={onOpen}
                        color={"white"}
                    />
                </Flex>
            </Container>

            {/* Mobile Drawer Menu */}
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
