# Pages

This document provides an overview of the pages in the AIT Lab website and instructions on adding new pages. Each page follows a consistent structure to ensure uniformity across the site. All pages are created using the **Next.js App Router** with **TypeScript** and **Chakra UI**.

---

## **Existing Pages**

### 1. **Homepage** (`/`)

- **Purpose**: Serves as the landing page for the website.
- **Key Components**:
  - `Hero`: Introduces the lab with a brief description and highlights its research areas.
  - `HeroParticles`: Adds a dynamic particle effect to enhance the visual appeal.
  - `ProjectsSection`: Displays the four most recent projects using a swiper slider.
  - `RecentNews`: Highlights the latest news items.
  - `BookSection`: Promotes a textbook authored by Dr. Subasish Das.
  - `ContactSection`: Displays the lab's contact details and quick links.
- **File Location**: `app/page.tsx`

---

### 2. **Projects and Grants** (`/projects-and-grants`)

- **Purpose**: Showcases the projects and research grants managed by AIT Lab.
- **Key Components**:
  - `Research`: Lists all projects and grants in a grid layout.
- **File Location**: `app/projects-and-grants/page.tsx`

---

### 3. **Publications** (`/publication`)

- **Purpose**: Displays a detailed list of research papers and publications.
- **Key Components**:
  - `ResearchPapers`: A grid-based view of all research publications.
- **File Location**: `app/publication/page.tsx`

---

### 4. **Team** (`/teams`)

- **Purpose**: Introduces the current team members, fellows, and alumni of the lab.
- **Key Components**:
  - `TeamProfileCard`: Shows details of individual team members with a modal for more information.
- **File Location**: `app/teams/page.tsx`

---

### 5. **Courses** (`/courses`)

- **Purpose**: Lists all courses offered by AIT Lab.
- **Key Components**:
  - `CourseCard`: Displays course details, including schedule, term, and description.
- **File Location**: `app/courses/page.tsx`

---

### 6. **News** (`/news`)

- **Purpose**: Displays recent news and updates related to the lab.
- **Key Components**:
  - `NewsPage`: Lists all news articles in chronological order.
- **File Location**: `app/news/page.tsx`

---

### 7. **Talks** (`/talks`)

- **Purpose**: Lists talks and media appearances by the lab and Dr. Subasish Das.
- **Key Components**:
  - Dynamically sorted list of talks based on year.
- **File Location**: `app/talks/page.tsx`

---

### 8. **Openings** (`/opening`)

- **Purpose**: Lists available positions for research assistants, graduate assistants, and more.
- **File Location**: `app/opening/page.tsx`

---

### 9. **About** (`/about`)

- **Purpose**: Provides detailed information about Dr. Subasish Das and his work.
- **Key Components**:
  - `AboutMe`: Displays a biography, research contributions, and publications.
- **File Location**: `app/about/page.tsx`

### 10. **Tools** (`/tools`)

- **Purpose**: Provides a sorted list of AIT Lab tools with search filters.
- **File Location**: `app/tools/page.tsx`

---

## **Adding New Pages**

1. **Create a New Directory**:

   - Add a directory inside the `app/` folder with the desired route name.
   - Example: To create a new page `/research`, create the folder `app/research/`.

2. **Create the Page Component**:

   - Add a `page.tsx` file inside the newly created folder.
   - Example:

     ```tsx
     "use client";
     import React from "react";
     import { Box, Container, Heading, Text } from "@chakra-ui/react";

     const ResearchPage = () => {
       return (
         <Box py={20}>
           <Container maxW="container.xl">
             <Heading as="h1" size="2xl" mb={6}>
               Research
             </Heading>
             <Text fontSize="lg">
               Welcome to the Research Page. Explore our ongoing and past
               research projects.
             </Text>
           </Container>
         </Box>
       );
     };

     export default ResearchPage;
     ```

3. **Add Metadata**:

   - Each page must include metadata for SEO and social media sharing.
   - Example for server components:
     ```tsx
     export const metadata = {
       title: "Research | AIT Lab",
       description: "Explore ongoing and past research projects at AIT Lab.",
       keywords:
         "AIT Lab Research, AI, Transportation Safety, Spatiotemporal Modeling",
     };
     ```

4. **Integrate Components**:

   - Reuse components where applicable, or create new ones in the `components/` folder.
   - Ensure components are well-documented and follow the Chakra UI structure.

5. **Link the Page**:

   - Update the navigation menu (`navLinks.json`) in the `data/` folder to include the new page.
   - Example:
     ```json
     [{ "name": "Research", "path": "/research" }]
     ```

---

## **Best Practices**

- **Folder Naming**: Use lowercase and hyphens for folder and route names.
- **Metadata**: Always add SEO-friendly metadata for each page.
- **Reusability**: Leverage existing components to maintain consistency.
- **Performance**: Optimize images and other resources to improve page load speed.
