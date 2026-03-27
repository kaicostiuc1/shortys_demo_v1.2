# CLAUDE.md — Shorty's Diner Website Context

This file exists to prevent Claude Code from making unrequested changes.
**Read this entire file before touching any code.**

---

## Project Overview

Shorty's Diner is a classic American diner in Williamsburg, VA. This is a live production website deployed on Vercel. The codebase is a single-file React app (`src/App.jsx`) built with Vite. Tailwind is installed but intentionally unused — all styling is inline React styles.

**The zip / local folder is the source of truth.** Vercel deploys from this.

---

## The Prime Directive

This is a **surgical edit** project. Claude has repeatedly caused damage by rewriting files instead of making the specific change requested. That pattern ends here.

**When given a task:**
- Make only what is explicitly asked
- Do not refactor, reorganize, or "improve" anything else
- Do not change variable names, component structure, or file organization
- Do not add new dependencies
- If you are unsure whether a change was requested, **do not make it**

---

## Architecture

```
src/App.jsx         — entire application, single file, ~1100 lines
src/index.css       — minimal global reset only
src/main.jsx        — React entry point, do not touch
public/             — static images (hero-diner.jpg, shortys-neon.jpg, shortys-elvis.jpg)
index.html          — Vite HTML shell, do not touch
```

All components live in `App.jsx` in this order:
`App` → `Navbar` → `Hero` → `WaitlistSection` → `MenuSection` → `MenuCard` → `PhotoStrip` → `AboutSection` → `AdminLogin` → `Footer`

Utility components: `Checker`, `MiniChecker`

---

## Color Scheme — DO NOT TOUCH

The palette is defined in the `C` object near the top of `App.jsx`. Do not change any color values, do not introduce new color variables, do not alter the visual identity. The brand is red, white, and cream with a tan background on alternating sections.

```js
const C = {
  cream, red, redDark, redLight, redFaint,
  tan, tanDark, border, textDark, textMid,
  textLight, brownMuted, white
}
```

---

## Features — DO NOT TOUCH

### Waitlist
The `WaitlistSection` component and all associated state (`isWaitlistActive`) is a deliberate operational feature. The GM uses the `AdminLogin` toggle in the footer to turn it on/off. Do not modify either component, their logic, or their props.

### Admin Login
Hidden in the footer. Password-protected toggle for the waitlist. Do not touch.

### Menu Data
`breakfastMenu`, `lunchMenu`, and `weeklySpecials` are arrays of real menu items transcribed from official Shorty's PDFs. Do not add, remove, reorder, or alter any item, price, description, badge, or tag. These are treated as read-only data.

### Checker Dividers
The red-and-white `Checker` component is used as a section divider between content blocks throughout the page. Do not change its colors, dimensions, or placement.

---

## Completed Changes

- *(none yet — this is the clean v1.2 baseline)*

---

## Pending Changes (implement only when explicitly instructed)

These are approved in concept but **not yet actioned**. Do not implement them speculatively.

1. **Checkerboard header/footer band** — Add a `BWChecker` component (black and white squares, distinct from the existing red/white `Checker`) and place it: (a) at the very bottom of the `Navbar` return, just before `</nav>`, and (b) at the very top of the `Footer` return, just after `<footer ...>`. Nowhere else. Do not alter the existing `Checker` component.

2. **Remove badge overlays from MenuCard** — Delete the `{item.badge && (...)}` block in `MenuCard`. The yellow "Fan Favorite", "Cure-All", etc. badges obscure prices and are being removed. Remove only that block.

3. **Price freshness** — In the footer copyright line, remove `"Menu prices from May 2024"`. In the `MenuSection` subtitle, change `"Prices from May 2024"` to `"Prices subject to change"`.

4. **Footer self-serve info** — Add a short parking note near the address block in the footer (e.g. "Free parking lot on-site"). Match the existing style of the WiFi badge already present.

5. **Hero copy / SEO** — Update the hero subtitle to weave in "best breakfast in Williamsburg" and "Williamsburg diner" naturally. No student-targeted language, no use of the word "cheap". Frame for locals and tourists.

6. **Photo section revamp** — Replace the current `PhotoStrip` placeholder layout with a proper social-forward vertical format. The goal is a section that displays the latest 3 Instagram Reels (via Instagram Basic Display API or oEmbed) and a separate section for tagged posts. This is a larger feature — wait for explicit instructions before starting.

---

## What Good Output Looks Like

- You make exactly the changes described, nothing more
- You use `str_replace_based_edit` to insert or modify specific lines
- You do not rewrite components wholesale
- You do not alter any JSX, styles, or logic outside the stated scope
- After your edit, the file still compiles and renders identically except for the requested change

---

## Skills — Read Before Every Task

Read all three files in `.claude/skills/` before writing any code:
- `task-classification.md` — declare task type first
- `protected-elements.md` — what you cannot touch
- `brand-design.md` — visual and tone rules
