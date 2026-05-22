You are a senior full-stack web developer and creative director. Build the complete **Vasuki** luxury couture eyewear website from scratch. Your output must be a production-ready, fully functional static site that deploys directly to **GitHub Pages** with zero configuration beyond a single `npm run build` or equivalent command that outputs into a `docs/` or `dist/` folder.

---

## BRAND CONTEXT

**Vasuki** is a luxury couture eyewear label — a jewellery house that makes sunglasses. The brand tagline is *"Ornamented Vision. Regal Presence."* The brand archetype is **The Sovereign**. It is rooted in Indian ornamental craft — enamel, gemstones, metalwork, lotus motifs — while being globally contemporary and editorial in aesthetic. It competes with Schiaparelli, Alexander McQueen, and Area NYC, not commercial eyewear brands.

**Colour System:**
- `#0D0D0D` — Royal Noir (primary background)
- `#C9A84C` — Sovereign Gold (primary accent, frames, logo, type)
- `#8B1A1A` — Vermillion Ruby (soul accent, enamel detail)
- `#F5F0E8` — Pearl White (cream panels, text backgrounds)
- `#E8607A` — Lotus Blush (collection accent)
- `#B8860B` — Resin Amber (warm secondary gold)

**Typography direction:** A high-personality serif with old-style numerals or ink-trap quality for all headings (use **Cormorant Garamond** or **Playfair Display** from Google Fonts). A refined, airy sans-serif for body copy (use **Jost** or **DM Sans**). The brand voice is quiet, poetic, confident. Motion is slow and deliberate — never bouncy.

**Collections (5):**
1. **The Lotus** — Round/oval frames, gold lotus crown, pink enamel petals, gold chain dangles with lotus bud pendants. Occasion: Mehendi, Haldi.
2. **The Rose Vine** — Cat-eye almond frames, gold filigree vine wrapping, 3D cast metal red roses at outer temples, black lens. Occasion: Cocktail, Reception.
3. **The Ruby Heart** — Heart-shaped frames, continuous ruby-set rim, dark red gradient lens, hanging red teardrop bead pendants. Occasion: Reception, Valentine editorial.
4. **The Flame** — Sharp upswept wing silhouette, multi-layered gold blades with red enamel edges, 12 gold strand fringe dangles per lens each tipped in a red bead. Occasion: Sangeet, Fashion Week.
5. **The Zari Cat-Eye** — Angular cat-eye, upper lens in green-to-blue gradient glass, lower third in silk organza with gold zari embroidery, green gemstone rim, triple-strand white pearl dangles. Occasion: Destination wedding, resort editorial.

---

## TECH STACK

- **Vite** as the build tool (outputs to `dist/`, configured for GitHub Pages base path)
- **Vanilla JS** (no React/Vue — keep it lean and fast)
- **GSAP** (GreenSock) for all scroll-triggered animations and timeline sequences — load via CDN or npm
- **Lenis** for ultra-smooth inertial scrolling
- **Three.js** for a WebGL particle/noise canvas background on the hero section
- **CSS custom properties** throughout — no utility class frameworks
- **Google Fonts** for Cormorant Garamond + Jost
- All placeholder images from **https://picsum.photos** — use consistent seeded URLs so the same image always loads for the same slot (e.g. `https://picsum.photos/seed/vasuki-lotus/800/1000`)
- `vite.config.js` must set `base: '/vasuki/'` (or whatever the GitHub repo name will be) so asset paths resolve correctly on GitHub Pages

---

## PAGES & ARCHITECTURE

Build a **single-page application** with smooth scroll navigation between sections. All navigation is anchor-based, no page reloads. The site has these sections rendered on one HTML file:

1. `#home` — Hero
2. `#collections` — The Collections
3. `#craft` — The Craft
4. `#world` — The Lookbook / Brand World
5. `#about` — Brand Philosophy & Story
6. `#bridal` — Bridal Universe
7. `#contact` — Custom Orders / Inquiry

---

## SECTION-BY-SECTION SPECIFICATIONS

### NAVIGATION

