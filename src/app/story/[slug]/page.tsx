import { getStoryBySlug, getAllStorySlugs } from "@/utils/mdx-stories";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  Presentation,
  Video,
  Github,
  ExternalLink,
  FileText,
  Play,
  Code,
  BookOpen,
  Link2,
  Globe,
  Mail,
  Twitter,
  Linkedin,
  Youtube,
  Database,
  Settings,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CitationBox from "./citation-box";
import MDXContentRenderer from "./mdx-content-renderer";
import StructuredData from "./structured-data";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

// Icon mapping for dynamic icon rendering
const iconMap = {
  download: Download,
  presentation: Presentation,
  video: Video,
  github: Github,
  external: ExternalLink,
  file: FileText,
  play: Play,
  code: Code,
  book: BookOpen,
  link: Link2,
  globe: Globe,
  mail: Mail,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  database: Database,
  settings: Settings,
  info: Info,
} as const;

// Helper function to get icon component
function getIcon(iconName: string) {
  const IconComponent = iconMap[iconName.toLowerCase() as keyof typeof iconMap];
  return IconComponent || ExternalLink; // Default fallback icon
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const story = getStoryBySlug(resolvedParams.slug);

  if (!story) {
    return {
      title: "Story Not Found",
      description: "The requested research story could not be found.",
    };
  }

  // Generate author names for metadata
  const authorNames = story.authors.map((author) => author.name).join(", ");

  // Use custom description or fallback to abstract
  const description = story.description || story.abstract;

  // Use combined keywords
  const allKeywords = [
    ...(story.keywords || []),
    story.category,
    "research",
    "academic paper",
    "AIT Lab",
  ].filter(Boolean);

  return {
    title: {
      default: story.title,
      template: `%s | AIT Lab`,
    },
    description,
    keywords: allKeywords,
    authors: story.authors.map((author) => ({ name: author.name })),
    creator: authorNames,
    publisher: "Artificial Intelligence in Transportation Lab",
    // Category for better organization
    category: story.category,
  };
}

export async function generateStaticParams() {
  const slugs = getAllStorySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Only allow predefined story slugs
export const dynamicParams = false;

export default async function StoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const story = getStoryBySlug(resolvedParams.slug);

  if (!story) {
    notFound();
  }

  return (
    <>
      <StructuredData story={story} />
      <div className="min-h-screen bg-background pt-32">
        {/* Academic Paper Layout */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Paper Header - Centered Academic Style */}
          <header className="text-center mb-8 border-b pb-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight max-w-4xl mx-auto">
              {story.title}
            </h1>

            {/* Authors */}
            <div className="mb-6">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg">
                {story.authors.map((author, index) => {
                  // Find the affiliation index if author has an affiliation
                  const affiliationIndex =
                    author.affiliation && story.affiliations
                      ? story.affiliations.indexOf(author.affiliation) + 1
                      : null;

                  return (
                    <div key={index} className="text-center">
                      {author.profile ? (
                        <Link
                          href={author.profile}
                          className="text-primary hover:text-primary/80 transition-colors hover:underline"
                        >
                          {author.name}
                          {affiliationIndex && (
                            <sup className="text-xs ml-0.5">
                              {affiliationIndex}
                            </sup>
                          )}
                        </Link>
                      ) : (
                        <span className="text-foreground font-medium">
                          {author.name}
                          {affiliationIndex && (
                            <sup className="text-xs text-muted-foreground ml-0.5">
                              {affiliationIndex}
                            </sup>
                          )}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Affiliations */}
              {story.affiliations && story.affiliations.length > 0 && (
                <div className="text-sm text-muted-foreground mt-3 space-y-1">
                  {story.affiliations.map((affiliation, index) => (
                    <div key={index}>
                      <sup>{index + 1}</sup>
                      {affiliation}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Publication Info */}
            <div className="text-sm text-muted-foreground mb-8">
              <div>
                Published in{" "}
                <span className="font-medium">{story.category}</span> •{" "}
                {story.year}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {story.buttons &&
                story.buttons.length > 0 &&
                story.buttons.map((button, index) => {
                  const IconComponent = getIcon(button.icon);
                  const buttonElement = (
                    <Button
                      key={index}
                      variant={button.variant || "default"}
                      className={cn(
                        "gap-2",
                        button.variant === "default" && "text-white"
                      )}
                    >
                      <IconComponent className="h-4 w-4" />
                      {button.text}
                    </Button>
                  );

                  return button.external !== false ? (
                    <Link
                      key={index}
                      href={button.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {buttonElement}
                    </Link>
                  ) : (
                    <Link key={index} href={button.url}>
                      {buttonElement}
                    </Link>
                  );
                })}
            </div>
          </header>

          {/* Abstract Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">
              Abstract
            </h2>
            <div className="prose dark:prose-invert max-w-none prose-md prose-p:italic prose-p:text-justify prose-p:leading-relaxed">
              <p className="max-w-none">{story.abstract}</p>
            </div>
          </section>

          {/* Keywords Section */}
          {story.keywords && story.keywords.length > 0 && (
            <section className="mb-12">
              {/* <h3 className="text-lg font-semibold text-foreground mb-3">
              Keywords
            </h3> */}
              <div className="flex flex-wrap gap-2 justify-center">
                {story.keywords.map((keyword: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Main Content */}
          <main>
            <article className="prose prose-md dark:prose-invert max-w-none prose-code:rounded-lg prose-code:px-2 prose-code:py-1 prose-pre:rounded-lg prose-blockquote:px-4 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/10 prose-blockquote:text-muted-foreground prose-p:text-justify prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-lg prose-img:my-4">
              <Suspense
                fallback={
                  <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-muted rounded w-2/3 mx-auto"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                      <div className="h-4 bg-muted rounded w-4/6"></div>
                    </div>
                    <div className="h-48 bg-muted rounded"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                  </div>
                }
              >
                <MDXContentRenderer content={story.content} />
              </Suspense>
            </article>
          </main>

          {/* Citation Section */}
          <footer className="mt-8">
            <div className="text-center pt-8">
              {/* Formatted Citation with Copy Functionality */}
              <div className="max-w-4xl mx-auto">
                <CitationBox citation={story.bibtex || ""} />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
