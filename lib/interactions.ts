/**
 * Interaction Utilities
 * 
 * Elite-level behavioral interactions.
 * No UI. No instructions. Pure subconscious learning.
 */

import { gsap } from "gsap";

/**
 * Scroll Velocity Tracker
 * Measures how fast the user is scrolling
 */
export class ScrollVelocity {
  private lastScrollY = 0;
  private lastTime = Date.now();
  private velocity = 0;
  private rafId: number | null = null;

  constructor(private callback: (velocity: number) => void) {
    this.track();
  }

  private track = () => {
    const now = Date.now();
    const currentScrollY = window.scrollY;
    const deltaTime = now - this.lastTime;
    const deltaScroll = Math.abs(currentScrollY - this.lastScrollY);

    // Velocity in pixels per millisecond
    this.velocity = deltaTime > 0 ? deltaScroll / deltaTime : 0;

    this.callback(this.velocity);

    this.lastScrollY = currentScrollY;
    this.lastTime = now;

    this.rafId = requestAnimationFrame(this.track);
  };

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}

/**
 * Stillness Detector
 * Detects when user stops scrolling
 */
export class StillnessDetector {
  private timeout: NodeJS.Timeout | null = null;
  private isStill = false;

  constructor(
    private delay: number,
    private onStill: () => void,
    private onMove: () => void
  ) {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  private handleScroll = () => {
    if (this.isStill) {
      this.isStill = false;
      this.onMove();
    }

    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.isStill = true;
      this.onStill();
    }, this.delay);
  };

  destroy() {
    window.removeEventListener("scroll", this.handleScroll);
    if (this.timeout) clearTimeout(this.timeout);
  }
}

/**
 * Mouse Stillness Detector
 * Detects when mouse stops moving
 */
export class MouseStillness {
  private timeout: NodeJS.Timeout | null = null;
  private isStill = false;

  constructor(
    private delay: number,
    private onStill: () => void,
    private onMove: () => void
  ) {
    window.addEventListener("mousemove", this.handleMove, { passive: true });
  }

  private handleMove = () => {
    if (this.isStill) {
      this.isStill = false;
      this.onMove();
    }

    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.isStill = true;
      this.onStill();
    }, this.delay);
  };

  destroy() {
    window.removeEventListener("mousemove", this.handleMove);
    if (this.timeout) clearTimeout(this.timeout);
  }
}

/**
 * Drag with Resistance
 * Allows controlled dragging with velocity limits and magnetic snap-to-keyhole
 */
export class ResistantDrag {
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;
  private lastMoveTime = Date.now();
  private velocityThreshold = 2; // Max pixels per frame
  private snapDistance = 80; // Distance to trigger magnetic snap
  private isSnapped = false;

  constructor(
    private element: HTMLElement,
    private targetElement: HTMLElement,
    private onSuccess: () => void,
    private onFail: () => void
  ) {
    element.style.cursor = "grab";
    element.addEventListener("mousedown", this.handleStart);
    element.addEventListener("touchstart", this.handleStart, { passive: false });
  }

  private handleStart = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    this.isDragging = true;
    this.isSnapped = false;
    
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    
    this.startX = clientX;
    this.startY = clientY;
    this.currentX = clientX;
    this.currentY = clientY;
    this.lastMoveTime = Date.now();

    this.element.style.cursor = "grabbing";

