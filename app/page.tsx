"use client";

import { useEffect } from "react";
import { Section } from "@/components/Section";
import { Act1Lock } from "@/components/animations/Act1Lock";
import { Act2Complexity } from "@/components/animations/Act2Complexity";
import { Act3Discovery } from "@/components/animations/Act3Discovery";
import { Act4Turn } from "@/components/animations/Act4Turn";
import { Act5Open } from "@/components/animations/Act5Open";
import { initGSAP, cleanupGSAP } from "@/lib/gsap";

/**
 * The Keymaker - Main Story Page
 * 
 * Five-act narrative structure delivered through scroll.
 * Each section is a complete visual and narrative beat.
 * 
 * Phase 1: Static foundation with editorial design ✓
 * Phase 2: GSAP scroll-triggered animations ✓
 * 
 * Design principles:
 * - Massive whitespace
 * - Editorial typography
 * - Calm, confident pacing
 * - Museum-quality presentation
 * - Motion that serves meaning
 */

export default function Home() {
  useEffect(() => {
    initGSAP();
    return () => cleanupGSAP();
  }, []);

  return (
    <main className="relative">
      
      {/* ACT I: THE LOCK */}
      {/* Hook - Establish the problem space */}
      <Section id="act-1-lock">
        <Act1Lock />
      </Section>

      {/* ACT II: COMPLEXITY */}
      {/* Pressure - Build tension through layered understanding */}
      <Section id="act-2-complexity">
        <Act2Complexity />
      </Section>

      {/* ACT III: DISCOVERY */}
      {/* Focus - The turning point, reduction not addition */}
      <Section id="act-3-discovery">
        <Act3Discovery />
      </Section>

      {/* ACT IV: THE TURN */}
      {/* Climax - The moment of connection */}
      <Section id="act-4-turn">
        <Act4Turn />
      </Section>

      {/* ACT V: OPEN SYSTEM */}
      {/* Resolution - Calm confidence, the system is understood */}
      <Section id="act-5-open">
        <Act5Open />
      </Section>

      {/* Footer - Minimal signature */}
      <footer className="py-12 text-center">
        <p className="text-small">The Keymaker</p>
      </footer>
    </main>
  );
}
