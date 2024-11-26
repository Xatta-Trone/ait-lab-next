# **AIT Lab Website**

The official website for the AIT Lab at Texas State University. Built with **Next.js**, this project features a modern, responsive design and a well-structured codebase for easy maintenance and scalability.

---

## **Project Structure**

```plaintext
├── app/                  # Next.js App Router pages and layout components
├── components/           # Reusable UI components
├── data/                 # Static or dynamic data (JSON or external data sources)
├── docs/                 # Documentation for developers
├── public/               # Static assets (images, icons, etc.)
├── types/                # TypeScript custom type definitions
├── next-sitemap.config.js # Sitemap configuration
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript configuration
├── README.md             # Project overview and instructions (this file)
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

---

## **Documentation**

Detailed developer documentation is available in the `docs/` folder. Key guides include:

- [Installation Guide](./docs/installation.md)
- [Component Overview](./docs/components.md)
- [Architecture Details](./docs/architecture.md)

---

## **Contribution Guidelines**

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **Tech Stack**

- **Framework:** Next.js
- **Styling:** Chakra UI
- **Animations:** AOS, Framer Motion
- **SEO Tools:** next-sitemap
- **TypeScript:** Strict typing for better developer experience

---

## **Contact**

For questions or support, contact the maintainers:

- **Md Monzurul Islam**  
  GitHub: [@Xatta-Trone](https://github.com/Xatta-Trone)
- **Gaurab Chhetri**  
  GitHub: [@gauravfs-14](https://github.com/gauravfs-14)
