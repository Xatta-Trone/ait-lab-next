import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";

// Custom YouTube component for embedding videos
function YouTube({ id }: { id: string }) {
  if (!id) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-6">
        <p className="text-red-700 dark:text-red-300">
          Error: YouTube ID is required
        </p>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${id}`;
  return (
    <div className="relative w-full aspect-video my-6">
      <iframe
        src={embedUrl}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full rounded-lg border-0"
        loading="lazy"
      />
    </div>
  );
}

// Custom Author link component
function AuthorLink({ name, profile }: { name: string; profile?: string }) {
  if (!name) {
    return <span className="text-red-500">Error: Author name is required</span>;
  }

  if (profile) {
    return (
      <Link
        href={profile}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors underline decoration-blue-500/30 hover:decoration-blue-500/60"
      >
        {name}
      </Link>
    );
  }
  return <span className="text-gray-700 dark:text-gray-300">{name}</span>;
}

// Custom image component with Next.js optimization
function MdxImage(props: ImageProps) {
  const { alt = "Image", ...restProps } = props;

  return (
    <Image
      {...restProps}
      alt={alt}
      width={800}
      height={600}
      className="rounded-lg my-6 w-full h-auto shadow-lg p-4 bg-white"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      style={{ width: "100%", height: "auto" }}
    />
  );
}

// Custom table components for better accessibility
function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
        {children}
      </table>
    </div>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>;
}

function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
      {children}
    </tr>
  );
}

function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">
      {children}
    </td>
  );
}

function TableHeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">
      {children}
    </th>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use built-in table components with project-consistent styling
    table: Table,
    thead: TableHeader,
    tbody: TableBody,
    tr: TableRow,
    td: TableCell,
    th: TableHeaderCell,

    // Image handling
    img: MdxImage,

    // Custom components for enhanced functionality
    YouTube,
    AuthorLink,
    Badge,
    Button,

    // Merge with any additional components passed in
    ...components,
  };
}
