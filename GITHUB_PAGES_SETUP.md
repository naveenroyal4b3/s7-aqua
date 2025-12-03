# GitHub Pages Setup Guide

Your repository is ready! Follow these steps to publish your website on GitHub Pages:

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `s7-aqua` (or any name you prefer)
5. Description: "S7 Aqua - RO Water Purifiers & Water Treatment Plants"
6. Set visibility to **Public** (required for free GitHub Pages)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## Step 2: Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
cd "/Users/naveenkumar.yaram/Downloads/S7 Aqua"
git remote add origin https://github.com/YOUR_USERNAME/s7-aqua.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username.**

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under "Source", select **Deploy from a branch**
5. Select branch: **main**
6. Select folder: **/ (root)**
7. Click **Save**

## Step 4: Access Your Website

Your website will be live at:
```
https://YOUR_USERNAME.github.io/s7-aqua/
```

**Note:** It may take a few minutes (up to 10 minutes) for the site to be available after enabling GitHub Pages.

## Future Updates

To update your website:
```bash
cd "/Users/naveenkumar.yaram/Downloads/S7 Aqua"
git add .
git commit -m "Update website"
git push
```

Changes will be live within a few minutes after pushing.

---

## Troubleshooting

- If you get authentication errors, you may need to set up a Personal Access Token or use SSH
- Make sure the repository is **Public** for free GitHub Pages
- Check the "Actions" tab in your repository to see deployment status

