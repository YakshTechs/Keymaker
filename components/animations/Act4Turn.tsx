"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LockSvg } from "@/components/LockSvg";
import { KeySvg } from "@/components/KeySvg";
import { prefersReducedMotion, ease, duration } from "@/lib/gsap";

/**
 * ACT IV: THE TURN
 * 
 * Narrative intent: Inevitability, connection, resolution
 * 
 * Animation: Scroll-driven key turning and unlocking
 * - Key and lock appear
 * - Key moves toward lock
 * - Key rotates 180 degrees
 * - Key inserts into lock
 * - Lock opens
 * 
 * Teaching: The inevitable moment of understanding.
 */

export function Act4Turn() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
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
      }, 0.1);

      // Key appears from the right
      tl.from(keyRef.current, {
        opacity: 0,
        scale: 0.95,
        x: 50,
        duration: 0.4,
        ease: ease.calm,
      }, 0.2);

      // Key moves toward lock
      tl.to(keyRef.current, {
        x: -30,
        duration: 0.5,
        ease: ease.calm,
      }, 0.5);

      // Key rotates 180 degrees
      tl.to(keyRef.current, {
        rotation: 180,
        duration: 0.6,
        ease: ease.resolve,
      }, 0.9);

      // Key moves into lock (insertion)
      tl.to(keyRef.current, {
        x: -60,
        scale: 0.92,
        duration: 0.5,
        ease: ease.resolve,
      }, 1.4);

      // Lock opens - shackle fades and moves
      const shackle = lockRef.current?.querySelector("path");
      if (shackle) {
        tl.to(shackle, {
          opacity: 0.1,
          y: -10,
          duration: 0.4,
          ease: ease.resolve,
        }, 1.8);
      }

      // Lock body subtle scale
      tl.to(lockRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: ease.resolve,
      }, 1.8);

      // Key fades slightly
      tl.to(keyRef.current, {
        opacity: 0.6,
        duration: 0.3,
        ease: ease.resolve,
      }, 1.9);

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

      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 mt-16 relative">
        <div 
          ref={lockRef} 
          className="w-48 text-foreground opacity-80"
          style={{ willChange: "opacity, transform" }}
        >
          <LockSvg variant="complete" />
        </div>
        
        <div 
          ref={keyRef} 
          className="w-64 text-foreground opacity-80"
          style={{ willChange: "transform" }}
        >
          <KeySvg variant="complete" />
        </div>
      </div>
    </div>
  );
}
