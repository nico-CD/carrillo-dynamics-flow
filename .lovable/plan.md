

# Carrillo Dynamics — Landing Page Plan

## Design System
- **Background:** `#09090B` (near-black) with charcoal card surfaces (`#111113`, `#18181B`)
- **Text:** Stark white (`#FAFAFA`) with muted gray for secondary text (`#71717A`)
- **Accent:** Industrial green (`#10B981`) used sparingly — CTA buttons, active states, thin borders, subtle icon accents only
- **Typography:** Large, bold headings with generous letter-spacing; clean sans-serif body text
- **Spacing:** Generous vertical padding between sections (py-24+), wide max-width container
- **Animations:** Subtle fade-in-up on scroll for each section

## Page Sections (Single Scroll Page)

### 1. Hero Section
- Full-viewport height, centered layout
- Large headline: "Engineer Flow. Eliminate Friction."
- Sub-headline beneath in muted gray
- Single green CTA button that smooth-scrolls to the intake form

### 2. Who It's For / Not For
- Two-column grid layout with thin green border accents
- "Built For" column (checkmarks) vs "Not For" column (x marks)
- Clean, minimal bullet points — no hype

### 3. The Process (3 Steps)
- Three-column layout with abstract minimalist icons (lucide-react)
- Step number + title + short description per card
- Thin green top-border accent on each card

### 4. Credibility / Signals
- Brief section with engineering credentials callout
- Mechanical engineering + corporate operations management foundation
- Minimal layout, possibly with a subtle separator/icon

### 5. Intake Form
- Enterprise-grade styled form with all specified fields
- Dark input styling matching the clinical aesthetic
- Green submit button: "Proceed to Booking Calendar"
- Frontend-only (toast confirmation on submit)

### 6. What Happens Next
- Short explanatory section below the form
- Systems Consultation process + fee credit note
- Clean, no-pressure tone

### 7. Footer
- Minimal footer with company name and copyright

## Technical Approach
- Single `Index.tsx` page with component sections
- Custom CSS variables for the dark clinical theme
- Scroll-to-form functionality on CTA click
- Fade-in animations via Tailwind + `tailwindcss-animate`
- Form built with react-hook-form + zod validation
- All copy embedded as specified

