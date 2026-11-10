// Maquetas ilustrativas de las apps. Reemplazar por capturas reales cuando existan.
import type { ReactNode } from "react";

export function Phone({
  children,
  className = "",
  screenClassName = "bg-white",
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  screenClassName?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims = {
    sm: "w-[230px] h-[470px] rounded-[40px] p-[9px]",
    md: "w-[250px] h-[520px] rounded-[44px] p-[9px]",
    lg: "w-[270px] h-[560px] rounded-[46px] p-[10px]",
  }[size];
  return (
    <div
      aria-hidden="true"
      className={`relative bg-ink shadow-[0_50px_80px_-36px_rgba(20,21,43,0.6)] ${dims} ${className}`}
    >
      <div className={`relative h-full overflow-hidden rounded-[34px] px-[17px] pb-4 pt-[50px] ${screenClassName}`}>
        <div className="absolute left-1/2 top-[11px] h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}

const Bar = ({ w, tone = "bg-[#EEEDEA]" }: { w: string; tone?: string }) => (
  <div className={`h-[7px] rounded-full ${tone}`} style={{ width: w }} />
);

export function CashTrackHome() {
  const rows = [
    { name: "Supermercado", amount: "−₡12.400", dot: "bg-[#E4E3FF]" },
    { name: "Suscripción música", amount: "−₡3.200", dot: "bg-[#FFE0D9]" },
    { name: "Ingreso", amount: "+₡95.000", dot: "bg-[#D9F2E6]", positive: true },
  ];
  return (
    <>
      <p className="text-xs text-[#6B6C80]">Noviembre</p>
      <p className="mt-0.5 font-display text-[22px] font-extrabold">Tu mes, en orden</p>
      <div className="mt-3.5 rounded-[20px] bg-cash p-4 text-white">
        <p className="text-[11px] opacity-80">Disponible</p>
        <p className="mt-0.5 font-display text-[30px] font-extrabold tracking-tight">₡186.400</p>
        <div className="mt-3 h-1.5 rounded-full bg-white/25">
          <div className="h-full w-[62%] rounded-full bg-white" />
        </div>
        <p className="mt-2 text-[10px] opacity-85">62% del presupuesto usado</p>
      </div>
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#E4E3FF] px-2.5 py-1.5 text-[10px] font-semibold text-[#2A27C9]">
        <span className="size-1.5 rounded-full bg-cash" />
        Pago detectado desde notificación
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-2.5 rounded-[14px] bg-white p-2.5 text-xs font-semibold">
            <div className={`size-8 rounded-[10px] ${r.dot}`} />
            <div className="flex-1">{r.name}</div>
            <div className={r.positive ? "text-[#11734A]" : ""}>{r.amount}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export function CashTrackBudgets() {
  const items = [
    { name: "Comida", pct: 72 },
    { name: "Transporte", pct: 40 },
    { name: "Suscripciones", pct: 91, warn: true },
    { name: "Ocio", pct: 25 },
  ];
  return (
    <>
      <p className="font-display text-lg font-extrabold">Presupuestos</p>
      <div className="mt-3 flex flex-col gap-2.5">
        {items.map((i) => (
          <div key={i.name} className="rounded-[14px] bg-white p-3">
            <div className="flex justify-between text-[11px] font-semibold">
              <span>{i.name}</span>
              <span>{i.pct}%</span>
            </div>
            <div className={`mt-2 h-1.5 rounded-full ${i.warn ? "bg-[#FFE0D9]" : "bg-[#E4E3FF]"}`}>
              <div className={`h-full rounded-full ${i.warn ? "bg-coral" : "bg-cash"}`} style={{ width: `${i.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function ReadingHome() {
  return (
    <>
      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6B6C80]">Sigue leyendo</p>
      <div className="mt-3 flex gap-3">
        <div className="relative h-[118px] w-[82px] flex-none overflow-hidden rounded-[10px] bg-read">
          <div className="absolute -bottom-[22px] -left-4 size-20 rounded-full bg-ink" />
          <div className="absolute right-2.5 top-3 size-5 rounded-full bg-white" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-lg font-extrabold leading-[1.05]">Mareas de noviembre</p>
          <p className="mt-1.5 text-[11px] text-[#6B6C80]">Capítulo 7 de 24</p>
          <div className="mt-2.5 h-[5px] rounded-full bg-[#E3F6F3]">
            <div className="h-full w-[30%] rounded-full bg-read" />
          </div>
        </div>
      </div>
      <p className="mb-2.5 mt-5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#6B6C80]">Para ti</p>
      <div className="grid grid-cols-3 gap-2">
        <div className="h-[88px] rounded-lg bg-ink" />
        <div className="h-[88px] rounded-lg bg-coral-soft" />
        <div className="h-[88px] rounded-lg bg-[#CDEFEA]" />
      </div>
      <div className="mt-4 flex flex-col gap-[7px]">
        <Bar w="100%" />
        <Bar w="86%" />
        <Bar w="92%" />
        <Bar w="64%" />
      </div>
    </>
  );
}

export function ReadingChapter() {
  return (
    <>
      <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#6B6C80]">Capítulo 7</p>
      <p className="mt-1 font-display text-xl font-extrabold leading-[1.05]">Mareas de noviembre</p>
      <div className="mt-4 flex flex-col gap-[7px]">
        <Bar w="100%" />
        <Bar w="94%" />
        <Bar w="98%" />
        <Bar w="72%" />
        <div className="h-2" />
        <Bar w="100%" />
        <Bar w="90%" />
        <Bar w="96%" tone="bg-[#CDEFEA]" />
        <Bar w="60%" />
      </div>
      <div className="mt-4 rounded-[14px] bg-[#E3F6F3] p-3">
        <div className="flex items-center gap-2">
          <div className="size-[22px] rounded-full bg-read" />
          <div className="h-1.5 w-[60px] rounded-full bg-[#9ADFD7]" />
        </div>
        <div className="mt-2 h-1.5 w-[90%] rounded-full bg-[#BFEAE4]" />
      </div>
    </>
  );
}

export function LyricPill({ className = "", small = false }: { className?: string; small?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-3 rounded-full bg-ink-deep/95 py-2.5 pl-2.5 pr-[18px] shadow-[0_24px_50px_-20px_rgba(11,12,26,0.6)] ${className}`}
    >
      <div
        className={`flex-none rounded-[13px] ${small ? "size-[34px]" : "size-[42px]"}`}
        style={{ background: "linear-gradient(135deg, #FF4F8B 0 50%, #DD5D4F 50% 100%)" }}
      />
      <div className="min-w-0 text-white">
        <p className="truncate text-[10px] text-white/50">{small ? "línea anterior de la canción" : "Lyric Island"}</p>
        <p className={`truncate font-bold ${small ? "text-[13px]" : "text-sm"}`}>
          <span className="karaoke">{small ? "esta es la línea que suena" : "la letra, justo a tiempo"}</span>
        </p>
      </div>
    </div>
  );
}

export function LyricDesktop() {
  return (
    <div aria-hidden="true" className="relative w-full max-w-[460px]">
      <div className="aspect-[16/10] rounded-[18px] bg-ink p-2.5">
        <div
          className="relative h-full overflow-hidden rounded-[10px]"
          style={{ background: "linear-gradient(160deg, #3A2E5C 0%, #7A3B62 55%, #D46A6A 100%)" }}
        >
          <div className="float absolute left-[9%] top-[14%] w-[82%]">
            <LyricPill small />
          </div>
          <div className="absolute bottom-[10%] left-[8%] h-[42%] w-[46%] rounded-lg bg-white/15" />
          <div className="absolute bottom-[10%] right-[8%] h-[54%] w-[32%] rounded-lg bg-white/10" />
        </div>
      </div>
      <div
        className="mx-auto h-[26px] w-[22%] bg-ink"
        style={{ clipPath: "polygon(18% 0, 82% 0, 100% 100%, 0 100%)" }}
      />
    </div>
  );
}
