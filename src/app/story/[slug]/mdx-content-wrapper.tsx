import React from "react";

interface MDXContentWrapperProps {
  children: React.ReactNode;
}

// Simple wrapper component to ensure proper rendering context
export default function MDXContentWrapper({
  children,
}: MDXContentWrapperProps) {
  return <div className="mdx-content">{children}</div>;
}
