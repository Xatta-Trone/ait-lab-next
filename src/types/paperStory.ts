export interface PaperStory {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  abstract: string;
  description: string; // Markdown content
  year: number;
  journal?: string;
  publisher?: string;
  citations: number;
  tags: string[];
  featured_image?: string;
  thumbnail?: string;
  pdf_link?: string;
  external_url?: string;
  youtube_video?: string;
  publication_date: string;
  date_added: string;
  status: "published" | "draft";
  category: string;
  doi?: string;
  bibtex?: string;
  related_stories?: string[]; // Array of story slugs
  media_gallery?: {
    type: "image" | "video" | "youtube";
    url: string;
    caption?: string;
    alt?: string;
  }[];
}

export interface PaperStoryFilters {
  year?: number;
  category?: string;
  tag?: string;
  author?: string;
  status?: "published" | "draft";
}

export interface PaperStorySearchParams {
  query?: string;
  filters?: PaperStoryFilters;
  page?: number;
  limit?: number;
  sortBy?: "date" | "citations" | "title";
  sortOrder?: "asc" | "desc";
}
