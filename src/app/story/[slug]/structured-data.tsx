import type { Story } from "@/utils/mdx-stories";

interface StructuredDataProps {
  story: Story;
}

export default function StructuredData({ story }: StructuredDataProps) {
  // Schema.org structured data for research articles
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: story.title,
    abstract: story.abstract,
    datePublished: story.publication_date || `${story.year}-01-01`,
    dateModified: story.publication_date || `${story.year}-01-01`,
    author: story.authors.map((author) => ({
      "@type": "Person",
      name: author.name,
      ...(author.affiliation && {
        affiliation: {
          "@type": "Organization",
          name: author.affiliation,
        },
      }),
    })),
    publisher: {
      "@type": "Organization",
      name: "Artificial Intelligence Technology Lab",
    },
    ...(story.featured_image && {
      image: {
        "@type": "ImageObject",
        url: story.featured_image,
        caption: story.featured_image_alt || story.title,
      },
    }),
    about: {
      "@type": "Thing",
      name: story.category,
    },
    keywords: [...(story.keywords || []), story.category].join(", "),
    ...(story.doi && {
      identifier: [
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: story.doi,
        },
      ],
    }),
    isPartOf: {
      "@type": "Periodical",
      name: story.venue || story.category,
      publisher: {
        "@type": "Organization",
        name: "Artificial Intelligence Technology Lab",
      },
    },
    inLanguage: "en",
    license: "https://creativecommons.org/licenses/by/4.0/",
    copyrightHolder: {
      "@type": "Organization",
      name: "Artificial Intelligence Technology Lab",
    },
    copyrightYear: story.year,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}
