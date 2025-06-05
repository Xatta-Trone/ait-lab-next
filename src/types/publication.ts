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
  date_added: string;
}

export interface ImpactFactor {
  journal: string;
  impact_factor: number;
  abbr: string;
}

export interface ImpactFactorTableData {
  id: number;
  journal: string;
  impact_factor: number;
  abbr: string;
  total: number;
  [key: number]: number;
}
