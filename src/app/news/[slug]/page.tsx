/** @format */

import { getNewsById } from "@/utils/news";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calendar } from "lucide-react";
import ImageGallery from "@/components/news/image-gallery";
import PDFViewer from "@/components/news/pdf-viewer";

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
    title: `${news.slug} | AIT Lab`,
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
  const resolvedParams = await params;
  const news = await getNewsById(resolvedParams.slug);

  if (!news) {
    notFound();
  }

  // Gallery images for TRBAM news
  const trbamImages = resolvedParams.slug === "2026-ait-lab-trbam-representation"
    ? Array.from({ length: 12 }, (_, i) =>
        `/images/news/trbam2026/${String(i + 1).padStart(2, "0")}.png`
      )
    : [];

  // Check if this is the TRBAM news article
  const isTRBAMNews = resolvedParams.slug === "2026-ait-lab-trbam-representation";

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <span>{news.date}</span>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-primary">{news.title}</h1>
        </div>

        {/* Content Section */}
        <div className="prose dark:prose-invert prose-lg max-w-none">
          <div
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: news.content || "" }}
          />
        </div>

        {/* PDF Schedule Section */}
        {isTRBAMNews && (
          <PDFViewer
            pdfUrl="/trbam2026schedule.pdf"
            title="TRBAM 2026 Presentation Schedule"
          />
        )}

        {/* Gallery Section */}
        {trbamImages.length > 0 && (
          <ImageGallery images={trbamImages} title="Event Photos" />
        )}

        {/* Optional Link Section */}
        {news.link && (
          <div className="mt-8 pt-4 border-t border-border">
            <a
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 flex items-center gap-2"
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
