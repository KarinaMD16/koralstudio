"use client";

import { useSyncExternalStore } from "react";
import VariableProximity from "@/components/reactbits/VariableProximity";

type Props = {
  text: string;
  /** Peso de la fuente en reposo (Bricolage: 200–800). */
  rest?: number;
  /** Peso cuando el cursor está encima. */
  near?: number;
  /** Distancia en px a la que empieza a reaccionar. */
  radius?: number;
  /** Suavizado (0 = inmediato). El de React Bits usa 0.2. */
  smoothing?: number;
  className?: string;
};

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Envoltorio de Variable Proximity (React Bits) con los valores de Koral:
 * cambia el eje de peso de Bricolage y conserva su ancho condensado.
 */
export function ProximityText({ text, rest = 800, near = 250, radius = 260, smoothing = 0.2, className = "" }: Props) {
  const reduced = useSyncExternalStore(subscribe, getReduced, () => false);
  const from = `'wght' ${rest}, 'wdth' 78`;

  if (reduced) {
    return (
      <span className={className} style={{ fontVariationSettings: from }}>
        {text}
      </span>
    );
  }

  return (
    <VariableProximity
      label={text}
      fromFontVariationSettings={from}
      toFontVariationSettings={`'wght' ${near}, 'wdth' 78`}
      radius={radius}
      falloff="gaussian"
      smoothing={smoothing}
      className={className}
      style={{ fontFamily: "inherit" }}
    />
  );
}
