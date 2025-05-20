import { FileText, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ResearchPaper } from "@/types/publication";
import Link from "next/link";
import { Button } from "../ui/button";
import ImageWithFallback from "../image-w-fallback";

interface PublicationCardProps {
  publication: ResearchPaper;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <Card className="glass-card h-full flex flex-col card-hover overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full bg-gradient-to-b from-blue-500/10 to-transparent">
          {
            <ImageWithFallback
              src={
                `https://raw.githubusercontent.com/Xatta-Trone/google-scholar-scrapper/refs/heads/main/${publication.img}` ||
                "/images/placeholder.png"
              }
              alt={publication.title}
              fill
              className="object-cover opacity-80"
              fallbackSrc="/images/placeholder.png"
            />
          }
          <div className="absolute top-2 right-2">
            <Badge className="bg-blue-500 text-white">
              {publication.year
                ? publication.year
                : publication.date_added
                ? new Date(publication.date_added).getFullYear()
                : "N/A"}
            </Badge>
          </div>
          {publication.total_citations > 0 && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-amber-500 text-white flex items-center gap-1">
                {publication.total_citations} Citations
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">
          {publication.title}
        </h3>
        {publication.authors && (
          <p className="text-sm text-foreground/70 mb-2 line-clamp-1">
            {publication.authors}
          </p>
        )}
        <div className="flex flex-wrap gap-1 mb-3">
          {publication.journal && (
            <p className="text-xs text-foreground/60 mt-1">
              {publication.journal}
            </p>
          )}
          {publication.book && (
            <p className="text-xs text-foreground/60 mt-1">
              {publication.book}
            </p>
          )}
        </div>
        {publication.issue && (
          <p className="text-xs text-foreground/60 mt-1">
            Issue: {publication.issue}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4 pt-0">
        <div className="flex gap-2 w-full">
          {publication.url && (
            <Link
              href={publication.url}
              className="w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                className="gap-2 w-auto justify-start group hover:bg-blue-500/10"
              >
                <span>View Publication</span>
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
          {publication.pdf_link && (
            <Link
              href={`https://raw.githubusercontent.com/Xatta-Trone/ait-lab-published-papers/refs/heads/main/${publication.pdf_link}`}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors ml-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="h-4 w-4" />
              Download Author Copy
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
