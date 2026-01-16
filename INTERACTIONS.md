# Elite Interactions Implemented

## Philosophy

No UI. No instructions. Pure subconscious learning.
The site teaches through behavior, not explanation.

---

## 1. PRESSURE-BASED SCROLL (Act I)

**Location:** The Lock section

**Behavior:**
- Fast scroll → lock strokes fade to 20% opacity
- Slow scroll → lock strokes remain at 60% opacity
- Velocity threshold: 1.5 pixels/ms

**Teaching:**
Understanding takes patience. Rush and you miss it.

**Implementation:**
- `ScrollVelocity` class tracks scroll speed
- GSAP modulates stroke opacity based on velocity
- No scroll blocking, pure visual feedback

---

## 2. HOLD-TO-REVEAL (Act III)

**Location:** Discovery section

**Behavior:**
- Line starts hidden (strokeDashoffset: 200)
- User scrolls → nothing happens
- User stops scrolling for 300ms → line draws in
- User moves again → line hides

**Teaching:**
Stillness = clarity. Understanding requires pause.

**Implementation:**
- `StillnessDetector` class monitors scroll pauses
- SVG stroke-dashoffset animated on stillness
- Resets when movement detected

---

## 3. FOCUS-BASED INTERACTION (Act II)

**Location:** Complexity section

**Behavior:**
- Mouse moving → lines remain noisy (opacity 0.4, offset ±3px)
- Mouse still for 800ms → lines stabilize (opacity 0.6, offset 0)
- No explanation given

**Teaching:**
Calm behavior reveals clarity. Fidgeting maintains chaos.

**Implementation:**
- `MouseStillness` class tracks mouse movement
- Lines animate to stable/noisy states
- Subtle, never draws attention

---

## 4. TURN → DRAG → UNLOCK (Act IV)

**Location:** The Turn section

**Behavior:**
1. Key aligns with lock via scroll
2. At 80% scroll progress → text appears: "Turn the key."
3. User clicks key once → key rotates 90°
4. Text changes: "Drag it to the lock. Slowly."
5. User drags turned key toward lock
6. If dragging too fast → subtle shake, returns to position
7. If dragging slowly and gets within 60px → lock scales slightly (feedback)
8. When released near lock → key snaps to lock center
9. After 400ms → lock shackle fades and moves up
10. Text changes: "Open."

**Teaching:**
- User becomes the cause
- Control, not force
- Patience unlocks systems
- The moment is owned, not watched

**Implementation:**
- ScrollTrigger progress tracking
- State management: aligned → turned → inserted → unlocked
- `ResistantDrag` class with proximity detection
- Velocity threshold: 2px per frame
- Snap distance: 60px from lock center
- Visual feedback: lock scales when key approaches
- Keyboard accessible for turn (Enter/Space)
- Touch events supported

**Details:**
- Fast drag triggers shake animation (5px, 3 repeats)
- Successful insertion snaps key to lock center
- Lock opening: shackle opacity 0.1, y: -10px
- Lock body subtle scale pulse (1.02, yoyo)
- Key fades to 0.6 opacity when inserted
- No replay, no undo

---

## 5. MEMORY-LOCK ENDING (Act V)

**Location:** Final section

**Behavior:**
- First visit: full animations play
- Completion triggers localStorage flag
- Scroll back up: animations don't replay fully
- Content appears at 50% opacity immediately
- System stays "open"

**Teaching:**
Once you understand, you can't unsee it.

**Implementation:**
- `MemoryLock` class manages localStorage
- Different animation timelines for first/return visits
- Persistent across sessions

---

## NOT IMPLEMENTED (Intentionally)

### Drag with Resistance (Act IV alternative)
**Why skipped:**
- Click interaction is cleaner
- Drag adds complexity without narrative value
- Mobile touch would require separate tuning
- Risk of feeling gimmicky

**If you want to add it:**
- Use `ResistantDrag` class (already in lib/interactions.ts)
- Replace click handler in Act4Turn
- Set velocity threshold carefully (0.5 px/ms recommended)

---

## Technical Notes

### Performance
- All interactions use requestAnimationFrame
- Proper cleanup on unmount
- No memory leaks
- GPU-accelerated transforms

### Accessibility
- Keyboard navigation supported (Act IV click)
- prefers-reduced-motion disables all interactions
- Content remains readable without JS
- No essential meaning locked behind interaction

### Browser Support
- Modern browsers only (ES6+)
- localStorage required for memory-lock
- Graceful degradation if APIs unavailable

---

## Testing Checklist

- [ ] Act I: Scroll fast/slow, observe lock opacity
- [ ] Act II: Move mouse, then stop, observe line stabilization
- [ ] Act III: Scroll through, then pause, observe line reveal
- [ ] Act IV: Scroll to align, click key, observe turn
- [ ] Act V: Complete journey, scroll back up, observe memory
- [ ] Test with keyboard only
- [ ] Test with prefers-reduced-motion enabled
- [ ] Test on mobile (touch events)
- [ ] Clear localStorage and test fresh experience

---

## Philosophy Reminder

These interactions are not features.
They are teaching moments.

If a user never notices them consciously, but feels the site differently—
that's success.

The goal is memory, not engagement.
