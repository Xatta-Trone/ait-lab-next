"use client";
import { useState } from "react";

export function useDataFetching<T>(initialData: T[]) {
  const [data] = useState<T[]>(initialData);
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<Error | null>(null);

  // In a real app, you might fetch data here
  // For now, we're just using the initialData

  return { data, isLoading, error };
}
