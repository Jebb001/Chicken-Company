# PRD — The Chicken Whisperer / Farm To Pantry Website

## Original Problem Statement
"build a one page website using this as the first page" — cinematic poster hero for The Chicken Whisperer (original foods made with British chicken, launching September 2026).

## Direction
Full one-page scroll site: artwork poster hero (desktop landscape 1600×900 + portrait mobile version), five 1920×1080 artwork "chapter cover" pages, and branded HTML content sections with the client's real copy and CTAs.

## Assets (in /app/frontend/public)
- hero.png (desktop, 1600×900), hero-mobile.jpg (portrait 592×1136)
- page-1..5.jpg (1920×1080 chapter covers: story, pet, trade, range, shop)
- photo-story/pet/chef/pour/bottle.jpg (crops used inside content sections)

## Implemented
- Hero: cinematic reveal, grain/vignette, mouse parallax, portrait swap on mobile, two CTA buttons (Discover Our Pure Chicken Oil → #chicken-oil, Trade Enquiries → #trade)
- Content sections (cream #f1e7d5, Cormorant Garamond, forest #1c2b1e, gold #b98a2f): Our Story, The Products (+ British Chicken Oil card, The Range Is Growing band), Chicken Oil detail (pour banner + copy), Pet Nutrition, Trade Supply (bullets + CTA), Shop (Opening Soon + Join the Launch List + Trade Enquiries), Contact (5 enquiry categories, mailto links)
- All CTAs: mailto to team@thechickenwhisperer.co.uk with routed subjects, or smooth-scroll anchors
- Lenis smooth scrolling; framer-motion scroll reveals; mobile: covers stack full-width, sections reflow single column

## Notes / Backlog
- P1: Proper email capture (launch list) instead of mailto when client ready — needs backend/Resend
- P1: Portrait versions of pages 1–5 for mobile readability
- P2: Nutritional/health claims held back pending spec & regulatory review (client note)
