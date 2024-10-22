
import { Box, Flex, Link as ChakraLink, Button, Center } from '@chakra-ui/react'
import React from 'react'
import { Separator } from "@chakra-ui/react"
import Image from 'next/image'
import aitLogo from "@/public/img/logo-white.png"
import navLinks from "@/data/navLinks.json"
import NextLink from 'next/link'
import {
    DrawerActionTrigger,
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

interface NavLink {
    name: string;
    path: string;
}

const Navbar = () => {

    return (
        <>
            <Box w={"100%"} padding={"4"}>
                <Flex align={"center"} justify={'space-between'} paddingX={20} paddingY={1}>
                    <NextLink href={"/"}>
                        <Image src={aitLogo} style={{
                            width: 'auto',
                            height: '35px',
                        }} alt='AIT Lab Logo' />
                    </NextLink>

                    <Flex align={"center"} justify={'center'} spaceX={5} hideBelow={"lg"}>
                        {navLinks.map((item: NavLink) => (
                            // <ChakraLink asChild key={item.name} >
                            <NextLink href={item.path} key={item.name}>
                                {item.name}
                            </NextLink>
                            // </ChakraLink>
                        ))}
                    </Flex>

                    <Flex align={'center'} justify={"flex-end"} spaceX={2} hideBelow={"lg"}>
                        <NextLink href={"https://github.com/https://github.com/subasish"}>
                            <Center w="40px" h="40px" bg="blue" color="white" rounded={"md"}>
                                <FaGithub />
                            </Center>
                        </NextLink>
                        <NextLink href={"mailto:subasish@txstate.edu"}>
                            <Center w="40px" h="40px" bg="blue" color="white" rounded={"md"}>
                                <MdEmail />
                            </Center>
                        </NextLink>
                        <NextLink href={"https://www.linkedin.com/in/subasishdas/"}>
                            <Center w="40px" h="40px" bg="blue" color="white" rounded={"md"}>
                                <FaLinkedin />
                            </Center>
                        </NextLink>
                    </Flex>

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
                                    <NextLink href={"https://github.com/https://github.com/subasish"}>
                                        <Center w="40px" h="40px" bg="blue" color="white">
                                            <FaGithub />
                                        </Center>
                                    </NextLink>
                                    <NextLink href={"mailto:subasish@txstate.edu"}>
                                        <Center w="40px" h="40px" bg="blue" color="white">
                                            <MdEmail />
                                        </Center>
                                    </NextLink>
                                    <NextLink href={"https://www.linkedin.com/in/subasishdas/"}>
                                        <Center w="40px" h="40px" bg="blue" color="white">
                                            <FaLinkedin />
                                        </Center>
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