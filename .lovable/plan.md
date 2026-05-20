## Goal
Convert the two remaining projects (EveryFarmer, Equal Measures 2030) into laptop-mockup featured cards matching the Lemur Cloud Portal style, so all three projects in "Selected work" use the laptop screen treatment.

## Steps

1. **Capture screenshots** of each live site and save to `src/assets/`:
   - `everyfarmer-screenshot.png` from https://everyfarmer.farm/
   - `equal-measures-screenshot.png` from https://equalmeasures2030.org/

2. **Refactor `src/components/Projects.tsx`**:
   - Generalize `FeaturedProject` into a reusable `FeaturedProjectCard` component that accepts a project object + screenshot image.
   - Alternate the layout (laptop left / content right, then content left / laptop right) so the three stacked cards feel visually varied.
   - Remove the old `ProjectCard` grid and render all three projects as stacked featured cards with laptop mockups.
   - Keep tags, role, description, and external link behavior unchanged.

3. **Verify** with a build/typecheck and a preview screenshot to confirm all three laptop mockups render correctly.

## Notes
- No content/copy changes — only visual treatment.
- Continues to use the existing `LaptopMockup` component as-is.
