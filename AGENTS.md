# Agent Notes

## Conventions

- Small accent-coloured text (eyebrows, inline labels, icons) must use `text-primary-strong`, not `text-primary`. The lavender `--primary` only reaches ~3:1 on the cream background, which fails WCAG AA for small text; `--primary-strong` is themed per mode (light, dark, high-contrast) to keep accent text at AA while large headings and stat numbers stay on `--primary`.
- Skill pills take their look from the `.skill-pill` component classes in `src/index.css` plus a per-group tone modifier (`skill-pill--lang`, `--web`, `--tool`); never style pills inline, so light, dark and high-contrast tiers stay distinct.
- Portfolio navigation uses real route/fragment links and focuses fragment destinations after route changes; this preserves standard link behavior and predictable keyboard navigation.
