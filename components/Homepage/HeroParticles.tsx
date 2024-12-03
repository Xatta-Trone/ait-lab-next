"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react"; // Import tsParticles
import { type Container, type ISourceOptions } from "@tsparticles/engine"; // Type definitions for tsParticles
import { loadSlim } from "@tsparticles/slim"; // Slim version for reduced bundle size
import { Box, useColorMode } from "@chakra-ui/react"; // Chakra UI components

export const HeroParticles = () => {
    const [init, setInit] = useState(false); // State to track if particles engine is initialized
    const [videoLoaded, setVideoLoaded] = useState(false); // State to track if the video has loaded
    const videoRef = useRef<HTMLVideoElement | null>(null); // Ref for the background video
    const { colorMode } = useColorMode()

    // Initialize the particles engine
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine); // Load the slim version of the particles engine
        }).then(() => {
            setInit(true); // Mark the engine as initialized
        });

        // Simulate video loading effect (adjust timing as needed)
        setTimeout(() => {
            setVideoLoaded(true);
        }, 1000); // Delay of 1 second for demonstration
    }, []);

    // Callback for when particles are loaded
    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container); // Debug log for the loaded container
    };

    // Particle configuration options
    const options: ISourceOptions = useMemo(
        () => ({
            autoPlay: true,
            backgroundMask: {
                enable: false, // Disable background masking
                composite: "destination-out",
                cover: {
                    color: { value: "#fff" },
                    opacity: 1,
                },
            },
            pauseOnOutsideViewport: true, // Pause particles when outside the viewport
            clear: true,
            detectRetina: true, // Use retina resolution
            fpsLimit: 120, // Limit frames per second
            interactivity: {
                detectsOn: "window", // Interaction is detected across the entire window
                events: {
                    onClick: { enable: true, mode: "repulse" }, // Repulse particles on click
                    onHover: {
                        enable: true,
                        mode: "grab", // Grab mode when hovering
                        parallax: { enable: true, force: 60, smooth: 10 },
                    },
                    resize: { enable: true, delay: 0.5 },
                },
                modes: {
                    grab: { distance: 400, links: { opacity: 1 } },
                    push: { quantity: 4 }, // Push 4 particles on interaction
                },
            },
            particles: {
                color: { value: "#ffffff" }, // Particle color
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "out" }, // Particles move out of the viewport
                    speed: 2,
                },
                number: {
                    density: { enable: true, width: 1920, height: 1080 }, // Particle density
                    value: 120, // Total number of particles
                },
                opacity: {
                    value: { min: 0.1, max: 0.5 }, // Range of opacity
                    animation: { enable: true, speed: 3, startValue: "random" },
                },
                shape: { type: "circle" }, // Shape of particles
                size: {
                    value: { min: 1, max: 9 }, // Size range
                    animation: { enable: true, speed: 20, startValue: "random" },
                },
                links: {
                    enable: true, // Enable connecting lines between particles
                    distance: 150, // Max distance for connections
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1,
                },
            },
            pauseOnBlur: true, // Pause when the browser tab is inactive
        }),
        []
    );

    // Handler for video loaded data
    const handleVideoLoadedData = () => {
        setVideoLoaded(true); // Set video loaded state to true
    };

    if (init) {
        return (
            <>
                {/* Video background */}
                <Box
                    position="absolute"
                    top={0}
                    w="100%"
                    h="calc(100vh + 100px)" // Extend height slightly beyond viewport
                    overflow="hidden"
                    zIndex={-4} // Position below all content
                    backgroundImage={"url('/hero_vid_trim.mp4#t=0,0.1')"}
                >
                    <Box
                        height={"100%"}
                        width={"100%"}
                        zIndex={-3}
                        bgGradient="linear(to-b, rgba(183, 121, 31, 0.9), rgba(183, 121, 31, 0.6), rgba(183, 121, 31, 0.9))" // Gradient overlay for better visibility
                    />
                    {videoLoaded && (
                        <>
                            <video
                                ref={videoRef}
                                src="/hero_vid_trim.mp4"
                                autoPlay
                                muted
                                loop={true}
                                playsInline
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover", // Ensure video fills its container
                                    zIndex: -4,
                                }}
                                poster="/hero_vid_trim.mp4#t=0,0.1"
                                onLoadedData={handleVideoLoadedData}
                            />
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                bottom={0}
                                zIndex={-3}
                            />
                        </>
                    )}
                </Box>
                {init && (
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        w="100%"
                        h="100%"
                        zIndex={-2}
                    >
                        <Particles
                            id="tsparticles" // Unique ID for the particles instance
                            particlesLoaded={particlesLoaded}
                            options={options} // Particle configuration
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </Box>
                )}
                {/* Bottom divider */}
                <Box
                    position="absolute"
                    bottom={-1}
                    w="100%"
                    overflowX="hidden"
                    zIndex={-1}
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
                            className="shape-fill" style={{ fill: colorMode === 'light' ? "#ffffff" : "#2d3748" }}
                        ></path>
                    </svg>
                </Box>
            </>
        );
    }

    return null;
};
