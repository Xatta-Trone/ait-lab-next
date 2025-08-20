"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import { ArrowRight } from "lucide-react";
import { useProjectsData } from "@/hooks/useProjectsData";

export default function Projects() {
  const { projects: allProjects = [] } = useProjectsData();

  // Get the 4 latest projects
  const projects = [...allProjects].slice(0, 4);

  return (
    <section className="section-divider dark-section relative overflow-hidden">
      <div className="section-divider::before top-0"></div>
      <div className="absolute inset-0 bg-dots"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>

      <div className="container relative z-10">
        <SectionHeading
          title={<span className="gradient-text">Featured Projects</span>}
          action={
            <Link href="/projects">
              <Button
                variant="outline"
                className="glass-button text-foreground rounded-full group px-6"
              >
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass-card h-full flex flex-col card-hover"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full flex items-center justify-center glass-card mb-4">
                  <span className="text-xl font-bold text-blue-500">
                    {index + 1}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">
                  {project.number ? project.number + ": " : ""}
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-foreground/70 line-clamp-6">
                  {project.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-4">
                {project.link && project.link !== "" && (
                  <Link href={project.link} className="w-auto" target="_blank">
                    <Button
                      variant="ghost"
                      className="gap-2 w-full justify-start group hover:bg-blue-500/10"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-foreground/70 mb-4 max-w-2xl mx-auto">
            Explore our complete list of projects and find detailed information
            about our research initiatives and their impact on transportation
            systems.
          </p>
        </div>
      </div>
      <div className="section-divider::before bottom-0"></div>
    </section>
  );
}
