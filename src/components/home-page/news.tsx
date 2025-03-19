"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import {
  ArrowRight,
  Calendar,
  Award,
  Lightbulb,
  DollarSign,
} from "lucide-react";
import { useNewsData } from "@/hooks/useNewsData";

export default function News() {
  const { newsItems = [] } = useNewsData();

  // Sort news by date (most recent first) and take first 4 items
  const sortedNews = [...newsItems]
    .sort((a, b) => {
      // Parse dates in format "Month Year" for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 6);

  return (
    <section className="section-divider light-section relative">
      <div className="section-divider::before top-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl opacity-50"></div>

      <div className="container relative z-10">
        <SectionHeading
          title={<span className="gradient-text">Recent News</span>}
          action={
            <Link href="/news">
              <Button
                variant="outline"
                className="glass-button text-foreground rounded-full group px-6"
              >
                View All News
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedNews.map((item) => (
            <Card
              key={item.description}
              className="glass-card overflow-hidden card-hover"
            >
              <CardHeader className="pb-2 flex flex-row items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center glass-card shrink-0">
                  {/* <item.icon className="h-5 w-5 text-blue-500" /> */}
                  {item.title.toLowerCase() == "student achievement" ? (
                    <Award className="h-5 w-5 text-blue-500" />
                  ) : item.title.toLowerCase() == "new funding alert" ? (
                    <DollarSign className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Lightbulb className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-foreground/60 mb-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="font-medium text-blue-500">
                      {item.title}
                    </span>
                  </div>
                  <CardTitle className="text-base font-medium line-clamp-4">
                    {item.description}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-4 pl-14">
                {item.link && (
                  <Link href={`${item.link}`} target="_blank">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-4 py-2 h-auto rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 group"
                    >
                      Read more
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="section-divider::before bottom-0"></div>
    </section>
  );
}
