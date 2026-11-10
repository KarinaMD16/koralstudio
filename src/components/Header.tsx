"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

const links = [
  { href: "#apps", label: "Apps" },
  { href: "#estudio", label: "Estudio" },
  { href: "#principios", label: "Principios" },
];

/** Barra superior: se esconde al bajar y vuelve al subir. */
export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-30 px-4 py-4 sm:px-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a href="#inicio" aria-label="Koral Studio, inicio" className="flex items-center">
          <Image
            src="/logo/koral-studio-horizontal-color.svg"
            alt="Koral Studio"
            width={90}
            height={42}
            priority
            className="h-[42px] w-auto"
          />
        </a>
        <nav
          aria-label="Principal"
          className="order-3 flex w-full justify-center gap-0.5 rounded-full bg-white p-[5px] text-sm font-semibold shadow-[0_6px_24px_-12px_rgba(20,21,43,0.25)] md:order-none md:w-auto"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-2.5 transition-colors hover:bg-mist">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contacto"
          className="inline-flex items-center gap-2.5 rounded-full bg-ink px-[18px] py-[11px] text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          <span className="relative size-2">
            <span className="ping-dot absolute inset-0 rounded-full bg-coral" />
            <span className="absolute inset-0 rounded-full bg-coral" />
          </span>
          Contacto
        </a>
      </div>
    </motion.header>
  );
}
