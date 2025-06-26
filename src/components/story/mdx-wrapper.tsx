"use client";

import React from "react";

interface MDXWrapperProps {
  children: React.ReactNode;
}

interface MDXErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class MDXErrorBoundary extends React.Component<
  MDXWrapperProps,
  MDXErrorBoundaryState
> {
  constructor(props: MDXWrapperProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): MDXErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("MDX Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 my-6">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Error Loading Content
          </h3>
          <p className="text-red-700 dark:text-red-300 mb-4">
            There was an error loading the story content. Please try refreshing
            the page.
          </p>
          <details className="text-sm text-red-600 dark:text-red-400">
            <summary className="cursor-pointer">Error Details</summary>
            <pre className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded text-xs overflow-auto">
              {this.state.error?.stack || this.state.error?.message}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}

export function MDXWrapper({ children }: MDXWrapperProps) {
  return (
    <MDXErrorBoundary>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {children}
      </div>
    </MDXErrorBoundary>
  );
}

export function MDXLoadingState() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
}
