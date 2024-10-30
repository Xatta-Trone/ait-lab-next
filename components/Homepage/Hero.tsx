"use client"
import { Box, Container, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import React from 'react'
import { HiMiniArrowRightCircle } from 'react-icons/hi2'

const Hero = () => {
    return (
        <Box display={"flex"} justifyContent={"center"} height={"calc(100vh - 80px)"} alignItems={"center"}>
            <Container maxW={"container.xl"}>
                <Heading color={"whiteAlpha.900"} textAlign={"center"} as={"h1"} size={{ base: '2xl', md: "3xl" }}>
                    Artificial Intelligence in Transportation Lab
                </Heading>
                <List spacing={2} textAlign={"center"} color={"white"} mt={4} fontSize={{ base: "xl", md: "2xl" }}>
                    <ListItem>
                        <ListIcon as={HiMiniArrowRightCircle} color={'white'} />
                        Casual Artificial Intelligence
                    </ListItem>
                    <ListItem>
                        <ListIcon as={HiMiniArrowRightCircle} color={'white'} />
                        Transportation Safety and Operations
                    </ListItem>
                    <ListItem>
                        <ListIcon as={HiMiniArrowRightCircle} color={'white'} />
                        Infrastructure readiness for disruptive technologies
                    </ListItem>
                </List>
            </Container>
        </Box >
    )
}

export default Hero;
