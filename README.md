# Malte Schümann Portfolio

Static portfolio built with Astro and Bun.

## Commands

```bash
bun install
bun run build
```

The site builds to `dist/` and keeps the custom domain through `public/CNAME`.
The archived previous portfolio lives in `old/` for reference only.

## Adding Projects

Add project metadata in `src/content/projects/`. If the project needs a full
case study, add a matching entry in `src/content/caseStudies/` and set
`caseStudy` to `true` in the project data.
