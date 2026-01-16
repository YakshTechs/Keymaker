# The Keymaker

A cinematic, editorial, scroll-driven storytelling experience.

## Phase 1: Foundation (Current)

Static architecture with:
- Clean editorial layout
- Typography-first design
- SVG illustrations
- Scroll-ready structure
- No animations yet

## Tech Stack

- Next.js (App Router, Static Export)
- TypeScript
- Tailwind CSS (editorial tokens)
- Inline SVG

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Phase 3: Museum-Grade Polish (Complete)

Refined through subtraction:
- Reduced all motion distances and speeds
- Removed 6 animations that didn't serve meaning
- Tightened typography scale and spacing
- Scroll progression: heavy → light (Act I → Act V)
- GPU acceleration and performance optimization
- Mobile responsive refinements

**Removed animations:**
- Subline fades (Act I, III, V)
- Lock opening (Act IV)
- Stagger timing (Act IV)
- Exaggerated easing (all sections)

The site now feels: calm, confident, inevitable.

See `PHASE3_REFINEMENT.md` for complete audit.

## Phase 4: Elite Interactions (Complete)

Behavioral teaching through interaction:

1. **Pressure-Based Scroll (Act I)** - Fast scroll fades lock, slow scroll reveals it
2. **Hold-to-Reveal (Act III)** - Line only forms when user stops scrolling
3. **Focus-Based (Act II)** - Mouse stillness stabilizes complexity
4. **Single Click (Act IV)** - User turns the key once, owns the moment
5. **Memory-Lock (Act V)** - System stays "open" after completion

No UI. No instructions. Pure subconscious learning.

See `INTERACTIONS.md` for complete documentation.

## Build

```bash
npm run build
```

Static site exports to `/out`

## Design Philosophy

- Light background (warm off-white)
- Editorial typography (serif headlines, sans body)
- Massive whitespace
- Calm, confident pacing
- Museum-quality presentation
- No UI components feel
- Content as artifact

## Structure

Five scroll sections (acts):
1. The Lock - Hook
2. Complexity - Pressure
3. Discovery - Focus
4. The Turn - Climax
5. Open System - Resolution

Each section has:
- Unique ID for future GSAP targeting
- Semantic HTML
- Accessibility considerations
- Mobile responsive layout

## Future (Phase 2)

- GSAP scroll-triggered animations
- Lock/key morphing
- Parallax effects
- Cinematic transitions
