/**
 * Key SVG Component
 * 
 * Simple line-art key illustration.
 * Inline SVG for editability and future morph animations.
 * 
 * Variants:
 * - line: Minimal single line (for discovery section)
 * - complete: Full key form (for turn section)
 * - resting: Small icon version (for final section)
 */

interface KeySvgProps {
  variant?: "line" | "complete" | "resting";
  className?: string;
}

export function KeySvg({ variant = "complete", className = "" }: KeySvgProps) {
  if (variant === "line") {
    return (
      <svg
        viewBox="0 0 200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <line
          x1="20"
          y1="20"
          x2="180"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === "resting") {
    return (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Small key icon */}
        <circle
          cx="25"
          cy="40"
          r="15"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="25"
          cy="40"
          r="8"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="40"
          y1="40"
          x2="65"
          y2="40"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line x1="55" y1="35" x2="55" y2="40" stroke="currentColor" strokeWidth="2" />
        <line x1="60" y1="35" x2="60" y2="40" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  // Complete key
  return (
    <svg
      viewBox="0 0 280 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Key head - circular bow */}
      <circle
        cx="60"
        cy="60"
        r="35"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="60"
        cy="60"
        r="20"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />

      {/* Key shaft */}
      <line
        x1="95"
        y1="60"
        x2="240"
        y2="60"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Key teeth */}
      <line x1="200" y1="50" x2="200" y2="60" stroke="currentColor" strokeWidth="2" />
      <line x1="215" y1="50" x2="215" y2="60" stroke="currentColor" strokeWidth="2" />
      <line x1="230" y1="45" x2="230" y2="60" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
