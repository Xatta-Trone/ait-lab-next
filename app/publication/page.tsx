"use client"

import React, { Suspense, useEffect } from "react";
import Head from "next/head"; // Import Head for metadata management
import ResearchPapers from "@/components/ResearchPapers"; // Component to display the list of research papers
import { Box, Spinner } from "@chakra-ui/react"; // Chakra UI components for styling and loading spinner

const PublicationPage = () => {
    useEffect(() => {
        document.title = "Publications - Artificial Intelligence in Transportation Lab (AIT Lab)";
    }, []);
    return (
        <>
            {/* Metadata for SEO and social sharing */}
            <Head>
                <title>Publications - Artificial Intelligence in Transportation Lab (AIT Lab)</title>
                <meta
                    name="description"
                    content="Explore the extensive list of research publications from AIT Lab, showcasing advancements in artificial intelligence, transportation safety, and spatiotemporal modeling."
                />
                <meta
                    name="keywords"
                    content="AIT Lab Publications, Research Papers, AI Research, Transportation Safety, Spatiotemporal Modeling, Academic Articles, Dr. Subasish Das"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://ait-lab.vercel.app/publication" />
                <meta name="theme-color" content="#b7791f" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="icon" href="/New_AIT_Favicon.png" />
                <meta property="og:title" content="Publications - Artificial Intelligence in Transportation Lab (AIT Lab)" />
                <meta
                    property="og:description"
                    content="Discover impactful research publications from AIT Lab, focusing on artificial intelligence, transportation safety, and innovative methodologies."
                />
                <meta
                    property="og:url"
                    content="https://ait-lab.vercel.app/publication"
                />
                <meta property="og:site_name" content="AIT Lab" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:image" content="/logo_big_black.png" />
                <meta property="og:image:alt" content="AIT Lab Logo" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Publications - Artificial Intelligence in Transportation Lab (AIT Lab)" />
                <meta
                    name="twitter:description"
                    content="Browse the extensive list of academic research papers and publications from AIT Lab, highlighting groundbreaking advancements in AI and transportation safety."
                />
                <meta name="twitter:image" content="/logo_big_black.png" />
            </Head>

            {/* Page Content */}
            <Suspense
                fallback={
                    <Box textAlign="center" py={6}>
                        <Spinner size="xl" color="yellow.500" /> {/* Loading spinner for fallback UI */}
                    </Box>
                }
            >
                <ResearchPapers /> {/* Displays the research publications */}
            </Suspense>
        </>
    );
};

export default PublicationPage; // Export the PublicationPage component
