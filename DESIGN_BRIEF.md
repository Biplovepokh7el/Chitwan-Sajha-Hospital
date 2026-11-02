# Design Brief & Design System Specification — Chitwan Sajha Hospital Pvt. Ltd.

**Date:** October 9, 2026  
**Status:** Pending Client Approval (Stage 2)  
**Project:** Chitwan Sajha Hospital Pvt. Ltd. (`E:\Chitwan-Sajha-Hospital`)

---

## 1. Brand Tokens & Color Palette (Sampled from Hospital Logo)

The brand color system is directly derived from the official Chitwan Sajha Hospital logo:

| Token Name | Hex Code | Logo Origin / Purpose | Usage & Contrast Pairings |
|---|---|---|---|
| **Royal Blue** | `#1761C2` | Cross body — Primary brand accent | Primary buttons, active tabs, inline links. Contrast ratio 5.8:1 on White (Passes AA). |
| **Deep Blue** | `#0B3C9E` | Wordmark — Core brand depth | Section headings, primary text titles, dark hover states. Contrast ratio 11.2:1 on White (Passes AAA). |
| **Ink Blue** | `#06214F` | Derived — Dark foundation | Dark background sections, footer surface, primary text color. Contrast ratio 16.1:1 on White (Passes AAA). |
| **Sky Blue** | `#2CBCED` | Highlight on the hands — Energy | Decorative accents, focus rings (3px outline), badge highlights. Contrast ratio 4.8:1 on Ink Blue. |
| **Mist Blue** | `#EEF6FD` | Derived — Soft background | Page background, card hover tint, subtle container fill. Contrast ratio 14.8:1 with Ink text. |
| **Emergency Red** | `#D32F2F` | Emergency Hotline — High urgency | 24/7 Emergency CTAs, sticky call buttons, casualty alerts only. Contrast ratio 5.2:1 on White. |

### Signature Brand Gradient
`linear-gradient(135deg, #0B3C9E 0%, #1761C2 50%, #2CBCED 100%)`  
Used for key brand moments: hero accent ring, department icon fill on hover, primary button sweep, and footer top bar.

---

## 2. Graphic Motif & Brand Concept

### Graphic Motif: The Open Ring ("Held & Cared For")
The official logo depicts a medical cross inside an open protective ring held by two caring hands. We distill this into a distinctive graphic motif:
- **The Open Ring:** An asymmetric, soft-glowing CSS/SVG SVG ring with a 135° brand gradient used as a backdrop in the hero section, inner page banners, and footer header.
- **Tone of Copy:** Warm, reassuring, active, and direct. Focuses on care, emergency speed, and community trust in Chitwan.
- **Design Philosophy:** *"One memorable brand moment (the Open Ring hero visual), everything else quiet, clean, and ultra-readable."*

---

## 3. Design System Scales & Specifications

### A. Typography System

- **Display Face (English Headings):** `Outfit`, sans-serif (Weights: 500, 600, 700, 800)
- **Body Face (English Text):** `Inter`, sans-serif (Weights: 400, 500, 600)
- **Companion Devanagari (Nepali Text):** `Noto Sans Devanagari`, sans-serif (Weights: 400, 500, 600, 700)

#### Bilingual Line-Height & Sizing Table

| Token | Size (px / rem) | Line-Height (Latin) | Line-Height (Devanagari) | Usage |
|---|---|---|---|---|
| `display-1` | 48px / 3.0rem | 1.15 | 1.30 | Desktop Hero Headline |
| `heading-1` | 36px / 2.25rem | 1.20 | 1.35 | Section Headings (H1) |
| `heading-2` | 28px / 1.75rem | 1.25 | 1.40 | Subsection Headings (H2) |
| `heading-3` | 22px / 1.375rem | 1.30 | 1.45 | Card Headings (H3) |
| `body-lg` | 18px / 1.125rem | 1.50 | 1.70 | Hero Subtitle, Lead Paragraphs |
| `body-md` | 16px / 1.0rem | 1.50 | 1.65 | Standard Body Text |
| `body-sm` | 14px / 0.875rem | 1.45 | 1.60 | Captions, Metadata, Badges |
| `caption` | 12px / 0.75rem | 1.40 | 1.55 | Footnotes, Legal Notice |

### B. Spacing Scale
- `space-1`: 4px | `space-2`: 8px | `space-3`: 12px | `space-4`: 16px | `space-6`: 24px | `space-8`: 32px | `space-12`: 48px | `space-16`: 64px | `space-24`: 96px

