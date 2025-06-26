import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Story } from "@/utils/mdx-stories";
import ImageWithFallback from "../image-w-fallback";

interface MDXStoryCardProps {
  story: Story;
}

export default function MDXStoryCard({ story }: MDXStoryCardProps) {
  return (
    <Card className="glass-card h-full flex flex-col overflow-hidden card-hover">
      {/* Featured Image */}

      <div className="relative h-48 w-full bg-gradient-to-b from-blue-500/10 to-transparent">
        <ImageWithFallback
          src={`${story.featured_image}` || "/images/placeholder.png"}
          alt={story.title}
          fill
          className="object-cover opacity-80"
          fallbackSrc="/images/placeholder.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <Badge className="bg-blue-500 text-white font-medium">
            {story.category}
          </Badge>
        </div>
      </div>

      <CardHeader className={`flex-1 ${!story.featured_image ? "pt-6" : ""}`}>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{story.title}</h3>

        {/* Authors */}
        <p className="text-sm text-foreground/70 mb-3 line-clamp-1">
          {story.authors.map((author) => author.name).join(", ")}
        </p>

        <p className="text-xs text-foreground/60 mt-1 line-clamp-2">
          {story.description || story.abstract}
        </p>
      </CardHeader>

      <CardFooter className="flex flex-col items-start gap-2 p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Link
            href={`/story/${story.slug}`}
            className="w-auto"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              className="gap-2 w-auto justify-start group hover:bg-blue-500/10"
            >
              <span>Read Story</span>
              <FileText className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          {story.buttons &&
            story.buttons.length > 0 &&
            story.buttons[0]?.url && (
              <Link
                href={story.buttons[0].url}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors ml-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Paper
              </Link>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
