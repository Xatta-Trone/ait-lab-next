import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import rehypeKatex from "rehype-katex";
import rehypePrismPlus from "rehype-prism-plus";

const nextConfig: NextConfig = {
  // Configure pageExtensions to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },

  // Ensure proper transpilation
  // Required for Turbopack/Next 15 to avoid React runtime mismatches
  // when using `next-mdx-remote/rsc`.
  transpilePackages: ["next-mdx-remote"],

  // Experimental features for better MDX support
  experimental: {
    mdxRs: false, // Keep using the JS-based MDX compiler for stability
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [
      remarkFrontmatter, // Handle YAML frontmatter
      remarkGfm,
      remarkMath,
    ],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypePrismPlus,
        {
          ignoreMissing: true,
          defaultLanguage: "text",
          showLineNumbers: false,
          theme: "dark-plus", // Use VS Code Dark+ theme
        },
      ],
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
