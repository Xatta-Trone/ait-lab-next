import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "../../../../mdx-components";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import rehypeKatex from "rehype-katex";
import rehypePrismPlus from "rehype-prism-plus";

interface MDXContentRendererProps {
  content: string;
}

export default function MDXContentRenderer({
  content,
}: MDXContentRendererProps) {
  const components = useMDXComponents({});

  return (
    <MDXRemote
      source={content}
      components={components}
      options={{
        parseFrontmatter: false, // We already parsed it
        mdxOptions: {
          remarkPlugins: [remarkFrontmatter, remarkGfm, remarkMath],
          rehypePlugins: [
            rehypeKatex,
            [
              rehypePrismPlus,
              {
                ignoreMissing: true,
                defaultLanguage: "text",
                showLineNumbers: true,
              },
            ],
          ],
        },
      }}
    />
  );
}
