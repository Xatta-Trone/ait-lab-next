# **AIT Lab Website**

The official website for the Artificial Intelligence in Transportation (AIT) Lab at Texas State University. Built with **Next.js**, this project features a modern, responsive design and a well-structured codebase for easy maintenance and scalability.

---

## **Project Structure**

```plaintext
├── src/                  # Source code directory
│   ├── app/              # Next.js App Router pages and layout components
│   ├── components/       # Reusable UI components
│   ├── data/             # Static data in JSON format (news, projects, tools)
│   │   ├── news.json     # Lab news and announcements
│   │   ├── projects.json # Research projects data
│   │   └── lab_tools.json # Interactive lab tools information
│   └── types/            # TypeScript type definitions
├── public/               # Static assets (images, icons, etc.)
├── .next/                # Next.js build output (generated)
├── next-sitemap.config.js # Sitemap configuration
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project overview and instructions (this file)
```

---

## **Features**

- **Responsive Design:** Fully optimized for all devices.
- **SEO Optimized:** Automatically generates sitemaps using `next-sitemap`.
- **Scalable Architecture:** Well-structured folders for better maintainability.
- **Reusable Components:** Shared UI components for consistent styling and functionality.

---

## **Getting Started**

### **Prerequisites**

- **Node.js**: v16 or higher
- **npm**: v7 or higher

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/Xatta-Trone/ait-lab-next.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ait-lab-next
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

---

## **Scripts**

The following scripts are available in `package.json`:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run postbuild`: Runs `next-sitemap` to generate the sitemap.

---

## **Key Files**

### **`next-sitemap.config.js`**

Configures sitemap generation for SEO optimization. Update this file to reflect changes to routes or priorities.

### **`tsconfig.json`**

Defines TypeScript configuration for strict typing and IntelliSense support.

## **Tech Stack**

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS
- **Language:** TypeScript
- **UI Components:** Shadcn UI
- **Icons:** Lucide React
- **SEO Tools:** next-sitemap
- **Content Management:** JSON data files

---

## **Contact**

For questions or support, contact the maintainers:

- **Md Monzurul Islam**  
  GitHub: [@Xatta-Trone](https://github.com/Xatta-Trone)
- **Gaurab Chhetri**  
  GitHub: [@gauravfs-14](https://github.com/gauravfs-14)
