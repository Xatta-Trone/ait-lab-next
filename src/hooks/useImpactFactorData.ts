import { useEffect, useMemo, useState } from "react";
import { ImpactFactor, ResearchPaper } from "@/types/publication";
import { useDataFetching } from "./useDataFetching";
import journalImpactFactors from "../data/journal_impact_factors.json";
import { transformImpactFactorData } from "@/utils/transformImpactFactorTable";

export function useImpactFactorData(publicationData: ResearchPaper[]) {
  const {
    data: journalImpactData,
    isLoading: isJournalImpactLoading,
    error,
  } = useDataFetching<ImpactFactor>(journalImpactFactors as ImpactFactor[]);

  const impactFactorTableData = useMemo(() => {
    if (!journalImpactData || journalImpactData.length === 0) return [];
    return transformImpactFactorData(journalImpactData, publicationData);
  }, [journalImpactData, publicationData]);

  const [ifPublicationData, setIfPublicationData] = useState<
    Record<string, Record<string, number>>
  >({});
  const [isIfPublicationLoading, setIsIfPublicationLoading] = useState(true);

  useEffect(() => {
    async function fetchIfData() {
      try {
        setIsIfPublicationLoading(true);
        const response = await fetch(
          "https://raw.githubusercontent.com/Xatta-Trone/google-scholar-scrapper/refs/heads/main/summary-qK-YgxAAAAAJ.json"
        );
        const json = await response.json();
        if (json && typeof json.data === "object") {
          setIfPublicationData(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch ifPublicationData:", err);
      } finally {
        setIsIfPublicationLoading(false);
      }
    }

    fetchIfData();
  }, []);

  return {
    impactFactors: journalImpactData,
    isLoading: isJournalImpactLoading,
    isIfPublicationLoading,
    error,
    impactFactorTableData,
    ifPublicationData,
  };
}
