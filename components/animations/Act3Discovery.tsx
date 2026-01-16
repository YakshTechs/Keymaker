"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, ease } from "@/lib/gsap";

/**
 * ACT III: DISCOVERY
 * 
 * Narrative intent: Progressive revelation through scroll
 * 
 * Visual: Key builds progressively as you scroll through zones
 * - Zone 1 (10-20%): Headline appears
 * - Zone 2 (20-30%): Subline appears
 * - Zone 3 (30-40%): Noise/complexity appears
 * - Zone 4 (40-50%): Key head (circles) draws
 * - Zone 5 (50-60%): Key shaft draws
 * - Zone 6 (60-70%): Key teeth draw
 * - Zone 7 (70%+): Noise fades, key remains
 * 
 * Teaching: Understanding reveals itself gradually through patience.
 */

export function Act3Discovery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const noiseGroupRef = useRef<SVGGElement>(null);
  const keyHeadOuterRef = useRef<SVGCircleElement>(null);
  const keyHeadInnerRef = useRef<SVGCircleElement>(null);
  const keyShaftRef = useRef<SVGLineElement>(null);
  const keyTooth1Ref = useRef<SVGLineElement>(null);
  const keyTooth2Ref = useRef<SVGLineElement>(null);
  const keyTooth3Ref = useRef<SVGLineElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // ZONE 1: Headline (10-20% of section height)
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: 1,
          },
        }
      );

      // ZONE 2: Subline (20-30%)
      gsap.fromTo(
        sublineRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      // ZONE 3: Noise appears (30-40%)
      gsap.fromTo(
        noiseGroupRef.current,
        { opacity: 0 },
        {
          opacity: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // ZONE 4: Key head outer circle draws (40-50%)
      const outerLength = keyHeadOuterRef.current?.getTotalLength() || 157;
      gsap.fromTo(
        keyHeadOuterRef.current,
        { 
          strokeDasharray: outerLength,
          strokeDashoffset: outerLength,
          opacity: 0,
        },
        {
          strokeDashoffset: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // ZONE 4.5: Key head inner circle draws (45-55%)
      const innerLength = keyHeadInnerRef.current?.getTotalLength() || 94;
      gsap.fromTo(
        keyHeadInnerRef.current,
        { 
          strokeDasharray: innerLength,
          strokeDashoffset: innerLength,
          opacity: 0,
        },
        {
          strokeDashoffset: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 45%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );

      // ZONE 5: Key shaft draws (50-60%)
      const shaftLength = keyShaftRef.current?.getTotalLength() || 155;
      gsap.fromTo(
        keyShaftRef.current,
        { 
          strokeDasharray: shaftLength,
          strokeDashoffset: shaftLength,
          opacity: 0,
        },
        {
          strokeDashoffset: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 35%",
            end: "top 25%",
            scrub: 1,
          },
        }
      );

      // ZONE 6: Key teeth draw (60-70%)
      const tooth1Length = keyTooth1Ref.current?.getTotalLength() || 8;
      const tooth2Length = keyTooth2Ref.current?.getTotalLength() || 8;
      const tooth3Length = keyTooth3Ref.current?.getTotalLength() || 12;

      gsap.fromTo(
        keyTooth1Ref.current,
        { 
          strokeDasharray: tooth1Length,
          strokeDashoffset: tooth1Length,
          opacity: 0,
        },
        {
          strokeDashoffset: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 25%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        keyTooth2Ref.current,
        { 
          strokeDasharray: tooth2Length,
          strokeDashoffset: tooth2Length,
          opacity: 0,
        },
        {
          strokeDashoffset: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 22%",
            end: "top 17%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        keyTooth3Ref.current,
        { 
          strokeDasharray: tooth3Length,
          strokeDashoffset: tooth3Length,
          opacity: 0,
        },
        {
          strokeDashoffset: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 19%",
            end: "top 14%",
            scrub: 1,
          },
        }
      );

      // ZONE 7: Noise fades out, key remains (70%+)
      gsap.to(noiseGroupRef.current, {
        opacity: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 14%",
          end: "top 5%",
          scrub: 1,
        },
      });

      // Hint text appears at the end
      gsap.fromTo(
        hintRef.current,
        { opacity: 0 },
        {
          opacity: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 10%",
            end: "top 5%",
            scrub: 1,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col items-center text-center space-y-16 min-h-[200vh]">
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

      <div className="mt-24 w-full max-w-md text-foreground sticky top-1/3">
        <svg
          viewBox="0 0 400 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-full h-auto"
        >
          {/* Noise layer - complex overlapping shapes */}
          <g ref={noiseGroupRef}>
            {/* Random lines creating visual noise */}
            <line x1="50" y1="60" x2="350" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="80" y1="100" x2="320" y2="90" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <line x1="100" y1="70" x2="300" y2="130" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <line x1="60" y1="120" x2="340" y2="110" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="120" y1="85" x2="280" y2="115" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <line x1="90" y1="140" x2="310" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="70" y1="95" x2="330" y2="125" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="110" y1="110" x2="290" y2="95" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
            
            {/* Scattered circles */}
            <circle cx="150" cy="90" r="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <circle cx="250" cy="110" r="12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="200" cy="130" r="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            
            {/* Diagonal crosses */}
            <path d="M 180 75 L 220 115 M 220 75 L 180 115" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </g>

          {/* Key layer - builds progressively */}
          <g>
            {/* Key head - outer circle */}
            <circle
              ref={keyHeadOuterRef}
              cx="120"
              cy="100"
              r="25"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            />
            
            {/* Key head - inner circle */}
            <circle
              ref={keyHeadInnerRef}
              cx="120"
              cy="100"
              r="15"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />

            {/* Key shaft */}
            <line
              ref={keyShaftRef}
              x1="145"
              y1="100"
              x2="300"
              y2="100"
              stroke="currentColor"
              strokeWidth="2.5"
            />

            {/* Key teeth */}
            <line 
              ref={keyTooth1Ref}
              x1="260" 
              y1="92" 
              x2="260" 
              y2="100" 
              stroke="currentColor" 
              strokeWidth="2.5" 
            />
            <line 
              ref={keyTooth2Ref}
              x1="275" 
              y1="92" 
              x2="275" 
              y2="100" 
              stroke="currentColor" 
              strokeWidth="2.5" 
            />
            <line 
              ref={keyTooth3Ref}
              x1="290" 
              y1="88" 
              x2="290" 
              y2="100" 
              stroke="currentColor" 
              strokeWidth="2.5" 
            />
          </g>
        </svg>
      </div>

      <p ref={hintRef} className="text-small opacity-0 mt-8">
        Clarity emerges.
      </p>
    </div>
  );
}
