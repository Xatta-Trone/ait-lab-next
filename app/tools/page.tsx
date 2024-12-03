import LabToolsPage from '@/components/LabToolsPage';
import { Box, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import React, { Suspense } from 'react';

const Page = () => {
    return (
        <>
            {/* Page Metadata */}
            <Head>
                <title>Tools | AIT Lab</title>
                <meta
                    name="description"
                    content="Explore the extensive list of tools from AIT Lab, showcasing advancements in artificial intelligence, transportation safety, and spatiotemporal modeling."
                />
                <meta
                    name="keywords"
                    content="AIT Lab Tools, Research Papers, AI Research, Transportation Safety, Spatiotemporal Modeling, Academic Articles, Dr. Subasish Das"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://ait-lab.vercel.app/tools" />
                <meta name="theme-color" content="#b7791f" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="icon" href="/New_AIT_Favicon.png" />

                {/* Open Graph Metadata for Social Media */}
                <meta property="og:title" content="Tools | AIT Lab" />
                <meta
                    property="og:description"
                    content="Discover impactful tools from AIT Lab, focusing on artificial intelligence, transportation safety, and innovative methodologies."
                />
                <meta
                    property="og:url"
                    content="https://ait-lab.vercel.app/tools"
                />
                <meta property="og:site_name" content="AIT Lab" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:image" content="/logo_big_black.png" />
                <meta property="og:image:alt" content="AIT Lab Logo" />

                {/* Twitter Metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Tools | AIT Lab" />
                <meta
                    name="twitter:description"
                    content="Browse the extensive list of tools from AIT Lab, highlighting groundbreaking advancements in AI and transportation safety."
                />
                <meta name="twitter:image" content="/logo_big_black.png" />
            </Head>

            {/* Lazy Load the LabToolsPage Component */}
            <Suspense
                fallback={
                    <Box textAlign="center" py={6}>
                        <Spinner size="xl" color="yellow.500" />
                        {/* Display a loading spinner while the component is loading */}
                    </Box>
                }
            >
                <LabToolsPage />
            </Suspense>
        </>
    );
};

export default Page;
