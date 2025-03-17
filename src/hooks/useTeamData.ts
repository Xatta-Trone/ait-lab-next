import { useQueryState } from "nuqs";
import teamData from "../data/team.json";
import { useDataFetching } from "./useDataFetching";
import { TeamMember } from "@/types/team";

export function useTeamData() {
  const { data, isLoading, error } = useDataFetching<TeamMember>(
    teamData as TeamMember[]
  );

  // Create query parameters for filtering
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [groupFilter, setGroupFilter] = useQueryState("group");

  // Filter team members based on search query and group filter
  const filteredTeamMembers = data.filter((member) => {
    const matchesSearch =
      !searchQuery ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGroup = !groupFilter || member.group === groupFilter;

    return matchesSearch && matchesGroup;
  });

  // Get unique groups for filter dropdown
  const groups = Array.from(new Set(data.map((member) => member.group)));

  return {
    teamMembers: filteredTeamMembers,
    groups,
    isLoading,
    error,
    searchQuery: searchQuery || "",
    setSearchQuery,
    groupFilter: groupFilter || "",
    setGroupFilter,
  };
}