- Fixed top navbar, starts fully transparent, gains a `background: rgba(13,13,13,0.92)` with `backdrop-filter: blur(16px)` on scroll after 80px
- Left: The **Vasuki eye-mark logo** — build this as an inline SVG: two sweeping gold arcs forming an almond/pointed oval, with a deep burgundy oval centre. Render it at 40×20px. Beside it, the wordmark "vasuki" in Cormorant Garamond italic, gold, with a small red dot (bindi) rendered as a CSS `::after` pseudo-element positioned above the letter "i"
- Centre: Navigation links — Home, Collections, Craft, World, Bridal, Contact — in uppercase tracked letter-spacing, 11px, Jost. On hover, each link gets a gold underline that animates in from left using `scaleX` transform
- Right: A "Commissions Open" pill badge in gold outline, and a hamburger icon that reveals a full-screen overlay nav for mobile
- Mobile nav overlay: full `#0D0D0D` background, links in large Cormorant Garamond, gold, each staggered in on open with GSAP timeline

---

### SECTION 1 — HERO (`#home`)

- **Full viewport height**, dark background `#0D0D0D`
- **Three.js WebGL canvas** fills the entire background: render a field of ~800 tiny gold particles (`#C9A84C` at 0.6 opacity) that drift slowly with Perlin/simplex noise. Particles nearest the cursor attract slightly — a subtle pull of ~30px radius. The canvas sits behind all content at `z-index: 0`
- **Centre content** (z-index above canvas):
  - The eye-mark SVG logo, large (120px wide), animates in on load: the two arc strokes are drawn using SVG `stroke-dashoffset` animation over 2.4s, then the burgundy centre fades in
  - Below: "VASUKI" in Cormorant Garamond, uppercase, ~96px, letter-spacing 0.3em, gold — each letter animates in individually with GSAP stagger (0.06s between each, Y: 40px → 0, opacity 0 → 1)
  - Below: the tagline *"Ornamented Vision. Regal Presence."* in Jost, 14px, uppercase, tracked, pearl white — fades in at 2.8s delay
  - Below: a fine gold horizontal rule (width 60px, 1px), centred, fades in at 3.2s
  - Below: *"Couture Eyewear as Wearable Art"* in Cormorant Garamond italic, 22px, pearl white, fades in at 3.4s
- **Scroll indicator**: a vertically oriented "SCROLL" text in Jost 10px tracked gold, with a thin animated gold line pulsing downward beneath it, positioned bottom-centre, fades out once user scrolls past 100px
- **Horizontal marquee strip** at very bottom of hero, `position: absolute; bottom: 0`: infinitely scrolling text in gold on black — *"THE LOTUS · THE ROSE VINE · THE RUBY HEART · THE FLAME · THE ZARI CAT-EYE · "* repeated. CSS `animation: marquee linear infinite` at 40s duration

---

### SECTION 2 — COLLECTIONS (`#collections`)

Use a **horizontal scroll carousel within a vertical scroll context** (pinned scrolling via GSAP ScrollTrigger `pin: true`). The section is pinned while the user scrolls, and the inner track translates horizontally.

Each of the 5 collections is a card:
- **Card size**: ~75vw wide × ~85vh tall on desktop, stacked full width on mobile
- **Card background**: the card itself is `#0D0D0D` with a razor-thin 1px gold border
- **Layout inside each card**:
  - Left 55%: Placeholder editorial image using picsum (portrait orientation, seeded per collection). Image is rendered with `object-fit: cover`, with a subtle gold gradient overlay at the bottom (linear gradient from transparent to `rgba(201,168,76,0.12)`)
  - Right 45%: Padding 48px. Collection number in Cormorant Garamond, ~120px, `#C9A84C` at 0.08 opacity, positioned absolutely in the top-right corner (large ghost numeral). Collection name in Cormorant Garamond, ~52px, gold. One-line poetic description in Jost italic, 15px, `#F5F0E8` at 0.7 opacity. A horizontal gold rule. Material details listed as small spaced tags (pill shaped, 1px gold border, no fill, Jost 10px, tracked). Best occasion chips. A CTA button: "View Piece" — black background, gold border, gold text, on hover fill with gold, text flips to black, with a smooth 0.3s transition
