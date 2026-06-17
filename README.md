# Alvetern

A static website built with [Astro](https://astro.build), deployed to
[Cloudflare Pages](https://pages.dev). You get a free `*.pages.dev` URL out of
the box, with the option to attach your own custom domain later.

## Local development

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server at http://localhost:4321
npm run build    # build the production site into ./dist
npm run preview  # preview the production build locally
```

## Project structure

```
alvetern/
├─ public/            # static assets copied as-is (favicon, _headers)
│  ├─ _headers        # Cloudflare Pages response headers
│  └─ favicon.svg
├─ src/
│  ├─ layouts/        # shared page shell
│  └─ pages/          # one file per route (index.astro = /)
├─ astro.config.mjs   # Astro config (set `site` once you have a domain)
└─ package.json
```

## Deploy to Cloudflare Pages (Git-connected)

This repo is set up so every push to `main` auto-builds and deploys.

### 1. Push to GitHub

Create a new **empty** repo on GitHub (no README/license), then:

```bash
git remote add origin https://github.com/<you>/alvetern.git
git branch -M main
git push -u origin main
```

> Note: this folder has its own git repo, independent of any repo in your home
> directory. Run git commands from inside `alvetern/`.

### 2. Connect it in Cloudflare

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**.
2. Authorize GitHub and pick the `alvetern` repo.
3. Build settings:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Save and Deploy.** Your site goes live at
   `https://alvetern.pages.dev` (or `<project-name>.pages.dev`).

Every later `git push` triggers a new build automatically.

## Attach a custom domain (the "transfer the domain" step)

Once the `*.pages.dev` site is live, point your own domain at it:

1. Cloudflare dashboard → your Pages project → **Custom domains** →
   **Set up a custom domain**.
2. Enter the domain (e.g. `alvetern.com`) and follow the prompts.

**If the domain's DNS is already on Cloudflare** (same account): Cloudflare adds
the CNAME automatically — done in a click.

**If the domain is registered/hosted elsewhere**, you have two options:

- **Keep it where it is:** add the DNS record Cloudflare shows you at your
  current DNS provider:
  - apex (`alvetern.com`) → a `CNAME`/`ALIAS` to `alvetern.pages.dev`
  - `www` → `CNAME` to `alvetern.pages.dev`
- **Transfer the domain into Cloudflare** (recommended for the simplest setup):
  1. Cloudflare → **Websites** → **Add a site**, enter `alvetern.com`, and
     follow the steps to change the nameservers at your registrar to the two
     Cloudflare nameservers shown.
  2. After the nameservers propagate (minutes to a few hours), go back to the
     Pages project → **Custom domains** and add `alvetern.com` — it now resolves
     automatically.
  3. Optionally use **Registrar → Transfer Domains** to move the registration
     itself to Cloudflare (at-cost pricing, optional).

Finally, set `site: 'https://alvetern.com'` in `astro.config.mjs` and push, so
canonical URLs use your domain.

## Contact form (Web3Forms)

The inquiry form on the home page submits via [Web3Forms](https://web3forms.com)
— a free service that emails you each submission, with no backend required.

To activate it:

1. Go to <https://web3forms.com>, enter the email address that should receive
   inquiries (e.g. `guido.walther@alvetern.com`), and you'll be emailed an
   **access key**.
2. In [src/pages/index.astro](src/pages/index.astro), replace
   `YOUR_WEB3FORMS_ACCESS_KEY` with that key.
3. Commit and push — the form is live.

The access key is safe to commit (it only identifies the destination inbox).
Until it's set, the form shows a fallback message asking visitors to email
directly.

## Optional: deploy from the CLI instead

```bash
npm install -D wrangler
npm run build
npx wrangler pages deploy dist --project-name alvetern
```
