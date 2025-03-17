export interface Course {
  title: string;
  schedule: string;
  term: string;
  description: string;
  prerequisite?: {
    courseTitle: string;
    grade: string;
  };
  level: string;
  image: string;
  lectures?: {
    label: string;
    url: string;
  }[];
  courseSite?: {
    label: string;
    url: string;
  };
}
