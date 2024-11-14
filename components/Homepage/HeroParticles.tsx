"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // Load a slim version to reduce bundle size
import { Box } from "@chakra-ui/react";

export const HeroParticles = () => {
    const [init, setInit] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    // Initialize the particles engine once
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });

        // Simulate loading effect for demonstration, adjust timing as needed
        setTimeout(() => {
            setVideoLoaded(true);
        }, 1000); // Delay loading of video by 1 second
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container);
    };

    // Particle configuration options
    const options: ISourceOptions = useMemo(
        () => ({
            autoPlay: true,
            backgroundMask: {
                enable: false,
                composite: "destination-out",
                cover: {
                    color: { value: "#fff" },
                    opacity: 1,
                },
            },
            pauseOnOutsideViewport: true,
            clear: true,
            detectRetina: true,
            fpsLimit: 120,
            interactivity: {
                detectsOn: "window",
                events: {
                    onClick: { enable: true, mode: "repulse" },
                    onHover: {
                        enable: true,
                        mode: "grab",
                        parallax: { enable: true, force: 60, smooth: 10 },
                    },
                    resize: { enable: true, delay: 0.5 },
                },
                modes: {
                    grab: { distance: 400, links: { opacity: 1 } },
                    push: { quantity: 4 },
                },
            },
            particles: {
                color: { value: "#ffffff" },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "out" },
                    speed: 2,
                },
                number: {
                    density: { enable: true, width: 1920, height: 1080 },
                    value: 120,
                },
                opacity: {
                    value: { min: 0.1, max: 0.5 },
                    animation: { enable: true, speed: 3, startValue: "random" },
                },
                shape: { type: "circle" },
                size: {
                    value: { min: 1, max: 9 },
                    animation: { enable: true, speed: 20, startValue: "random" },
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1,
                },
            },
            pauseOnBlur: true,
        }),
        []
    );

    if (init) {
        return (
            <>
                {/* Video background */}
                {videoLoaded && (
                    <Box
                        position="absolute"
                        top={0}
                        w="100%"
                        h="calc(100vh + 100px)"
                        overflow="hidden"
                        zIndex={-3}
                    >
                        <video
                            src="/hero_vid.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                zIndex: -3,
                            }}
                        />
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            zIndex={-2}
                        />
                    </Box>
                )}
                {init && (
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        w="100%"
                        h="100%" // Match the full height of viewport
                        zIndex={-1}
                    >
                        <Particles
                            id="tsparticles"
                            particlesLoaded={particlesLoaded}
                            options={options}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%", // Ensure particles fill their container
                            }}
                        />
                    </Box>
                )}
                {/* Bottom divider */}
                <Box
                    position="absolute"
                    bottom={0}
                    w="100%"
                    overflowX="hidden"
                    zIndex={1}
                    className="custom-shape-divider-bottom-1730319297"
                >
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
                            className="shape-fill"
                        ></path>
                    </svg>
                </Box>
            </>
        );
    }

    return null;
};
