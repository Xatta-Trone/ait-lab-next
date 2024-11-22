import { Metadata } from "next";
import { HeroParticles } from "@/components/Homepage/HeroParticles";
import Hero from "@/components/Homepage/Hero";
import { Box } from "@chakra-ui/react";
import ProjectsSection from "@/components/Homepage/ProjectsSection";
import RecentNews from "@/components/Homepage/RecentNews";
import BookSection from "@/components/Homepage/BookSection";
import ContactSection from "@/components/Homepage/ContactSection";

// Metadata Object
export const metadata: Metadata = {
  title: "AIT Lab - Innovation Meets Technology",
  description:
    "Discover the AIT Lab – a hub for cutting-edge research, innovation, and technological advancements in AI and beyond. Explore projects, news, and resources to stay ahead.",
  keywords: [
    "AIT Lab",
    "Artificial Intelligence",
    "Technology Research",
    "Innovation",
    "Cutting-edge Research",
    "AI Projects",
    "Tech Advancements",
    "Research Lab",
  ],
  openGraph: {
    title: "AIT Lab - Innovation Meets Technology",
    description:
      "Explore the AIT Lab's innovative projects and advancements in AI and technology. Stay connected with the latest in research and development.",
    url: "https://ait-lab.vercel.app",
    siteName: "AIT Lab",
    images: [
      {
        url: "/logo_big_black.png", // Ensure this image is placed in the public folder
        alt: "AIT Lab Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIT Lab - Innovation Meets Technology",
    description:
      "Discover the forefront of technology and innovation at AIT Lab. Dive into our projects, news, and AI advancements.",
    images: ["/logo_big_black.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ait-lab.vercel.app",
  },
  themeColor: "#b7791f",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

// Home Component
export default function Home() {
  return (
    <>
      <Box position="relative" mt="-80px" height="calc(100vh + 100px)">
        <HeroParticles />
        <Hero />
      </Box>
      <Box w="100vw">
        <ProjectsSection />
        <RecentNews />
        <BookSection />
        <ContactSection />
      </Box>
    </>
  );
}
