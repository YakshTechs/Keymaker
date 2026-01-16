"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KeySvg } from "@/components/KeySvg";
import { prefersReducedMotion, ease, duration } from "@/lib/gsap";
import { MemoryLock } from "@/lib/interactions";

/**
 * ACT V: OPEN SYSTEM
 * 
 * Narrative intent: Calm control, resolution, completion
 * 
 * Interaction: MEMORY-LOCK
 * - First visit: animations play normally
 * - After completion: scrolling back doesn't replay fully
 * - System stays "open"
 * 
 * Teaching: Once you understand, you can't unsee it.
 */

export function Act5Open() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const isUnlocked = MemoryLock.isUnlocked();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "center 30%",
          scrub: 0.8,
          anticipatePin: 1,
          onEnter: () => {
            // Mark as unlocked when user reaches this section
            if (!isUnlocked) {
              MemoryLock.unlock();
            }
          },
        },
      });

      if (isUnlocked) {
        // System already understood - minimal animation
        tl.from(headlineRef.current, {
          opacity: 0.5,
          duration: duration.fast,
          ease: ease.emerge,
        }, 0);

        tl.from(sublineRef.current, {
          opacity: 0.5,
          duration: duration.fast,
          ease: ease.emerge,
        }, 0.05);

        tl.from(bodyRef.current, {
          opacity: 0.5,
          duration: duration.fast,
          ease: ease.emerge,
        }, 0.1);

        // Key already visible
        gsap.set(keyRef.current, { opacity: 0.5, scale: 1 });

      } else {
        // First time - full animation
        tl.from(headlineRef.current, {
          opacity: 0,
          y: 8,
          duration: duration.medium,
          ease: ease.emerge,
        }, 0);

        tl.from(sublineRef.current, {
          opacity: 0,
          duration: duration.medium,
          ease: ease.emerge,
        }, 0.15);

        tl.from(bodyRef.current, {
          opacity: 0,
          y: 5,
          duration: duration.medium,
          ease: ease.emerge,
        }, 0.25);

        tl.from(keyRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: duration.medium,
          ease: ease.resolve,
        }, 0.4);
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col items-center text-center space-y-12 max-w-3xl mx-auto">
      <h2 
        ref={headlineRef}
        id="act-5-open-heading" 
        className="text-headline"
      >
        Systems aren&apos;t broken.
      </h2>
      <p ref={sublineRef} className="text-subhead">
        They&apos;re misunderstood.
      </p>

      <div ref={bodyRef} className="mt-16 space-y-4 text-body">
        <p>Find the key.</p>
        <p>Own the system.</p>
      </div>

      <div ref={keyRef} className="mt-20 w-16 text-foreground opacity-50">
        <KeySvg variant="resting" />
      </div>
    </div>
  );
}
