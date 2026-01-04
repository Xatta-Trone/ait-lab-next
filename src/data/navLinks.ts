export interface NavItem {
  title: string;
  href?: string;
  children?: NavItem[];
}

export const NavLinks: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Research",
    children: [
      {
        title: "Projects & Grants",
        href: "/projects",
      },
      {
        title: "Publications",
        href: "/publications",
      },
      {
        title: "Paper Story",
        href: "/story",
      },
      {
        title: "Theses & Dissertations",
        href: "/theses",
      },
    ],
  },
  {
    title: "Resources",
    children: [
      {
        title: "Tools",
        href: "/tools",
      },
      {
        title: "Courses",
        href: "/courses",
      },
    ],
  },
  {
    title: "Team",
    href: "/team",
  },
  {
    title: "News",
    href: "/news",
  },
  {
    title: "Annual Report",
    children: [
      {
        title: "2025",
        href: "/annual_report/2025.pdf",
      },
    ],
  },
];
