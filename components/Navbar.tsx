import { Box, Flex, Link as ChakraLink, Button, Center, Text, Theme, Grid, GridItem } from '@chakra-ui/react'
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
            <Theme appearance='light' color={"whiteAlpha.800"}>

                <Box w={"100%"} paddingY={"3"} paddingX={2} bgColor={"#2b6cb0"}>
                    <Grid templateColumns="1fr 5fr 1fr" smToXl={{ gridTemplateColumns: "1fr 1fr" }} paddingX={20} paddingY={1} alignItems={"center"}>
                        {/* Logo with link to home */}
                        <GridItem>
                            <NextLink href={"/"}>
                                <Image src={aitLogo} style={{
                                    width: 'auto',
                                    height: '35px',
                                }} alt='AIT Lab Logo' />
                            </NextLink>
                        </GridItem>

                        {/* Desktop navigation links  */}
                        <GridItem hideBelow={"xl"}>
                            <Flex align={"center"} justify={'center'} spaceX={4} hideBelow={"lg"}>
                                {navLinks.map((item: NavLink) => (
                                    <ChakraLink asChild key={item.name} color={"whiteAlpha.800"} outline={"none"}>
                                        <NextLink href={item.path} target={item.name == "Resume" ? "_blank" : "_self"}>
                                            {item.name}
                                        </NextLink>
                                    </ChakraLink>
                                ))}
                            </Flex>
                        </GridItem>

                        {/* Desktop Nav Links with icons  */}
                        <GridItem hideBelow={"xl"}>
                            <Flex align={'center'} justify={"flex-end"} spaceX={4} hideBelow={"xl"}>
                                <NextLink href={"https://github.com/subasish"} target='_blank'>
                                    <Text fontSize={"2xl"}>
                                        <FaGithub />
                                    </Text>
                                </NextLink>
                                <NextLink href={"mailto:subasish@txstate.edu"} target='_blank'>
                                    <Text fontSize={"2xl"}>
                                        <MdEmail />
                                    </Text>
                                </NextLink>
                                <NextLink href={"https://www.linkedin.com/in/subasishdas/"} target='_blank'>
                                    <Text fontSize={"2xl"}>
                                        <FaLinkedin />
                                    </Text>
                                </NextLink>
                                <NextLink href={"https://scholar.google.com/citations?user=qK-YgxAAAAAJ&hl=en"} target='_blank'>
                                    <Text fontSize={"2xl"}>
                                        <FaGoogleScholar />
                                    </Text>
                                </NextLink>
                                <NextLink href={"https://www.researchgate.net/profile/Subasish_Das"} target='_blank'>
                                    <Text fontSize={"2xl"}>
                                        <FaResearchgate />
                                    </Text>
                                </NextLink>
                            </Flex>
                        </GridItem>


                        {/* Mobile Hamburger Menu and Drawer  */}
                        <GridItem hideFrom={"xl"} justifyItems={"end"}>
                            <Box hideFrom={"xl"} justifyItems={"end"}>
                                <DrawerRoot>
                                    <DrawerBackdrop />
                                    <DrawerTrigger asChild >
                                        <Button variant="outline" size="sm" color={"whiteAlpha.800"}>
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
                                                    <ChakraLink asChild key={item.name} outline={"none"} >
                                                        <NextLink href={item.path} target={item.name == "Resume" ? "_blank" : "_self"}>
                                                            {item.name}
                                                        </NextLink>
                                                    </ChakraLink>
                                                ))}
                                            </Flex>
                                        </DrawerBody>
                                        <DrawerFooter>
                                            {/* Mobile Links with icons  */}
                                            <NextLink href={"https://github.com/https://github.com/subasish"} target='_blank'>
                                                <Text fontSize={"2xl"}>
                                                    <FaGithub />
                                                </Text>
                                            </NextLink>
                                            <NextLink href={"mailto:subasish@txstate.edu"} target='_blank'>
                                                <Text fontSize={"2xl"}>
                                                    <MdEmail />
                                                </Text>
                                            </NextLink>
                                            <NextLink href={"https://www.linkedin.com/in/subasishdas/"} target='_blank'>
                                                <Text fontSize={"2xl"}>
                                                    <FaLinkedin />
                                                </Text>
                                            </NextLink>
                                            <NextLink href={"https://scholar.google.com/citations?user=qK-YgxAAAAAJ&hl=en"} target='_blank'>
                                                <Text fontSize={"2xl"}>
                                                    <FaGoogleScholar />
                                                </Text>
                                            </NextLink>
                                            <NextLink href={"https://www.researchgate.net/profile/Subasish_Das"} target='_blank'>
                                                <Text fontSize={"2xl"}>
                                                    <FaResearchgate />
                                                </Text>
                                            </NextLink>
                                        </DrawerFooter>
                                        <DrawerCloseTrigger />
                                    </DrawerContent>
                                </DrawerRoot>
                            </Box>
                        </GridItem>

                    </Grid>
                </Box>
                <Separator />
            </Theme >
        </>
    )
}

export default Navbar