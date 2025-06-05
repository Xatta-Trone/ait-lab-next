import {
  ImpactFactor,
  ImpactFactorTableData,
  ResearchPaper,
} from "@/types/publication";

function normalize(str?: string): string {
  return (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // remove punctuation
    .replace(/\s+/g, " ") // normalize spaces
    .trim();
}

export function transformImpactFactorData(
  impactFactors: ImpactFactor[],
  publications: ResearchPaper[]
): ImpactFactorTableData[] {
  const years = Array.from({ length: 11 }, (_, i) => 2015 + i); // 2015–2025

  console.log("Impact Factors:", impactFactors);
  console.log("Publications:", publications);

  return impactFactors.map((factor, index) => {
    const normJournal = normalize(factor.journal);
    const normAbbr = normalize(factor.abbr);

    const yearlyCounts: Record<string, number> = {};

    for (const year of years) {
      yearlyCounts[year.toString()] = publications.filter((paper) => {
        const normPaperJournal = normalize(paper.journal);
        return (
          paper.year == year &&
          (normPaperJournal.includes(normJournal) ||
            normPaperJournal.includes(normAbbr))
        );
      }).length;
    }
    return {
      id: index,
      journal: factor.journal,
      abbr: factor.abbr,
      impact_factor: factor.impact_factor,
      ...yearlyCounts,
      total: Object.values(yearlyCounts).reduce((sum, count) => sum + count, 0),
    };
  });
}
