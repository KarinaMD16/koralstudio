# Koral Studio · sitio web

Página de inicio de [koralstudio.online](https://koralstudio.online): "Apps pequeñas para el día a día".

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · [Motion](https://motion.dev) (antes Framer Motion) · [Lenis](https://lenis.darkroom.engineering) para scroll suave. Fuentes self-hosted con Fontsource (Bricolage Grotesque, Inter, JetBrains Mono), sin llamadas a Google Fonts.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Estructura

```
src/
  app/
    layout.tsx        fuentes, metadata/SEO, <SmoothScroll>
    page.tsx          orden de las secciones
    globals.css       tokens de marca (@theme), .display/.label, keyframes del "coral vivo"
    icon.svg          favicon (símbolo de Koral)
  lib/apps.ts         ← datos: apps, principios, redes. Agregar una app = agregar un objeto
  components/
    SmoothScroll.tsx  Lenis global (se apaga con prefers-reduced-motion)
    Header.tsx        menú en píldora; se esconde al bajar y vuelve al subir
    Hero.tsx          titular con máscara + escena del arrecife con parallax
    Coral.tsx         <Coral/> ramas que crecen al entrar en pantalla · <Blob/> forma orgánica
    Marquee.tsx       cinta que acelera/cambia de sentido con la velocidad del scroll
    AppsStack.tsx     tarjetas apiladas (sticky) que se encogen al llegar la siguiente
    Reveal.tsx        <Reveal/> aparición al entrar · <ScrollWords/> palabras que se encienden con el scroll
    Sections.tsx      Estudio, Principios, Contacto, Footer
    mockups.tsx       teléfonos y pantallas ilustrativas (reemplazar por capturas reales)
public/logo/          logos SVG
```

## Animaciones que ya están

| Dónde | Qué hace | Cómo |
|---|---|---|
| Hero | Las dos líneas del titular suben desde una máscara al cargar | `motion` `animate` |
| Hero | Teléfonos, isla de Lyric Island, sello y forma coral se mueven a velocidades distintas al hacer scroll | `useScroll` + `useTransform` |
| Hero | Las ramas de coral se dibujan solas y luego se mecen; las puntas "respiran" | `pathLength` + CSS `sway`/`breathe` |
| Cinta | Avanza sola y reacciona a la velocidad y dirección del scroll | `useVelocity` + `useAnimationFrame` |
| Estudio | Las palabras del manifiesto se encienden mientras haces scroll | `<ScrollWords>` |
| Apps | Cada tarjeta queda fija y se encoge/oscurece cuando la siguiente sube encima; la maqueta tiene parallax propio | `sticky` + `useScroll` |
| General | Aparición suave al entrar en pantalla | `<Reveal>` |
| Header | Se esconde al bajar, vuelve al subir | `useMotionValueEvent` |

Todo respeta `prefers-reduced-motion`. En móvil (< 1024 px) las tarjetas de apps no se apilan para que no se tape contenido, y la escena del hero se escala completa (no se esconde nada).

### Para agregar más

- Aparición simple: envolver en `<Reveal delay={0.1}>…</Reveal>`.
- Algo ligado al scroll: `const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })` y luego `useTransform(scrollYProgress, [0, 1], [desde, hasta])` en un `style` de `motion.div`.
- Scroll suave a una sección: los enlaces `href="#id"` ya pasan por Lenis.

## Cursor y texto reactivo

- **Cursores propios** (`public/cursors/*.svg`, reglas en `globals.css`): flecha por defecto, I-beam en textos y un pólipo coral en enlaces y botones. Solo con mouse.
- **Etiqueta que sigue al mouse** (`components/cursor/CursorMarquee.tsx`): cualquier elemento con `data-cursor-marquee="Tu texto"` la muestra junto al cursor.
- **Texto que reacciona al cursor** (`components/cursor/ProximityText.tsx`): `<ProximityText text="Hola" rest={800} near={220} radius={340} />`. Cada letra cambia de grosor según la cercanía del mouse (eje de peso de Bricolage, 200–800). Usa `rest` bajo y `near` alto para el efecto inverso.
- `components/cursor/pointer.ts` comparte un solo listener del mouse entre todos los componentes. Todo se desactiva en pantallas táctiles y con "reducir movimiento".

## Pendientes

- Enlaces reales de Instagram, TikTok, GitHub y X (`src/lib/apps.ts` → `socials`).
- Páginas de Política de privacidad y Términos.
- Conectar el formulario "Avisarme" (lista de espera de la app de lectura) a un servicio real.
- Cambiar las maquetas por capturas o video reales.
- Selector ES/EN (los textos ya están centralizados en parte en `lib/apps.ts`).
- Imagen Open Graph (`src/app/opengraph-image.png`).
