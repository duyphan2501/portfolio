# Portfolio Frontend - Next.js Agent Build Instructions

> **Phan Nhut Duy | Fullstack Engineer Intern**
>
> Current application stack: Next.js 16.2.9, React 19.2, TypeScript, Tailwind CSS 4

This document defines how to build the portfolio in the existing Next.js application. Keep the page fast, accessible, recruiter-friendly, and visually distinctive without turning the entire route into a Client Component.

## 0. Required Next.js Approach

Before changing application code, read the relevant local documentation in:

```text
node_modules/next/dist/docs/
```

This project uses the **App Router**. Follow these rules:

- `app/layout.tsx` and `app/page.tsx` are Server Components by default.
- Keep static content and section composition in Server Components.
- Add `'use client'` only to components that need state, effects, event handlers, Motion, GSAP, Lenis, or browser APIs.
- Keep Client Components as small leaves so the page does not ship unnecessary JavaScript.
- Props passed from Server Components to Client Components must be serializable.
- Use `next/font` for fonts, `next/image` for content images, and the Next.js Metadata API for SEO.
- Use `Link` from `next/link` for internal route navigation. Plain hash links are acceptable for same-page section anchors.
- Do not create `App.tsx`, `main.tsx`, `index.html`, or a Vite configuration.

## 1. Dependencies

The base Next.js and Tailwind packages already exist. Install optional interaction libraries only when their related feature is implemented:

```bash
npm install motion gsap @gsap/react swiper lenis @phosphor-icons/react
```

Do not import any package until it appears in `package.json`.

Preferred animation import:

```tsx
import { motion } from "motion/react";
```

## 2. Project Structure

Use the existing root `app` directory and keep route files focused on routing and composition.

```text
app/
|-- favicon.ico
|-- globals.css
|-- layout.tsx
|-- page.tsx
|-- opengraph-image.png
|-- robots.ts
`-- sitemap.ts
components/
|-- layout/
|   |-- footer.tsx
|   `-- navbar.tsx
|-- sections/
|   |-- about.tsx
|   |-- contact.tsx
|   |-- hero.tsx
|   |-- projects.tsx
|   `-- skills.tsx
`-- ui/
    |-- cursor-follower.tsx
    |-- motion-provider.tsx
    |-- parallax-label.tsx
    |-- project-dialog.tsx
    |-- projects-carousel.tsx
    |-- scroll-progress.tsx
    |-- section-reveal.tsx
    |-- tech-badge.tsx
    `-- terminal-text.tsx
data/
`-- projects.ts
public/
|-- images/
|   |-- portrait.webp
|   `-- projects/
`-- resume/
    `-- phan-nhut-duy-resume.pdf
