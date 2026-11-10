"use client";

import { useEffect, useMemo, useRef } from "react";
import { canUseFancyCursor, pointer, subscribePointer } from "./pointer";

type Props = {
  text: string;
  /** Peso de la fuente en reposo (Bricolage: 200–800). */
  rest?: number;
  /** Peso cuando el cursor está encima. */
  near?: number;
  /** Distancia en px a la que empieza a reaccionar. */
  radius?: number;
  className?: string;
};

/**
 * Texto cuyas letras cambian de grosor según la cercanía del cursor
 * (como Variable Proximity de React Bits / Extrafazant).
 *
 * Rendimiento: las posiciones de las letras se miden una sola vez (y al cambiar
 * de tamaño), relativas al contenedor. En cada movimiento del mouse solo se lee
 * el rect del contenedor y se escriben los pesos: sin mediciones por letra ni
 * interpolación que haga que el efecto "llegue tarde".
 */
export function ProximityText({ text, rest = 800, near = 250, radius = 300, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const root = ref.current;
    if (!root || !canUseFancyCursor()) return;

    const chars = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-ch]"));
    const applied = new Float32Array(chars.length).fill(rest);
    let centers: { x: number; y: number }[] = [];
    let frame = 0;
    let atRest = true;

    const measure = () => {
      chars.forEach((c, i) => {
        c.style.fontWeight = String(rest);
        applied[i] = rest;
      });
      atRest = true;
      const base = root.getBoundingClientRect();
      centers = chars.map((c) => {
        const r = c.getBoundingClientRect();
        return { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2 };
      });
    };

    const tick = () => {
      frame = 0;
      const box = root.getBoundingClientRect();
      const far =
        !pointer.inside ||
        pointer.x < box.left - radius ||
        pointer.x > box.right + radius ||
        pointer.y < box.top - radius ||
        pointer.y > box.bottom + radius;

      if (far) {
        if (atRest) return;
        for (let i = 0; i < chars.length; i++) {
          if (applied[i] !== rest) {
            applied[i] = rest;
            chars[i].style.fontWeight = String(rest);
          }
        }
        atRest = true;
        return;
      }

      atRest = false;
      const px = pointer.x - box.left;
      const py = pointer.y - box.top;
      for (let i = 0; i < chars.length; i++) {
        const c = centers[i];
        const d = Math.hypot(px - c.x, py - c.y);
        let w = rest;
        if (d < radius) {
          const t = 1 - d / radius;
          w = rest + (near - rest) * t * t * (3 - 2 * t); // smoothstep
        }
        w = Math.round(w);
        if (w !== applied[i]) {
          applied[i] = w;
          chars[i].style.fontWeight = String(w);
        }
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    measure();
    document.fonts?.ready.then(measure);
    // Ojo: no usar ResizeObserver sobre el texto, porque el propio cambio de peso lo redimensiona.
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measure, 120);
    };
    window.addEventListener("resize", onResize);
    const unsubscribe = subscribePointer(schedule);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(frame);
    };
  }, [rest, near, radius]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((ch, ci) => (
                <span key={ci} data-ch="" style={{ fontWeight: rest }}>
                  {ch}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  );
}