### C. Border Radius Scale
- `radius-sm`: 6px (Badges, tags)
- `radius-md`: 12px (Form inputs, standard buttons)
- `radius-lg`: 20px (Cards, modal dialogs)
- `radius-xl`: 28px (Hero banners, feature tiles)
- `radius-full`: 9999px (Pills, circular buttons)

### D. Elevation & Shadows
- `shadow-sm`: `0 2px 4px rgba(6, 33, 79, 0.04)`
- `shadow-md`: `0 6px 16px rgba(6, 33, 79, 0.08)`
- `shadow-lg`: `0 12px 32px rgba(6, 33, 79, 0.12)`
- `shadow-spotlight`: `0 0 24px rgba(44, 188, 237, 0.25)`

### E. Motion Tokens
- `duration-fast`: `150ms` (Button hover, link underline)
- `duration-base`: `250ms` (Card lift, spotlight glow)
- `duration-slow`: `400ms` (Drawer open, modal fade, view transitions)
- `ease-out`: `cubic-bezier(0.16, 1, 0.3, 1)`

---

## 4. Component Inventory & Behavior Specifications

1. **Sticky Glass Header:**
   - Top Bar: Emergency Hotline (`+977 981-9283223` / `+977 56 520111`), Hospital Address, Language Switcher (EN/NE).
   - Main Nav: Logo with 25-bed badge, Navigation links with center-out gradient underline, Mega-menu dropdown for Departments, "Contact Us" CTA button.
   - Shrinks on scroll (`padding: 16px -> 10px`), glassmorphism backdrop blur (`backdrop-filter: blur(12px)`).
2. **Hero Section (with Open Ring Motif):**
   - Left: Headline ("Ethical, Accessible & Specialist Healthcare in Bharatpur"), Emergency Call strip, "Contact Us" and "Find Doctor" CTAs.
   - Right: Hospital Facility Visual framed inside the Open Ring graphic motif with live 24/7 status badge.
3. **Fact Strip (Trust Cards):**
   - 4 Key Metrics: 25 IPD Beds, 8 Specialized Departments, 24/7 Emergency & Lab, Bharatpur-10 Location.
   - Animated count-up numbers when scrolled into view.
4. **Quick Action Grid:**
   - 4 High-contrast tile cards: Emergency Casualty, Contact Hospital, Find Specialist Doctor, Explore Departments.
5. **Department Grid & Cards:**
   - 8 Official Hospital Departments.
   - Cursor-follow spotlight border lighting, icon tile gradient fill on hover, slide-right arrow indicator.
6. **Doctor Directory Cards:**
   - Photo frame, Name, Qualification, NMC Number (`NMC-xxxx`), Department tag, Availability schedule preview.
   - 3D subtle tilt on desktop cursor hover; "Contact Us" action button permanently visible on touch viewports.
7. **Chairman Message & Board Showcase:**
   - Professional layout for Dr. Nawaraj Lamichhane's welcome message in EN/NE with official photograph.
   - 6 Board of Directors cards with designations and qualifications.
8. **Contact & Location Hub:**
   - Emergency Telephone cards with click-to-call links (`tel:`).
   - Front-end contact form with instant validation.
   - Interactive Google Map container for Sajha Petro Pump, 10 Bypass Rd, Hulak Chowk.
9. **Floating Mobile Emergency Call Bar:**
   - Fixed to bottom of mobile screen (`position: fixed; bottom: 0`).
   - Red pulsating Emergency Call button (`+977 981-9283223`) + Location Map link.
10. **Footer:**
    - Ink Blue background (`#06214F`), logo, 8 department quick links, emergency hotline info, copyright & Nepal Medical Council compliance statement.

---

## 5. ASCII Wireframes (Home Page)

### A. Desktop Wireframe (1440 px)

