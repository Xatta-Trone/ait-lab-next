/** @format */
"use client";

import React, { useEffect } from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    Image,
    Divider,
    Flex,
    Button,
    Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const AboutMe = () => {
    useEffect(() => {
        document.title = "About | AIT Lab";
    }, []);

    return (
        <Box py={20} minHeight="100vh">
            <Container maxW="container.xl">
                {/* Heading */}
                <Heading
                    as="h1"
                    size="2xl"
                    mb={6}
                    textAlign={{ base: "center", md: "left" }}
                >
                    About Subasish Das
                </Heading>

                {/* Flex container for responsive layout */}
                <Flex
                    direction={{ base: "column", md: "row" }}
                    alignItems={{ base: "center", md: "flex-start" }}
                    justifyContent="space-between"
                    mb={10}
                >
                    {/* Text section */}
                    <Box flex="1" pr={{ md: 5 }} mb={{ base: 6, md: 0 }}>
                        <Text fontSize="lg" color="gray.700" lineHeight="taller">
                            I am Subasish. I grew up in Chattogram, Bangladesh. I am a
                            tenure-track Assistant Professor of Civil Engineering program
                            (Ingram School of Engineering) at Texas State University.
                            Previously, I worked as an Associate Research Scientist at Texas
                            A&M Transportation Institute (TTI) for almost 7 years. I am still
                            affiliated with TTI as a part time employee. I have more than 13
                            years of experience related to roadway safety, traffic operation,
                            and CAV technologies. I am a Systems Engineer by training with
                            hands on experience on Six Sigma and Lean Engineering. My major
                            areas of expertise include database management, statistical
                            analysis and machine learning with emphasis in safety and
                            transportation operations, spatial analysis with modern web GIS
                            tools, computer programming (R, python, VBA, html, and
                            javascript), interactive data visualization, and deep learning
                            tools for CV/AV technologies.
                            <br />
                            <br />
                            I have published more than 120 technical reports, and
                            journal articles. I am an active member of ITE, and ASCE. I am an
                            Eno Fellow. I recently served as vice-president of membership of
                            Young Professionals in Transportation Houston chapter.
                        </Text>

                        <Link
                            href="https://subasish.github.io/ait_lab/pdfs/Subasish%20Das%20CV%20revised.pdf"
                            isExternal
                        >
                            <Button
                                mt={4}
                                size="lg"
                                variant="outline"
                                _hover={{ bg: "blue.500", color: "white" }}
                            >
                                Resume
                                <ExternalLinkIcon mx={2} />
                            </Button>
                        </Link>
                    </Box>

                    {/* Image section */}
                    <Box flexShrink={0}>
                        <Image
                            src="/img/das.jpg"
                            alt="Subasish Das"
                            borderRadius="sm"
                            boxSize={{ base: "350px", md: "400px" }}
                            objectFit="contain"
                        />
                    </Box>
                </Flex>

                {/* Divider */}
                <Divider />
                <Heading
                    as="h3"
                    size="lg"
                    my={6}
                    textAlign={{ base: "center", md: "left" }}
                >
                    Traffic Technology International: A Conversation with Subasish Das
                </Heading>
                <Text fontSize="lg" color="gray.700" lineHeight="taller">
                    Researchers at Texas A&M Transportation Institute are using AI to
                    predict exactly where and when crashes will occur so that road
                    authorities can prioritise funding for safety improvements in a more
                    targeted fashion than ever before. Whereas traditionally such
                    predictions would be made using a simple statistical model, AI
                    algorithms can deliver much more accurate predictions, even down to
                    the time of day an accident is likely to occur on a particular stretch
                    of road. Traffic Technology International interviewed Subasish Das on
                    this issue. This issue was featured in Texas Transportation
                    International's{" "}
                    <Link
                        href="https://tti.mydigitalpublication.co.uk/publication/?i=672384"
                        isExternal
                        target="_blank"
                        rel="noreferrer"
                        color="blue.600"
                        textDecoration="underline"
                        _hover={{ color: "blue.800", textDecoration: "underline" }}
                    >
                        September 2020
                        <ExternalLinkIcon mx="2px" />
                    </Link>
                    issue.
                </Text>

                <Flex
                    direction={{ base: "column", md: "row" }}
                    alignItems={{ base: "center", md: "flex-start" }}
                    justifyContent="space-between"
                    mb={10}
                    mt={10}
                >
                    {/* Text section */}
                    <Box flex="1" pr={{ md: 5 }} mb={{ base: 6, md: 0 }}>
                        <Heading as="h3" size="md" fontWeight="bold" mb={3}>
                            Q: Can AI algorithms deliver much more accurate predictions?
                        </Heading>
                        <Text fontSize="lg" color="gray.700" lineHeight="taller">
                            In the conventional model we just use roadway geometric
                            information and traffic volume. But other data such as operating
                            speed — which is very important in predicting crash severity — and
                            weather conditions, are never used in the statistical model. In
                            the AI tools we can import this kind of granular information,
                            which helps us to make it much more accurate. In conventional
                            statistical models, we develop annual crash predictions. So, we
                            can say that on that road, annually, 20 crashes will happen. But
                            in one AI project I recently finished for USDOT for their Safety
                            Data Initiative project, we developed a daily model. And we are
                            now trying to get even more detail, down to daytime crashes versus
                            nighttime crashes.
                        </Text>
                        <Heading as="h3" size="md" fontWeight="bold" mb={3} mt={6}>
                            Q: Why is there a need for AI model in highway safety analysis?
                        </Heading>
                        <Text fontSize="lg" color="gray.700" lineHeight="taller">
                            Conventional statistical models cannot process big data and data
                            stream related problems. We need some advanced AI to get that done
                            and from there we can offer predictions that are daily or even
                            hourly. Once the predictions are delivered, road authorities can
                            view them on a heat map to help decide in which areas they will
                            invest in countermeasures in an attempt to improve safety and cool
                            the accident hot spots.
                        </Text>
                    </Box>

                    {/* Image section */}
                    <Box flexShrink={0}>
                        <Image
                            src="/img/das_fea1.png"
                            alt="Subasish Das"
                            borderRadius="sm"
                            boxSize={{ base: "350px", md: "500px" }}
                            objectFit="contain"
                        />
                    </Box>
                </Flex>

                {/* Divider */}
                <Divider />
                <Heading
                    as="h3"
                    size="lg"
                    my={6}
                    textAlign={{ base: "center", md: "left" }}
                >
                    Artificial Intelligence in Highway Safety: A New Text Book written by
                    Subasish Das
                </Heading>

                <Flex
                    direction={{ base: "column", md: "row" }}
                    alignItems="flex-start"
                    justifyContent="space-between"
                    mb={10}
                    mt={10}
                >
                    {/* Text section */}
                    <Box flex="1" pr={{ md: 5 }} mb={{ base: 6, md: 0 }}>
                        <Text fontSize="lg" color="gray.700" lineHeight="taller">
                            Artificial Intelligence in Highway Safety provides cutting-edge
                            advances in highway safety using AI. The author is a highway
                            safety expert. He pursues highway safety within its contexts,
                            while drawing attention to the predictive powers of the AI
                            techniques in solving complex problems for safety improvement.
                            This book provides both theoretical and practical aspects of
                            highway safety. Each chapter contains theory and its contexts in
                            plain language with several real-life examples. It is suitable for
                            anyone interested in highway safety and AI and it provides an
                            illuminating and accessible introduction to this fast-growing
                            research trend. Material supplementing the book can be found at{" "}
                            <Link
                                href="https://github.com/subasish/AI_in_HighwaySafety"
                                isExternal
                            >
                                https://github.com/subasish/AI_in_HighwaySafety{" "}
                                <ExternalLinkIcon />
                            </Link>
                            . It offers a variety of supplemental materials, including data
                            sets and R codes.
                        </Text>
                        {/* Download PDF Button */}
                        <Link
                            href="https://www.routledge.com/Artificial-Intelligence-in-Highway-Safety/Das/p/book/9780367436704"
                            isExternal
                        >
                            <Button
                                mt={4}
                                size="lg"
                                variant="outline"
                                _hover={{ bg: "blue.500", color: "white" }}
                            >
                                Order The Book
                                <ExternalLinkIcon mx={2} />
                            </Button>
                        </Link>
                    </Box>

                    {/* Image section */}
                    <Box flexShrink={0}>
                        <Image
                            src="/img/aihs1.png"
                            alt="Subasish Das"
                            borderRadius="sm"
                            boxSize={{ base: "350px", md: "500px" }}
                            objectFit="contain"
                        />
                    </Box>
                </Flex>

                {/* Divider */}
                <Divider />
                <Heading
                    as="h3"
                    size="lg"
                    my={6}
                    textAlign={{ base: "center", md: "left" }}
                >
                    Sponsors
                </Heading>

                <Image
                    src="/img/spon.png"
                    alt="Subasish Das"
                    borderRadius="sm"
                    objectFit="contain"
                />
            </Container>
        </Box>
    );
};

export default AboutMe;
