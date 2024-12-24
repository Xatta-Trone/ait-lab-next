interface ResearchPaperItemProps {
    title: string; // The title of the research paper
    total_citations: number; // The total number of citations the paper has received
    year: number; // The year the research paper was published
    url: string; // The URL linking to the full research paper or its details
    journal?: string; // (Optional) The journal where the paper was published
    publisher?: string; // (Optional) The publisher of the paper
    source?: string; // (Optional) The source of the publication
    issue?: string; // (Optional) The issue number of the publication
    book?: string; // (Optional) If the paper is part of a book, the book title
    img?: string; // (Optional) The URL or file path of an image representing the research paper
    authors?: string; // (Optional) The authors of the research paper
    pdf_link?: string;
}

interface ResearchPaper {
    title: string; // The title of the research paper
    authors?: string; // (Optional) The authors of the research paper
    total_citations: number; // The total number of citations the paper has received
    year: number; // The year the research paper was published
    url: string; // The URL linking to the full research paper or its details
    journal?: string; // (Optional) The journal where the paper was published
    publisher?: string; // (Optional) The publisher of the paper
    source?: string; // (Optional) The source of the publication
    issue?: string; // (Optional) The issue number of the publication
    book?: string; // (Optional) If the paper is part of a book, the book title
    img?: string; // (Optional) The URL or file path of an image representing the research paper
    pdf_link?: string;
}
