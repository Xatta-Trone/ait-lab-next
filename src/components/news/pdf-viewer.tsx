"use client";

import { useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFViewerProps {
  pdfUrl: string;
  title?: string;
}

export default function PDFViewer({ pdfUrl, title }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrl.split("/").pop() || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="my-8">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenInNewTab}
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      )}

      <div className="relative w-full border border-border rounded-lg overflow-hidden bg-muted/20">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading PDF...</p>
            </div>
          </div>
        )}
        <iframe
          src={pdfUrl}
          className="w-full h-[800px] md:h-[1000px]"
          title={title || "PDF Document"}
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {!title && (
        <div className="flex gap-2 mt-4 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenInNewTab}
            className="gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Open in New Tab
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      )}
    </div>
  );
}
