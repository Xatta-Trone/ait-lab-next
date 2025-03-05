interface LabTools {
  title: string;
  project: string;
  description: string;
  latestProjectLink: string;
  links: ToolLink[];
  image: string;
  type: "shiny" | "web";
}

interface ToolLink {
  label: string;
  url: string;
}
