# Shubham Jani — Portfolio

A static one-page portfolio site built with plain HTML, CSS, and JavaScript.
No frameworks, no build step, no backend — works directly on GitHub Pages.

## Structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── profile.jpg   ← add your photo here
│   └── resume.pdf    ← add your résumé PDF here
└── README.md
```

## Before you deploy

1. Add your photo as `assets/profile.jpg` (square-ish photos work best; it's cropped into a circle).
2. Add your résumé as `assets/resume.pdf`.
3. Open `index.html` in a browser to preview locally — just double-click the file.

## Deploying to GitHub Pages

See the step-by-step instructions provided separately, or:

1. Create a GitHub repo named `yourusername.github.io`.
2. From this `portfolio` folder: `git init`, `git add .`, `git commit -m "Initial site"`.
3. `git remote add origin https://github.com/yourusername/yourusername.github.io.git`
4. `git branch -M main` then `git push -u origin main`.
5. On GitHub: Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/(root)` → Save.
6. Visit `https://yourusername.github.io`.