    document.addEventListener("mousemove", this.handleMove);
    document.addEventListener("touchmove", this.handleMove, { passive: false });
    document.addEventListener("mouseup", this.handleEnd);
    document.addEventListener("touchend", this.handleEnd);
  };

  private handleMove = (e: MouseEvent | TouchEvent) => {
    if (!this.isDragging) return;
    e.preventDefault();

    // If already snapped, don't allow further movement
    if (this.isSnapped) return;

    const now = Date.now();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - this.currentX;
    const deltaY = clientY - this.currentY;
    const deltaTime = now - this.lastMoveTime;
    
    // Calculate velocity
    const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / (deltaTime || 1);

    // If moving too fast, add resistance
    if (velocity > this.velocityThreshold) {
      this.onFail();
      return;
    }

    this.currentX = clientX;
    this.currentY = clientY;
    this.lastMoveTime = now;

    // Update element position
    const totalDeltaX = this.currentX - this.startX;
    const totalDeltaY = this.currentY - this.startY;
    
    // Get current rotation and preserve it
    const currentRotation = gsap.getProperty(this.element, "rotation") as number;
    
    gsap.set(this.element, { 
      x: totalDeltaX,
      y: totalDeltaY,
      rotation: currentRotation,
    });

    // Check if near target for magnetic snap
    this.checkProximity();
  };

  private checkProximity() {
    const keyRect = this.element.getBoundingClientRect();
    const lockRect = this.targetElement.getBoundingClientRect();

    // Calculate distance between centers
    const keyCenterX = keyRect.left + keyRect.width / 2;
    const keyCenterY = keyRect.top + keyRect.height / 2;
    const lockCenterX = lockRect.left + lockRect.width / 2;
    const lockCenterY = lockRect.top + lockRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(keyCenterX - lockCenterX, 2) + 
      Math.pow(keyCenterY - lockCenterY, 2)
    );

    // Visual feedback when getting close
    if (distance < this.snapDistance * 1.5) {
      const scale = 1 + (this.snapDistance * 1.5 - distance) / (this.snapDistance * 3);
      gsap.to(this.targetElement, {
        scale: Math.min(scale, 1.05),
        duration: 0.2,
      });
    } else {
      gsap.to(this.targetElement, {
        scale: 1,
        duration: 0.2,
      });
    }

    // Magnetic snap when close enough
    if (distance < this.snapDistance && !this.isSnapped) {
      this.isSnapped = true;
      this.magneticSnap();
    }
  }

  private magneticSnap() {
    const keyRect = this.element.getBoundingClientRect();
    const lockRect = this.targetElement.getBoundingClientRect();

    // Calculate position to align key with lock keyhole
    const targetX = lockRect.left - keyRect.left + (lockRect.width - keyRect.width) / 2;
    const targetY = lockRect.top - keyRect.top + (lockRect.height - keyRect.height) / 2;

    const currentRotation = gsap.getProperty(this.element, "rotation") as number;

    // Snap to keyhole position
    gsap.to(this.element, {
      x: targetX,
      y: targetY,
      rotation: currentRotation,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        // Slowly slide into the lock
        this.slideIntoLock(currentRotation);
      }
    });

    // Lock scales back to normal
    gsap.to(this.targetElement, {
      scale: 1,
      duration: 0.3,
    });
  }

  private slideIntoLock(rotation: number) {
    // Slowly move key deeper into lock (scale down slightly to show depth)
    gsap.to(this.element, {
      scale: 0.95,
      duration: 0.8,
      ease: "power1.inOut",
      onComplete: () => {
        // Trigger success after sliding in
        this.onSuccess();
      }
    });
  }

  private handleEnd = () => {
    if (!this.isDragging) return;

    // If not snapped, return to original position
    if (!this.isSnapped) {
      const keyRect = this.element.getBoundingClientRect();
      const lockRect = this.targetElement.getBoundingClientRect();

      const keyCenterX = keyRect.left + keyRect.width / 2;
      const keyCenterY = keyRect.top + keyRect.height / 2;
      const lockCenterX = lockRect.left + lockRect.width / 2;
      const lockCenterY = lockRect.top + lockRect.height / 2;

      const distance = Math.sqrt(
        Math.pow(keyCenterX - lockCenterX, 2) + 
        Math.pow(keyCenterY - lockCenterY, 2)
      );

      // If close but not snapped, snap now
      if (distance < this.snapDistance) {
        this.isSnapped = true;
        this.magneticSnap();
      } else {
        // Return to original position
        const currentRotation = gsap.getProperty(this.element, "rotation") as number;
        gsap.to(this.element, {
          x: 0,
          y: 0,
          rotation: currentRotation,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }

    this.reset();
  };

  private reset() {
    this.isDragging = false;
    this.element.style.cursor = "grab";
    document.removeEventListener("mousemove", this.handleMove);
    document.removeEventListener("touchmove", this.handleMove);
    document.removeEventListener("mouseup", this.handleEnd);
    document.removeEventListener("touchend", this.handleEnd);
  }

  destroy() {
    this.reset();
    this.element.removeEventListener("mousedown", this.handleStart);
    this.element.removeEventListener("touchstart", this.handleStart);
  }
}

/**
 * Memory Lock
 * Tracks if user has completed the journey
 */
export class MemoryLock {
  private static STORAGE_KEY = "keymaker_unlocked";

  static isUnlocked(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(this.STORAGE_KEY) === "true";
  }

  static unlock() {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.STORAGE_KEY, "true");
  }

  static reset() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
