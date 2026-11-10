import Image from "next/image";
import { principles, socials } from "@/lib/apps";
import { Blob } from "./Coral";
import { Reveal, ScrollWords } from "./Reveal";
import { ProximityText } from "./cursor/ProximityText";

function Chapter({ left, right, dark = false }: { left: string; right: string; dark?: boolean }) {
  return (
    <div className={`label flex justify-between gap-4 ${dark ? "text-[#A3A4BC]" : "text-subtle"}`}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

export function Studio() {
  return (
    <section id="estudio" className="px-5 py-[clamp(80px,11vw,160px)]">
      <div className="mx-auto max-w-[1320px]">
        <Chapter left="Sobre Koral" right="¿Quiénes somos?" />
        <h2 className="display mt-[clamp(32px,5vw,64px)] text-[clamp(40px,7.6vw,116px)] font-extrabold leading-[0.92]">
          <span className="block pl-[22%]">
            <ScrollWords text="Un estudio" /> <span className="font-light"><ScrollWords text="pequeño" /></span>
          </span>
          <span className="block">
            <ScrollWords text="que crece" /> <span className="text-coral"><ScrollWords text="como coral:" /></span>
          </span>
          <span className="block pl-[12%] font-light">
            <ScrollWords text="una app a la vez." />
          </span>
        </h2>
        <div className="mt-[clamp(40px,6vw,72px)] flex flex-wrap justify-end gap-x-14 gap-y-6 text-[17px] leading-[1.65] text-muted">
          <Reveal as="p" className="flex-[0_1_380px]">
            No somos una agencia. Hacemos y publicamos nuestras propias apps, pensadas para resolver cosas del día a día
            sin complicarte la vida.
          </Reveal>
          <Reveal as="p" delay={0.12} className="flex-[0_1_380px]">
            Cada app conserva su propia personalidad y colores. Koral es la firma que las une: simples, honestas y
            hechas con cuidado.
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Principles() {
  return (
    <section id="principios" className="px-5 py-[clamp(80px,11vw,150px)]">
      <div className="mx-auto max-w-[1320px]">
        <Chapter left="Cómo hacemos apps" right="Capítulo 03" />
        <Reveal>
          <h2 className="display mb-[clamp(40px,6vw,72px)] mt-6 text-[clamp(44px,7vw,104px)] font-extrabold leading-[0.9]">
            <ProximityText text="Pocas cosas," />
            <br />
            <ProximityText text="bien hechas." rest={300} near={800} />
          </h2>
        </Reveal>
        <ol className="border-b border-line">
          {principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 0.06}
              className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line py-7"
            >
              <span className="flex-[0_0_64px] pt-2 font-mono text-[13px] text-coral">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 flex-[1_1_320px] font-display text-[clamp(26px,3vw,38px)] font-bold tracking-tight">
                {p.title}
              </h3>
              <p className="m-0 flex-[1_1_340px] text-[17px] leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-white px-5 py-[clamp(90px,12vw,170px)]">
      <Blob
        color="#DD5D4F"
        className="absolute -right-24 top-10 aspect-square w-[220px] opacity-90 md:-right-[8%] md:top-1/2 md:w-[clamp(280px,40vw,560px)] md:-translate-y-1/2 md:opacity-100"
        style={{ animationDuration: "18s" }}
      />
      <div className="relative mx-auto max-w-[1320px]">
        <Chapter left="Contacto" right="Capítulo 04" />
        <Reveal y={60}>
          <h2 className="display mt-6 text-[clamp(64px,14vw,220px)] font-extrabold leading-[0.84] tracking-[-0.04em]">
            <ProximityText text="¿Hablamos" radius={420} /><ProximityText text="?" rest={300} near={800} radius={420} />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-[460px] text-lg leading-relaxed text-muted">
            Una idea, un bug o solo un hola. Leemos todos los mensajes y respondemos personalmente.
          </p>
          <a
            href="mailto:info@koralstudio.online"
            data-cursor-marquee="Escríbenos"
            className="mt-[30px] inline-block break-words border-b-2 border-current pb-0.5 font-display text-[clamp(22px,3.4vw,44px)] font-bold tracking-tight hover:text-coral"
          >
            info@koralstudio.online
          </a>
          <nav aria-label="Redes sociales" className="mt-9 flex flex-wrap gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="rounded-full bg-mist px-5 py-3 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink px-5 pb-8 pt-11 text-white">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-6">
        <Image
          src="/logo/koral-studio-horizontal-color.svg"
          alt="Koral Studio"
          width={94}
          height={44}
          className="h-11 w-auto brightness-0 invert"
        />
        <nav aria-label="Legal" className="flex flex-wrap gap-x-7 gap-y-2.5 text-[15px]">
          <a href="#" className="hover:text-coral-soft">Política de privacidad</a>
          <a href="#" className="hover:text-coral-soft">Términos</a>
        </nav>
      </div>
      <div className="mx-auto mt-7 flex max-w-[1320px] flex-wrap justify-between gap-2.5 border-t border-white/15 pt-5 text-sm text-[#B3B4CB]">
        <span>© 2026 Koral Studio</span>
        <span className="label">Hecho en Costa Rica</span>
      </div>
    </footer>
  );
}
