import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Koral Studio · Apps pequeñas para el día a día",
  description:
    "Estudio independiente de Costa Rica que crea apps simples y honestas. Sin anuncios raros, nunca vendemos tus datos.",
  metadataBase: new URL("https://koralstudio.online"),
  openGraph: {
    title: "Koral Studio",
    description: "Apps pequeñas para el día a día. Hecho en Costa Rica.",
    url: "https://koralstudio.online",
    siteName: "Koral Studio",
    locale: "es_CR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className="min-h-full bg-mist text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
