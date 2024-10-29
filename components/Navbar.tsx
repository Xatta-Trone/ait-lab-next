import { HamburgerIcon, CloseIcon, useDisclosure } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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

    return (
        <Box
            bg="blue.600"
            w="100%"
            position="fixed"
            top={0}
            left={0}
            zIndex={10}
            transition="all 0.3s ease"
            height={scrolled ? "60px" : "80px"}
            pt={scrolled ? 1 : 2}
            pb={scrolled ? 2 : 3}
        >
            <Container maxW="container.xl">
                <Flex h="100%" alignItems="center" justifyContent="space-between">
                    <Link href="/">
                        <Image
                            src="/img/logo-white.png"
                            alt="AIT Lab Logo"
                            boxSize={scrolled ? "50px" : "70px"}
                            objectFit="contain"
                            cursor="pointer"
                            transition="all 0.3s ease"
                        />
                    </Link>

                    <HStack as="nav" spacing={4} display={{ base: "none", lg: "flex" }}>
                        {navLinks.map((item) => (
                            <Link key={item.path} href={item.path} passHref>
                                <Text
                                    fontSize="larger"
                                    letterSpacing="wide"
                                    color="white"
                                    position="relative"
                                    paddingBottom="3px"
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
