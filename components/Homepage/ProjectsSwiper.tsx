import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

export default function ProjectsSwiper() {
    return (
        <>
            <Swiper
                slidesPerView={'auto'}
                centeredSlides={true}
                spaceBetween={30}
                loop={true} // Enables infinite scrolling
                autoplay={{
                    delay: 3000, // Delay between slides in ms
                    disableOnInteraction: true, // Keeps autoplay on even when interacting with slides
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination-custom', // Target custom pagination container
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide className="swiper-slide">Slide 1</SwiperSlide>
                <SwiperSlide className="swiper-slide">Slide 2</SwiperSlide>
                <SwiperSlide className="swiper-slide">Slide 3</SwiperSlide>
                <SwiperSlide className="swiper-slide">Slide 4</SwiperSlide>
                <SwiperSlide className="swiper-slide">Slide 5</SwiperSlide>

                {/* Custom Pagination */}
                <div className="swiper-pagination-custom" />
            </Swiper>
        </>
    );
}
