import React, { Suspense } from "react";
import Head from "next/head"; // Import Head for managing metadata
import Research from "@/components/ResearchPage";

const ResearchPage = () => {
    return (
        <>
            {/* Metadata */}
            <Head>
                <title>Projects and Grants | AIT Lab</title>
                <meta
                    name="description"
                    content="Explore the innovative projects and research grants managed by AIT Lab, focusing on artificial intelligence, transportation safety, and advanced spatiotemporal modeling."
                />
                <meta
                    name="keywords"
                    content="AIT Lab Projects, Research Grants, Transportation Safety, Artificial Intelligence, Spatiotemporal Modeling, Advanced Research, Dr. Subasish Das"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://ait-lab.vercel.app/projects-and-grants" />
                <meta name="theme-color" content="#b7791f" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="Projects and Grants | AIT Lab" />
                <meta
                    property="og:description"
                    content="Discover the impactful research projects and grants at AIT Lab, advancing artificial intelligence, transportation safety, and innovative technologies."
                />
                <meta property="og:url" content="https://ait-lab.vercel.app/projects-and-grants" />
                <meta property="og:site_name" content="AIT Lab" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:image" content="/logo_big_black.png" />
                <meta property="og:image:alt" content="AIT Lab Logo" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Projects and Grants | AIT Lab" />
                <meta
                    name="twitter:description"
                    content="Learn about AIT Lab's cutting-edge projects and research grants that focus on AI and transportation safety advancements."
                />
                <meta name="twitter:image" content="/logo_big_black.png" />
            </Head>

            {/* Page Content */}
            <Suspense fallback={<div>Loading...</div>}>
                <Research />
            </Suspense>
        </>
    );
};

export default ResearchPage;
