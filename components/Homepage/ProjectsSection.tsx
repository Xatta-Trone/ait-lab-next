"use client"
import { Box, Container, Heading } from '@chakra-ui/react';
import React from 'react';
import ProjectsSwiper from './ProjectsSwiper';

const ProjectsSection = () => {
    return (
        <>
            {/* Projects Section Content */}
            <Box bg="white" pb={20} pt={10} position={"relative"}>
                <Container maxWidth={"container.xl"} textAlign={"center"}>
                    <Heading as={"h2"} color="blue.600" marginBottom={10} size={"lg"}>Projects</Heading>
                    <ProjectsSwiper />
                </Container>
                <Box position="absolute" bottom={-10} w={"100%"} overflowX={"hidden"} zIndex={1} className="custom-shape-divider-bottom-1730319297">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="gray-fill"></path>
                    </svg>
                </Box>
            </Box>
        </>
    );
};

export default ProjectsSection;
