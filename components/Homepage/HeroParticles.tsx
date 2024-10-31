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
            "autoPlay": true,
            "backgroundMask": {
                "composite": "destination-out",
                "cover": {
                    "color": {
                        "value": "#fff"
                    },
                    "opacity": 1
                },
                "enable": false
            },
            "clear": true,
            "defaultThemes": {},
            "delay": 0,
            "fullScreen": {
                "enable": true,
                "zIndex": 0
            },
            "detectRetina": true,
            "duration": 0,
            "fpsLimit": 120,
            "interactivity": {
                "detectsOn": "window",
                "events": {
                    "onClick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "onDiv": {

                        "enable": false,
                        "mode": "bounce",
                        "type": "circle"
                    },
                    "onHover": {
                        "enable": true,
                        "mode": "grab",
                        "parallax": {
                            "enable": true,
                            "force": 60,
                            "smooth": 10
                        }
                    },
                    "resize": {
                        "delay": 0.5,
                        "enable": true
                    }
                },
                "modes": {
                    "trail": {
                        "delay": 1,
                        "pauseOnStop": false,
                        "quantity": 1
                    },
                    "attract": {
                        "distance": 200,
                        "duration": 0.4,
                        "easing": "ease-out-quad",
                        "factor": 1,
                        "maxSpeed": 50,
                        "speed": 1
                    },
                    "bounce": {
                        "distance": 200
                    },
                    "bubble": {
                        "distance": 400,
                        "duration": 2,
                        "mix": false,
                        "opacity": 0.8,
                        "size": 40,
                        "divs": {
                            "distance": 200,
                            "duration": 0.4,
                            "mix": false,
                            "selectors": {}
                        }
                    },
                    "connect": {
                        "distance": 80,
                        "links": {
                            "opacity": 0.5
                        },
                        "radius": 60
                    },
                    "grab": {
                        "distance": 400,
                        "links": {
                            "blink": false,
                            "consent": false,
                            "opacity": 1
                        }
                    },
                    "push": {
                        "default": true,
                        "groups": [],
                        "quantity": 4
                    },
                    "remove": {
                        "quantity": 2
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4,
                        "factor": 100,
                        "speed": 1,
                        "maxSpeed": 50,
                        "easing": "ease-out-quad",
                        "divs": {
                            "distance": 200,
                            "duration": 0.4,
                            "factor": 100,
                            "speed": 1,
                            "maxSpeed": 50,
                            "easing": "ease-out-quad",
                            "selectors": {}
                        }
                    },
                    "slow": {
                        "factor": 3,
                        "radius": 200
                    },
                    "light": {
                        "area": {
                            "gradient": {
                                "start": {
                                    "value": "#ffffff"
                                },
                                "stop": {
                                    "value": "#000000"
                                }
                            },
                            "radius": 1000
                        },
                        "shadow": {
                            "color": {
                                "value": "#000000"
                            },
                            "length": 2000
                        }
                    }
                }
            },
            "manualParticles": [],
            "particles": {
                "bounce": {
                    "horizontal": {
                        "value": 1
                    },
                    "vertical": {
                        "value": 1
                    }
                },
                "collisions": {
                    "absorb": {
                        "speed": 2
                    },
                    "bounce": {
                        "horizontal": {
                            "value": 1
                        },
                        "vertical": {
                            "value": 1
                        }
                    },
                    "enable": false,
                    "maxSpeed": 50,
                    "mode": "bounce",
                    "overlap": {
                        "enable": true,
                        "retries": 0
                    }
                },
                "color": {
                    "value": "#ffffff",
                    "animation": {
                        "h": {
                            "count": 0,
                            "enable": false,
                            "speed": 1,
                            "decay": 0,
                            "delay": 0,
                            "sync": true,
                            "offset": 0
                        },
                        "s": {
                            "count": 0,
                            "enable": false,
                            "speed": 1,
                            "decay": 0,
                            "delay": 0,
                            "sync": true,
                            "offset": 0
                        },
                        "l": {
                            "count": 0,
                            "enable": false,
                            "speed": 1,
                            "decay": 0,
                            "delay": 0,
                            "sync": true,
                            "offset": 0
                        }
                    }
                },
                "effect": {
                    "close": true,
                    "fill": true,
                },
                "move": {
                    "angle": {
                        "offset": 0,
                        "value": 90
                    },
                    "attract": {
                        "distance": 200,
                        "enable": false,
                        "rotate": {
                            "x": 3000,
                            "y": 3000
                        }
                    },
                    "center": {
                        "x": 50,
                        "y": 50,
                        "mode": "percent",
                        "radius": 0
                    },
                    "decay": 0,
                    "distance": {},
                    "direction": "none",
                    "drift": 0,
                    "enable": true,
                    "gravity": {
                        "acceleration": 9.81,
                        "enable": false,
                        "inverse": false,
                        "maxSpeed": 50
                    },
                    "path": {
                        "clamp": true,
                        "delay": {
                            "value": 0
                        },
                        "enable": false,
                        "options": {}
                    },
                    "outModes": {
                        "default": "out",
                        "bottom": "out",
                        "left": "out",
                        "right": "out",
                        "top": "out"
                    },
                    "random": false,
                    "size": false,
                    "speed": 2,
                    "spin": {
                        "acceleration": 0,
                        "enable": false
                    },
                    "straight": false,
                    "trail": {
                        "enable": false,
                        "length": 10,
                        "fill": {}
                    },
                    "vibrate": false,
                    "warp": false
                },
                "number": {
                    "density": {
                        "enable": true,
                        "width": 1920,
                        "height": 1080
                    },
                    "limit": {
                        "mode": "delete",
                        "value": 0
                    },
                    "value": 100
                },
                "opacity": {
                    "value": {
                        "min": 0.1,
                        "max": 0.5
                    },
                    "animation": {
                        "count": 0,
                        "enable": true,
                        "speed": 3,
                        "decay": 0,
                        "delay": 0,
                        "sync": false,
                        "mode": "auto",
                        "startValue": "random",
                        "destroy": "none"
                    }
                },
                "reduceDuplicates": false,
                "shadow": {
                    "blur": 0,
                    "color": {
                        "value": "#000"
                    },
                    "enable": false,
                    "offset": {
                        "x": 0,
                        "y": 0
                    }
                },
                "shape": {
                    "close": true,
                    "fill": true,
                    "options": {},
                    "type": "circle"
                },
                "size": {
                    "value": {
                        "min": 1,
                        "max": 10
                    },
                    "animation": {
                        "count": 0,
                        "enable": true,
                        "speed": 20,
                        "decay": 0,
                        "delay": 0,
                        "sync": false,
                        "mode": "auto",
                        "startValue": "random",
                        "destroy": "none"
                    }
                },
                "stroke": {
                    "width": 0
                },
                "zIndex": {
                    "value": 0,
                    "opacityRate": 1,
                    "sizeRate": 1,
                    "velocityRate": 1
                },
                "destroy": {
                    "bounds": {},
                    "mode": "none",
                    "split": {
                        "count": 1,
                        "factor": {
                            "value": 3
                        },
                        "rate": {
                            "value": {
                                "min": 4,
                                "max": 9
                            }
                        },
                        "sizeOffset": true,
                        "particles": {}
                    }
                },
                "roll": {
                    "darken": {
                        "enable": false,
                        "value": 0
                    },
                    "enable": false,
                    "enlighten": {
                        "enable": false,
                        "value": 0
                    },
                    "mode": "vertical",
                    "speed": 25
                },
                "tilt": {
                    "value": 0,
                    "animation": {
                        "enable": false,
                        "speed": 0,
                        "decay": 0,
                        "sync": false
                    },
                    "direction": "clockwise",
                    "enable": false
                },
                "twinkle": {
                    "lines": {
                        "enable": false,
                        "frequency": 0.05,
                        "opacity": 1
                    },
                    "particles": {
                        "enable": false,
                        "frequency": 0.05,
                        "opacity": 1
                    }
                },
                "wobble": {
                    "distance": 5,
                    "enable": false,
                    "speed": {
                        "angle": 50,
                        "move": 10
                    }
                },
                "life": {
                    "count": 0,
                    "delay": {
                        "value": 0,
                        "sync": false
                    },
                    "duration": {
                        "value": 0,
                        "sync": false
                    }
                },
                "rotate": {
                    "value": 0,
                    "animation": {
                        "enable": false,
                        "speed": 0,
                        "decay": 0,
                        "sync": false
                    },
                    "direction": "clockwise",
                    "path": false
                },
                "orbit": {
                    "animation": {
                        "count": 0,
                        "enable": false,
                        "speed": 1,
                        "decay": 0,
                        "delay": 0,
                        "sync": false
                    },
                    "enable": false,
                    "opacity": 1,
                    "rotation": {
                        "value": 45
                    },
                    "width": 1
                },
                "links": {
                    "blink": false,
                    "color": {
                        "value": "#ffffff"
                    },
                    "consent": false,
                    "distance": 150,
                    "enable": true,
                    "frequency": 1,
                    "opacity": 0.4,
                    "shadow": {
                        "blur": 5,
                        "color": {
                            "value": "#000"
                        },
                        "enable": false
                    },
                    "triangles": {
                        "enable": false,
                        "frequency": 1
                    },
                    "width": 1,
                    "warp": false
                },
                "repulse": {
                    "value": 0,
                    "enabled": false,
                    "distance": 1,
                    "duration": 1,
                    "factor": 1,
                    "speed": 1
                }
            },
            "pauseOnBlur": true,
            "pauseOnOutsideViewport": true,
            "responsive": [],
            "smooth": false,
            "style": {},
            "themes": [],
            "zLayers": 100,
            "name": "Parallax",
            "motion": {
                "disable": false,
                "reduce": {
                    "factor": 4,
                    "value": true
                }
            }
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
                {/* <Box minW={"100vw"} minH={"100vh"} position={"absolute"} inset={0}> */}
                <Box position="absolute" bottom={0} w={"100%"} overflowX={"hidden"} zIndex={-1} className="custom-shape-divider-bottom-1730319297">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z" className="shape-fill"></path>
                    </svg>
                    {/* </Box> */}
                </Box>

            </>
        );
    }

    return <></>;
};