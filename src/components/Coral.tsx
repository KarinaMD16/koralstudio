"use client";

import { motion, useReducedMotion } from "motion/react";

const branches = [
  "M200 500 C200 430 196 380 200 320 C205 262 190 222 160 182 C140 152 140 112 150 72",
  "M200 332 C230 292 260 272 270 222 C278 182 300 152 322 122",
  "M165 192 C130 180 102 150 92 102",
  "M268 232 C300 232 330 216 350 190",
  "M196 402 C160 382 122 362 104 304 C94 274 72 254 50 248",
  "M150 92 C136 72 132 52 136 26",
];
const tips: [number, number][] = [
  [136, 26],
  [322, 122],
  [92, 102],
  [350, 190],
  [50, 248],
];

/**
 * Rama de coral que "crece" (se dibuja) al entrar en pantalla y luego se mece.
 * `branchCount` permite versiones más simples.
 */
export function Coral({
  color = "#DD5D4F",
  polypColor = "#14152B",
  strokeWidth = 26,
  branchCount = 6,
  mirrored = false,
  delay = 0,
  className = "",
}: {
  color?: string;
  polypColor?: string;
  strokeWidth?: number;
  branchCount?: number;
  mirrored?: boolean;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const paths = branches.slice(0, branchCount);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 500"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={`overflow-visible ${mirrored ? "-scale-x-100" : ""} ${className}`}
    >
      <g className="sway" style={{ animationDelay: mirrored ? "-3s" : "0s" }}>
        {paths.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.8, delay: delay + i * 0.22, ease: [0.3, 0.7, 0.2, 1] }}
          />
        ))}
        {tips.slice(0, Math.max(3, branchCount - 1)).map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            className="polyp"
            cx={cx}
            cy={cy}
            r={9}
            fill={polypColor}
            stroke="none"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 1.4 + i * 0.12 }}
          />
        ))}
      </g>
    </svg>
  );
}

/** Forma orgánica que cambia lentamente (CSS). */
export function Blob({ color, className = "", style }: { color: string; className?: string; style?: React.CSSProperties }) {
  return <div aria-hidden="true" className={`morph ${className}`} style={{ background: color, ...style }} />;
}
