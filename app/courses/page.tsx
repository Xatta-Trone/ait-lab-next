/** @format */
"use client"; // Enables client-side rendering for this component

import React, { useState, useEffect } from "react";
import Head from "next/head"; // Import Head for managing metadata
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import coursesData from "@/data/courses.json"; // Import courses data from JSON
import CourseCard from "@/components/CourseCard"; // Component to display individual course cards

// Apply types to the JSON data for type safety
const typedCoursesData: CourseTypes[] = coursesData as CourseTypes[];

const Courses: React.FC = () => {
    // State to hold the list of courses
    const [courses, setCourses] = useState<CourseTypes[]>([]);

    // Populate the courses state with data from JSON on component mount
    useEffect(() => {
        setCourses(typedCoursesData);
    }, []);

    return (
        <>
            {/* Metadata for SEO and social sharing */}
            <Head>
                <title>Courses | AIT Lab</title>
                <meta
                    name="description"
                    content="Explore the wide range of courses offered by AIT Lab. From Artificial Intelligence to Machine Learning, these courses are designed to help you master modern technologies."
                />
                <meta
                    name="keywords"
                    content="AIT Lab Courses, AI Courses, Machine Learning, Artificial Intelligence, Technology Education"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://ait-lab.vercel.app/courses" />
                <meta name="theme-color" content="#b7791f" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="icon" href="/New_AIT_Favicon.png" />
                <meta property="og:title" content="Courses | AIT Lab" />
                <meta
                    property="og:description"
                    content="Discover the variety of courses offered by AIT Lab, designed to help you excel in cutting-edge technologies like Artificial Intelligence and Machine Learning."
                />
                <meta property="og:url" content="https://ait-lab.vercel.app/courses" />
                <meta property="og:site_name" content="AIT Lab" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:image" content="/logo_big_black.png" />
                <meta property="og:image:alt" content="AIT Lab Logo" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Courses | AIT Lab" />
                <meta
                    name="twitter:description"
                    content="Explore cutting-edge courses offered by AIT Lab, focusing on AI, Machine Learning, and modern technologies."
                />
                <meta name="twitter:image" content="/logo_big_black.png" />
            </Head>

            {/* Page Content */}
            <Box py={20}>
                <Container maxW="container.xl">
                    {/* Page heading */}
                    <Heading as="h1" size="2xl" mb={6} color="yellow.600">
                        Courses
                    </Heading>

                    {/* Courses Section */}
                    <Box>
                        {/* Render course cards if courses are available */}
                        {courses.length > 0 && (
                            <Stack spacing={6}>
                                {courses.map((course, index) => (
                                    <CourseCard key={index} course={course} /> // Render a CourseCard for each course
                                ))}
                            </Stack>
                        )}

                        {/* Show a message if no courses are found */}
                        {courses.length === 0 && (
                            <Box textAlign="center" py={6}>
                                <Text color="gray.700">No courses found</Text>
                            </Box>
                        )}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Courses; // Export the Courses component as the default export
