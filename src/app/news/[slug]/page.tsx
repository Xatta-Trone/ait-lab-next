/** @format */

import { getNewsById } from "@/utils/news";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calendar } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>; // params should be a Promise
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params; // Await the params to access slug
  const news = await getNewsById(resolvedParams.slug);

  if (!news) {
    return {
      title: "News Not Found | AIT Lab",
    };
  }

  return {
    title: `${news.title} | AIT Lab`,
    description: news.description,
    openGraph: {
      title: news.slug,
      description: news.description,
      type: "article",
      publishedTime: news.date,
    },
  };
}

export async function generateStaticParams() {
  const news = await import("@/data/news.json");
  return news.default
    .filter((item) => item.slug && item.slug.trim() !== "")
    .map((item) => ({
      slug: item.slug as string,
    }));
}

export default async function NewsPage({ params }: PageProps) {
  const resolvedParams = await params; // Await the params here as well
  const news = await getNewsById(resolvedParams.slug);

  if (!news) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 mt-6">
          <div className="flex items-center gap-2 text-sm text-foreground/60 mb-2">
            <Calendar className="h-4 w-4" />
            <span>{news.date}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {news.title}
          </h1>
        </div>

        {/* Content Section */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-foreground/80"
            dangerouslySetInnerHTML={{ __html: news.content || "" }}
          />
        </div>

        {/* Optional Link Section */}
        {news.link && (
          <div className="mt-8 pt-4 border-t border-border/40">
            <a
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
            >
              Read more
              <span className="text-xs">↗</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
