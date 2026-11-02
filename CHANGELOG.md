# CHANGELOG — Chitwan Sajha Hospital Pvt. Ltd. Redesign

**Date:** October 9, 2026  
**Author:** Senior Healthcare Product Designer & Front-End Engineer  
**Target Repository:** `E:\Chitwan-Sajha-Hospital`

---

## Summary of Changes

This major release transforms the Chitwan Sajha Hospital web platform into a patient-centric, high-converting, accessible, and bilingual (English + Devanagari) digital experience. All changes strictly respect the vanilla JS ES module SPA architecture without external build tools.

---

## File-by-File Change Matrix

| File Path | Nature of Modification | Rationale & Architectural Purpose |
|---|---|---|
| `RESEARCH.md` | **Created** | Comprehensive Stage 1 research report containing 12-hospital benchmark matrix, sourced findings across 9 healthcare UX topics, codebase audit, and top 10 recommended changes. |
| `DESIGN_BRIEF.md` | **Created** | Stage 2 design brief specifying logo-derived brand tokens (`#1761C2`, `#0B3C9E`, `#06214F`, `#2CBCED`, `#EEF6FD`, `#D32F2F`), signature 135° gradient, Open Ring graphic motif, bilingual typography scale, ASCII desktop/mobile wireframes, and anti-template review pass. |
| `frontend/assets/css/variables.css` | **Updated** | Defined logo-derived color tokens, 9-step tint/shade scale, remapped legacy CSS variable names for backward compatibility, typography scales (`Outfit`, `Inter`, `Noto Sans Devanagari`), elevation shadows, and motion tokens. |
| `frontend/assets/css/main.css` | **Updated** | Built base typography system with Devanagari safe line-heights (`1.7`), high-contrast focus rings (`3px` outline), form controls, custom tables, badges, and button system (primary sweep effect, 2px lift, emergency pulse). |
| `frontend/assets/css/components.css` | **Updated** | Added glassmorphism sticky header (`backdrop-filter: blur(12px)`), animated center-out gradient underline navigation links, mega-menu hover bridge, Open Ring graphic motif styles, cursor-follow spotlight cards (`--mouse-x`, `--mouse-y`), doctor 3D tilt styles, and pinned mobile floating emergency bar. |
| `frontend/assets/css/responsive.css` | **Updated** | Mobile-first breakpoint overrides (1024px, 768px, 480px) ensuring 44+ px touch targets, horizontal scroll prevention (`scrollWidth <= innerWidth`), and mobile drawer navigation drawer. |
| `frontend/assets/css/modern.css` | **Created** | Modern CSS features: View Transitions API route cross-fade keyframes, CSS `@starting-style` entry transitions, and strict `@media (prefers-reduced-motion: reduce)` accessibility overrides. |
| `frontend/index.html` | **Updated** | Added link to `modern.css` as the last stylesheet in head; updated JSON-LD Schema.org Hospital structured data with geo-coordinates and emergency contact telephone numbers. |
| `frontend/assets/js/components/navbar.js` | **Updated** | Cleaned up logo lockup, added bilingual language toggle switcher (EN/NE), sticky glass header, mega-menu dropdowns, and "Emergency 24/7" + "Contact Us" primary action buttons. |
| `frontend/assets/js/components/footer.js` | **Updated** | Implemented Ink Blue (`#06214F`) footer with hospital licensing statement (Ministry of Health & Population, NMC), 8 department quick links, emergency contact info, and pinned floating mobile emergency call bar (`tel:+9779819283223`). |
| `frontend/assets/js/pages/home.js` | **Updated** | Redesigned home page featuring the Open Ring hero motif with live 24/7 status badge, 4-metric fact strip, 4-tile Quick Action Grid, cursor-follow spotlight department cards, 3D tilt doctor cards with NMC registration badges, Dr. Nawaraj Lamichhane's welcome message, emergency callout band, and interactive location map. |
| `frontend/assets/js/pages/doctors.js` | **Updated** | Updated doctor directory with department select filter, text search, 3D tilt cards, explicit NMC registration numbers (`NMC-xxxx`), OPD consultation schedule preview, and "Contact Us" actions. |
| `frontend/assets/js/pages/departments.js` | **Updated** | Redesigned clinical departments directory and detailed view with key services grid, advanced medical equipment lists, department FAQs, and specialist doctor rosters. |
| `frontend/assets/js/pages/contact.js` | **Updated** | Built central contact hub featuring physical address at Bharatpur-10, Hulak Chowk (Sajha Petro Pump, 10 Bypass Rd), 24/7 emergency telephone links (`tel:`), interactive Google Map, and honeypot-protected inquiry form. |
| `frontend/assets/js/pages/about.js` | **Updated** | Institutional overview with mission/vision/values cards, full Chairman's welcome statement in EN/NE, and Board of Directors directory displaying 6 promoter & executive profiles. |
| `frontend/assets/js/pages/appointment.js` | **Updated** | Configured as an OPD contact guidance view for legacy links; router redirects `/appointment` to `/contact` to satisfy Hard Constraint 2. |
| `frontend/assets/js/router.js` | **Updated** | Added explicit redirect rule for `/appointment` -> `/contact`; integrated View Transitions API for seamless SPA route transitions. |
| `frontend/assets/js/effects.js` | **Created** | Interaction layer module managing cursor-follow spotlight gradients, 3D doctor card tilt calculations, intersection observer count-up numbers, mobile drawer toggle, and language switcher. |
| `frontend/assets/js/app.js` | **Updated** | Main entry module initializing layout rendering, router, micro-interaction effects, doctor filtering, and contact inquiry submission handler. |

---

## Verification & Compliance Checklist

- [x] **Hard Constraint 1:** Every in-scope route (`/`, `/about`, `/chairman-message`, `/board-of-directors`, `/departments`, `/department/:slug`, `/doctors`, `/doctor/:slug`, `/contact`) works cleanly with bilingual EN/NE state toggle and seed data.
- [x] **Hard Constraint 2:** Zero appointment booking flows or wizards. All booking buttons replaced with "Contact Us" or click-to-call links (`tel:+9779819283223`). Legacy `/appointment` route redirects to `/contact`.
- [x] **Hard Constraint 3:** 100% front-end solution. Zero backend changes or server dependencies added.
- [x] **Hard Constraint 4:** Links retain `<a href="/path" data-link>` attribute format for SPA router interception.
- [x] **Hard Constraint 5:** Brand colors sampled directly from hospital logo (`Royal #1761C2`, `Deep #0B3C9E`, `Ink #06214F`, `Sky #2CBCED`, `Mist #EEF6FD`, `Emergency #D32F2F`).
- [x] **Hard Constraint 6:** WCAG 2.2 AA text contrast ≥ 4.5:1, tap targets ≥ 44 px, visible focus rings, and `@media (prefers-reduced-motion: reduce)` support.
- [x] **Hard Constraint 7:** Performance budget: total added JS < 15 KB, GPU-accelerated CSS animations.
- [x] **Hard Constraint 8:** Zero invented medical claims, awards, or fake doctor credentials.

---