- **Between cards**: there is a fine vertical gold separator line
- **Section header** (above the pinned zone): "The Collections" in Cormorant Garamond, very large (~120px), left-aligned, with a `clip-path: inset(0 100% 0 0)` that animates to `inset(0 0% 0 0)` on scroll entry (text wipe reveal). Below it: "Five worlds. One vision." in Jost italic, tracked

For the horizontal progress: a thin gold progress bar at the top of the section shows how far the user has scrolled through the horizontal track (width animates from 0 to 100% via ScrollTrigger scrub)

---

### SECTION 3 — CRAFT (`#craft`)

- Background: `#0D0D0D` with an extremely subtle full-bleed texture (use a CSS `background-image` SVG noise filter, or a semi-transparent noise PNG overlay at 0.04 opacity for grain)
- **Split layout**: Left 50% is a sticky image container, right 50% scrolls with text panels
- As the user scrolls through the right text panels, the left image cross-fades between 4 placeholder images (different seeds): metalwork, enamelling, stone-setting, the finished piece
- **Text panels** (4 total, one per craft stage):
  1. **"The Frame"** — metal casting, polishing. Body: 2–3 sentences in brand voice about how frames begin as raw gold metal
  2. **"The Enamel"** — hand-painted, fired. Body: poetic description of enamel application
  3. **"The Stone"** — gem-setting, rubies, pearls, peridot. Body
  4. **"The Object"** — the finished sculpture. Body: *"Every piece leaves the atelier once. It arrives at you forever."*
- Each panel title in Cormorant Garamond, 64px, gold. Body in Jost, 16px, `#F5F0E8` at 0.8 opacity. Line height 1.8
- GSAP ScrollTrigger: each panel fades in (opacity 0→1, Y: 30→0) as it enters viewport. The crossfade on the left image is also ScrollTrigger-scrubbed

---

### SECTION 4 — WORLD (`#world`)

This is the **Lookbook / Editorial Grid**.

- Section header: "The World of Vasuki" in Cormorant Garamond, large, centred, with a slow parallax Y offset on scroll (moves at 0.3× scroll speed via GSAP)
- **Masonry-style grid** (CSS `columns: 3` on desktop, 2 on tablet, 1 on mobile) of 9 editorial placeholder images:
  - Mix of portrait and landscape seeds from picsum
  - Each image has zero gap masonry layout
  - On hover: each image scales to 1.04 (smooth `transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)`) and a gold overlay appears with a collection tag and a short caption
  - The hover overlay slides in from the bottom: `translateY(100%)` → `translateY(0)` on hover
- **Floating quote** overlaid on top of the grid (not inside a grid item — absolutely positioned over the grid, pointer-events: none): *"The Vasuki woman is constructing her own mythology every time she gets dressed."* in Cormorant Garamond italic, ~36px, gold, at 0.15 opacity — a ghost text watermark that parallaxes at a different rate

---

### SECTION 5 — ABOUT (`#about`)

- Full-bleed background image (picsum, wide/landscape, desaturated via CSS `filter: grayscale(0.7) brightness(0.4)`)
- Centred content column (max-width 720px), vertically centred
- **The Mythology Block**:
  - Small label: "THE NAME" in Jost, 10px, tracked, gold
  - Paragraph in Cormorant Garamond, 24px, pearl white, line-height 1.9: *"Vasuki is the divine serpent who coils around Lord Shiva's neck — a symbol of power, beauty, mystery, and transformation. Vasuki is not an eyewear brand. It is a jewellery house that makes sunglasses."*
  - Gold horizontal rule, 80px
