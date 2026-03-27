# Protected Elements — Do Not Modify Without Explicit Permission

The following are locked. They may not be rewritten, restructured, renamed, or restyled unless the user explicitly says "you can change X."

## Data
- `breakfastMenu` object — all items, prices, descriptions, badges
- `lunchMenu` object — all items, prices, descriptions, badges  
- `weeklySpecials` array
- `LOCATIONS` object — all location data
- `currentWait` and `partiesAhead` values

## Palette & Styling
- The `C` color palette object — do not add, remove, or change any values
- `globalCSS` string — do not modify existing animations or rules
- Tailwind is NOT used in this project — do not introduce it

## Components — Structure Locked
- `Checker` — the red/white section divider. Do not remove, restyle, or replace.
- `MiniChecker` — do not remove or restyle
- `MenuCard` — do not restructure or restyle
- `AdminLogin` — do not touch
- `WaitlistSection` — do not touch unless explicitly asked
- `Navbar` — do not restructure. Insertions only.
- `Footer` — do not restructure. Insertions only.

## General Rules
- Do not rename any component
- Do not change any component's props interface without being asked
- Do not introduce new dependencies or imports unless asked
- Do not change the file structure — this is a single App.jsx project
- If a fix requires touching a protected element, stop and ask first