import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { MDXProps } from "mdx/types";

export interface StoryFrontmatter {
  // Core required fields
  title: string;
  authors: Array<{
    name: string;
    profile?: string;
    affiliation?: string;
  }>;
  affiliations?: string[];
  year: number;
  category: string;
  abstract: string;

  // Content and media
  featured_image?: string;
  featured_image_alt?: string;

  // Action buttons (replaces individual URL fields)
  buttons?: Array<{
    text: string;
    url: string;
    icon: string;
    variant?:
      | "default"
      | "outline"
      | "secondary"
      | "destructive"
      | "ghost"
      | "link";
    external?: boolean;
  }>;

  // Citation and metadata
  bibtex?: string;
  keywords?: string[]; // Merged keywords and seo_keywords
  doi?: string;
  venue?: string;
  publication_date?: string;

  // SEO (description can be different from abstract for SEO purposes)
  description?: string; // Renamed from seo_description for clarity
}

export interface Story extends StoryFrontmatter {
  slug: string;
  content: string;
}

// Type for dynamically imported MDX components
export interface MDXStoryModule {
  default: React.ComponentType<MDXProps>;
  metadata?: StoryFrontmatter;
}

const STORIES_DIRECTORY = path.join(process.cwd(), "src/content/story");

export function getAllStories(): Story[] {
  if (!fs.existsSync(STORIES_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(STORIES_DIRECTORY);
  const stories = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const slug = name.replace(/\.mdx$/, "");
      const fullPath = path.join(STORIES_DIRECTORY, name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...(data as StoryFrontmatter),
      };
    })
    .sort((a, b) => b.year - a.year); // Sort by year, newest first

  return stories;
}

export function getStoryBySlug(slug: string): Story | null {
  try {
    const fullPath = path.join(STORIES_DIRECTORY, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...(data as StoryFrontmatter),
    };
  } catch (error) {
    console.error("Error reading story:", error);
    return null;
  }
}

export function getAllStorySlugs(): string[] {
  if (!fs.existsSync(STORIES_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(STORIES_DIRECTORY);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

export function getStoriesByCategory(category: string): Story[] {
  const allStories = getAllStories();
  return allStories.filter((story) => story.category === category);
}

export function getStoriesByYear(year: number): Story[] {
  const allStories = getAllStories();
  return allStories.filter((story) => story.year === year);
}

export function getUniqueCategories(): string[] {
  const allStories = getAllStories();
  const categories = allStories.map((story) => story.category);
  return Array.from(new Set(categories)).sort();
}

export function getUniqueYears(): number[] {
  const allStories = getAllStories();
  const years = allStories.map((story) => story.year);
  return Array.from(new Set(years)).sort((a, b) => b - a);
}

export function searchStories(query: string): Story[] {
  const allStories = getAllStories();
  const lowercaseQuery = query.toLowerCase().trim();

  if (!lowercaseQuery) {
    return allStories;
  }

  return allStories.filter((story) => {
    // Search in title
    const titleMatch = story.title.toLowerCase().includes(lowercaseQuery);

    // Search in abstract
    const abstractMatch = story.abstract.toLowerCase().includes(lowercaseQuery);

    // Search in authors
    const authorMatch = story.authors.some((author) =>
      author.name.toLowerCase().includes(lowercaseQuery)
    );

    // Search in category
    const categoryMatch = story.category.toLowerCase().includes(lowercaseQuery);

    // Search in content (MDX content without frontmatter)
    const contentMatch = story.content.toLowerCase().includes(lowercaseQuery);

    // Search in year
    const yearMatch = story.year.toString().includes(lowercaseQuery);

    return (
      titleMatch ||
      abstractMatch ||
      authorMatch ||
      categoryMatch ||
      contentMatch ||
      yearMatch
    );
  });
}

// Advanced search with filters
export function searchStoriesAdvanced(options: {
  query?: string;
  category?: string;
  year?: number;
  author?: string;
}): Story[] {
  let stories = getAllStories();

  // Apply text search
  if (options.query) {
    stories = searchStories(options.query);
  }

  // Apply category filter
  if (options.category && options.category !== "all") {
    stories = stories.filter((story) => story.category === options.category);
  }

  // Apply year filter
  if (options.year) {
    stories = stories.filter((story) => story.year === options.year);
  }

  // Apply author filter
  if (options.author) {
    const authorLower = options.author.toLowerCase();
    stories = stories.filter((story) =>
      story.authors.some((author) =>
        author.name.toLowerCase().includes(authorLower)
      )
    );
  }

  return stories;
}

// Dynamic import function for MDX stories
export async function importStoryMDX(
  slug: string
): Promise<MDXStoryModule | null> {
  try {
    // Use dynamic import to load the MDX file
    const mdxModule = await import(`@/content/story/${slug}.mdx`);
    return mdxModule as MDXStoryModule;
  } catch (error) {
    console.error(`Error importing MDX story ${slug}:`, error);
    return null;
  }
}

// Get story with MDX component
export async function getStoryWithMDX(slug: string): Promise<{
  story: Story | null;
  MDXComponent: React.ComponentType<MDXProps> | null;
}> {
  const story = getStoryBySlug(slug);

  if (!story) {
    return { story: null, MDXComponent: null };
  }

  const mdxModule = await importStoryMDX(slug);

  return {
    story,
    MDXComponent: mdxModule?.default || null,
  };
}
