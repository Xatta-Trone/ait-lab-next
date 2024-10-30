"use client"

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { Box } from "@chakra-ui/react";
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export const HeroParticles = () => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container);
    };

    const options: ISourceOptions = useMemo(
        () => ({
            fpsLimit: 1120,
            interactivity: {
                events: {
                    // onClick: {
                    //     enable: true,
                    //     mode: "push",
                    // },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    // push: {
                    //     quantity: 4,
                    // },
                    repulse: {
                        distance: 100,
                        duration: 1,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: {
                        default: OutMode.out,
                    },
                    random: false,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 90,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    if (init) {
        return (
            <>
                {/* // Wrapping Particles in a Box with zIndex to control stacking */}
                <Box
                    position="absolute"
                    top={0}
                    w="100%"
                    h="100vh"
                    bgImage="url('https://images5.alphacoders.com/134/1346556.png')"
                    bgSize="cover"
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    overflow="hidden"
                    zIndex={-2}
                >
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bgGradient="linear(to-b, rgba(43, 108, 176, 1), rgba(43, 108, 176, 0.7), rgba(43, 108, 176, 1))"
                        zIndex={-2}
                    />
                    <Particles
                        id="tsparticles"
                        particlesLoaded={particlesLoaded}
                        options={options}
                        style={{ position: "absolute", top: 0, left: 0, zIndex: -2 }}
                    />
                </Box>

                <Box position="absolute" top={"85vh"} w={"100%"} overflowX={"hidden"} zIndex={-1} className="custom-shape-divider-bottom-1730319297">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                    </svg>
                </Box>

            </>
        );
    }

    return <></>;
};