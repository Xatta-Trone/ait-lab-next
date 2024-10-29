
import { Metadata } from "next";
import { HeroParticles } from "@/components/Homepage/HeroParticles";
import Hero from "@/components/Homepage/Hero";
import { Box } from "@chakra-ui/react";
import ProjectsSection from "@/components/Homepage/ProjectsSection";
import RecentNews from "@/components/Homepage/RecentNews";
import ProspectiveStudents from "@/components/Homepage/ProspectiveStudents";

export const metadata: Metadata = {
  title: "AIT Lab",
  description: "AIT Lab",
};

export default function Home() {
  return (
    <>
      <HeroParticles />
      <Hero />
      <Box backgroundColor={"white"} w={"100vw"}>
        <ProjectsSection />
        <RecentNews />
        <ProspectiveStudents />
      </Box>
    </>
  );
}
