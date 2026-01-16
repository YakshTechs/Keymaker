"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LockSvg } from "@/components/LockSvg";
import { prefersReducedMotion, ease } from "@/lib/gsap";

/**
 * ACT IV: THE TURN
 * 
 * Lock appears and opens
 */

export function Act4Turn() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      // Headline emerges
      tl.from(headlineRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.3,
        ease: ease.emerge,
      }, 0);

      // Lock appears
      tl.from(lockRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: ease.calm,
      }, 0.2);

      // Lock opens - shackle fades and moves
      const shackle = lockRef.current?.querySelector("path");
      if (shackle) {
        tl.to(shackle, {
          opacity: 0.1,
          y: -10,
          duration: 0.4,
          ease: ease.resolve,
        }, 0.8);
      }

      // Lock body subtle scale
      tl.to(lockRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: ease.resolve,
      }, 0.8);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col items-center text-center space-y-20 min-h-screen">
      <h2 
        ref={headlineRef}
        id="act-4-turn-heading" 
        className="text-subhead font-serif"
        style={{ willChange: "opacity" }}
      >
        One turn changes everything.
      </h2>

      <div className="flex items-center justify-center mt-16">
        <div 
          ref={lockRef} 
          className="w-48 text-foreground opacity-80"
          style={{ willChange: "opacity, transform" }}
        >
          <LockSvg variant="complete" />
        </div>
      </div>
    </div>
  );
}
