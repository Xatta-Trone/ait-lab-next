import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components
import 'swiper/css'; // Swiper core styles
import 'swiper/css/pagination'; // Swiper pagination styles
import 'swiper/css/autoplay'; // Swiper autoplay styles
import { Pagination, Autoplay, Navigation } from 'swiper/modules'; // Swiper modules
import projsAndGrants from "@/data/stock_projs_grants.json"; // JSON data for projects and grants
import ProjectSwiperCard from './ProjectSwiperCard'; // Custom component for individual project cards
import { Box, Button, Heading, Link, Text } from '@chakra-ui/react'; // Chakra UI components

const ProjectsSwiper = () => {
    const projectsData = projsAndGrants.projects; // Extract projects from the JSON data

    // Sort projects by start year (descending) and take the 4 most recent projects
    const recentProjects = ([...projectsData] as ProjectTypes[])
        .sort((a, b) => b.start_date.year - a.start_date.year)
        .slice(0, 4);

    return (
        <Swiper
            // Responsive breakpoints for Swiper
            breakpoints={{
                640: {
                    slidesPerView: 1, // Single slide view for small screens
                    spaceBetween: 10, // Space between slides
                },
                768: {
                    slidesPerView: 2, // Two slides for medium screens
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3, // Three slides for large screens
                    spaceBetween: 30,
                },
            }}
            rewind={true} // Enable rewind to loop back to the first slide
            grabCursor={true} // Show a grab cursor when hovering over slides
            centeredSlides={true} // Center the slides for better aesthetics
            spaceBetween={20} // Default space between slides
            loop={true} // Enable infinite looping of slides
            autoplay={{
                delay: 3000, // Delay between auto-swipes (in milliseconds)
                disableOnInteraction: false, // Continue autoplay after interaction
            }}
            pagination={{
                clickable: true, // Enable pagination bullets to be clickable
                el: '.swiper-pagination-custom', // Custom pagination element
            }}
            modules={[Pagination, Autoplay, Navigation]} // Swiper modules used
            className="mySwiper" // Custom CSS class
            autoHeight={false} // Disable auto height adjustment
            navigation={true} // Enable navigation arrows
            initialSlide={1} // Start with the second slide
            style={{ paddingTop: "10px" }} // Additional padding
        >
            {/* Render recent projects */}
            {recentProjects.map((project, index) => (
                <SwiperSlide key={index}>
                    <ProjectSwiperCard project={project} /> {/* Custom card component */}
                </SwiperSlide>
            ))}

            {/* Slide for "View All Projects" */}
            <SwiperSlide>
                <Box
                    p={{ base: 4, md: 5 }} // Padding for responsiveness
                    shadow="md" // Box shadow
                    borderWidth="1px" // Border styling
                    borderRadius="lg" // Rounded corners
                    bg="white" // Background color
                    _hover={{
                        shadow: "xl", // Larger shadow on hover
                        transform: "translateY(-10px)", // Slight upward animation on hover
                    }}
                    transition="all 0.3s ease-in-out" // Smooth transition
                    maxWidth="100%" // Full width
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    height="500px" // Fixed height for uniformity
                >
                    <Box textAlign="center">
                        {/* Heading for the slide */}
                        <Heading as="h3" size={{ base: "sm", md: "md" }} mb={2}>
                            View All Projects
                        </Heading>
                        {/* Description text */}
                        <Text fontSize={{ base: "small", md: "sm" }} color="gray.700" mb={4}>
                            Explore our complete list of projects and find detailed information.
                        </Text>
                        {/* Link to the projects page */}
                        <Link href="/projects-and-grants#projects" isExternal>
                            <Button
                                variant="solid"
                                size="md"
                                _hover={{ bg: "yellow.500", color: "white" }} // Hover effect
                            >
                                Go to Projects
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </SwiperSlide>

            {/* Custom pagination element */}
            <div className="swiper-pagination-custom" />
        </Swiper>
    );
};

export default ProjectsSwiper;
