"use client"
import { Box, Button, Container, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import React from 'react'
import { HiMiniArrowRightCircle } from 'react-icons/hi2'

const Hero = () => {
    return (
        <Box display={"flex"} justifyContent={"center"} height={"calc(100vh - 180px)"} alignItems={"center"}>
            <Container maxW={"container.xl"}>
                <Heading color={"white"} textAlign={"center"}>
                    Artificial Intelligence in Technology Lab
                </Heading>
                <List spacing={2} textAlign={"center"} color={"white"} mt={4} fontSize={"xl"}>
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
