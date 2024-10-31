"use client"
import { Box, Container, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import React from 'react'
import { HiMiniArrowRightCircle } from 'react-icons/hi2'

const Hero = () => {
    return (
        <Box display={"flex"} justifyContent={"center"} height={"calc(100vh - 80px)"} alignItems={"center"}>
            <Container maxW={"container.xl"}>
                <Heading color={"whiteAlpha.900"} textAlign={"left"} as={"h1"} size={{ base: '2xl', md: "3xl" }} pb={"20px"} lineHeight={1.2}>
                    Artificial Intelligence in <br /> Transportation Lab
                </Heading>
                <List spacing={2} textAlign={"left"} color={"white"} mt={4} fontSize={{ base: "xl", md: "2xl" }} lineHeight={1.2}>
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
