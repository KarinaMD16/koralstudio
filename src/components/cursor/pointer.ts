// Posición compartida del mouse: un solo listener para todos los componentes que reaccionan al cursor.
type Listener = () => void;

export const pointer = { x: -9999, y: -9999, inside: false };
const listeners = new Set<Listener>();
let bound = false;

function notify() {
  listeners.forEach((l) => l());
}

function bind() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.inside = true;
      notify();
    },
    { passive: true },
  );
  document.documentElement.addEventListener("pointerleave", () => {
    pointer.inside = false;
    notify();
  });
  // Al hacer scroll las letras se mueven bajo el cursor aunque el mouse esté quieto.
  window.addEventListener("scroll", notify, { passive: true });
}

export function subscribePointer(l: Listener) {
  bind();
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

/** true solo en dispositivos con mouse real y sin "reducir movimiento". */
export function canUseFancyCursor() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