```

Use the configured `@/*` path alias for imports.

## 3. Server and Client Component Boundaries

### Server Components

Keep these as Server Components unless a real interactive requirement appears:

- `app/layout.tsx`
- `app/page.tsx`
- `components/layout/footer.tsx`
- `components/sections/about.tsx`
- `components/sections/contact.tsx`
- `components/sections/hero.tsx`
- `components/sections/projects.tsx`
- `components/sections/skills.tsx`
- `components/ui/tech-badge.tsx`

### Client Components

Add `'use client'` at the top of:

- Navbar behavior that depends on scroll or mobile menu state
- Custom cursor
- Scroll progress
- Terminal typing animation
- Section reveal animation
- Projects carousel
- Project dialog
- GSAP parallax label
- Lenis integration

Do not add `'use client'` to `app/page.tsx` just to support one animated child.

## 4. Root Layout, Fonts, and Metadata

Use `next/font/google` in `app/layout.tsx`. Keep Geist and Geist Mono unless the design direction explicitly changes.

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-production-domain.example"),
  title: {
    default: "Phan Nhut Duy | Fullstack Engineer",
    template: "%s | Phan Nhut Duy",
  },
  description:
    "Fullstack engineer focused on distributed systems, real-time communication, and reliable web applications.",
  openGraph: {
    title: "Phan Nhut Duy | Fullstack Engineer",
    description:
      "Portfolio featuring concurrency, WebRTC, Redis, RabbitMQ, and full-stack engineering projects.",
    type: "website",
  },
};
```

Replace the placeholder production domain before deployment. Add `app/opengraph-image.png`, `app/robots.ts`, and `app/sitemap.ts`.

## 5. Tailwind CSS 4 and Global Styles

Do not create `tailwind.config.ts` for basic theme values. Tailwind 4 is configured in `app/globals.css`.

```css
@import "tailwindcss";

:root {
  --background: #080c14;
  --surface: #101722;
  --surface-raised: #172131;
  --foreground: #f3f6fa;
  --muted: #92a0b3;
  --border: #283548;
  --accent: #39c6b3;
}

@theme inline {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-surface-raised: var(--surface-raised);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background: var(--background);
}

body {
  min-height: 100dvh;
  margin: 0;
  overflow-x: hidden;
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), sans-serif;
}

::selection {
  background: color-mix(in srgb, var(--accent) 28%, transparent);
  color: var(--foreground);
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Design direction:

- Page type: developer portfolio for recruiters and engineering interviewers.
- Visual language: dark technical editorial, restrained and precise.
- `DESIGN_VARIANCE: 6`
- `MOTION_INTENSITY: 5`
- `VISUAL_DENSITY: 4`
- Use one accent color across the entire page.
- Use a consistent radius system: cards `rounded-2xl`, buttons `rounded-full`, controls `rounded-lg`.
- Avoid generic purple gradients, excessive glass effects, and three identical cards as the main visual idea.

## 6. Page Composition

`app/page.tsx` remains a Server Component:

```tsx
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { MotionProvider } from "@/components/ui/motion-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <MotionProvider>
      <CursorFollower />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
```

`MotionProvider` is optional. Use it only when it owns Lenis or a shared reduced-motion policy. Do not turn it into a general global state provider.

## 7. Navbar

Build a sticky or fixed navigation with:

- Brand text: `Duy.dev`
- Same-page links: `#about`, `#projects`, `#skills`, `#contact`
- A visible resume link
- A mobile menu with proper focus handling
- A background and border that become visible after scrolling

The interactive navbar file must be a Client Component. Use Motion's `useScroll` or an Intersection Observer rather than a raw `window` scroll listener.

Accessibility requirements:

- Use a real `<nav aria-label="Primary navigation">`.
- Mobile toggle must have `aria-expanded`, `aria-controls`, and an accessible label.
- Close the mobile menu on `Escape` and after link activation.
- Keep desktop navigation on one line and no taller than 80px.

## 8. Hero

Use a spacious asymmetric layout that fits within the first small-laptop viewport.

Content:

- Name: Phan Nhut Duy
- Role: Fullstack Engineer Intern
- Short statement about building reliable systems for concurrency, distributed state, and real-time communication
- Primary CTA: View projects
- Secondary CTA: Download resume or visit GitHub
- One supporting visual, such as a portrait, project screenshot, or concise code artifact

Rules:

- Use `min-h-[100dvh]`, never `h-screen`.
- Keep the headline to two lines maximum.
- Keep the supporting paragraph under 25 words.
- Ensure both CTAs are visible without scrolling on a typical laptop.
- Decorative motion must not delay the readable content.
- Do not use a fake terminal as the entire hero.

If using the typewriter effect, isolate it in `terminal-text.tsx` with `'use client'`. Render the full name in the initial HTML or provide an accessible static equivalent so the heading is not empty before hydration.

## 9. About

Use a two-column desktop layout:

- Left: a concise biography and current goal
- Right: engineering principles or selected facts

Suggested facts:

- 3 substantial projects
- GPA 8.66/10
- TOEIC 755
- Focus areas: concurrency, real-time systems, distributed state

Do not animate GPA as an integer counter. If counters are used, preserve decimal values and ensure the final value is readable without animation.

## 10. Projects

Store project data in `data/projects.ts`. Keep it serializable and pass it into Client Components as props.

```ts
export type Project = {
  id: string;
  title: string;
  period: string;
  summary: string;
  tags: string[];
  highlights: Array<{
    title: string;
    body: string;
  }>;
  github?: string;
  image?: string;
};
```

Required projects:

1. Electronic Devices Ecommerce
   - React, Node.js, MongoDB, Redis, Lua
   - Atomic stock reservation and payment webhook idempotency

2. Mini Social Network
   - React, Node.js, MySQL, RabbitMQ, Socket.IO, Docker
   - Eight services, messaging patterns, and cursor pagination

3. Realtime Chat and Video Call
   - Next.js 15, Node.js, MongoDB, Redis, WebRTC, Socket.IO
   - Redis Adapter scaling, distributed presence, and ICE candidate queuing

The `Next.js 15` label describes that historical project. Do not confuse it with this portfolio application's current Next.js 16.2.9 runtime.

### Desktop

Avoid three undifferentiated equal cards. Prefer:

- One featured project occupying more space
- Two supporting projects in a secondary column or grid
- Clear summary, role, stack, and engineering outcome

### Mobile

Use a normal vertical list by default. Add Swiper only if horizontal interaction clearly improves the design. If Swiper is used, wrap it in a dedicated Client Component and import its CSS there or from a stable app entry.

### Project Details

Prefer an accessible native `<dialog>` or a well-tested dialog primitive. If building a custom dialog:

- Use `role="dialog"` and `aria-modal="true"`.
- Move focus into the dialog.
- Trap focus while open.
- Restore focus to the trigger when closed.
- Close on `Escape` and backdrop click.
- Lock body scrolling and restore it during cleanup.

## 11. Skills

Group technologies by domain:

- Frontend: React, Next.js, TypeScript, Tailwind CSS, Zustand
- Backend: Node.js, Express, REST APIs
- Data: MongoDB, MySQL, Redis
- Messaging and real-time: RabbitMQ, Socket.IO, WebRTC
- Infrastructure: Docker, Docker Compose, Nginx
- Security: JWT rotation, OAuth 2.0, bcrypt, HMAC verification

Use semantic headings and compact tags. Motion may reveal each group once, but the section must remain understandable with JavaScript disabled.

## 12. Contact

No contact form is required. Provide direct links for:

- Email
- GitHub
- LinkedIn, when the final URL is available
- Resume

Use an icon library already declared in `package.json`. Prefer Phosphor icons and keep one icon family throughout the site. External links should use `target="_blank"` only when useful and must include `rel="noreferrer"`.

## 13. Images and Static Assets

Use `Image` from `next/image` for portraits and project screenshots.

```tsx
import Image from "next/image";

<Image
  src="/images/portrait.webp"
  alt="Phan Nhut Duy"
  width={720}
  height={900}
  sizes="(max-width: 768px) 100vw, 42vw"
  priority
/>;
```

Rules:

- Only the true Largest Contentful Paint image may use `priority`.
- Provide meaningful `alt` text for informative images and `alt=""` for purely decorative images.
- Always preserve dimensions or use `fill` inside a positioned container with a stable aspect ratio.
- Use `next.config.ts` `images.remotePatterns` for remote hosts. Keep patterns specific.
- Do not build a custom Intersection Observer image loader. `next/image` already handles lazy loading and layout stability.

## 14. Motion and Browser APIs

### Section Reveal

`section-reveal.tsx` is a small Client Component that accepts server-rendered children:

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";

export function SectionReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### Lenis

Lenis is optional. Native smooth scrolling is enough unless testing shows the experience benefits from it. If used:

- Initialize it in a dedicated Client Component.
- Cancel the animation frame and call `destroy()` during cleanup.
- Disable it when reduced motion is requested.

### GSAP

Use GSAP for at most one deliberate scroll effect, such as a large project label moving slightly across the viewport.

- Register plugins inside the client module.
- Use `gsap.context()` and revert it during cleanup.
- Do not call `ScrollTrigger.getAll().forEach(kill)` because that can destroy triggers owned by other components.
- Disable the effect for reduced motion.

### Custom Cursor

The cursor is optional desktop enhancement only:

- Hide it for `(hover: none)` and `(pointer: coarse)`.
- Never hide the native cursor until the custom cursor is mounted.
- Do not interfere with focus rings or keyboard navigation.
- Track continuous pointer values with Motion values, not React state.

## 15. Accessibility

- Use one `<h1>`, followed by correctly ordered section headings.
- Every section must have an `id` and an accessible heading.
- All controls must be reachable and operable with a keyboard.
- Use semantic `<button>` and `<a>` elements instead of clickable `<div>` elements.
- Maintain WCAG AA contrast for body text and controls.
- Keep visible focus styles.
- Respect `prefers-reduced-motion`.
- Do not rely on hover alone to reveal essential content.
- Add a skip link to `#main-content`.
- Test the mobile menu and project dialog with keyboard-only navigation.

## 16. Performance and SEO

- Keep `app/page.tsx` statically renderable.
- Avoid client-side fetching for local portfolio content.
- Keep project data in TypeScript and render it on the server.
- Use dynamic imports only for genuinely heavy client-only features.
- Avoid loading Motion, GSAP, Swiper, and Lenis for effects that CSS can handle.
- Use Next.js metadata rather than manually editing `<head>`.
- Add structured data for `Person` and selected `CreativeWork` projects when final URLs are known.
- Target Core Web Vitals: LCP under 2.5s, INP under 200ms, CLS under 0.1.

## 17. Verification

Before considering the implementation complete:

```bash
npm run lint
npm run build
```

Checklist:

- [ ] Local Next.js documentation was consulted for changed APIs.
- [ ] `app/page.tsx` remains a Server Component.
- [ ] Client boundaries are limited to interactive leaves.
- [ ] No Vite files or Vite bootstrap instructions remain.
- [ ] Tailwind 4 uses `@import "tailwindcss"` and `@theme inline`.
- [ ] Fonts load through `next/font`.
- [ ] Images load through `next/image`.
- [ ] Metadata, favicon, Open Graph image, robots, and sitemap are defined.
- [ ] Interactive effects have cleanup functions.
- [ ] Reduced motion is respected.
- [ ] Mobile navigation and dialogs are keyboard accessible.
- [ ] The hero fits a small laptop viewport.
- [ ] The page uses one accent color and one consistent shape system.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
