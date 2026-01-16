"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, ease, duration } from "@/lib/gsap";
import { MouseStillness } from "@/lib/interactions";

/**
 * ACT II: COMPLEXITY
 * 
 * Narrative intent: Pressure, layered understanding
 * 
 * Interaction: FOCUS-BASED
 * - Mouse stillness → lines stabilize
 * - Mouse movement → lines remain noisy
 * - No explanation
 * 
 * Teaching: Calm behavior reveals clarity.
 */

export function Act2Complexity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const linesRef = useRef<SVGSVGElement>(null);
  const mouseStillnessRef = useRef<MouseStillness | null>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          end: "center 35%",
          scrub: 1.2,
        },
      });

      // Headline only
      tl.from(headlineRef.current, {
        opacity: 0,
        duration: duration.medium,
        ease: ease.emerge,
      }, 0);

      // Lines emerge with minimal offset
      const lines = linesRef.current?.querySelectorAll("line") || [];
      tl.from(lines, {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -5 : 5),
        duration: duration.slow,
        ease: ease.calm,
        stagger: 0.1,
      }, 0.15);

    }, sectionRef);

    // INTERACTION: Focus-based stabilization
    // Mouse stillness → lines stabilize
    const lines = linesRef.current?.querySelectorAll("line") || [];
    
    mouseStillnessRef.current = new MouseStillness(
      800, // 800ms of stillness required
      () => {
        // Mouse still - stabilize lines
        gsap.to(lines, {
          opacity: 0.6,
          x: 0,
          duration: 1.2,
          ease: "power1.out",
          stagger: 0.05,
        });
      },
      () => {
        // Mouse moving - add subtle noise
        lines.forEach((line, i) => {
          gsap.to(line, {
            opacity: 0.4,
            x: (i % 2 === 0 ? -3 : 3),
            duration: 0.4,
            ease: "power1.out",
          });
        });
      }
    );

    return () => {
      ctx.revert();
      mouseStillnessRef.current?.destroy();
    };
  }, []);

  return (
    <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-8">
        <h2 
          ref={headlineRef}
          id="act-2-complexity-heading" 
          className="text-headline"
        >
          Complexity isn&apos;t random.
        </h2>
        <p className="text-subhead">
          It&apos;s layered.
        </p>
        <p className="text-body max-w-md">
          What you don&apos;t understand feels impossible to open.
        </p>
      </div>

      <div className="relative h-96 opacity-40" aria-hidden="true">
        <svg
          ref={linesRef}
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-foreground"
        >
          <line x1="50" y1="100" x2="350" y2="100" stroke="currentColor" strokeWidth="1" />
          <line x1="80" y1="150" x2="320" y2="150" stroke="currentColor" strokeWidth="1" />
          <line x1="100" y1="200" x2="300" y2="200" stroke="currentColor" strokeWidth="1.5" />
          <line x1="120" y1="250" x2="280" y2="250" stroke="currentColor" strokeWidth="1" />
          <line x1="150" y1="300" x2="250" y2="300" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
