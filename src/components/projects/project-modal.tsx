"use client";

import { useState, useEffect } from "react";
import { X, Globe, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageWithFallback from "../image-w-fallback";
import { Project } from "@/types/project";
import { Badge } from "../ui/badge";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    // Add Escape key listener when modal is open
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      tabIndex={0}
    >
      <div
        className="bg-background rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold">{project.status.toLocaleUpperCase()} Project</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
 
        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column: Image + meta info */}
            <div className="space-y-6 flex flex-col">
              <div className="relative aspect-[10/9] rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={"/images/projects/" + project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  fallbackSrc="/images/placeholder.png"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {project.start_date.month} {project.start_date.year} -{" "}
                    {project.end_date.month} {project.end_date.year}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {project.number && (
                    <Badge variant="outline" className="text-blue-500 border-blue-500">
                      {project.number}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-blue-500 border-blue-500">
                    Role: {project.PI_role}
                  </Badge>
                </div>
                <p className="text-sm font-medium">
                  {project.PI_role}: {project.PI}
                </p>
                <p className="text-sm text-foreground/80">Sponsor: {project.sponsor}</p>
              </div>
            </div>

            {/* Right column: Main content */}
            <div className="md:col-span-2 flex flex-col space-y-6">
              <h2 className="text-xl font-bold">
                {project.number && project.number + ": "}
                {project.title}
              </h2>
              <div>
                {
                    project.description !== "" && (
                        <>
                            <h3 className="text-lg font-medium mb-2">About</h3>
                            <p className="text-foreground/70">{project.description}</p>
                        </>
                    )
                }
              </div>
              <div>
            {
                    project.link && (
                        <>
                        <h3 className="text-lg font-medium mb-2">Learn More</h3>
                        <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-500 hover:underline"
                        >
                        <Globe className="h-4 w-4" />
                        <span>{project.link.replace(/^https?:\/\//, "")}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                            </>
                )
                    }
           
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
