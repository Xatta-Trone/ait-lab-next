import { Box, Flex, Link as ChakraLink, Button, Center, Text } from '@chakra-ui/react'
import React from 'react'
import { Separator } from "@chakra-ui/react"
import Image from 'next/image'
import aitLogo from "@/public/img/logo-white.png"
import navLinks from "@/data/navLinks.json"
import NextLink from 'next/link'
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { RiMenu3Line } from 'react-icons/ri'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { FaGoogleScholar, FaResearchgate } from 'react-icons/fa6'

interface NavLink {
    name: string;
    path: string;
}

const Navbar = () => {
    return (
        <>
            {/* Navigation Container  */}
            <Box w={"100%"} padding={"4"}>
                <Flex align={"center"} justify={'space-between'} paddingX={20} paddingY={1}>
                    {/* Logo with link to home */}
                    <NextLink href={"/"}>
                        <Image src={aitLogo} style={{
                            width: 'auto',
                            height: '35px',
                        }} alt='AIT Lab Logo' />
                    </NextLink>

                    {/* Desktop navigation links  */}
                    <Flex align={"center"} justify={'center'} spaceX={5} hideBelow={"lg"}>
                        {navLinks.map((item: NavLink) => (
                            <ChakraLink asChild key={item.name} >
                                <NextLink href={item.path} key={item.name}>
                                    {item.name}
                                </NextLink>
                            </ChakraLink>
                        ))}
                    </Flex>

                    {/* Desktop Nav Links with icons  */}
                    <Flex align={'center'} justify={"flex-end"} spaceX={4} hideBelow={"lg"}>
                        <NextLink href={"https://github.com/https://github.com/subasish"}>
                            <Text fontSize={"2xl"}>
                                <FaGithub />
                            </Text>
                        </NextLink>
                        <NextLink href={"mailto:subasish@txstate.edu"}>
                            <Text fontSize={"2xl"}>
                                <MdEmail />
                            </Text>
                        </NextLink>
                        <NextLink href={"https://www.linkedin.com/in/subasishdas/"}>
                            <Text fontSize={"2xl"}>
                                <FaLinkedin />
                            </Text>
                        </NextLink>
                        <NextLink href={"https://scholar.google.com/citations?user=qK-YgxAAAAAJ&hl=en"}>
                            <Text fontSize={"2xl"}>
                                <FaGoogleScholar />
                            </Text>
                        </NextLink>
                        <NextLink href={"https://www.researchgate.net/profile/Subasish_Das"}>
                            <Text fontSize={"2xl"}>
                                <FaResearchgate />
                            </Text>
                        </NextLink>
                    </Flex>

                    {/* Mobile Hamburger Menu and Drawer  */}
                    <Box hideFrom={"lg"}>
                        <DrawerRoot>
                            <DrawerBackdrop />
                            <DrawerTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <RiMenu3Line />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Menu</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    {/* Mobile Navigation Links  */}
                                    <Flex align={"flex-start"} justify={'center'} spaceY={5} direction={"column"}>
                                        {navLinks.map((item: NavLink) => (
                                            <ChakraLink asChild key={item.name} >
                                                <NextLink href={item.path} >
                                                    {item.name}
                                                </NextLink>
                                            </ChakraLink>
                                        ))}
                                    </Flex>
                                </DrawerBody>
                                <DrawerFooter>
                                    {/* Mobile Links with icons  */}
                                    <NextLink href={"https://github.com/https://github.com/subasish"}>
                                        <Text fontSize={"2xl"}>
                                            <FaGithub />
                                        </Text>
                                    </NextLink>
                                    <NextLink href={"mailto:subasish@txstate.edu"}>
                                        <Text fontSize={"2xl"}>
                                            <MdEmail />
                                        </Text>
                                    </NextLink>
                                    <NextLink href={"https://www.linkedin.com/in/subasishdas/"}>
                                        <Text fontSize={"2xl"}>
                                            <FaLinkedin />
                                        </Text>
                                    </NextLink>
                                    <NextLink href={"https://scholar.google.com/citations?user=qK-YgxAAAAAJ&hl=en"}>
                                        <Text fontSize={"2xl"}>
                                            <FaGoogleScholar />
                                        </Text>
                                    </NextLink>
                                    <NextLink href={"https://www.researchgate.net/profile/Subasish_Das"}>
                                        <Text fontSize={"2xl"}>
                                            <FaResearchgate />
                                        </Text>
                                    </NextLink>
                                </DrawerFooter>
                                <DrawerCloseTrigger />
                            </DrawerContent>
                        </DrawerRoot>
                    </Box>

                </Flex>
            </Box>
            <Separator />
        </>
    )
}

export default Navbar