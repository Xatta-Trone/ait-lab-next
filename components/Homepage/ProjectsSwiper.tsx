// ProjectsSwiper.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import projectsData from "@/data/projects.json";
import ProjectSwiperCard from './ProjectSwiperCard';
import { Box, Button, Heading, Link, Text } from '@chakra-ui/react';

const ProjectsSwiper = () => {
    const recentProjects = ([...projectsData] as ProjectTypes[])
        .sort((a, b) => b.start_date.year - a.start_date.year)
        .slice(0, 4);

    return (
        <Swiper
            breakpoints={{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }}
            rewind={true}
            grabCursor={true}
            centeredSlides={true}
            spaceBetween={20}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
                el: '.swiper-pagination-custom',
            }}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper"
            autoHeight={false}
            navigation={true}
            initialSlide={1}
            style={{ paddingTop: "10px" }}
        >
            {recentProjects.map((project, index) => (
                <SwiperSlide key={index} > {/* Aligns slides to stretch */}
                    <ProjectSwiperCard project={project} />
                </SwiperSlide>
            ))}
            <SwiperSlide>
                <Box
                    p={{ base: 4, md: 5 }} // Responsive padding
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="lg"
                    bg="white"
                    _hover={{
                        shadow: "xl",
                        transform: "translateY(-10px)",
                    }}
                    transition="all 0.3s ease-in-out"
                    maxWidth="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    height="100%"
                    minH={"400px"}
                >
                    <Box textAlign="center">
                        <Heading as="h3" size={{ base: "sm", md: "md" }} mb={2}>
                            View All Projects
                        </Heading>
                        <Text fontSize={{ base: "small", md: "sm" }} color="gray.700" mb={4}>
                            Explore our complete list of projects and find detailed information.
                        </Text>
                        <Link href="/research" isExternal>
                            <Button
                                variant="solid"
                                size="md"
                                _hover={{ bg: "blue.500", color: "white" }}
                            >
                                Go to Projects
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </SwiperSlide>
            <div className="swiper-pagination-custom" />
        </Swiper>
    );
};

export default ProjectsSwiper;
