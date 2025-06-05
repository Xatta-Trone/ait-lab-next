import { useMemo } from "react";
import { ImpactFactor, ResearchPaper } from "@/types/publication";
import { useDataFetching } from "./useDataFetching";
import journalImpactFactors from "../data/journal_impact_factors.json";
import { transformImpactFactorData } from "@/utils/transformImpactFactorTable";

export function useImpactFactorData(publicationData: ResearchPaper[]) {
  const {
    data: journalImpactData,
    isLoading,
    error,
  } = useDataFetching<ImpactFactor>(journalImpactFactors as ImpactFactor[]);

  const impactFactorTableData = useMemo(() => {
    if (!journalImpactData || journalImpactData.length === 0) return [];
    return transformImpactFactorData(journalImpactData, publicationData);
  }, [journalImpactData, publicationData]);

  return {
    impactFactors: journalImpactData,
    isLoading,
    error,
    impactFactorTableData,
  };
}
