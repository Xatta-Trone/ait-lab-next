export interface Project {
  number: string;
  title: string;
  description: string;
  link: string;
  sponsor: string;
  PI: string;
  PI_role: string;
  start_date: {
    year: number;
    month: string;
  };
  end_date: {
    year: number;
    month: string;
  };
  status: string;
  image: string;
  links?: {
    label: string;
    url: string;
  }[];
}
