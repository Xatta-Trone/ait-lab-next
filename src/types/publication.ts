export interface ResearchPaper {
  title: string;
  authors?: string;
  total_citations: number;
  year: number;
  url: string;
  journal?: string;
  publisher?: string;
  source?: string;
  issue?: string;
  book?: string;
  img?: string;
  pdf_link?: string;
}
