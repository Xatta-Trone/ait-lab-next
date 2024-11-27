import { Metadata } from "next";
import { HeroParticles } from "@/components/Homepage/HeroParticles";
import Hero from "@/components/Homepage/Hero";
import { Box } from "@chakra-ui/react";
import ProjectsSection from "@/components/Homepage/ProjectsSection";
import RecentNews from "@/components/Homepage/RecentNews";
import BookSection from "@/components/Homepage/BookSection";
import ContactSection from "@/components/Homepage/ContactSection";

// Metadata for the homepage, including SEO, Open Graph, and Twitter configuration
export const metadata: Metadata = {
  title: "AIT Lab - Innovation Meets Technology", // Page title
  description:
    "Discover the AIT Lab – a hub for cutting-edge research, innovation, and technological advancements in AI and beyond. Explore projects, news, and resources to stay ahead.", // Short description for SEO
  keywords: [
    "AIT Lab",
    "Artificial Intelligence",
    "Technology Research",
    "Innovation",
    "Cutting-edge Research",
    "AI Projects",
    "Tech Advancements",
    "Research Lab",
  ], // Keywords for search engines
  openGraph: {
    title: "AIT Lab - Innovation Meets Technology", // Open Graph title
    description:
      "Explore the AIT Lab's innovative projects and advancements in AI and technology. Stay connected with the latest in research and development.", // Open Graph description
    url: "https://ait-lab.vercel.app", // Canonical URL for the site
    siteName: "AIT Lab",
    images: [
      {
        url: "/logo_big_black.png", // Open Graph preview image
        alt: "AIT Lab Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // Twitter card type
    title: "AIT Lab - Innovation Meets Technology", // Title for Twitter preview
    description:
      "Discover the forefront of technology and innovation at AIT Lab. Dive into our projects, news, and AI advancements.", // Description for Twitter preview
    images: ["/logo_big_black.png"], // Twitter preview image
  },
  robots: {
    index: true, // Allow search engines to index this page
    follow: true, // Allow search engines to follow links
  },
  alternates: {
    canonical: "https://ait-lab.vercel.app", // Prevent duplicate content issues
  },
  themeColor: "#b7791f", // Theme color for the browser's address bar
  manifest: "/site.webmanifest", // Path to the web app manifest
  icons: {
    icon: "/New_AIT_Favicon.png",
    shortcut: "/New_AIT_Favicon.png",
  },
};

// Main homepage component with sections for hero, projects, news, books, and contact
export default function Home() {
  return (
    <>
      {/* Hero section with a background animation and welcome content */}
      <Box position="relative" mt="-80px" height="calc(100vh + 100px)">
        <HeroParticles /> {/* Particle effects for visual enhancement */}
        <Hero /> {/* Main content of the hero section */}
      </Box>

      {/* Sections for projects, news, books, and contact details */}
      <Box w="100vw">
        <ProjectsSection /> {/* Highlights lab projects */}
        <RecentNews /> {/* Displays the latest news and updates */}
        <BookSection /> {/* Features related books or resources */}
        <ContactSection /> {/* Contact form and lab contact details */}
      </Box>
    </>
  );
}
