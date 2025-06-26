export interface MediaItem {
  type: "image" | "youtube";
  url: string;
  caption?: string;
  alt?: string;
}

export interface PaperStory {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  abstract: string;
  description: string; // Markdown content
  year: number;
  journal: string;
  publisher: string;
  citations: number;
  tags: string[];
  featured_image: string;
  thumbnail: string;
  pdf_link?: string;
  external_url?: string;
  youtube_video?: string;
  publication_date: string;
  date_added: string;
  status: "published" | "draft" | "archived";
  category: string;
  doi?: string;
  bibtex?: string;
  related_stories?: string[];
  media_gallery?: MediaItem[];
}
