interface ResearchPaperItemProps {
    title: string;
    total_citations: number;
    year: number;
    url: string;
    journal?: string; // Optional props
    publisher?: string; // Optional props
    source?: string; // Optional props
    issue?: string; // Optional props
    book?: string; // Optional props
}