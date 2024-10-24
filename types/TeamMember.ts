interface TeamMembers {
    name: string;
    label: string;
    description?: string; // Optional
    email?: string;
    linkedin?: string;
    github?: string;
    googleScholar?: string;
    researchGate?: string;
    orcid?: string;
    twitter?: string;
    websites?: string[]; // Updated type to reflect an array of strings
    subject?: string; // Used for alumni
    duration?: string; // Used for alumni
    image?: string; // Optional property
}