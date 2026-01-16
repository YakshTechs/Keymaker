"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * ACT III: DISCOVERY
 * 
 * Key originates (draws) progressively on top of noise pattern
 */

export function Act3Discovery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const noiseGroupRef = useRef<SVGGElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  
  // Key refs
  const keyHeadOuterRef = useRef<SVGCircleElement>(null);
  const keyHeadInnerRef = useRef<SVGCircleElement>(null);
  const keyShaftRef = useRef<SVGLineElement>(null);
  const keyTooth1Ref = useRef<SVGLineElement>(null);
  const keyTooth2Ref = useRef<SVGLineElement>(null);
  const keyTooth3Ref = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      
      // Headline
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

      // Subline
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

      // Noise appears
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

      // KEY ORIGINATES - draws stroke by stroke
      // Outer circle
      const outerLength = keyHeadOuterRef.current?.getTotalLength() || 220;
      gsap.fromTo(
        keyHeadOuterRef.current,
        { strokeDasharray: outerLength, strokeDashoffset: outerLength },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            end: "top 30%",
            scrub: 2,
          },
        }
      );

      // Inner circle
      const innerLength = keyHeadInnerRef.current?.getTotalLength() || 126;
      gsap.fromTo(
        keyHeadInnerRef.current,
        { strokeDasharray: innerLength, strokeDashoffset: innerLength },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            end: "top 22%",
            scrub: 2,
          },
        }
      );

      // Shaft
      const shaftLength = keyShaftRef.current?.getTotalLength() || 145;
      gsap.fromTo(
        keyShaftRef.current,
        { strokeDasharray: shaftLength, strokeDashoffset: shaftLength },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 22%",
            end: "top 12%",
            scrub: 2,
          },
        }
      );

      // Teeth - one by one
      const tooth1Length = keyTooth1Ref.current?.getTotalLength() || 10;
      gsap.fromTo(
        keyTooth1Ref.current,
        { strokeDasharray: tooth1Length, strokeDashoffset: tooth1Length },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 12%",
            end: "top 9%",
            scrub: 2,
          },
        }
      );

      const tooth2Length = keyTooth2Ref.current?.getTotalLength() || 10;
      gsap.fromTo(
        keyTooth2Ref.current,
        { strokeDasharray: tooth2Length, strokeDashoffset: tooth2Length },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 9%",
            end: "top 6%",
            scrub: 2,
          },
        }
      );

      const tooth3Length = keyTooth3Ref.current?.getTotalLength() || 15;
      gsap.fromTo(
        keyTooth3Ref.current,
        { strokeDasharray: tooth3Length, strokeDashoffset: tooth3Length },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 6%",
            end: "top 3%",
            scrub: 2,
          },
        }
      );

      // Noise fades as key completes
      gsap.to(noiseGroupRef.current, {
        opacity: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%",
          end: "top 0%",
          scrub: 1,
        },
      });

      // Hint text
      gsap.fromTo(
        hintRef.current,
        { opacity: 0 },
        {
          opacity: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 3%",
            end: "top 0%",
            scrub: 1,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative flex flex-col items-center text-center space-y-16 min-h-[200vh]">
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

      {/* Combined SVG - Noise pattern + Key */}
      <div className="mt-24 w-full max-w-2xl text-foreground">
        <svg
          viewBox="0 0 600 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-full h-auto"
        >
          {/* Noise layer - behind key */}
          <g ref={noiseGroupRef}>
            <line x1="50" y1="60" x2="550" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="80" y1="120" x2="520" y2="110" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <line x1="100" y1="90" x2="500" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <line x1="60" y1="160" x2="540" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="120" y1="100" x2="480" y2="140" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <line x1="90" y1="200" x2="510" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="70" y1="130" x2="530" y2="170" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="110" y1="150" x2="490" y2="130" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
            <line x1="140" y1="70" x2="460" y2="220" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="150" y1="190" x2="450" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            
            <circle cx="200" cy="120" r="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <circle cx="400" cy="160" r="12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="300" cy="200" r="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <circle cx="350" cy="100" r="10" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            
            <path d="M 250 100 L 290 140 M 290 100 L 250 140" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <path d="M 380 180 L 420 220 M 420 180 L 380 220" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </g>

          {/* Key - originates on top of noise */}
          <g transform="translate(160, 90)">
            {/* Key head - outer circle */}
            <circle
              ref={keyHeadOuterRef}
              cx="60"
              cy="60"
              r="35"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            />
            
            {/* Key head - inner circle */}
            <circle
              ref={keyHeadInnerRef}
              cx="60"
              cy="60"
              r="20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />

            {/* Key shaft */}
            <line
              ref={keyShaftRef}
              x1="95"
              y1="60"
              x2="240"
              y2="60"
              stroke="currentColor"
              strokeWidth="2.5"
            />

            {/* Key teeth */}
            <line 
              ref={keyTooth1Ref}
              x1="200" 
              y1="50" 
              x2="200" 
              y2="60" 
              stroke="currentColor" 
              strokeWidth="2.5" 
            />
            <line 
              ref={keyTooth2Ref}
              x1="215" 
              y1="50" 
              x2="215" 
              y2="60" 
              stroke="currentColor" 
              strokeWidth="2.5" 
            />
            <line 
              ref={keyTooth3Ref}
              x1="230" 
              y1="45" 
              x2="230" 
              y2="60" 
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
