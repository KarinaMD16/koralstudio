"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Blob, Coral } from "./Coral";
import { CashTrackHome, LyricPill, Phone, ReadingHome } from "./mockups";
import { ProximityText } from "./cursor/ProximityText";

const ease = [0.22, 1, 0.36, 1] as const;

/** Una línea del titular que sube desde una máscara. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax: cada capa del arrecife se mueve a su propio ritmo.
  const pick = (v: number[]) => (reduce ? [0, 0] : v);
  const yCenter = useTransform(scrollYProgress, [0, 1], pick([0, -120]));
  const yLeft = useTransform(scrollYProgress, [0, 1], pick([0, -220]));
  const rotLeft = useTransform(scrollYProgress, [0, 1], reduce ? [-9, -9] : [-9, -18]);
  const yPill = useTransform(scrollYProgress, [0, 1], pick([0, -300]));
  const ySeal = useTransform(scrollYProgress, [0, 1], pick([0, -60]));
  const blobScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.35]);

  return (
    <section id="inicio" ref={ref} className="relative overflow-hidden px-5 pt-6 sm:pt-12">
      <div className="label mx-auto flex max-w-[1320px] justify-between gap-4 text-subtle">
        <span>Estudio independiente</span>
        <span>Costa Rica · Nº 01</span>
      </div>

      <h1 className="display mx-auto mt-6 max-w-[1320px] text-center text-[clamp(54px,11.4vw,176px)] font-extrabold sm:mt-9">
        <Line delay={0.1}>
          <ProximityText text="Apps" rest={800} near={220} /> <ProximityText text="pequeñas" rest={300} near={800} />
        </Line>
        <Line delay={0.22}>
          <ProximityText text="para el" rest={300} near={800} /> <ProximityText text="día a día" rest={800} near={220} />
        </Line>
      </h1>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
      >
        <p className="mx-auto mt-6 max-w-[520px] text-center text-[clamp(16px,1.6vw,18px)] leading-relaxed text-muted">
          Hacemos apps simples y honestas para tu teléfono y tu escritorio. Sin anuncios raros. Nunca vendemos tus
          datos.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href="#apps"
            className="inline-flex items-center gap-2.5 rounded-full bg-coral px-6 py-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Ver nuestras apps
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </a>
          <a
            href="#estudio"
            className="inline-flex items-center rounded-full bg-white px-6 py-[15px] font-semibold transition-transform hover:-translate-y-0.5"
          >
            Conoce el estudio
          </a>
        </div>
      </motion.div>

      {/* Escenario del arrecife: diseño fijo de 1100px que se escala completo en pantallas chicas */}
      <div data-cursor-marquee="Conoce las apps" onClick={() => document.getElementById("apps")?.scrollIntoView({ behavior: "smooth" })} className="relative mx-auto mt-10 h-[330px] max-w-[1100px] min-[541px]:h-[450px] md:mt-14 min-[861px]:h-[640px]">
        <div className="absolute left-1/2 top-0 h-[640px] w-[1100px] -ml-[550px] origin-top scale-50 min-[541px]:scale-70 min-[861px]:scale-100">
          <motion.div style={{ scale: blobScale }} className="absolute left-1/2 top-[70px] -ml-[260px] size-[520px]">
            <Blob color="#DD5D4F" className="size-full" />
          </motion.div>
          <Blob
            color="#F2B0A6"
            className="absolute left-1/2 top-[150px] ml-[140px] size-[300px]"
            style={{ animationDelay: "-5s", animationDuration: "17s" }}
          />

          <Coral className="absolute -left-2.5 -bottom-1.5 h-[420px] w-[330px]" delay={0.4} />
          <Coral
            className="absolute -right-5 -bottom-1.5 h-[360px] w-[280px]"
            color="#F2B0A6"
            polypColor="#DD5D4F"
            strokeWidth={28}
            branchCount={4}
            mirrored
            delay={0.7}
          />

          <motion.div style={{ y: yLeft, rotate: rotLeft }} className="absolute left-[215px] top-[110px] z-[2]">
            <div className="float-2">
              <Phone>
                <ReadingHome />
              </Phone>
            </div>
          </motion.div>

          <motion.div style={{ y: yCenter }} className="absolute left-1/2 top-10 z-[3] -ml-[135px]">
            <div className="float">
              <Phone size="lg" screenClassName="bg-[#F6F6FF]">
                <CashTrackHome />
              </Phone>
            </div>
          </motion.div>

          <motion.div style={{ y: yPill, rotate: 4 }} className="absolute left-[640px] top-[70px] z-[4] w-[300px]">
            <div className="float-3">
              <LyricPill />
            </div>
          </motion.div>

          <motion.div
            style={{ y: ySeal }}
            aria-hidden="true"
            className="absolute left-[760px] top-[330px] z-[4] size-[150px] rounded-full bg-white shadow-[0_20px_40px_-24px_rgba(20,21,43,0.4)]"
          >
            <svg viewBox="0 0 150 150" className="spin-slow block size-full">
              <defs>
                <path id="seal-circle" d="M75,75 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0" />
              </defs>
              <text fontFamily="JetBrains Mono, monospace" fontSize="11.5" letterSpacing="2.6" fill="#14152B">
                <textPath href="#seal-circle">BY KORAL STUDIO · HECHO EN COSTA RICA · </textPath>
              </text>
            </svg>
            <div className="absolute left-1/2 top-1/2 size-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
