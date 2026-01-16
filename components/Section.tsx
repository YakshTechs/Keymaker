import React from "react";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Section Component
 * 
 * Structural wrapper for each story act.
 * - Provides unique ID for future GSAP timeline targeting
 * - Full viewport height with vertical centering
 * - Semantic section element for accessibility
 * - Ready for scroll-triggered animations (Phase 2)
 */
export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`story-section ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="story-content">
        {children}
      </div>
    </section>
  );
}
