export interface TRBAM2026Author {
  name: string;
  affiliation: string;
}

export interface TRBAM2026Paper {
  id: string;
  title: string;
  date: string;
  dayOfWeek: string;
  time: [string, string];
  sessionType: "Poster" | "Lectern";
  location: string;
  authors: TRBAM2026Author[];
}
