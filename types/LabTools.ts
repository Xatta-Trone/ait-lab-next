interface LabTools {
  title: string;
  project: string;
  description: string;
  latestProjectLink: string;
  links: ToolLink[];
  image: string;
}

interface ToolLink {
  label: string;
  url: string;
}