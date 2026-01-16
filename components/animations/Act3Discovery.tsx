"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, ease, duration } from "@/lib/gsap";
import { StillnessDetector } from "@/lib/interactions";

/**
 * ACT III: DISCOVERY
 * 
 * Narrative intent: Focus, reduction, clarity
 * 
 * Interaction: HOLD-TO-REVEAL
 * - Key outline only completes when user stops scrolling
 * - Stillness = clarity
 * - Movement = incompleteness
 * 
 * Teaching: Understanding requires patience.
 */

export function Act3Discovery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const stillnessDetectorRef = useRef<StillnessDetector | null>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "center 30%",
          scrub: 0.8,
        },
      });

      // Line transformation - scale only
      tl.from(svgRef.current, {
        scaleX: 0.5,
        duration: duration.draw,
        ease: ease.calm,
      }, 0);

      // Headline emerges - no Y movement
      tl.from(headlineRef.current, {
        opacity: 0,
        duration: duration.slow,
        ease: ease.emerge,
      }, 0.3);

    }, sectionRef);

    // INTERACTION: Hold-to-reveal
    // Line only fully forms when user stops scrolling
    if (lineRef.current) {
      stillnessDetectorRef.current = new StillnessDetector(
        300, // 300ms of stillness required
        () => {
          // User stopped - reveal the key
          gsap.to(lineRef.current, {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power1.out",
          });
        },
        () => {
          // User moving - hide the key
          gsap.to(lineRef.current, {
            strokeDashoffset: 200,
            duration: 0.3,
            ease: "power1.in",
          });
        }
      );

      // Initialize with hidden state
      gsap.set(lineRef.current, {
        strokeDasharray: 200,
        strokeDashoffset: 200,
      });
    }

    return () => {
      ctx.revert();
      stillnessDetectorRef.current?.destroy();
    };
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col items-center text-center space-y-16">
      <h2 
        ref={headlineRef}
        id="act-3-discovery-heading" 
        className="text-headline"
      >
        Understanding doesn&apos;t add more.
      </h2>
      <p ref={sublineRef} className="text-subhead max-w-xl">
        It removes.
      </p>

      <div className="mt-24 w-64 text-foreground opacity-70">
        <svg
          ref={svgRef}
          viewBox="0 0 200 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <line
            ref={lineRef}
            x1="20"
            y1="20"
            x2="180"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
