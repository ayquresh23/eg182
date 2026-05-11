# EG182 — Manufacturing Technology 1 Study Site

A comprehensive, self-contained revision website for EG182 at Swansea University.

## Files

```
eg182/
├── index.html           ← Main study site (all 10 topics, formulas, glossary, MCQ traps)
├── definitions.html     ← Dedicated definitions page with SVG diagrams
├── css/
│   └── style.css        ← Shared styles
├── js/
│   ├── main.js          ← Navigation, search, and interactions
│   └── glossary-data.js ← All 400+ term definitions
└── README.md
```

## Hosting on GitHub Pages

1. Create a new GitHub repository (e.g. `eg182`)
2. Upload all files, maintaining the folder structure above
3. Go to **Settings → Pages**
4. Under **Source**, select **Deploy from branch**
5. Select `main` branch, `/ (root)` folder
6. Click **Save**
7. Your site will be live at `https://yourusername.github.io/eg182/`

## Local use

Just open `index.html` in any browser. No server needed — everything is self-contained.

## Keyboard shortcuts

- `/` — jump to glossary search from anywhere
- `Esc` — clear search and blur input

## Features

- **Learn / Revise toggle** — Learn mode shows analogies and first-principles explanations. Revise mode shows only exam-critical content.
- **300+ glossary terms** — searchable, filterable by topic
- **All module formulas** — with variables explained and units flagged
- **25+ MCQ trap cards** — wrong-but-believable claims with corrections
- **SVG diagrams** — sand casting anatomy, solidification zones, extruder cross-section, PM sequence, blanking vs punching, grinding wheel, tool wear, and more
- **Works offline** — no internet required after initial load (fonts load from Google Fonts on first load)

## Topics covered

| Topic | Content |
|---|---|
| T1 | General manufacturing — definitions, industry structure, production quantity |
| T2 | Metal casting — sand casting anatomy, solidification, defects, die casting, Chvorinov's rule |
| T3 | Plastics shaping — TP vs TS, extrusion, injection moulding, blow moulding, thermoforming |
| T4 | Rubber & PMC — vulcanisation, carbon black, PMC processes, filament winding |
| T5 | Powder metallurgy — powder production, compaction, sintering, secondary ops, MIM, HIP |
| T6 | Metal forming — work hardening, Hollomon equation, rolling, forging, sheet metalwork |
| T7 | Metal machining — turning, drilling, milling, cutting parameters, chip types |
| T8 | Cutting tools — tool life, Taylor equation, tool materials, cutting fluids |
| T9 | Grinding — wheel anatomy, friability, grade vs structure, honing, lapping |
| T10 | Heat treatment, AM, SSM — annealing, martensite, precipitation hardening, 3D printing |

## Adding future modules

To add a new module (e.g. EG183):
1. Copy this folder structure to a new folder `eg183/`
2. Replace content in `js/glossary-data.js` with the new module's terms
3. Update topic sections in `index.html`
4. Add new SVG diagrams to `definitions.html`
5. Link from a top-level `index.html` home page

---
Built with Ayaan Qureshi, Swansea University Materials Science & Engineering
