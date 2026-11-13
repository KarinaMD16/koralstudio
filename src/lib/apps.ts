// Todas las apps del estudio viven aquí: agregar una app nueva = agregar un objeto.

export type AppVisual = "cashtrack" | "lyric" | "reading";

export type KoralApp = {
  id: string;
  name: string;
  /** Parte del nombre que va en peso fino (opcional). */
  nameLight?: string;
  description: string;
  status: "Beta" | "Próximamente" | "Disponible";
  platforms: string[];
  /** Fondo de la tarjeta. */
  accent: string;
  /** Tono más claro para la forma orgánica detrás de la maqueta. */
  accentSoft: string;
  /** Color del texto sobre el acento. */
  onAccent: "light" | "dark";
  cta?: { label: string; href: string };
  waitlist?: boolean;
  visual: AppVisual;
};

export const apps: KoralApp[] = [
  {
    id: "cashtrack",
    name: "CashTrack",
    description:
      "Tus finanzas personales sin complicarte: gastos, ingresos, presupuestos y suscripciones. Detecta tus pagos desde las notificaciones del teléfono.",
    status: "Beta",
    platforms: ["Android"],
    accent: "#3F3CF4",
    accentSoft: "#5653FF",
    onAccent: "light",
    cta: { label: "Conocer CashTrack", href: "https://cashtrack.koralstudio.online" },
    visual: "cashtrack",
  },
  {
    id: "lyric-island",
    name: "Lyric",
    nameLight: "Island",
    description:
      "Letras sincronizadas en tiempo real en una isla flotante sobre tu pantalla. Estilo karaoke, con Spotify, Apple Music, YouTube Music y más. Toma los colores del álbum; sin cuentas ni anuncios.",
    status: "Beta",
    platforms: ["Windows"],
    accent: "#FF4F8B",
    accentSoft: "#FF7AA8",
    onAccent: "dark",
    cta: { label: "Microsoft Store", href: "https://lyricisland.koralstudio.online" },
    visual: "lyric",
  },
  {
    id: "lectura",
    name: "Lectura",
    nameLight: "y escritura",
    description:
      "Una comunidad para lectores y escritores. Le estamos dando forma: déjanos tu correo y te avisamos cuando abra.",
    status: "Próximamente",
    platforms: [],
    accent: "#2EC4B6",
    accentSoft: "#5DD6CA",
    onAccent: "dark",
    waitlist: true,
    visual: "reading",
  },
];

export const principles = [
  {
    title: "Privacidad primero",
    text: "Solo pedimos los datos que la app necesita para funcionar. Nunca vendemos tu información.",
  },
  {
    title: "Sin anuncios raros",
    text: "Nada de anuncios que te persiguen ni ventanas que interrumpen lo que estás haciendo.",
  },
  {
    title: "Simples a propósito",
    text: "Cada app hace pocas cosas y las hace bien. Sin pantallas de más ni funciones de relleno.",
  },
  {
    title: "Hechas con cariño",
    text: "Un equipo pequeño en Costa Rica que cuida cada detalle, de la primera pantalla a la última.",
  },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/koralstudioapps" },
  { label: "TikTok", href: "https://www.tiktok.com/@koralstudioapps" },
  { label: "X", href: "https://x.com/KoralStudio" },
];
