import {
  Calendar,
  ExternalLink,
  Award,
  FileText,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsItem } from "@/types/news";
import Link from "next/link";

interface NewsItemCardProps {
  newsItem: NewsItem;
}

export default function NewsItemCard({ newsItem }: NewsItemCardProps) {
  // Function to get category icon
  const getCategoryIcon = () => {
    if (
      newsItem.title.toLowerCase().includes("achievement") ||
      newsItem.description.toLowerCase().includes("congrats")
    ) {
      return <Award className="h-5 w-5 text-amber-500" />;
    } else if (
      newsItem.title.toLowerCase().includes("paper") ||
      newsItem.title.toLowerCase().includes("conference") ||
      newsItem.description.toLowerCase().includes("paper") ||
      newsItem.description.toLowerCase().includes("published")
    ) {
      return <FileText className="h-5 w-5 text-blue-500" />;
    } else if (
      newsItem.title.toLowerCase().includes("funding") ||
      newsItem.title.toLowerCase().includes("alert") ||
      newsItem.description.toLowerCase().includes("awarded") ||
      newsItem.description.toLowerCase().includes("grant")
    ) {
      return <AlertCircle className="h-5 w-5 text-green-500" />;
    } else {
      return <AlertCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  // Function to get category name
  const getCategoryName = () => {
    if (
      newsItem.title.toLowerCase().includes("achievement") ||
      newsItem.description.toLowerCase().includes("congrats")
    ) {
      return "Achievement";
    } else if (
      newsItem.title.toLowerCase().includes("paper") ||
      newsItem.title.toLowerCase().includes("conference") ||
      newsItem.description.toLowerCase().includes("paper") ||
      newsItem.description.toLowerCase().includes("published")
    ) {
      return "Publication";
    } else if (
      newsItem.title.toLowerCase().includes("funding") ||
      newsItem.title.toLowerCase().includes("alert") ||
      newsItem.description.toLowerCase().includes("awarded") ||
      newsItem.description.toLowerCase().includes("grant")
    ) {
      return "Funding";
    } else {
      return "News";
    }
  };

  return (
    <Card className="glass-card h-full flex flex-col card-hover overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-start gap-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center glass-card shrink-0">
          {getCategoryIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-foreground/60 mb-1">
            <Calendar className="h-3 w-3" />
            <span>{newsItem.date}</span>
            <Badge
              className={`
              ${
                getCategoryName() === "Achievement"
                  ? "bg-amber-500"
                  : getCategoryName() === "Publication"
                  ? "bg-blue-500"
                  : getCategoryName() === "Funding"
                  ? "bg-green-500"
                  : "bg-gray-500"
              } 
              text-white text-xs`}
            >
              {getCategoryName()}
            </Badge>
          </div>
          <h3 className="text-lg font-medium">{newsItem.title}</h3>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4 pl-20">
        <p className="text-sm text-foreground/70">{newsItem.description}</p>
      </CardContent>
      {newsItem.link && (
        <CardFooter className="pt-0 pb-4 pl-20">
          <Link
            href={newsItem.link}
            className="flex items-center gap-2 text-sm text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" />
            Read more
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
