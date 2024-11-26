interface TeamMembers {
    name: string; // Full name of the team member
    label: string; // Role or designation (e.g., "Ph.D. Candidate", "Research Fellow")
    description?: string; // (Optional) Brief bio or description of the team member
    email?: string; // (Optional) Email address of the team member
    linkedin?: string; // (Optional) LinkedIn profile URL
    github?: string; // (Optional) GitHub profile URL
    googleScholar?: string; // (Optional) Google Scholar profile URL
    researchGate?: string; // (Optional) ResearchGate profile URL
    orcid?: string; // (Optional) ORCID identifier
    twitter?: string; // (Optional) Twitter handle or profile URL
    websites?: string[]; // (Optional) Array of additional website URLs
    subject?: string; // (Optional) Academic subject or area of expertise (used for alumni)
    duration?: string; // (Optional) Duration of the member's affiliation with the team (used for alumni)
    image?: string; // (Optional) Path or URL to the team member's profile image
}
