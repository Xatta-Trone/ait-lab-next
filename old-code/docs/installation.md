# **Installation Guide**

Welcome to the installation guide for the **AIT Lab Website** project. This document will guide you through setting up the project on your local machine for development and testing.

---

## **Prerequisites**

Before you begin, ensure you have the following installed:

1. **Node.js**:

   - **Version 22.0.0** or higher is required.
   - [Download Node.js](https://nodejs.org/).
   - Check your Node.js version with:
     ```bash
     node -v
     ```

2. **npm** (Node Package Manager):

   - Comes bundled with Node.js. Version **9.0.0** or higher is recommended.
   - Verify your npm version with:
     ```bash
     npm -v
     ```

3. **Yarn** (Preferred Package Manager):

   - Install Yarn globally by running:
     ```bash
     npm install --global yarn
     ```
   - Verify Yarn installation:
     ```bash
     yarn -v
     ```

4. **Git**:

   - Used to clone the repository.
   - [Download Git](https://git-scm.com/).

5. **Code Editor (Optional)**:
   - [Visual Studio Code](https://code.visualstudio.com/) is recommended for a seamless development experience.

---

## **Step-by-Step Installation**

### Step 1: Clone the Repository

Clone the repository from GitHub to your local machine:

```bash
git clone https://github.com/Xatta-Trone/ait-lab-next.git
```

### Step 2: Navigate to the Project Directory

Change your working directory to the project folder:

```bash
cd ait-lab-next
```

### Step 3: Install Dependencies

Install the required dependencies. Use **Yarn** (preferred) or **npm**:

#### Using Yarn:

```bash
yarn install
```

#### Using npm:

```bash
npm install
```

### Step 4: Start the Development Server

Run the following command to start the development server:

#### Using Yarn:

```bash
yarn dev
```

#### Using npm:

```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## **Common Commands**

| Command           | Yarn Command     | npm Command         | Description                                            |
| ----------------- | ---------------- | ------------------- | ------------------------------------------------------ |
| Install           | `yarn install`   | `npm install`       | Installs project dependencies.                         |
| Start Development | `yarn dev`       | `npm run dev`       | Starts the development server.                         |
| Build Production  | `yarn build`     | `npm run build`     | Builds the project for production.                     |
| Start Production  | `yarn start`     | `npm run start`     | Starts the production server after a build.            |
| Lint              | `yarn lint`      | `npm run lint`      | Runs ESLint to check for code quality and consistency. |
| Generate Sitemap  | `yarn postbuild` | `npm run postbuild` | Generates a sitemap using `next-sitemap`.              |

---

## **Troubleshooting**

### Issue 1: Node Version Mismatch

- **Error:** `"Error: Unsupported engine"`
- **Solution:** Ensure Node.js v22 is installed. Use [nvm](https://github.com/nvm-sh/nvm) for managing Node.js versions:
  ```bash
  nvm install 22
  nvm use 22
  ```

### Issue 2: Dependency Installation Fails

- **Error:** Errors during `yarn install` or `npm install`
- **Solution:** Clear the cache and reinstall:
  - For Yarn:
    ```bash
    yarn cache clean
    yarn install
    ```
  - For npm:
    ```bash
    npm cache clean --force
    npm install
    ```

### Issue 3: Port Already in Use

- **Error:** `EADDRINUSE` on port 3000
- **Solution:** Specify a different port:
  - For Yarn:
    ```bash
    PORT=4000 yarn dev
    ```
  - For npm:
    ```bash
    PORT=4000 npm run dev
    ```

---

## **Deployment Notes**

For deploying the application to production:

1. Build the project:

   - Using Yarn:
     ```bash
     yarn build
     ```
   - Using npm:
     ```bash
     npm run build
     ```

2. Start the production server:
   - Using Yarn:
     ```bash
     yarn start
     ```
   - Using npm:
     ```bash
     npm run start
     ```

---

## **Feedback**

If you encounter any issues not covered here, feel free to open an issue on the [GitHub repository](https://github.com/Xatta-Trone/ait-lab-next/issues).

Happy coding! 🚀
