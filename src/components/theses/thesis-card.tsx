import { Download, Calendar, GraduationCap, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageWithFallback from "@/components/image-w-fallback";
import Link from "next/link";
import type { Thesis } from "@/types/thesis";

interface ThesisCardProps {
  thesis: Thesis;
}

export default function ThesisCard({ thesis }: ThesisCardProps) {
  // Function to get type badge color
  const getTypeColor = (type: string) => {
    return type === "dissertation" ? "bg-purple-500" : "bg-blue-500";
  };

  // Function to format the term and year
  const formatPeriod = (year: number, term: string) => {
    return `${term} ${year}`;
  };

  return (
    <Card className="glass-card h-full flex flex-col card-hover overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <ImageWithFallback
            src={thesis.image || "/images/placeholder.png"}
            alt={thesis.title}
            fill
            className="object-cover"
            fallbackSrc="/images/placeholder.png"
          />
          <div className="absolute top-2 right-2">
            <Badge className={`${getTypeColor(thesis.type)} text-white`}>
              {thesis.type === "dissertation" ? "Dissertation" : "Thesis"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-2">
          <Calendar className="h-3 w-3" />
          <span>{formatPeriod(thesis.year, thesis.term)}</span>
        </div>
        <CardTitle className="line-clamp-3 text-lg mb-3">
          {thesis.title}
        </CardTitle>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="h-4 w-4 text-blue-500" />
          <p className="text-sm font-medium text-foreground/80">
            {thesis.author}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4 pt-0">
        <div className="flex gap-2 w-full">
          {thesis.thesesLink && (
            <Link
              href={thesis.thesesLink}
              className="w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                className="gap-2 w-auto justify-start group hover:bg-blue-500/10"
              >
                <span>View Document</span>
                <FileText className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
          {thesis.presentationLink && (
            <Link
              href={thesis.presentationLink}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors ml-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4" />
              Download Slides
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
