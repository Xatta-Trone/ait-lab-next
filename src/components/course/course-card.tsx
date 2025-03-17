import Image from "next/image";
import { Calendar, ExternalLink, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/types/course";
import Link from "next/link";
import { Button } from "../ui/button";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Function to get level badge color
  const getLevelColor = (level: string) => {
    if (level.includes("Undergraduate")) {
      return "bg-blue-500";
    } else if (level.includes("Ph.D.")) {
      return "bg-amber-500";
    } else if (level.includes("Graduate")) {
      return "bg-purple-500";
    } else {
      return "bg-gray-500";
    }
  };

  // Function to get the most recent term
  const getMostRecentTerm = (termString: string) => {
    const terms = termString.split(", ");
    return terms[terms.length - 1];
  };

  return (
    <Card className="glass-card h-full flex flex-col card-hover overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={"/images/courses/" + course.image || "/images/placeholder.png"}
            alt={course.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge className={`${getLevelColor(course.level)} text-white`}>
              {course.level}
            </Badge>
          </div>
          <div className="absolute top-2 left-2">
            <Badge className="bg-green-500 text-white">
              {getMostRecentTerm(course.term)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
        {course.schedule && (
          <div className="flex items-center gap-2 text-sm text-foreground/70 mb-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>{course.schedule}</span>
          </div>
        )}
        <p className="text-sm text-foreground/70 mb-4 line-clamp-6">
          {course.description}
        </p>
        {course.prerequisite && (
          <div className="p-2">
            <p className="text-xs font-medium">Prerequisite:</p>
            <p className="text-xs">
              {course.prerequisite.courseTitle} (Grade:{" "}
              {course.prerequisite.grade} or better)
            </p>
          </div>
        )}
        {course.term && (
          <div className="mb-3 p-2">
            <p className="text-xs font-medium">Offered:</p>
            <p className="text-xs">{course.term}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4 pt-0">
        {course.lectures && course.lectures.length > 0 && (
          <div className="w-full">
            <p className="text-xs font-medium mb-2">Sample Lectures:</p>
            <div className="space-y-1">
              {course.lectures.map((lecture, index) => (
                <Link
                  key={index}
                  href={lecture.url}
                  className="flex items-center gap-2 text-xs text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="h-3 w-3" />
                  <span className="line-clamp-1">{lecture.label}</span>
                </Link>
              ))}
              {course.lectures.length > 2 && (
                <p className="text-xs text-foreground/60">
                  +{course.lectures.length - 2} more lectures
                </p>
              )}
            </div>
          </div>
        )}
        {course.courseSite && (
          <Link
            href={course.courseSite.url}
            className="w-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              className="gap-2 w-auto justify-start group hover:bg-blue-500/10"
            >
              <span>View {course.courseSite.label}</span>
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
