/**
 * GSAP Configuration & Utilities
 * 
 * Centralized GSAP setup for scroll-driven narrative.
 * Respects user motion preferences.
 * Provides consistent easing and timing.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Editorial Easing
 * Reduced from power2/power3 to power1 - less exaggeration
 * Linear for draws - no personality, just reveal
 */
export const ease = {
  // Calm, minimal curve
  calm: "power1.inOut",
  // Emergence: barely eased
  emerge: "power1.out",
  // Resolve: slightly more weight, still restrained
  resolve: "power1.out",
  // Draw: pure linear reveal
  draw: "none",
};

/**
 * Timing Constants
 * Slowed further - heavy at start, lighter by end
 */
export const duration = {
  slow: 1.8,      // Reduced from 2
  medium: 1.2,    // Reduced from 1.5
  fast: 0.8,      // Reduced from 1
  draw: 2,        // Reduced from 2.5
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Initialize GSAP with accessibility and performance defaults
 */
export const initGSAP = () => {
  if (typeof window === "undefined") return;

  // Respect reduced motion globally
  if (prefersReducedMotion()) {
    gsap.globalTimeline.clear();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    return;
  }

  // Performance: Force GPU acceleration on animated elements
  gsap.set("body", { force3D: true });

  // Refresh ScrollTrigger on resize with debounce
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    limitCallbacks: true,  // Performance: limit callback frequency
    ignoreMobileResize: true, // Prevent issues on mobile address bar hide/show
  });

  // Normalize scroll behavior
  ScrollTrigger.normalizeScroll(false);

  // Smooth scroll refresh after fonts load
  if (document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
};

/**
 * Cleanup utility for component unmount
 */
export const cleanupGSAP = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.globalTimeline.clear();
};
