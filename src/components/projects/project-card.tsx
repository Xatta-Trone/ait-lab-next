import Link from "next/link";
import { Calendar, ExternalLink, Maximize2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import ImageWithFallback from "../image-w-fallback";

interface ProjectCardProps {
  project: Project;
  onModalOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onModalOpen }: ProjectCardProps) {
  return (
    <Card className="glass-card h-full flex flex-col card-hover overflow-hidden">
      <div className="relative aspect-video">
        <ImageWithFallback
          src={"/images/projects/" + project.image || "/images/placeholder.png"}
          alt={project.title}
          fill
          className="object-cover"
          fallbackSrc="/images/placeholder.png"
        />
        <div className="absolute top-2 right-2">
          <Badge
            className={`${
              project.status === "Ongoing" ? "bg-blue-500" : "bg-green-500"
            } text-white`}
          >
            {project.status}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-1">
          <Calendar className="h-3 w-3" />
          <span>
            {project.start_date.month} {project.start_date.year} -{" "}
            {project.end_date.month} {project.end_date.year}
          </span>
        </div>
        <CardTitle className="line-clamp-2 text-lg">
          {project.number && project.number + ": "}
          {project.title}
        </CardTitle>
        <div className="flex items-center gap-2 mt-1">
          {project.number && (
            <Badge variant="outline" className="text-blue-500 border-blue-500">
              {project.number}
            </Badge>
          )}
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            Role: {project.PI_role}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-foreground/70 line-clamp-3">
          {project.description}
        </CardDescription>
        <p className="text-sm mt-3 font-medium">
          {project.PI_role}: {project.PI}
        </p>
        <p className="text-sm text-foreground/70">Sponsor: {project.sponsor}</p>
      </CardContent>
      <CardFooter className="flex items-start gap-2 pt-0 justify-between">
        {/* {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-2 w-auto mb-2">
            {project.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        )} */}
        <Button
          variant="ghost"
          className="gap-2 w-auto justify-start group hover:bg-blue-500/10"
          onClick={() => onModalOpen(project)}
        >
          <span>View Details</span>
          <Maximize2 className="h-4 w-4" />
        </Button>
        {(project.link && project.link !== "") && (
          <Link href={project.link} className="w-fit" target="_blank" rel="noopener noreferrer">
            <Button
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors ml-auto"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Learn More</span>
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