```
+---------------------------------------------------------------------------------------------------+
| TOP BAR:  [Phone] Emergency: +977 981-9283223 | +977 (56) 520111    [Location] Bharatpur-10  [EN|NE]|
+---------------------------------------------------------------------------------------------------+
| LOGO & BRAND           Home   About v   Departments v   Doctors   Contact Us      [ Contact Us ]  |
| Chitwan Sajha Hospital                                                            (Primary CTA)   |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
| HERO SECTION                                                                                      |
|                                                                                                   |
|  [Emergency Badge: 24/7 Open]                                 +--------------------------------+  |
|  ETHICAL & ACCESSIBLE HEALTHCARE                              |     ( OPEN RING MOTIF )        |  |
|  IN BHARATPUR-10                                              |   +------------------------+   |  |
|                                                               |   |                        |   |  |
|  25-Bed General Hospital serving Chitwan & Bagmati            |   |   HOSPITAL BUILDING    |   |  |
|  with 24/7 Emergency, Surgery, Radiology & OPD.               |   |   FACILITY PHOTO       |   |  |
|                                                               |   |                        |   |  |
|  [ Call Emergency: 981-9283223 ]  [ Contact Us ]              |   +------------------------+   |  |
|                                                               +--------------------------------+  |
+---------------------------------------------------------------------------------------------------+
| FACT STRIP:  [ 25 Beds ]       [ 8 Departments ]      [ 24/7 Emergency ]     [ Bharatpur-10 ]     |
+---------------------------------------------------------------------------------------------------+
| QUICK ACTIONS:                                                                                    |
| +---------------------+ +---------------------+ +---------------------+ +---------------------+ |
| | 24/7 Emergency      | | Contact Hospital    | | Find a Specialist   | | Hospital            | |
| | Direct Hotline      | | Location & Form   | | Doctor Directory    | | Departments         | |
| | [ Call Now -> ]     | | [ Contact -> ]      | | [ Search -> ]       | | [ View All -> ]     | |
| +---------------------+ +---------------------+ +---------------------+ +---------------------+ |
+---------------------------------------------------------------------------------------------------+
| CLINICAL DEPARTMENTS (8 Units)                                                                    |
| +---------------------+ +---------------------+ +---------------------+ +---------------------+ |
| | General Medicine    | | Laparoscopic Surg   | | Radiology & USG   | | Gynecology & Obs    | |
| | [ Details -> ]      | | [ Details -> ]      | | [ Details -> ]      | | [ Details -> ]      | |
| +---------------------+ +---------------------+ +---------------------+ +---------------------+ |
| +---------------------+ +---------------------+ +---------------------+ +---------------------+ |
| | Orthopedics & Trauma| | Anesthesia & ICU    | | Pediatrics          | | 24/7 Emergency      | |
| | [ Details -> ]      | | [ Details -> ]      | | [ Details -> ]      | | [ Details -> ]      | |
| +---------------------+ +---------------------+ +---------------------+ +---------------------+ |
+---------------------------------------------------------------------------------------------------+
| DOCTOR SPOTLIGHT (Featured Specialists with NMC Numbers)                                          |
| +------------------------+ +------------------------+ +------------------------+                  |
| | [ Photo ]              | | [ Photo ]              | | [ Photo ]              |                  |
| | Dr. Ramesh C. Adhikari | | Dr. Sunita S. Banskota | | Dr. Bijay Raj Gurung   |                  |
| | NMC-5421 | Medicine    | | NMC-6814 | Surgery     | | NMC-7290 | Ortho     |                  |
| | [ Contact Us ]         | | [ Contact Us ]         | | [ Contact Us ]         |                  |
| +------------------------+ +------------------------+ +------------------------+                  |
+---------------------------------------------------------------------------------------------------+
| CHAIRMAN'S MESSAGE                                                                                |
| +--------------------+  "Welcome to Chitwan Sajha Hospital Pvt. Ltd. Founded at Bharatpur-10,   |
| | [ Photo ]          |   Hulak Chowk, our institution is dedicated to providing high-quality,     |
| | Dr. Nawaraj        |   compassionate, and affordable medical care..."                           |
| | Lamichhane         |                                                                            |
| | Chairman           |  -- Dr. Nawaraj Lamichhane, Chairman                                       |
| +--------------------+                                                                            |
+---------------------------------------------------------------------------------------------------+
| LOCATION & CONTACT HUB                                                                            |
| +------------------------------------+ +--------------------------------------------------------+ |
| | Interactive Google Map             | | Quick Contact Form                                     | |
| | Bharatpur-10, Hulak Chowk          | | Name: [                     ]                          | |
| | Phone: +977 981-9283223            | | Phone: [                    ]                          | |
| | [ Get Directions ]                 | | Message: [                  ]  [ Send Message ]        | |
| +------------------------------------+ +--------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------+
| FOOTER:  Chitwan Sajha Hospital | 8 Departments | Quick Links | Emergency Hotline | (c) 2026   |
+---------------------------------------------------------------------------------------------------+
```

