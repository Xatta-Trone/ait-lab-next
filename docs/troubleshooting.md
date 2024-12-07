# Troubleshooting Guide

This document provides solutions for common issues you may encounter while working on the **AIT Lab Website**. If you run into problems, refer to the relevant section below.

---

## Table of Contents

1. [General Issues](#general-issues)
2. [Installation Issues](#installation-issues)
3. [Development Server Issues](#development-server-issues)
4. [Build and Deployment Issues](#build-and-deployment-issues)
5. [Content Update Issues](#content-update-issues)
6. [UI/Styling Issues](#ui-styling-issues)
7. [SEO and Metadata Issues](#seo-and-metadata-issues)
8. [Performance Issues](#performance-issues)
9. [Data Validation Errors](#data-validation-errors)
10. [Contact for Help](#contact-for-help)

---

## 1. General Issues

### Problem: **"Module not found" error during development**

- **Cause**: Missing or improperly installed dependencies.
- **Solution**:
  1. Run `yarn install` or `npm install` to install all dependencies.
  2. Ensure all imports in your code use correct paths, especially for modules or components.

### Problem: **Code editor shows red squiggly lines for imports**

- **Cause**: TypeScript or module resolution issues.
- **Solution**:
  1. Check that the `paths` in `tsconfig.json` align with your directory structure.
  2. Restart your editor or IDE after making changes to `tsconfig.json`.

---

## 2. Installation Issues

### Problem: **Yarn or npm is not recognized**

- **Cause**: Node.js or package manager not installed.
- **Solution**:
  1. Install [Node.js v22+](https://nodejs.org/).
  2. Install Yarn globally:
     ```bash
     npm install -g yarn
     ```

### Problem: **"Unexpected token" or syntax error during `yarn dev`**

- **Cause**: Node.js version is outdated.
- **Solution**:
  1. Update Node.js to version 22 or higher.
  2. Re-run the installation steps (`yarn install`).

---

## 3. Development Server Issues

### Problem: **"Port already in use" error**

- **Cause**: Another process is running on the same port.
- **Solution**:
  1. Kill the process:
     ```bash
     npx kill-port 3000
     ```
  2. Restart the development server:
     ```bash
     yarn dev
     ```

### Problem: **Hot reloading is not working**

- **Cause**: Webpack configuration issue or stale cache.
- **Solution**:
  1. Clear the `.next` folder:
     ```bash
     rm -rf .next
     ```
  2. Restart the server:
     ```bash
     yarn dev
     ```

---

## 4. Build and Deployment Issues

### Problem: **Build fails with TypeScript errors**

- **Cause**: TypeScript type mismatch or missing types.
- **Solution**:
  1. Run TypeScript checks:
     ```bash
     yarn tsc
     ```
  2. Fix any errors shown in the terminal.

### Problem: **CSS or images are not loading in production**

- **Cause**: Missing or incorrect static asset paths.
- **Solution**:
  1. Ensure all static files (e.g., images) are located in the `public/` directory.
  2. Use relative paths (`/img/...`) for referencing images and assets.

---

## 5. Content Update Issues

### Problem: **Updated JSON content is not reflected**

- **Cause**: JSON file was not saved or cached data is being served.
- **Solution**:
  1. Ensure the JSON file is saved correctly.
  2. Clear Next.js cache and rebuild:
     ```bash
     yarn build
     yarn start
     ```

### Problem: **Broken links on the site**

- **Cause**: Incorrect URLs in JSON or component props.
- **Solution**:
  1. Double-check all `link` fields in the JSON files (e.g., `projects.json` or `news.json`).
  2. Ensure the links are formatted as absolute (`https://...`) or relative (`/path`).

---

## 6. UI/Styling Issues

### Problem: **Chakra UI components not rendering properly**

- **Cause**: Theme or ChakraProvider not configured.
- **Solution**:
  1. Ensure the `ChakraProvider` is wrapping the app in `layout.tsx` or `_app.tsx`.
  2. Check the custom theme in `theme.ts` for misconfigurations.

### Problem: **Responsive design issues**

- **Cause**: Incorrect use of Chakra's `breakpoints`.
- **Solution**:
  1. Use Chakra UI’s responsive props (`base`, `md`, `lg`, etc.) for components.
  2. Test the responsiveness using browser developer tools.

---

## 7. SEO and Metadata Issues

### Problem: **SEO tags not updating on page load**

- **Cause**: Head tags are not being set correctly.
- **Solution**:
  1. Ensure `Head` is imported from `next/head` in every page component.
  2. Add a `metadata` object in the `export` for proper integration with Next.js 13+.

---

## 8. Performance Issues

### Problem: **Slow page loading in production**

- **Cause**: Large images or unoptimized components.
- **Solution**:
  1. Optimize images using the Next.js `<Image>` component.
  2. Minimize JavaScript bundle size by importing only required modules.

### Problem: **Flickering animations**

- **Cause**: Incorrect `motion` component usage or conflicts with Chakra.
- **Solution**:
  1. Ensure animations use `initial`, `animate`, and `exit` props correctly.
  2. Test animations with a slower speed to debug.

---

## 9. Data Validation Errors

### Problem: **"TypeError: Cannot read properties of undefined"**

- **Cause**: Missing or improperly formatted JSON data.
- **Solution**:
  1. Validate JSON files using online validators or VS Code extensions.
  2. Ensure required fields in TypeScript interfaces are present in the data.

### Problem: **"Element not rendering"**

- **Cause**: Data filtering or mapping issues.
- **Solution**:
  1. Log the data to the console (`console.log(data)`).
  2. Ensure filtering or mapping conditions match the data structure.

---

## 10. Contact for Help

If you are unable to resolve an issue:

1. Review the documentation and codebase for any overlooked details.
2. Check the browser console for error messages and stack traces.
3. Contact the project maintainer or post your issue in the repository.
