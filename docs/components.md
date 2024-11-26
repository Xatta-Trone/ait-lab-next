# **Components Overview**

This document provides an overview of the components used in the **AIT Lab Website** project. Components are organized by functionality to aid in understanding and extendability.

---

## **Global Components**

These components are reusable across multiple pages and provide core functionality or UI.

### 1. **Navbar**

- **File:** `Navbar.tsx`
- **Description:** The top navigation bar for the site, including links to the main sections and pages.
- **Key Features:**
  - Responsive design for desktop and mobile.
  - Styled with Chakra UI for consistency.

### 2. **Footer**

- **File:** `Footer.tsx`
- **Description:** The footer for the site, containing links, contact information, and additional resources.
- **Key Features:**
  - Dynamic layout for quick updates.

### 3. **ScrollToTop**

- **File:** `ScrollToTop.tsx`
- **Description:** Provides a button for users to scroll back to the top of the page.

---

## **Homepage Components**

Components specific to the homepage layout and functionality.

### 1. **Hero**

- **File:** `Homepage/Hero.tsx`
- **Description:** The main hero section of the homepage, containing the welcome message and key highlights.

### 2. **HeroParticles**

- **File:** `Homepage/HeroParticles.tsx`
- **Description:** Adds particle effects to the hero section for enhanced visual appeal.

### 3. **ProjectsSection**

- **File:** `Homepage/ProjectsSection.tsx`
- **Description:** Displays a summary of ongoing and completed projects on the homepage.

### 4. **ProjectsSwiper**

- **File:** `Homepage/ProjectsSwiper.tsx`
- **Description:** A carousel of projects shown in a swiper component for easy browsing.

### 5. **RecentNews**

- **File:** `Homepage/RecentNews.tsx`
- **Description:** Displays the latest news items dynamically on the homepage.

### 6. **ContactSection**

- **File:** `Homepage/ContactSection.tsx`
- **Description:** A section for contacting the AIT Lab, including an email form and additional details.

---

## **Project & Research Components**

Components related to projects, grants, and research.

### 1. **ProjectCard**

- **File:** `ProjectCard.tsx`
- **Description:** A card component for displaying individual project details.

### 2. **GrantCard**

- **File:** `GrantCard.tsx`
- **Description:** A card component for displaying grant details.

### 3. **ResearchPapers**

- **File:** `ResearchPapers.tsx`
- **Description:** Displays a list of research papers with filtering and search options.

### 4. **ResearchPaperItem**

- **File:** `ResearchPaperItem.tsx`
- **Description:** Represents individual research papers in a list or grid format.

---

## **Team Components**

Components related to team profiles and details.

### 1. **TeamProfileCard**

- **File:** `TeamProfileCard.tsx`
- **Description:** Displays individual team member profiles with roles and social links.

### 2. **TeamProfileModal**

- **File:** `TeamProfileModal.tsx`
- **Description:** A modal for showing detailed information about team members.

---

## **Page Components**

Components representing or enhancing entire pages.

### 1. **ProjectsPage**

- **File:** `ProjectsPage.tsx`
- **Description:** The main page for browsing all projects with detailed filters and pagination.

### 2. **GrantsPage**

- **File:** `GrantsPage.tsx`
- **Description:** A dedicated page for exploring grants associated with the AIT Lab.

### 3. **NewsPage**

- **File:** `NewsPage.tsx`
- **Description:** Displays a list of recent news articles with links to detailed views.

### 4. **ResearchPage**

- **File:** `ResearchPage.tsx`
- **Description:** The main page for exploring research activities and papers.

### 5. **ProjectsAndGrants**

- **File:** `ProjectsAndGrants.tsx`
- **Description:** Combines projects and grants into a unified view for easy navigation.

---

## **More Components**

Components that serve specialized purposes.

### 1. **CourseCard**

- **File:** `CourseCard.tsx`
- **Description:** A card component for displaying course-related information.

---

## **How to Use Components**

1. **Import a Component:**

   ```tsx
   import Navbar from "../components/Navbar";
   ```

2. **Use in Your Page or Component:**

   ```tsx
   const HomePage = () => {
     return (
       <>
         <Navbar />
         <Footer />
       </>
     );
   };

   export default HomePage;
   ```
