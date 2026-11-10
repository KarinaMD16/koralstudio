"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { apps, type KoralApp } from "@/lib/apps";
import { Blob } from "./Coral";
import { CashTrackBudgets, LyricDesktop, Phone, ReadingChapter } from "./mockups";
import { Reveal } from "./Reveal";
import { ProximityText } from "./cursor/ProximityText";

const Arrow = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

function Visual({ app }: { app: KoralApp }) {
  if (app.visual === "lyric") return <LyricDesktop />;
  return (
    <Phone
      size="sm"
      className={app.visual === "cashtrack" ? "rotate-6" : "-rotate-6"}
      screenClassName={app.visual === "cashtrack" ? "bg-[#F6F6FF] text-ink" : "bg-white text-ink"}
    >
      {app.visual === "cashtrack" ? <CashTrackBudgets /> : <ReadingChapter />}
    </Phone>
  );
}

function AppCard({
  app,
  index,
  total,
  progress,
}: {
  app: KoralApp;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  // Cuando la siguiente tarjeta sube encima, esta se encoge un poco y se oscurece.
  const start = index / total;
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [start, 1], [1, reduce ? 1 : targetScale]);
  const dim = useTransform(progress, [start, 1], [0, reduce ? 0 : (total - 1 - index) * 0.12]);

  // Parallax interno de la maqueta.
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: visualRef, offset: ["start end", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);

  const light = app.onAccent === "light";
  const chipSolid = light ? "bg-white text-[#2A27C9]" : "bg-ink text-white";
  const chipOutline = light ? "border-white/60" : "border-ink";
  const ctaClass = light ? "bg-white text-ink" : "bg-ink text-white";

  return (
    <div className="lg:sticky" style={{ top: 96 + index * 28 }}>
      <motion.article
        style={{ scale, background: app.accent }}
        className={`relative flex origin-top flex-wrap items-center gap-10 overflow-hidden rounded-[32px] p-[clamp(28px,5vw,64px)] ${light ? "text-white" : "text-ink"}`}
      >
        <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-10 bg-ink" />

        <div className="min-w-0 flex-[1_1_380px]">
          <div className="flex flex-wrap gap-2 text-[13px]">
            <span className={`rounded-full px-3 py-1.5 font-bold ${chipSolid}`}>{app.status}</span>
            {app.platforms.map((p) => (
              <span key={p} className={`rounded-full border-[1.5px] px-3 py-1.5 font-semibold ${chipOutline}`}>
                {p}
              </span>
            ))}
          </div>
          <h3 className="display mt-[22px] text-[clamp(44px,7vw,96px)] font-extrabold">
            {app.name} {app.nameLight && <span className="font-light">{app.nameLight}</span>}
          </h3>
          <p className="label mt-1.5 opacity-80">by Koral Studio</p>
          <p className="mt-[22px] max-w-[460px] text-lg leading-relaxed">{app.description}</p>

          {app.cta && (
            <a
              href={app.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-[30px] inline-flex items-center gap-2.5 rounded-full px-6 py-[15px] font-semibold transition-transform hover:-translate-y-0.5 ${ctaClass}`}
            >
              {app.cta.label} <Arrow />
            </a>
          )}

          {app.waitlist && (
            <form className="mt-7 max-w-[460px]" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor={`email-${app.id}`} className="text-sm font-semibold">
                Recibir novedades
              </label>
              <div className="mt-2 flex flex-wrap gap-2.5">
                <input
                  id={`email-${app.id}`}
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  autoComplete="email"
                  className="h-[52px] min-w-0 flex-[1_1_200px] rounded-full bg-white px-5 text-[15px] text-ink placeholder:text-[#7A7B8E]"
                />
                <button
                  type="submit"
                  className="h-[52px] rounded-full bg-ink px-6 font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Avisarme
                </button>
              </div>
            </form>
          )}
        </div>

        <div
          ref={visualRef}
          data-cursor-marquee={app.cta ? app.cta.label : "Muy pronto"}
          onClick={app.cta ? () => window.open(app.cta!.href, "_blank", "noopener,noreferrer") : undefined}
          className="relative flex min-h-[460px] min-w-0 flex-[1_1_320px] items-center justify-center"
        >
          <Blob color={app.accentSoft} className="absolute aspect-square w-[380px] max-w-full" />
          <motion.div style={{ y: visualY }} className="relative flex w-full justify-center">
            <Visual app={app} />
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}

export function AppsStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="apps" className="bg-ink px-[clamp(14px,3vw,32px)] py-[clamp(80px,10vw,140px)] text-white">
      <div className="mx-auto max-w-[1320px]">
        <div className="label flex justify-between gap-4 text-[#A3A4BC]">
          <span>Nuestras apps</span>
          <span>Únete a la comunidad</span>
        </div>
        <Reveal>
          <h2 className="display mb-[clamp(40px,6vw,72px)] mt-6 text-center text-[clamp(48px,10vw,152px)] font-extrabold">
            <ProximityText text="Hechas" /> <ProximityText text="para" rest={300} near={800} />
            <br />
            <ProximityText text="tu" rest={300} near={800} /> <ProximityText text="bolsillo" />
          </h2>
        </Reveal>

        <div ref={ref} className="flex flex-col gap-7">
          {apps.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} total={apps.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
