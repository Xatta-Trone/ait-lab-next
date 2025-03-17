export interface LabTool {
  title: string;
  project: string;
  description: string;
  latestProjectLink: string;
  links: {
    label: string;
    url: string;
  }[];
  image: string;
  type: string;
  date: string;
}
