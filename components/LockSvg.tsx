/**
 * Lock SVG Component
 * 
 * Simple line-art lock illustration.
 * Inline SVG for editability and future animation control.
 * 
 * Variants:
 * - incomplete: Open shackle, suggests incompleteness
 * - complete: Closed lock, suggests security/closure
 */

interface LockSvgProps {
  variant?: "incomplete" | "complete";
  className?: string;
}

export function LockSvg({ variant = "incomplete", className = "" }: LockSvgProps) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Lock body */}
      <rect
        x="50"
        y="120"
        width="100"
        height="120"
        rx="8"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Keyhole */}
      <circle
        cx="100"
        cy="165"
        r="12"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="96"
        y="165"
        width="8"
        height="30"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />

      {/* Shackle - incomplete variant has open top */}
      {variant === "incomplete" ? (
        <>
          <path
            d="M 70 120 L 70 80 Q 70 40, 100 40 Q 130 40, 130 80 L 130 100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      ) : (
        <path
          d="M 70 120 L 70 80 Q 70 40, 100 40 Q 130 40, 130 80 L 130 120"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      )}
    </svg>
  );
}
