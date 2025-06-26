import MDXStoryCard from "./mdx-story-card";
import type { Story } from "@/utils/mdx-stories";
import { BookOpen } from "lucide-react";

interface MDXStoriesListProps {
  stories: Story[];
  isLoading?: boolean;
}

export default function MDXStoriesList({
  stories,
  isLoading = false,
}: MDXStoriesListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="glass-card h-full flex flex-col overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-gradient-to-b from-blue-500/10 to-transparent" />
            <div className="p-6 space-y-4 flex-1">
              <div className="h-4 bg-muted/50 rounded w-3/4" />
              <div className="h-4 bg-muted/50 rounded w-1/2" />
              <div className="space-y-2">
                <div className="h-3 bg-muted/50 rounded" />
                <div className="h-3 bg-muted/50 rounded w-5/6" />
                <div className="h-3 bg-muted/50 rounded w-4/6" />
              </div>
              <div className="h-8 bg-muted/50 rounded w-full mt-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="glass-card mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="w-16 h-16 text-blue-500/70" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">
          No stories found
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Try adjusting your search criteria or check back later for new
          research stories and publications.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <MDXStoryCard key={story.slug} story={story} />
      ))}
    </div>
  );
}
