export type LabToolBranch =
  | "Point"
  | "Segment"
  | "Area"
  | "Route"
  | "Resource"
  | "Other";

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
  /** Sub-grouping for tools (Point/Segment/Area/etc.). Must be present in JSON. */
  dataBranch: LabToolBranch;
  date: string;
}
