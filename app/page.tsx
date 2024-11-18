import { Metadata } from "next";
import { HeroParticles } from "@/components/Homepage/HeroParticles";
import Hero from "@/components/Homepage/Hero";
import { Box } from "@chakra-ui/react";
import ProjectsSection from "@/components/Homepage/ProjectsSection";
import RecentNews from "@/components/Homepage/RecentNews";
import BookSection from "@/components/Homepage/BookSection";
import ContactSection from "@/components/Homepage/ContactSection";

export const metadata: Metadata = {
  title: "AIT Lab",
  description: "AIT Lab",
};

export default function Home() {
  return (
    <>
      <Box position="relative" mt="-80px" height="calc(100vh + 100px)" bgGradient="linear(to-b, rgba(183, 121, 31, 0.9), rgba(183, 121, 31, 0.6), rgba(183, 121, 31, 0.9))" >
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
