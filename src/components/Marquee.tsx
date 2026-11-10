"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";

const items: { text: string; light?: boolean }[] = [
  { text: "CashTrack" },
  { text: "Lyric Island" },
  { text: "Sin anuncios raros", light: true },
  { text: "Lectura y escritura" },
  { text: "Privacidad primero", light: true },
];

/** Cinta que avanza sola y acelera (o cambia de sentido) con la velocidad del scroll. */
export function Marquee({ baseVelocity = -2.2 }: { baseVelocity?: number }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const row = (hidden: boolean) => (
    <span aria-hidden={hidden || undefined} className="flex items-center gap-10 pr-10">
      {items.map((i) => (
        <span key={i.text} className="flex items-center gap-10">
          <span className={i.light ? "font-light" : ""}>{i.text}</span>
          <span className="text-coral">✺</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="overflow-hidden border-y border-[#DAD8D4] bg-white py-[22px]">
      <motion.div
        style={{ x }}
        className="display flex w-max whitespace-nowrap text-[clamp(22px,3vw,34px)] font-bold tracking-[-0.01em]"
      >
        {row(false)}
        {row(true)}
      </motion.div>
    </div>
  );
}
