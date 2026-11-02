# Agent Notes

## Conventions

- Portfolio recommendations use a public, validated Edge Function with request-scoped AI Gateway Responses streaming; keep prompts and credentials server-side and resolve model-selected IDs against the server catalog so AI cannot invent destinations.
- Keep the recommendation catalog synchronized with Projects and Blog; tests compare the source entries to prevent stale recommendations. Persist provider-denial state privately and never retry terminal failures.

- Small accent-coloured text (eyebrows, inline labels, icons) must use `text-primary-strong`, not `text-primary`. The lavender `--primary` only reaches ~3:1 on the cream background, which fails WCAG AA for small text; `--primary-strong` is themed per mode (light, dark, high-contrast) to keep accent text at AA while large headings and stat numbers stay on `--primary`.
- Skill pills take their look from the `.skill-pill` component classes in `src/index.css` plus a per-group tone modifier (`skill-pill--lang`, `--web`, `--tool`); never style pills inline, so light, dark and high-contrast tiers stay distinct.
- Portfolio navigation uses real route/fragment links and focuses fragment destinations after route changes; this preserves standard link behavior and predictable keyboard navigation.
- Use the shared Collapsible and Button components for the full skills disclosure; key skills remain outside it so they are always available.
- Disable CSS motion globally under reduced motion and listen for live preference changes in JavaScript animations; settings changes must take effect without reloading.
- Project cards use their heading as their accessible link name; descriptions and tool lists must not inflate that name.
- Selected projects use native sticky list items rather than scroll interception; focus raises each card above siblings, and reduced motion or insufficient viewport height restores normal document flow so every link remains reachable.
- Experience uses role-first semantic timeline entries and the asset-backed current resume link; keep dated qualifications separate and retain overlapping employment dates as supplied rather than inferring contracts or gaps.
