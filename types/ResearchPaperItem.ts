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
    img?: string;
    authors?: string; // Optional props
}

interface ResearchPaper {
    title: string;
    authors?: string;
    total_citations: number;
    year: number;
    url: string;
    journal?: string;
    publisher?: string;
    source?: string;
    issue?: string;
    book?: string;
    img?: string;
}