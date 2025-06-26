import SectionHeading from "@/components/ui/section-heading";
import {
  getAllStories,
  getUniqueCategories,
  getUniqueYears,
} from "@/utils/mdx-stories";
import { StoriesPageClient } from "./stories-page-client";

export default function PaperStoriesPage() {
  // Server-side data fetching at build time
  const stories = getAllStories();
  const categories = getUniqueCategories();
  const years = getUniqueYears();

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16 md:py-24">
        <SectionHeading
          title={<span className="gradient-text">Paper Stories</span>}
          subtitle="Discover the stories behind our research papers - in-depth explorations of our work, methodologies, and findings"
        />

        <StoriesPageClient
          stories={stories}
          categories={categories}
          years={years}
        />
      </div>
    </div>
  );
}