### B. Mobile Wireframe (390 px)

```
+-----------------------------------+
| [=] LOGO & BRAND         [EN|NE]  |
|     Chitwan Sajha Hospital        |
+-----------------------------------+
| [!] EMERGENCY 24/7                |
|     +977 981-9283223              |
+-----------------------------------+
| HERO SECTION                      |
| Ethical & Accessible              |
| Healthcare in Bharatpur           |
| 25-Bed General Hospital           |
|                                   |
| [ Call Emergency ] (Red Button)   |
| [ Contact Us ] (Outline)          |
|                                   |
| +-------------------------------+ |
| |   ( OPEN RING PHOTO )         | |
| +-------------------------------+ |
+-----------------------------------+
| QUICK ACTIONS (2x2 Grid)          |
| [ Emergency ]   [ Contact ]       |
| [ Doctors ]     [ Departments ]   |
+-----------------------------------+
| DEPARTMENTS (1-Col Scroll)        |
| +-------------------------------+ |
| | General Medicine     [ -> ]   | |
| +-------------------------------+ |
| | General Surgery      [ -> ]   | |
| +-------------------------------+ |
| | Radiology & USG      [ -> ]   | |
| +-------------------------------+ |
| | Gynecology & Obs     [ -> ]   | |
| +-------------------------------+ |
+-----------------------------------+
| FEATURED DOCTORS                  |
| +-------------------------------+ |
| | [ Photo ]                     | |
| | Dr. Ramesh C. Adhikari        | |
| | NMC-5421 | Gen. Medicine      | |
| | [ Contact Us ]                | |
| +-------------------------------+ |
+-----------------------------------+
| CONTACT & MAP                     |
| Hulak Chowk, Bharatpur-10         |
| Phone: +977 981-9283223           |
| [ Call Now ]  [ View Map ]        |
+-----------------------------------+
| FOOTER & REGULATORY INFO          |
| (c) 2026 Chitwan Sajha Hospital   |
+-----------------------------------+
| FLOATING BOTTOM BAR (FIXED)       |
| [ CALL EMERGENCY: 981-9283223 ]   |
+-----------------------------------+
```

---

## 6. Review Pass: Benchmarks & Anti-Template Rationale

### Comparison vs. 12 Benchmark Sites
- **Mayo Clinic & Cleveland Clinic Influence:** Direct phone call prioritization, clean typography hierarchy, high accessibility contrast (WCAG AAA baseline for headings).
- **Apollo & Nepal Mediciti Influence:** Floating mobile emergency call bar (`position: fixed; bottom: 0`), prominent display of doctor NMC credentials, clear department service lists.
- **Norvic & Grande Influence:** Specific location details ("Bharatpur-10, Hulak Chowk"), OPD hours (Sun-Fri, 8 AM - 7 PM), dual-language English/Nepali support.

### Eliminating Generic "AI Template" Anti-Patterns

| Generic AI Template Anti-Pattern | Our Custom Solution | Why It Was Changed |
|---|---|---|
| Generic centered hero with floating colorful blobs. | Asymmetric layout featuring the **Open Ring motif** derived directly from the hospital logo. | Anchors the site in Chitwan Sajha's specific visual identity rather than generic stock templates. |
| 3 identical cards in a row with meaningless generic icons. | Purpose-built **Quick Action Grid** (Emergency, Contact, Doctors, Departments) with distinct color coding. | Directly serves the top 3 patient jobs (Call Emergency, Contact Hospital, Find Doctor). |
| Hidden emergency phone number inside contact page footer. | Dual sticky emergency bar (Top Bar on desktop, Pinned Floating Call Bar on mobile). | Critical for emergency patients accessing the site on mobile data in Chitwan. |
| "Book Appointment" CTAs leading to non-existent online calendars. | Replaced 100% of booking buttons with **"Contact Us"** linking to `/contact` and direct `tel:` dialing. | Prevents user frustration from broken/fake booking flows; matches true 25-bed hospital operations. |
| Neglected Devanagari typography that breaks vertical alignment. | `Noto Sans Devanagari` paired with `Inter` / `Outfit` with tuned line-height (`1.65–1.75`). | Ensures Nepali text renders with equal legibility and beauty on all screens. |

---
