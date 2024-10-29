"use client"
import { Box, Container, Heading } from '@chakra-ui/react';
import React from 'react';
import ProjectsSwiper from './ProjectsSwiper';

const ProjectsSection = () => {
    return (
        <>
            {/* Projects Section Content */}
            <Box bg="white" py={20}>
                <Container maxWidth={"container.xl"} textAlign={"center"}>
                    <Heading as={"h2"} color="blue.600" marginBottom={10} size={"lg"}>Projects</Heading>
                    <ProjectsSwiper />
                </Container>
            </Box>
        </>
    );
};

export default ProjectsSection;
