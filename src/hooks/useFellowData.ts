import { useQueryState } from "nuqs";
import fellowData from "../data/fellow.json";
import { useDataFetching } from "./useDataFetching";
import { Fellow } from "@/types/team";

export function useFellowData() {
  const { data, isLoading, error } = useDataFetching<Fellow>(
    fellowData as Fellow[]
  );

  // Create query parameters for filtering
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [groupFilter, setGroupFilter] = useQueryState("group");

  // Filter fellows based on search query and group filter
  const filteredFellows = data.filter((fellow) => {
    const matchesSearch =
      !searchQuery ||
      fellow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fellow.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGroup = !groupFilter || fellow.group === groupFilter;

    return matchesSearch && matchesGroup;
  });

  // Get unique groups for filter dropdown
  const groups = Array.from(new Set(data.map((fellow) => fellow.group)));

  return {
    fellows: filteredFellows,
    groups,
    isLoading,
    error,
    searchQuery: searchQuery || "",
    setSearchQuery,
    groupFilter: groupFilter || "",
    setGroupFilter,
  };
}
