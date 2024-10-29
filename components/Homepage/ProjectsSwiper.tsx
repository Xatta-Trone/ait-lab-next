import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import projectsData from "@/data/projects.json";
import ProjectSwiperCard from './ProjectSwiperCard';

const ProjectsSwiper = () => {
    // Get the four most recent projects
    const recentProjects = ([...projectsData] as ProjectTypes[])
        .sort((a, b) => b.start_date.year - a.start_date.year)
        .slice(0, 4);

    return (
        <>
            <Swiper
                slidesPerView={'auto'} // Adjust number of slides based on screen size
                centeredSlides={true}
                spaceBetween={20} // Adjust space between slides
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination-custom',
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {recentProjects.map((project, index) => (
                    <SwiperSlide key={index}>
                        <ProjectSwiperCard project={project} />
                    </SwiperSlide>
                ))}
                <div className="swiper-pagination-custom" />
            </Swiper>
        </>
    );
};

export default ProjectsSwiper;