- **Three Beliefs** (the brand's 3 philosophies), each as its own typographic block with large ghost numerals:
  1. *"Eyewear is jewellery."* — with a one-line elaboration
  2. *"Craft is currency."*
  3. *"Fashion is self-mythology."*
  - Each belief rendered in Cormorant Garamond, 36px, gold. Each elaboration in Jost, 14px, pearl white. Staggered scroll-in animation (Y: 60px → 0, opacity 0 → 1, each 0.2s apart via GSAP ScrollTrigger)
- **Logo mark animation**: The eye SVG, large (200px), slowly rotates in place using a CSS animation `rotate` at 60s duration — almost imperceptibly slow, mystical

---

### SECTION 6 — BRIDAL (`#bridal`)

- Background: a deep aubergine-adjacent very dark background (`#110508`) — almost black with a red-black warmth
- Section title: "The Bridal Universe" in Cormorant Garamond, huge, gold
- **Event-to-Collection mapping** — rendered as a **timeline layout** (alternating left/right on desktop, stacked on mobile):
  - 6 events: Mehendi, Haldi, Sangeet, Cocktail, Reception, Destination/Pool
  - Each event block: event name in Jost tracked uppercase, collection name in Cormorant Garamond italic gold, a 1-sentence evocative description, and a small placeholder image (square, 300×300, picsum seeded)
  - The timeline axis is a vertical gold line (2px, `#C9A84C`) running through the centre. Each node is a small gold diamond SVG shape (rotate a square 45°) that pulses with a slow CSS box-shadow glow when it enters viewport
  - GSAP ScrollTrigger: each timeline item slides in from its respective side (left items from -60px X, right items from +60px X) as the user scrolls
- **Bridal CTA block** at bottom: full-width dark red (`#8B1A1A`) strip with text: *"Every frame. Every event. Made for the woman who cannot be forgotten."* in Cormorant Garamond italic, 36px, pearl white. Beneath it a gold outlined button: "Inquire About Bridal Commission"

---

### SECTION 7 — CONTACT (`#contact`)

- Background `#0D0D0D`, left half a large picsum image with gold overlay gradient, right half the form
- **Inquiry form fields** (custom styled — no browser defaults):
  - Full Name
  - Email
  - Event Type (styled `<select>` — custom gold arrow, no default appearance)
  - Event Date (styled date input)
  - Collection Interest (custom multi-select pills — clicking a collection name toggles it as selected; selected state: gold background, black text; unselected: transparent, gold border, gold text)
  - Custom Notes (`<textarea>`, 4 rows)
  - Submit button: full-width, gold background, black text "Send Commission Inquiry", on hover the background pulses a slightly brighter gold with a 0.3s transition
- All inputs: `border: none; border-bottom: 1px solid #C9A84C; background: transparent; color: #F5F0E8; font-family: Jost; padding: 12px 0; width: 100%` — the floating label pattern (label floats above on focus/fill)
- No backend needed — `<form>` with `action=""` and a `novalidate` attribute. On submit, prevent default and show an animated success message: the form content fades out, a large gold checkmark SVG draws in (stroke-dashoffset), and text appears: *"We will be in touch. The atelier awaits."*
- Below the form: social links row — Instagram icon, Pinterest icon, YouTube icon — as minimal SVG icons, gold, with hover scale + colour-fill transition

---

## GLOBAL MICRO-INTERACTIONS & POLISH

- **Custom cursor**: Replace the default OS cursor with a custom cursor: a small gold ring (24px, 1.5px `border: solid #C9A84C`, `border-radius: 50%`) that follows the mouse with a slight lag (lerp `0.15` — update position each RAF frame toward target position). A smaller solid gold dot (6px) follows instantly at exact cursor position. On hovering links/buttons, the ring expands to 48px smoothly. Disable on touch devices.
- **Page loader**: On initial load, show a full-screen `#0D0D0D` overlay. The Vasuki eye SVG draws itself (stroke animation, 1.8s), then the entire overlay fades out (opacity 0, `pointer-events: none`). Content underneath is pre-rendered.
- **Scroll progress indicator**: A 2px horizontal gold bar at the very top of the viewport (above even the navbar) that fills from left to right as the user scrolls from top to bottom of the page. `position: fixed; top: 0; z-index: 9999; transform-origin: left;` driven by a scroll event listener.
- **Section entry animations**: Every section title uses the **clip-path text reveal** technique: `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` driven by GSAP ScrollTrigger. Duration 1.2s, ease `power3.out`.
- **Gold dust scatter effect**: On the hero section specifically, when the user's mouse moves, emit 3–5 tiny gold particles per mouse move event that fall and fade out over 1.2s. Implement via canvas or absolutely positioned `<span>` elements appended and removed from the DOM.
- **All `<a>` and `<button>` elements**: add a subtle `letter-spacing` expansion on hover (0.05em → 0.1em, transition 0.3s). Prevents layout shift since these are inline — use `display: inline-block`.
- **Image hover chromatic aberration**: On the craft and world section images, on hover apply a CSS `filter` animation that briefly shifts R/B channels using `drop-shadow` color offset (achieved via layered pseudo-elements or a CSS custom property + SVG feDisplacementMap filter) — a glitch-luxury aesthetic. Duration 0.4s, settles back.
- **Smooth section transitions**: Between every major section, a thin full-width gold separator line (1px, 10% opacity) with a small centered Vasuki eye mark SVG (32px) sitting on top of it.

---

## RESPONSIVE DESIGN

- **Breakpoints**: `768px` (tablet), `480px` (mobile)
- On mobile: horizontal scroll collection section becomes a vertical swipe carousel (CSS scroll-snap, `scroll-snap-type: x mandatory`, each card `scroll-snap-align: start`)
- All font sizes reduce proportionally using `clamp()` — e.g. hero heading: `clamp(48px, 10vw, 96px)`
- Craft section: on mobile, the sticky image moves above the text panels, not beside them (single-column layout)
- Bridal timeline: single-column on mobile, alternating side effect removed
- Custom cursor disabled on touch devices (use `@media (pointer: coarse)` to hide it)
- Navigation: hamburger menu from 768px down

---

## FILE STRUCTURE

```
vasuki/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.js          # Lenis init, GSAP register, all scroll animations, cursor
│   ├── hero.js          # Three.js canvas particle system
│   ├── collections.js   # Horizontal scroll GSAP pin logic
│   ├── craft.js         # Sticky scroll + crossfade logic
│   ├── contact.js       # Form interactions, success animation
│   ├── style.css        # All CSS — custom properties, layout, components
│   └── fonts.css        # Google Fonts imports
├── public/
│   └── favicon.svg      # The Vasuki eye mark as favicon
└── docs/                # Vite build output (set outDir: 'docs' in vite.config.js)
```

---

## VITE CONFIG (REQUIRED)

```js
// vite.config.js
import { defineConfig } from 'vite'
export default defineConfig({
  base: '/vasuki/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  }
})
```

---

## PACKAGE.JSON DEPENDENCIES

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.12.5",
    "lenis": "^1.1.14",
    "three": "^0.166.1"
  },
  "devDependencies": {
    "vite": "^5.3.1"
  }
}
```

---

## COPY & CONTENT

Use the following real brand copy throughout (do not use Lorem Ipsum):

- Hero tagline: *"Ornamented Vision. Regal Presence."*
- Hero subline: *"Couture Eyewear as Wearable Art"*
- Collections intro: *"Five worlds. One vision."*
- Craft intro: *"Every frame begins as raw metal. It ends as mythology."*
- World section intro: *"The Vasuki woman is constructing her own mythology every time she gets dressed."*
- About / philosophy: *"Vasuki is not an eyewear brand. It is a jewellery house that makes sunglasses."*
- The three beliefs: **"Eyewear is jewellery." / "Craft is currency." / "Fashion is self-mythology."*
- Bridal strip quote: *"Every frame. Every event. Made for the woman who cannot be forgotten."*
- Contact form success message: *"We will be in touch. The atelier awaits."*
- Footer: *"© 2025 Vasuki. All pieces are made to be owned once."*

Each collection must use its actual name, description, materials, and best occasion from the brand document.

---

## WHAT NOT TO DO

- No Bootstrap, Tailwind, or any CSS framework
- No React, Vue, or Angular
- No generic white-background e-commerce layouts
- No bouncy, spring-physics animations — all easing must be `power2`, `power3`, or `expo` from GSAP
- No emoji anywhere on the site
- No stock-copy placeholders like "Lorem ipsum" — use provided brand copy or write in brand voice
- No drop shadows on text (use `text-shadow: none` explicitly)
- Do not use `box-shadow` for decorative purposes — use gold borders and `outline` instead
- Do not use any colour outside the defined brand palette unless it is a transparent/opacity variant of one of those colours

---

Build the complete site. Output every file in full. Do not truncate any file. Do not skip sections. The final result must be deployable to GitHub Pages by running `npm install && npm run build` and pushing the `docs/` folder.