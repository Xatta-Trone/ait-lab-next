import { Calendar, ExternalLink, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LabTool } from "@/types/tool";
import Link from "next/link";
import { Button } from "../ui/button";
import ImageWithFallback from "../image-w-fallback";

interface ToolCardProps {
  tool: LabTool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="glass-card h-full flex flex-col card-hover overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <ImageWithFallback
            src={"/images/lab_tools/" + tool.image || "/images/placeholder.png"}
            alt={tool.title}
            fill
            className="object-cover"
            fallbackSrc="/images/placeholder.png"
          />
          <div className="absolute top-2 right-2">
            <Badge
              className={`${
                tool.type === "shiny" ? "bg-purple-500" : "bg-blue-500"
              } text-white`}
            >
              {tool.type === "shiny" ? "Shiny App" : "Web Tool"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-1">
          <Calendar className="h-3 w-3" />
          <span>{tool.date}</span>
        </div>
        <h3 className="font-bold text-lg mb-2">{tool.title}</h3>
        <div className="mb-3">
          {tool.project && (
            <Badge variant="outline" className="text-blue-500 border-blue-500">
              {tool.project}
            </Badge>
          )}
        </div>
        <p className="text-sm text-foreground/70 line-clamp-3 mb-4">
          {tool.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4 pt-0">
        <div className="flex flex-wrap gap-2 w-full">
          {tool.links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
              {link.label === "Documentation" ||
              link.label === "User Guide" ||
              link.label === "Methodology" ||
              link.label === "User Manual" ? (
                <FileText className="h-3 w-3" />
              ) : (
                <ExternalLink className="h-3 w-3" />
              )}
            </Link>
          ))}
        </div>
        {tool.latestProjectLink && (
          <Link href={tool.latestProjectLink} className="w-auto">
            <Button
              variant="ghost"
              className="gap-2 w-auto justify-start group hover:bg-blue-500/10"
            >
              <span>View Tool</span>
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
