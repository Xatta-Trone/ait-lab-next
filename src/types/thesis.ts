export interface Thesis {
  title: string;
  author: string;
  year: number;
  term: string;
  presentationLink: string;
  thesesLink: string;
  image: string;
  type: "thesis" | "dissertation";
}
