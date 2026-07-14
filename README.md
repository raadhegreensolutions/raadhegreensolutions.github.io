# Raadhe Green Solutions

Premium marketing website for **Raadhe Green Solutions Pvt. Ltd.** — an integrated environmental & waste management company.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion (scroll reveals, UI motion)
- Three.js / React Three Fiber (hero particle globe)
- Lenis (smooth inertia scrolling)
- Lucide React (icons)

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (typically `http://localhost:5173`).

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |

## GitHub Pages

This is a **Vite/React** site (not Jekyll). The production build outputs to `/docs`.

### Recommended: GitHub Actions
1. Push `.github/workflows/deploy-pages.yml`.
2. **Settings → Pages → Source**: **GitHub Actions**.

### Alternative: deploy from branch
1. Run `npm run build` (writes to `docs/`).
2. Commit and push the `docs/` folder.
3. **Settings → Pages → Source**: **Deploy from a branch** → `main` → folder **`/docs`** (not `/` root).

Do **not** publish from `/` (root) — that serves Vite source (`main.tsx`) and breaks the site.

Site URL: `https://raadhegreensolutions.github.io/`

## Sections

Hero → About → Services → Process → Industries → Impact → Why Choose Us → Projects → Testimonials → Careers → Contact → Footer
