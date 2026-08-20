# PRD — The Chicken Whisperer (Coming Soon Page)

## Original Problem Statement
"build a one page website using this as the first page" — with a provided cinematic poster image (golden-hour British countryside, chicken silhouette, serif logotype: THE CHICKEN WHISPERER, taglines "Original foods made with British chicken. Founded on principle. Trade. Retail. Private label. Launching September 2026. team@thechickenwhisperer.co.uk").

## User Decisions (explicit)
- Do NOT add extra sections — the poster image IS the page.
- Add a subtle live countdown to the September 2026 launch in the hero.
- No contact form yet; copy will be provided by the user later.

## Architecture
- Frontend only (React + Tailwind + framer-motion + lenis). No backend/API usage.
- Hero asset: user poster converted to /app/frontend/public/hero.jpg (352KB).
- Single-screen layout (100svh), body overflow hidden.

## Implemented (2026-08-20)
- Full-bleed cinematic hero with on-load masked clip-path reveal + slow settle zoom
- Infinite Ken Burns drift + pointer parallax on the image
- Film grain overlay + vignette for cinematic depth
- Gold sweep line signature moment on load
- Live countdown to 2026-09-01 00:00 BST (DAYS · HRS · MIN · SEC) in a subtle dark-glass pill, Cormorant Garamond, gold, flip-tick digits via framer-motion
- Lenis smooth scrolling initialized
- Page title updated

## Backlog
- P0: User-provided real copy (About/Story, products) — awaiting user
- P1: Contact/enquiry handling (user deferred: "dont add this yet")
- P2: Additional sections (story chapters, trade/retail/private label details) once approved
