## Goal

Make it clear to recruiters that your EveryFarmer work centered on the **Service Provider module** — the part of the platform that lets agribusinesses offer inputs, implements, extension services, storage, transport, logistics, and processing to farmers.

## Changes

### 1. `src/components/Projects.tsx` — EveryFarmer card

Reframe the card around the Service Provider module.

- **Title:** `EveryFarmer — Service Provider Platform`
- **Role:** `Front-End Engineer — Service Provider Module`
- **Description:** Rewrite to:
  > "Led front-end work on the Service Provider module — the agribusiness side of EveryFarmer's value chain — enabling providers to manage products and services (inputs, implements, extension, storage, transport, logistics, and processing) offered to farmers. Built an interactive geospatial mapping tool with the Google Maps that automated farm mapping assessment conducted by agents across 100,000+ service providers."
- **Tags:** add `Service Provider Module`, `Geospatial Mapping`, `Product & Service Management` alongside existing stack tags.

### 2. `src/components/Experience.tsx` — EveryFarmer entry

- **Role:** change `Front-End Engineer` → `Front-End Engineer (Service Provider Module)`
- **Add a leading bullet** that frames the domain:
  > "Owned front-end delivery on the Service Provider module, powering agribusinesses that supply inputs, implements, extension, storage, transport, logistics, and produce processing across the EveryFarmer value chain."
- **Rewrite the existing mapping bullet** to tie the tool back to service providers:
  > "Built product and service management flows plus an interactive geospatial farm mapping tool (Google Maps API) that automated farm mapping assessment for 100,000+ service providers, reducing operating expenses by $10,000."
- Keep the CI/CD and Redux Saga / testing bullets unchanged.

## Out of scope

No styling, layout, navigation, or other section changes.