"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Scroll suave global con Lenis. Se desactiva si la persona pidió reducir movimiento.
 * Los enlaces #ancla se resuelven con lenis.scrollTo para que también sean suaves.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
