# Git Workflow Guide

This document outlines the **Git workflow** for contributing to the project. Following this guide ensures consistency, collaboration, and quality in the codebase.

---

## 1. **Branching Strategy**

We follow a simple branching strategy:

### Main Branches:

- **`main`**:
  - The production-ready branch.
  - Contains stable and tested code.
  - **Never commit directly to `main`.**

### Feature and Fix Branches:

- **`feature/{feature-name}`**:

  - Used for developing new features.
  - Example: `feature/add-dark-mode`.

- **`bugfix/{bug-name}`**:

  - Used for fixing bugs.
  - Example: `bugfix/fix-navbar-glitch`.

- **`hotfix/{hotfix-name}`**:
  - Used for urgent fixes to the `main` branch.
  - Example: `hotfix/fix-login-error`.

---

## 2. **Workflow Steps**

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Step 2: Create a New Branch

1. Ensure you’re on the `main` branch:
   ```bash
   git checkout develop
   ```
2. Pull the latest changes:
   ```bash
   git pull origin develop
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/{feature-name}
   ```
   Replace `{feature-name}` with a descriptive name for your branch.

### Step 3: Work on the Feature/Fix

- Commit frequently with meaningful messages:
  ```bash
  git add .
  git commit -m "Add: Implement feature XYZ"
  ```

### Step 4: Push Your Changes

- Push your branch to the remote repository:
  ```bash
  git push origin feature/{feature-name}
  ```

### Step 5: Open a Pull Request (PR)

- Navigate to the repository on GitHub.
- Open a PR from your branch to the `main` branch.
- Follow the PR template and provide:
  - A clear title and description.
  - References to related issues or tasks.

### Step 6: Code Review and Feedback

- Wait for at least one reviewer to approve the changes.
- Make any requested changes and update the PR:
  ```bash
  git add .
  git commit --amend
  git push --force
  ```

### Step 7: Merge Your PR

- Once approved, the PR can be merged into `main`.

---

## 3. **Rebasing and Merging**

### Keep Your Branch Updated:

1. Switch to your feature branch:
   ```bash
   git checkout feature/{feature-name}
   ```
2. Rebase your branch onto `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
3. Resolve any conflicts if necessary, then continue the rebase:
   ```bash
   git rebase --continue
   ```

### After Rebase, Push Updates:

- Force push your changes after rebasing:
  ```bash
  git push --force
  ```

---

## 4. **Hotfix Workflow**

If a critical issue needs to be fixed in production:

1. Create a hotfix branch from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/{hotfix-name}
   ```
2. Fix the issue and commit changes:
   ```bash
   git add .
   git commit -m "Fix: Critical bug in XYZ"
   ```
3. Merge into `main` and tag the release:
   ```bash
   git checkout main
   git merge hotfix/{hotfix-name}
   git tag -a v1.0.1 -m "Patch release for bug fix"
   git push origin main --tags
   ```

---

## 5. **Common Commands**

- **Check Current Branch**:

  ```bash
  git branch
  ```

- **Delete a Local Branch**:

  ```bash
  git branch -d feature/{feature-name}
  ```

- **Delete a Remote Branch**:

  ```bash
  git push origin --delete feature/{feature-name}
  ```

- **Undo the Last Commit**:
  ```bash
  git reset --soft HEAD~1
  ```

---

## 6. **Best Practices**

1. **Commit Often**: Commit small, incremental changes with clear messages.
2. **Pull Before Push**: Always pull the latest changes from the base branch before pushing your work.
3. **Write Clear PR Descriptions**: Include what you’ve changed and why.
4. **Avoid Pushing to `main` Directly**.
5. **Test Your Changes**: Ensure the feature or fix works as expected before opening a PR.
