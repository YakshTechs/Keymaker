"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LockSvg } from "@/components/LockSvg";
import { KeySvg } from "@/components/KeySvg";
import { prefersReducedMotion, ease, duration } from "@/lib/gsap";
import { ResistantDrag } from "@/lib/interactions";

/**
 * ACT IV: THE TURN
 * 
 * Narrative intent: Inevitability, connection, resolution
 * 
 * Interaction: TURN → DRAG → UNLOCK
 * 1. Key aligns with lock via scroll
 * 2. User clicks to turn the key 90°
 * 3. User drags turned key into lock (with resistance)
 * 4. Key snaps to lock
 * 5. Lock opens
 * 
 * Teaching: Control, not force. Patience, not speed.
 */

export function Act4Turn() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLParagraphElement>(null);
  const dragPromptRef = useRef<HTMLParagraphElement>(null);
  const dragHandlerRef = useRef<ResistantDrag | null>(null);
  
  const [aligned, setAligned] = useState(false);
  const [turned, setTurned] = useState(false);
  const [inserted, setInserted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "center 30%",
          scrub: 1,
          onUpdate: (self) => {
            // When scroll reaches 80%, key is aligned
            if (self.progress > 0.8 && !aligned) {
              setAligned(true);
            }
          },
        },
      });

      // Headline only
      tl.from(headlineRef.current, {
        opacity: 0,
        duration: duration.fast,
        ease: ease.emerge,
      }, 0);

      // Lock and key appear together
      tl.from([lockRef.current, keyRef.current], {
        opacity: 0,
        scale: 0.98,
        duration: duration.medium,
        ease: ease.calm,
      }, 0.15);

      // Key moves toward lock slightly
      tl.to(keyRef.current, {
        x: -20,
        duration: duration.medium,
        ease: ease.calm,
      }, 0.4);

    }, sectionRef);

    return () => ctx.revert();
  }, [aligned]);

  // INTERACTION 1: Click to turn
  const handleTurn = () => {
    if (!aligned || turned || !keyRef.current) return;

    setTurned(true);

    // Hide turn prompt
    if (promptRef.current) {
      gsap.to(promptRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: ease.emerge,
      });
    }

    // Turn the key 180 degrees
    gsap.to(keyRef.current, {
      rotation: 180,
      duration: 1.2,
      ease: ease.resolve,
      onComplete: () => {
        // Show drag prompt after turn completes
        if (dragPromptRef.current) {
          gsap.to(dragPromptRef.current, {
            opacity: 0.5,
            duration: 0.8,
            ease: ease.emerge,
          });
        }
      },
    });
  };

  // INTERACTION 2: Drag to lock
  useEffect(() => {
    if (!turned || inserted || !keyRef.current || !lockRef.current) return;

    dragHandlerRef.current = new ResistantDrag(
      keyRef.current,
      lockRef.current,
      () => {
        // Success: key fully inserted into lock
        setInserted(true);

        // Hide drag prompt
        if (dragPromptRef.current) {
          gsap.to(dragPromptRef.current, {
            opacity: 0,
            duration: 0.3,
          });
        }

        // Wait for slide-in animation to complete, then unlock
        setTimeout(() => {
          setUnlocked(true);

          // Lock opens - shackle fades and moves
          const shackle = lockRef.current?.querySelector("path");
          if (shackle) {
            gsap.to(shackle, {
              opacity: 0.1,
              y: -10,
              duration: 1.2,
              ease: ease.resolve,
            });
          }

          // Lock body subtle scale
          gsap.to(lockRef.current, {
            scale: 1.02,
            duration: 0.8,
            ease: ease.resolve,
            yoyo: true,
            repeat: 1,
          });

          // Key fades slightly
          gsap.to(keyRef.current, {
            opacity: 0.6,
            duration: 0.8,
            ease: ease.resolve,
          });

        }, 800); // Wait for magnetic snap + slide-in

      },
      () => {
        // Fail: moving too fast
        // Visual feedback - subtle shake
        gsap.to(keyRef.current, {
          x: "+=5",
          duration: 0.05,
          yoyo: true,
          repeat: 3,
          ease: "power1.inOut",
        });
      }
    );

    return () => {
      dragHandlerRef.current?.destroy();
    };
  }, [turned, inserted]);

  return (
    <div ref={sectionRef} className="flex flex-col items-center text-center space-y-20">
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
          style={{ 
            willChange: "transform",
            cursor: turned && !inserted ? "grab" : (aligned && !turned ? "pointer" : "default"),
            touchAction: turned && !inserted ? "none" : "auto",
          }}
          onClick={!turned ? handleTurn : undefined}
          role="button"
          tabIndex={aligned && !turned ? 0 : -1}
          aria-label={turned ? "Drag key to lock" : "Turn the key"}
          onKeyDown={(e) => {
            if (!turned && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              handleTurn();
            }
          }}
        >
          <KeySvg variant="complete" />
        </div>
      </div>

      {/* Turn prompt */}
      {aligned && !turned && (
        <p 
          ref={promptRef}
          className="text-small mt-8 opacity-50"
          style={{ 
            animation: "fadeIn 0.8s ease-out",
          }}
        >
          Turn the key.
        </p>
      )}

      {/* Drag prompt */}
      {turned && !inserted && (
        <p 
          ref={dragPromptRef}
          className="text-small mt-8 opacity-0"
        >
          Drag it to the lock. Slowly.
        </p>
      )}

      {/* Unlocked state */}
      {unlocked && (
        <p 
          className="text-small mt-8 opacity-50"
          style={{ 
            animation: "fadeIn 1.2s ease-out",
          }}
        >
          Open.
        </p>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
