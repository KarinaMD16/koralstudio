"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { canUseFancyCursor } from "./pointer";

const noopSubscribe = () => () => {};

/**
 * Etiqueta que sigue al mouse al pasar sobre cualquier elemento con
 * `data-cursor-marquee="Tu texto"` (el nombre se mantiene por compatibilidad).
 */
export function CursorMarquee() {
  const enabled = useSyncExternalStore(noopSubscribe, canUseFancyCursor, () => false);
  const [text, setText] = useState("");
  const [active, setActive] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 900, damping: 50, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 900, damping: 50, mass: 0.3 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as Element | null)?.closest?.("[data-cursor-marquee]");
      const label = el?.getAttribute("data-cursor-marquee");
      if (label) setText(label);
      setActive(Boolean(label));
    };
    const onLeave = () => setActive(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden="true" style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[100]">
      <motion.div
        initial={false}
        style={{ clipPath: "none" }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6, x: active ? 22 : 12, y: active ? 18 : 10 }}
        transition={{ type: "spring", stiffness: 500, damping: 32, mass: 0.6 }}
        className="flex origin-top-left items-center gap-3 whitespace-nowrap rounded-full bg-ink py-2 pl-5 pr-2 text-white shadow-[0_16px_34px_-14px_rgba(20,21,43,0.55)]"
      >
        <span className="text-[15px] font-semibold tracking-[-0.005em]">{text}</span>
        <span className="grid size-8 place-items-center rounded-full bg-coral text-ink">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </span>
      </motion.div>
    </motion.div>
  );
}
