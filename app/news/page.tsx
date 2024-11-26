import News from "@/components/NewsPage"; // Component for rendering the News section
import React, { Suspense } from "react";
import Head from "next/head"; // Import Head for managing metadata
import { Box, Spinner } from "@chakra-ui/react"; // Chakra UI components for styling and loading spinner

const NewsPage = () => {
    return (
        <>
            {/* Metadata for SEO and social sharing */}
            <Head>
                <title>News | AIT Lab</title>
                <meta
                    name="description"
                    content="Stay updated with the latest news and advancements from AIT Lab, including research updates, technology innovations, and more."
                />
                <meta
                    name="keywords"
                    content="AIT Lab News, Technology News, Research Updates, AI News, Latest Innovations"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://ait-lab.vercel.app/news" />
                <meta name="theme-color" content="#b7791f" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="News | AIT Lab" />
                <meta
                    property="og:description"
                    content="Discover the latest news and updates from AIT Lab, covering research, innovations, and breakthroughs in technology."
                />
                <meta property="og:url" content="https://ait-lab.vercel.app/news" />
                <meta property="og:site_name" content="AIT Lab" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:image" content="/logo_big_black.png" />
                <meta property="og:image:alt" content="AIT Lab Logo" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="News | AIT Lab" />
                <meta
                    name="twitter:description"
                    content="Stay informed with the latest news and updates from AIT Lab on technology and innovation."
                />
                <meta name="twitter:image" content="/logo_big_black.png" />
            </Head>

            {/* Page Content */}
            <Suspense
                fallback={
                    <Box textAlign="center" py={6}>
                        {/* Fallback UI with a loading spinner */}
                        <Spinner size="xl" color="yellow.500" />
                    </Box>
                }
            >
                {/* Main content: News section */}
                <News />
            </Suspense>
        </>
    );
};

export default NewsPage; // Export the NewsPage component
