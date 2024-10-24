/** @format */
"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import coursesData from "@/data/courses.json";
import CourseCard from "@/components/CourseCard";

// Apply types to the json data from courses.json
const typedCoursesData: CourseTypes[] = coursesData as CourseTypes[];

const Courses: React.FC = () => {
    const [courses, setCourses] = useState<CourseTypes[]>([]);

    // Set dynamic page title 
    useEffect(() => {
        document.title = "Courses | AIT Lab";
        setCourses(typedCoursesData);
    }, []);

    return (
        <Box py={8}>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" mb={6} color="blue.600">
                    Courses
                </Heading>

                {/* Courses */}
                <Box>
                    {courses.length > 0 && (
                        <Stack spacing={6}>
                            {courses.map((course, index) => (
                                <CourseCard key={index} course={course} />
                            ))}
                        </Stack>
                    )}

                    {/* No Courses Found */}
                    {courses.length === 0 && (
                        <Box textAlign="center" py={6}>
                            <Text color="gray.700">No courses found</Text>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default Courses;
