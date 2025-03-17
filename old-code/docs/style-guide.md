# **Style Guide**

This style guide outlines the coding conventions and best practices for the **AIT Lab Website** project. Adhering to these guidelines ensures consistency across the codebase, making it easier to maintain and extend.

---

## **General Guidelines**

1. **Language:** Use **TypeScript** for all files to ensure type safety and better developer experience.
2. **File Naming:** Use **PascalCase** for React components and **camelCase** for other files.
   - Example:
     - `Navbar.tsx` (React Component)
     - `teamProfileData.json` (Data File)
3. **Folder Organization:** Group files logically by functionality (e.g., `components/`, `data/`).
4. **Comments:**
   - Write comments sparingly and focus on explaining **why** a decision was made rather than **what** the code does.
   - Use `/** ... */` for block comments and `//` for inline comments.

---

## **Code Structure**

### **React Components**

1. **Component Structure:**

   - Use **functional components**.
   - Example:

     ```tsx
     import React from "react";

     const Navbar: React.FC = () => {
       return (
         <nav>
           <h1>AIT Lab</h1>
         </nav>
       );
     };

     export default Navbar;
     ```

2. **Props:**

   - Use **TypeScript interfaces** for props.
   - Example:

     ```tsx
     interface NavbarProps {
       title: string;
     }

     const Navbar: React.FC<NavbarProps> = ({ title }) => {
       return <h1>{title}</h1>;
     };
     ```

3. **Hooks:**

   - Use hooks like `useState` and `useEffect` responsibly.
   - Group hooks at the top of the component.

4. **Styling:**

   - Use Chakra UI for styling.
   - Example:

     ```tsx
     import { Box, Heading } from "@chakra-ui/react";

     const Navbar: React.FC = () => {
       return (
         <Box bg="teal.500" p={4}>
           <Heading as="h1" color="white">
             AIT Lab
           </Heading>
         </Box>
       );
     };

     export default Navbar;
     ```

---

## **Naming Conventions**

1. **Variables and Functions:**

   - Use **camelCase** for variables and functions.
   - Example:
     ```tsx
     const fetchData = async () => {
       const response = await fetch("/api/data");
       return response.json();
     };
     ```

2. **Constants:**

   - Use **ALL_CAPS_WITH_UNDERSCORES** for constants.
   - Example:
     ```tsx
     const API_URL = "https://api.example.com";
     ```

3. **File and Folder Names:**
   - Use **PascalCase** for folders and files containing React components.
   - Use **kebab-case** or **snake_case** for other files.
   - Example:
     - `Navbar.tsx`
     - `team-data.json`

---

## **Styling**

1. **Chakra UI:**

   - Use Chakra UI components for styling instead of writing custom CSS whenever possible.
   - Customize the global theme in `app/theme.ts`.

2. **CSS Modules:**

   - If you need specific styles, use CSS Modules and keep them scoped to components.
   - Example:
     ```css
     /* Navbar.module.css */
     .navbar {
       background-color: teal;
     }
     ```

3. **Avoid Inline Styles:**
   - Instead of:
     ```tsx
     <div style={{ color: "red" }}>Hello</div>
     ```
   - Use Chakra UI or CSS Modules:
     ```tsx
     <Box color="red">Hello</Box>
     ```

---

## **APIs and Data Handling**

1. **Data Fetching:**

   - Use `axios` for API requests.
   - Example:

     ```tsx
     import axios from "axios";

     export const fetchProjects = async () => {
       const response = await axios.get("/api/projects");
       return response.data;
     };
     ```

2. **Error Handling:**

   - Display user-friendly error messages.

3. **Static Data:**
   - Store static data in the `data/` folder and import where needed.

---

## **Git and Version Control**

1. **Commit Messages:**

   - Use descriptive commit messages.
   - Format: `<type>: <description>`
   - Examples:
     - `[feat]: Add Navbar component`
     - `[fix]: Resolve data fetching bug in ProjectsPage`

2. **Branch Naming:**
   - Use **kebab-case** for branch names.
   - Examples:
     - `feature/add-navbar`
     - `fix/navbar-styling-issue`

---

## **Accessibility**

1. Use semantic HTML tags (`<header>`, `<nav>`, `<main>`, etc.).
2. Ensure all interactive elements have accessible labels (`aria-label`, `alt`, etc.).

---

## **Performance Optimization**

1. Use **Next.js Image Optimization** for images.
2. Leverage **lazy loading** for components and assets.
3. Optimize API calls to reduce response times.
