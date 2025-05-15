export interface TeamMember {
  name: string;
  label: string;
  group: string;
  linkedin: string;
  email: string;
  image: string;
  description: string;
  googleScholar?: string;
  github?: string;
  twitter?: string;
  researchGate?: string;
  websites?: string[];
  awards?: string[];
  orcid?: string;
}

export interface Fellow {
  name: string;
  label: string;
  group: string;
  linkedin: string;
  email: string;
  image: string;
  description: string;
  googleScholar?: string;
  github?: string;
  twitter?: string;
  researchGate?: string;
  websites?: string[];
  awards?: string[];
  orcid?: string;
}

export interface Alumnus {
  name: string;
  label: string;
  subject: string;
  duration: string;
}
