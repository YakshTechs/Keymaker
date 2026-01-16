"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LockSvg } from "@/components/LockSvg";
import { prefersReducedMotion, ease, duration } from "@/lib/gsap";
import { ScrollVelocity } from "@/lib/interactions";

/**
 * ACT I: THE LOCK
 * 
 * Narrative intent: Tension, inaccessibility
 * 
 * Interaction: PRESSURE-BASED SCROLL
 * - Fast scroll → strokes remain incomplete
 * - Slow scroll → strokes draw properly
 * - No UI, no instructions
 * 
 * Teaching: Understanding takes patience.
 */

export function Act1Lock() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const velocityTrackerRef = useRef<ScrollVelocity | null>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center 40%",
          scrub: 1.5,
        },
      });

      // Lock SVG strokes draw in
      tl.from(lockRef.current?.querySelectorAll("path, rect, circle, line") || [], {
        strokeDashoffset: 1000,
        strokeDasharray: 1000,
        duration: duration.draw,
        ease: ease.draw,
        stagger: 0.05,
      }, 0);

      // Headline emerges
      tl.from(headlineRef.current, {
        opacity: 0,
        y: 10,
        duration: duration.slow,
        ease: ease.emerge,
      }, 0.3);

    }, sectionRef);

    // INTERACTION: Pressure-based scroll
    // Fast scroll → lock strokes fade out
    // Slow scroll → lock strokes remain visible
    const strokes = lockRef.current?.querySelectorAll("path, rect, circle, line") || [];
    
    velocityTrackerRef.current = new ScrollVelocity((velocity) => {
      // Velocity threshold: 0.5 = slow, 2+ = fast
      const opacity = velocity > 1.5 ? 0.2 : 0.6;
      
      gsap.to(strokes, {
        opacity,
        duration: 0.3,
        ease: "power1.out",
      });
    });

    return () => {
      ctx.revert();
      velocityTrackerRef.current?.destroy();
    };
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col items-center text-center space-y-12">
      <h1 
        ref={headlineRef}
        id="act-1-lock-heading" 
        className="text-display"
        style={{ willChange: "opacity, transform" }}
      >
        Every system is locked.
      </h1>
      <p ref={sublineRef} className="text-subhead max-w-2xl">
        Some locks are visible. Most are not.
      </p>
      
      <div 
        ref={lockRef} 
        className="mt-20 w-48 text-foreground opacity-60"
        style={{ willChange: "auto" }}
      >
        <LockSvg variant="incomplete" />
      </div>
    </div>
  );
}
