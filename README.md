# Shwetabh Suman — Portfolio Site

A lightweight, dependency-free portfolio. No React, no build step, no npm install —
just HTML, CSS and JavaScript, so it loads fast and is easy to host anywhere.

Your **Projects** section pulls live from your public GitHub repos automatically.
Push a new project to GitHub and it shows up here next time the page loads —
nothing to edit.

```
portfolio/
├─ index.html      ← page structure (you shouldn't need to touch this)
├─ style.css       ← all visual design (colors, fonts, layout, animation)
├─ config.js       ← ALL your content: name, bio, jobs, skills, links...
├─ script.js       ← the logic (renders config.js into the page, GitHub fetch)
├─ favicon.svg     ← browser tab icon
├─ README.md       ← this file
└─ DEPLOY.md       ← how to publish it live + connect a custom domain
```

---

## 1. Run it locally

You don't need Node.js or any framework, but the browser blocks `fetch()`
(used to load your GitHub projects) when you just double-click `index.html`.
So you need one small local web server. Pick whichever you have installed:

**Option A — Python (most machines already have this)**
```bash
cd portfolio
python3 -m http.server 8000
```
Open **http://localhost:8000** in your browser.

**Option B — Node.js**
```bash
cd portfolio
npx serve .
```
It will print a local URL to open (usually http://localhost:3000).

**Option C — VS Code**
Install the "Live Server" extension, right-click `index.html` → **Open with Live Server**.

To stop the server, press `Ctrl+C` in the terminal.

---

## 2. Edit your content

Everything you'd want to change day-to-day lives in **`config.js`** — open it in
any text editor. It's one JavaScript object with plain fields:

| To change...                  | Edit this field in `config.js`      |
|--------------------------------|--------------------------------------|
| Name, title, tagline           | `name`, `title`, `roles`             |
| The paragraph about you        | `summary`                            |
| The number badges under About  | `stats`                              |
| Jobs / timeline                | `experience` (array, newest first)   |
| Skill tags                     | `skills`                             |
| Your featured/private project  | `flagshipProject`                    |
| Email / LinkedIn / GitHub      | `email`, `linkedin`, `github`        |
| Resume download button         | `resumeFile` (see below)             |
| Education                      | `education`                          |
| Certifications & honors        | `certifications`, `honors`           |

Save the file and refresh the browser — no build step required.

### Adding your resume PDF
Drop a PDF into the `portfolio/` folder (same level as `index.html`) and set
`resumeFile` in `config.js` to match its exact filename, e.g.:
```js
resumeFile: "Shwetabh_Suman_Resume.pdf",
```

### Adding new projects
You have two ways to get a project onto the site:

1. **Automatic (recommended):** just push it to GitHub as a public repo.
   The site fetches your public, non-forked repos on every page load,
   sorted by most recently updated — nothing to edit, nothing to redeploy
   beyond what you already did for the code itself.
2. **Manual:** for something without a public repo (private/enterprise work,
   like your ESG platform), add it to `fallbackProjects` in `config.js`, or
   duplicate the `flagshipProject` pattern if you want it pinned above the
   GitHub grid.

### Changing colors / fonts
Open `style.css` and edit the `:root { ... }` block at the very top — every
color and font in the site is a variable there, so one change updates
everything consistently.

---

## 3. Before you publish — checklist

- [ ] Double check `linkedin` URL in `config.js` (your resume and LinkedIn
      export listed two slightly different vanity URLs — confirm the real one)
- [ ] Decide whether to keep `phone` in `config.js` public, or set it to `""`
- [ ] Add your resume PDF and confirm the "Résumé" button downloads it
- [ ] Confirm `githubUsername` matches your GitHub handle exactly
- [ ] Skim `config.js` top to bottom for typos

Once that's done, see **DEPLOY.md** for how to put this online for free and
optionally attach a custom domain like `shwetabhsuman.dev`.
