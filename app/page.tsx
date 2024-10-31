
import { Metadata } from "next";
import { HeroParticles } from "@/components/Homepage/HeroParticles";
import Hero from "@/components/Homepage/Hero";
import { Box } from "@chakra-ui/react";
import ProjectsSection from "@/components/Homepage/ProjectsSection";
import RecentNews from "@/components/Homepage/RecentNews";
import ProspectiveStudents from "@/components/Homepage/ProspectiveStudents";
import BookSection from "@/components/Homepage/BookSection";
import ContactSection from "@/components/Homepage/ContactSection";

export const metadata: Metadata = {
  title: "AIT Lab",
  description: "AIT Lab",
};

export default function Home() {
  return (
    <>
      <Box position={"relative"} mt={"-80px"} border={"none"} height={"calc(100vh + 100px)"}>
        <HeroParticles />
        <Hero />
      </Box>
      <Box backgroundColor={"white"} w={"100vw"}>
        <ProjectsSection />
        <RecentNews />
        <ProspectiveStudents />
        <BookSection />
        <ContactSection />
      </Box>
    </>
  );
}
