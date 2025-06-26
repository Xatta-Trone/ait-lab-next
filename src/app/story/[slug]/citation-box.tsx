"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CitationBoxProps {
  citation: string;
}

export default function CitationBox({ citation }: CitationBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy citation:", error);
    }
  };

  return (
    <div
      className="rounded-lg borde cursor-pointer group relative overflow-hidden shadow-lg p-0"
      onClick={handleCopy}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCopy();
        }
      }}
    >
      {/* Code block header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900 border-b">
        <span className="text-sm font-medium">BibTeX Citation</span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">
                Copied!
              </span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span className="text-sm">Click to copy</span>
            </>
          )}
        </div>
      </div>

      {/* Code content */}
      <div className="m-0 p-0">
        <pre className="text-sm font-mono whitespace-pre text-slate-800 dark:text-slate-100 overflow-x-auto leading-relaxed text-left">
          <code className="block bg-muted/30 p-4 text-wrap">{citation}</code>
        </pre>
      </div>
    </div>
  );
}
