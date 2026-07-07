# Deployment Guide

A note up front: I can't push to your GitHub account, click "buy" on a domain
purchase, or log into a hosting dashboard on your behalf — those all require
your accounts and payment details. What I *can* do is give you an exact,
copy-pasteable path so the whole thing takes about 15 minutes. Everything
below is free except the domain itself (roughly $8–15/year).

---

## Part 1 — Put the code on GitHub

Skip to Part 2 if this repo already exists on GitHub.

1. Go to **github.com** → click **+** (top right) → **New repository**.
2. Name it `portfolio` (or anything — if you name it `<your-username>.github.io`
   exactly, GitHub Pages skips a step later and serves it at your domain root).
3. Leave it **Public**, don't initialize with a README (you already have one).
4. Click **Create repository**. GitHub will show you commands — from inside
   your `portfolio` folder (the one containing `docs/`, `README.md` and this
   file), run:

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

Replace `<your-username>` with your actual GitHub handle.

---

## Part 2 — Go live for free with GitHub Pages

> **Why `/docs` and not the repo root?** This repo has `README.md` and
> `DEPLOY.md` sitting next to the `docs/` folder. If GitHub Pages published
> the whole repo root, both of those files would be publicly fetchable at
> your live URL (e.g. `yoursite.com/DEPLOY.md`). Pointing Pages at `/docs`
> instead means only what's inside `docs/` — the actual site — ever gets
> published; the two guide files stay visible only on the GitHub repo page
> itself, not on your live site.

1. On your repo's GitHub page, click **Settings** (top tab).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose `main` and folder **`/docs`** (not root) → **Save**.
5. Wait ~1 minute, then refresh the page. GitHub shows a green box:
   *"Your site is live at `https://<your-username>.github.io/portfolio/`"*.
6. Visit that URL and confirm `/README.md` and `/DEPLOY.md` are **not**
   reachable there — only `docs/`'s contents are served.

That URL is now your real, public portfolio. Share it as-is, or continue to
Part 3 for a custom domain.

**Every future update is just:**
```bash
git add .
git commit -m "Update projects"
git push
```
GitHub Pages redeploys automatically within a minute or two.

---

## Part 3 — Buy a custom domain

Any registrar works the same way. Two solid, low-friction options:

- **Namecheap** (namecheap.com) — cheap, simple UI, no aggressive upsells.
- **Cloudflare Registrar** (domains.cloudflare.com) — sells at wholesale
  price (no markup), but you need an existing Cloudflare account first.

Steps (Namecheap as the example — GoDaddy/Google-Domains-via-Squarespace/
Cloudflare all follow the same shape):

1. Go to the registrar's site and search your desired name, e.g.
   `shwetabhsuman.dev` or `shwetabhsuman.com`. `.dev` and `.me` read well
   for developer portfolios; `.com` is the safest default.
2. Add it to cart. **Decline** upsells you don't need (email hosting,
   "premium DNS," site builder, etc.) — you don't need any of them for this.
3. Create an account, pay, and complete checkout.
4. You'll land on a dashboard showing your new domain — that's where you'll
   manage DNS in the next step.

---

## Part 4 — Point your domain at GitHub Pages

You'll add DNS records at your registrar so the domain resolves to GitHub's
servers, then tell GitHub to expect that domain.

### 4a. Add DNS records at your registrar
Find **DNS settings** / **Manage DNS** for your domain and add:

**For the apex/root domain (`shwetabhsuman.dev`):** four `A` records, all
pointing to GitHub Pages' IP addresses:
```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

**For the `www` subdomain:** one `CNAME` record:
```
CNAME   www   <your-username>.github.io
```

(If your registrar doesn't allow `A` records on the apex, or you'd rather
only use `www.shwetabhsuman.dev`, you can skip the four `A` records and just
use the `CNAME` for `www` — then always share the `www` link.)

### 4b. Tell GitHub about the domain
1. Back in your repo → **Settings → Pages**.
2. Under **Custom domain**, type your domain (e.g. `www.shwetabhsuman.dev`
   or `shwetabhsuman.dev`) → **Save**.
3. This automatically creates a `CNAME` file in your repo root — don't
   delete it, it's how GitHub knows which domain to serve.
4. Wait for DNS to propagate (anywhere from 10 minutes to a few hours), then
   check the box **Enforce HTTPS** once it becomes available — this gives
   you the free padlock/SSL certificate automatically.

### 4c. Verify
Visit your domain directly. If it doesn't load yet, DNS is still propagating —
check status at **dnschecker.org** by searching your domain.

---

## Alternative: Netlify or Vercel (slightly easier domain UI)

If you'd rather manage the domain connection through a friendlier dashboard
than raw DNS records, both **netlify.com** and **vercel.com** offer:

1. "Import from GitHub" — connect the same `portfolio` repo, no build
   command needed, but set the **publish directory** to `docs` (same
   reasoning as the GitHub Pages step above — it keeps `README.md` and
   `DEPLOY.md` off the live site).
2. Free auto-deploys on every `git push`, same as GitHub Pages.
3. A **Domains** tab where you paste your domain and they either generate
   the exact DNS records for you, or let you buy the domain through them
   directly — both remove the manual `A`/`CNAME` step in Part 4.

Functionally this ends up the same as GitHub Pages — pick whichever
dashboard you find easier to navigate.

---

## Troubleshooting

- **404 at the GitHub Pages URL:** confirm Settings → Pages shows a green
  "your site is live" banner, and that the source folder is set to `/docs`
  (not root) — `index.html` lives inside `docs/`, not the repo root.
- **Domain loads but shows GitHub's 404:** the `CNAME` file content doesn't
  match what you typed in Settings → Pages — re-save the custom domain field.
- **"Not Secure" warning:** HTTPS hasn't finished provisioning yet — wait a
  bit longer after DNS propagates, then recheck **Enforce HTTPS**.
- **Projects section stuck on "fetching…":** GitHub's public API is rate
  limited to 60 requests/hour per visitor IP with no auth — fine for normal
  traffic, but if you're testing repeatedly it may briefly stall; it falls
  back to `fallbackProjects` from `config.js` automatically.
