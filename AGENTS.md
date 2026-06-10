# Portfolio Frontend — Agent Build Instructions

> **Duy Phan · Fullstack Engineer Intern**

This document is a complete specification for an AI agent to build a production-quality personal portfolio. Every section describes *what to build*, *why*, and *how* — with enough detail that the agent should not need to make major creative decisions. Follow these instructions precisely.

### 1.2 Global CSS (`src/index.css`)

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background-color: #0A0F1E;
  color: #F0F4F8;
  font-family: 'Inter', sans-serif;
  cursor: none;             /* hide default cursor — custom cursor replaces it */
  overflow-x: hidden;
}
::selection { background: #00D9FF33; color: #00D9FF; }
/* thin scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #0A0F1E; }
::-webkit-scrollbar-thumb { background: #00D9FF44; border-radius: 2px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

### 1.3 Smooth scroll with Lenis (`src/hooks/useLenis.ts`)

```ts
import Lenis from 'lenis'
import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
}
```

Call `useLenis()` inside `App.tsx` at the top level.

---

## 2. Custom Cursor (`src/components/ui/CursorFollower.tsx`)

**What to build:** Two circles that follow the mouse. The outer ring lags behind with spring physics. On hover over links/buttons, the outer ring scales up and fills with a translucent cyan. On click, both circles scale down briefly.

**Implementation:**

```tsx
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export function CursorFollower() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // inner dot — snappy
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 })
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 })

  // outer ring — lagging
  const ringX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const ringY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      {/* inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan rounded-full pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-cyan rounded-full pointer-events-none z-[9998] opacity-60"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
```

**Scale-up on hover:** Add a global event listener for `mouseenter`/`mouseleave` on `[data-cursor="hover"]` elements and use `useMotionValue` to drive scale. Apply `data-cursor="hover"` to all `<a>`, `<button>`, and project cards.

---

## 3. Progress Bar (`src/App.tsx`)

Use `@tanem/react-nprogress` or build a Framer Motion `scaleX` bar fixed at top.

```tsx
// Simple scroll-progress bar
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-cyan origin-left z-[9999]"
      style={{ scaleX }}
    />
  )
}
```

---

## 4. Navbar (`src/components/layout/Navbar.tsx`)

**What to build:**
- Fixed top, `backdrop-blur` + semi-transparent background on scroll
- Logo: `<span className="font-mono text-cyan">Duy</span>` + `<span>.dev</span>`
- Nav links: smooth scroll to section IDs (`#about`, `#projects`, `#skills`, `#contact`)
- Underline on active section (use `useInView` or IntersectionObserver)
- Mobile: hamburger → full-screen overlay menu with staggered list animation

**Scroll behavior with Framer Motion:**

```tsx
import { useScroll, useMotionValueEvent, motion } from 'framer-motion'

const { scrollY } = useScroll()
const [scrolled, setScrolled] = useState(false)
useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 50))

// Apply to nav wrapper:
<motion.nav
  className={`fixed w-full z-50 transition-all duration-300 ${
    scrolled ? 'bg-bg/80 backdrop-blur border-b border-cyan/10' : 'bg-transparent'
  }`}
>
```

**Mobile overlay menu animation:**

```tsx
const menuVariants = {
  closed: { opacity: 0, y: '-100%' },
  open:   { opacity: 1, y: 0, transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  closed: { opacity: 0, y: -20 },
  open:   { opacity: 1, y: 0 },
}
```

---

## 5. Hero Section (`src/components/sections/Hero.tsx`)

**Layout:**
```
┌────────────────────────────────────────┐
│  [eyebrow: small caps, cyan]           │
│  Phan Nhut Duy                         │  ← font-mono, large, white
│  Fullstack Engineer Intern             │  ← font-sans, medium, muted
│  ─────────────────                     │
│  [short tagline — 1 sentence]          │
│  [CTA button] [GitHub link]            │
│                                        │
│  [floating code snippet card]          │  ← absolute, bottom-right
└────────────────────────────────────────┘
```

**Animations to implement:**

### 5.1 Terminal typewriter for name (`src/components/ui/TerminalText.tsx`)

Plays once on mount. Types characters one by one, cursor blinks at end for 2 seconds then fades out. Use `useEffect` + `setInterval`.

```tsx
export function TerminalText({ text, speed = 60 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i === text.length) { clearInterval(interval); setDone(true) }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span className="font-mono">
      {displayed}
      {!done && <span className="animate-pulse text-cyan">|</span>}
    </span>
  )
}
```

### 5.2 Entrance stagger for hero elements

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

<motion.div variants={container} initial="hidden" animate="show">
  <motion.p variants={item}>Fullstack Engineer Intern</motion.p>
  <motion.h1 variants={item}><TerminalText text="Phan Nhut Duy" /></motion.h1>
  <motion.p variants={item}>Tagline</motion.p>
  <motion.div variants={item}>Buttons</motion.div>
</motion.div>
```

### 5.3 Floating code card (background decoration)

A card positioned `absolute bottom-8 right-8` showing a small Redis Lua snippet (use syntax-highlighted `<pre>` with Tailwind). Animate with:

```tsx
<motion.div
  animate={{ y: [0, -12, 0] }}
  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
>
  {/* code snippet */}
</motion.div>
```

Add `will-change: transform` via inline style to prevent paint thrashing.

### 5.4 Background: animated grid

SVG dot grid as CSS `background-image`. Add a radial gradient overlay (center cyan glow fading to `#0A0F1E`) so dots fade outward. No canvas, no heavy library:

```css
.hero-bg {
  background-image: radial-gradient(circle, #00D9FF22 1px, transparent 1px);
  background-size: 32px 32px;
}
```

---

## 6. Section Reveal Wrapper (`src/components/ui/SectionReveal.tsx`)

**Every section** is wrapped in this component. It uses `framer-motion` `whileInView` to animate in. Build it as a generic wrapper:

```tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props { children: ReactNode; delay?: number; className?: string }

export function SectionReveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
```

Wrap every section heading, paragraph, and card group with `<SectionReveal>`. Stagger cards by passing `delay={index * 0.1}`.

---

## 7. Projects Section (`src/components/sections/Projects.tsx`)

### 7.1 Data (`src/data/projects.ts`)

```ts
export const projects = [
  {
    id: 'ecommerce',
    title: 'Electronic Devices Ecommerce',
    period: 'Jul – Sep 2025',
    tags: ['ReactJS', 'Node.js', 'MongoDB', 'Redis', 'Lua'],
    color: '#00D9FF',
    summary: 'Atomic stock reservation under high concurrency using Redis Lua scripts.',
    challenges: [
      {
        title: 'Oversell prevention',
        body: 'Wrote RESERVE_LUA — a Redis Lua script that reads available stock, checks quantity, and decrements atomically. Because Redis is single-threaded and Lua runs without interruption, the second concurrent request simply sees available=0.',
      },
      {
        title: 'Dual-layer cart',
        body: 'Redis is the real-time source of truth (TTL-based). MongoDB is the persistence layer. On load, if Redis has expired the cart, it rebuilds from MongoDB — re-reserving each item against current stock.',
      },
      {
        title: 'PayOS webhook',
        body: 'HMAC-SHA256 signature verification on every webhook. Draft orders hold no stock; confirmed atomically after webhook code=00. Idempotency check prevents double-processing.',
      },
    ],
    github: 'https://github.com/duyphan2501',
  },
  {
    id: 'social',
    title: 'Mini Social Network (Microservice)',
    period: 'Nov 2025',
    tags: ['ReactJS', 'Node.js', 'MySQL', 'RabbitMQ', 'Socket.IO', 'Docker'],
    color: '#7B5EA7',
    summary: '8-service microservice architecture with RabbitMQ Work Queue, RPC, and Pub/Sub.',
    challenges: [
      {
        title: 'RabbitMQ 3 patterns',
        body: 'Work Queue for last_active_at updates. RPC with correlationId for user data retrieval across services. Direct Exchange Pub/Sub for real-time like counts without polling.',
      },
      {
        title: 'Cursor pagination on MySQL',
        body: 'Replaced OFFSET (O(n) scan) with (lastMessageAt, _id) composite cursor. O(log n) regardless of page depth, stable when new messages arrive.',
      },
    ],
    github: 'https://github.com/duyphan2501',
  },
  {
    id: 'chat',
    title: 'Realtime Chat & Video Call',
    period: 'Mar – May 2026',
    tags: ['Next.js 15', 'Node.js', 'MongoDB', 'Redis', 'WebRTC', 'Socket.IO'],
    color: '#00D9FF',
    summary: 'P2P video calls via WebRTC with ICE candidate queuing, distributed presence, and Redis Adapter for horizontal Socket.IO scaling.',
    challenges: [
      {
        title: 'Horizontal Socket.IO scaling',
        body: 'socket.io-redis adapter with dedicated pubClient and subClient (separate from business redisClient — pub/sub locks the connection). All io.to(room).emit() calls sync across instances.',
      },
      {
        title: 'ICE candidate queue',
        body: 'Candidates can arrive before setRemoteDescription completes. Built iceCandidateQueue to buffer candidates until remote description is set, then flushes — preventing forced TURN relay.',
      },
      {
        title: 'Distributed call lock',
        body: 'SET call_end_lock:{callerId}:{startTime} 1 NX EX 30 ensures only one process handles call teardown. NX = atomic acquisition. EX 30 = deadlock prevention on crash.',
      },
    ],
    github: 'https://github.com/duyphan2501',
  },
]
```

### 7.2 Project Cards with Swiper

**Layout:** Horizontal Swiper on mobile (`slidesPerView: 1.1`), 3-column grid on desktop (Swiper disabled or `slidesPerView: 3`).

```tsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Keyboard, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

<Swiper
  modules={[Pagination, Keyboard, A11y]}
  spaceBetween={24}
  slidesPerView={1.1}
  centeredSlides={false}
  pagination={{ clickable: true }}
  keyboard={{ enabled: true }}
  breakpoints={{
    768:  { slidesPerView: 2.1, enabled: true },
    1024: { slidesPerView: 3,   enabled: false }, // grid on desktop
  }}
>
  {projects.map((p, i) => (
    <SwiperSlide key={p.id}>
      <SectionReveal delay={i * 0.1}>
        <ProjectCard project={p} />
      </SectionReveal>
    </SwiperSlide>
  ))}
</Swiper>
```

### 7.3 ProjectCard (`src/components/sections/ProjectCard.tsx`)

**States:** default → hover (subtle lift + glow border) → click → opens `ProjectModal`.

```tsx
<motion.div
  className="bg-card border border-muted/20 rounded-xl p-6 cursor-pointer"
  style={{ '--glow': project.color } as React.CSSProperties}
  whileHover={{
    y: -6,
    boxShadow: `0 0 24px ${project.color}33`,
    borderColor: project.color + '66',
  }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.25 }}
  onClick={() => openModal(project)}
  data-cursor="hover"
>
  {/* top accent line */}
  <div className="h-[2px] w-12 mb-4 rounded" style={{ background: project.color }} />
  <h3 className="font-mono text-lg text-text mb-1">{project.title}</h3>
  <p className="text-sm text-muted mb-4">{project.period}</p>
  <p className="text-sm text-text/70 leading-relaxed mb-4">{project.summary}</p>
  <div className="flex flex-wrap gap-2">
    {project.tags.map(tag => <TechBadge key={tag} label={tag} />)}
  </div>
</motion.div>
```

### 7.4 ProjectModal (`src/components/ui/ProjectModal.tsx`)

Opens on card click. Full-screen overlay with `AnimatePresence` fade + scale-up. Inside: scrollable list of challenges, each with title and body. Close on backdrop click or `Escape` key.

```tsx
import { AnimatePresence, motion } from 'framer-motion'

<AnimatePresence>
  {open && (
    <>
      {/* backdrop */}
      <motion.div
        className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      {/* modal */}
      <motion.div
        className="fixed inset-x-4 top-[10%] bottom-[10%] max-w-2xl mx-auto bg-card border border-cyan/20 rounded-2xl z-50 overflow-y-auto p-8"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="font-mono text-xl text-cyan">{project.title}</h2>
          <button onClick={onClose} data-cursor="hover" className="text-muted hover:text-text">✕</button>
        </div>
        {/* challenges */}
        {project.challenges.map((c, i) => (
          <motion.div
            key={i}
            className="mb-6 pl-4 border-l border-cyan/30"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <h4 className="font-mono text-sm text-cyan mb-1">{c.title}</h4>
            <p className="text-sm text-text/80 leading-relaxed">{c.body}</p>
          </motion.div>
        ))}
        {/* tags + GitHub link */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

Lock `document.body` scroll when modal is open: `document.body.style.overflow = 'hidden'` on open, restore on close.

---

## 8. Skills Section (`src/components/sections/Skills.tsx`)

### 8.1 Layout

Grouped by domain. Each group has a label and a row of tags that animate in with stagger when scrolled into view.

```
Backend             Frontend              Infrastructure
──────────          ────────              ──────────────
[Node.js]           [React]               [Docker]
[Express]           [Next.js 15]          [Nginx]
[MongoDB]           [TypeScript]          [Redis]
[MySQL]             [Tailwind]            [RabbitMQ]
                    [Framer Motion]       [Socket.IO]
                                          [WebRTC]
```

### 8.2 Skill tag animation

Tags animate in with `staggerChildren` when their group enters viewport:

```tsx
const tagGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } }
}
const tag = {
  hidden: { opacity: 0, scale: 0.8 },
  show:   { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
}

<motion.div
  variants={tagGroup}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: '-60px' }}
  className="flex flex-wrap gap-2"
>
  {tags.map(t => (
    <motion.span key={t} variants={tag}>
      <TechBadge label={t} />
    </motion.span>
  ))}
</motion.div>
```

### 8.3 TechBadge (`src/components/ui/TechBadge.tsx`)

```tsx
export function TechBadge({ label }: { label: string }) {
  return (
    <motion.span
      className="px-3 py-1 text-xs font-mono border border-muted/30 rounded-full text-text/70 bg-surface"
      whileHover={{ borderColor: '#00D9FF', color: '#00D9FF', scale: 1.05 }}
      transition={{ duration: 0.15 }}
      data-cursor="hover"
    >
      {label}
    </motion.span>
  )
}
```

---

## 9. Lazy Loading Images (`src/hooks/useInView.ts`)

All images (project screenshots, if added later) must lazy-load using IntersectionObserver:

```tsx
import { useRef, useEffect, useState } from 'react'

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect() }
    }, { threshold: 0.1, ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}
```

Use as:

```tsx
function LazyImage({ src, alt }: { src: string; alt: string }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className="w-full aspect-video bg-surface rounded overflow-hidden">
      {inView && (
        <motion.img
          src={src} alt={alt}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  )
}
```

Do **not** use `loading="lazy"` alone — that defers network request but shows no transition. This pattern gives a visible reveal animation.

---

## 10. About Section (`src/components/sections/About.tsx`)

**Layout:** Two columns on desktop — left: short bio text + stats; right: a simple `<pre>` code block showing the Redis RESERVE_LUA pattern (syntax-colored via Tailwind span).

**Animated stat counters:** When section enters view, numbers count up from 0 using `framer-motion`'s `animate` + `useMotionValue` + `useTransform`.

```tsx
import { useMotionValue, useTransform, animate, motion } from 'framer-motion'
import { useEffect } from 'react'

function Counter({ to, label }: { to: number; label: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => Math.round(v))

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.5, ease: 'easeOut' })
    return controls.stop
  }, [])

  return (
    <div className="text-center">
      <motion.span className="font-mono text-3xl text-cyan">{rounded}</motion.span>
      <p className="text-xs text-muted mt-1">{label}</p>
    </div>
  )
}
```

Stats to show: `3` Projects · `8.66` GPA · `755` TOEIC · `4` Tech stacks

Wrap in `SectionReveal` so counters only start when the about section scrolls into view. Use `useInView` hook to trigger `animate()` conditionally.

---

## 11. Contact Section (`src/components/sections/Contact.tsx`)

**No form** (no backend needed). Three link cards: GitHub, Email, LinkedIn. Each card has:
- Icon (use inline SVG or `lucide-react`)
- Label + handle
- Arrow that slides right on hover via Framer Motion `x` animation

```tsx
<motion.a
  href={href}
  className="flex items-center gap-4 p-4 bg-card border border-muted/20 rounded-xl group"
  whileHover={{ borderColor: '#00D9FF44', backgroundColor: '#1A2540' }}
  data-cursor="hover"
>
  <Icon />
  <div>
    <p className="text-xs text-muted">{label}</p>
    <p className="font-mono text-sm text-text">{handle}</p>
  </div>
  <motion.span
    className="ml-auto text-cyan"
    initial={{ x: 0 }}
    whileHover={{ x: 4 }}
  >
    →
  </motion.span>
</motion.a>
```

---

## 12. GSAP — Scroll-triggered section label

Use GSAP ScrollTrigger for **one** deliberate effect only (don't scatter GSAP everywhere): the section label (e.g. `PROJECTS`, `SKILLS`) that **horizontally scrolls at a slower rate** than the page (parallax text).

```tsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function ParallaxLabel({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { x: '-5%' },
      { x: '5%',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    )
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div ref={ref} className="overflow-hidden">
      <p className="font-mono text-[clamp(3rem,8vw,7rem)] font-bold text-text/5 select-none whitespace-nowrap">
        {text}
      </p>
    </div>
  )
}
```

Place `<ParallaxLabel text="PROJECTS" />` above the projects grid. Effect: giant ghost text scrolls at a different rate, creates depth without distraction.

---

## 13. Performance Checklist

Before considering the build complete, verify:

- [ ] All Framer Motion animations use `will-change: transform` (auto-applied via Framer, verify no `opacity` thrashing on large elements)
- [ ] `viewport={{ once: true }}` on all `whileInView` — do not replay animations on scroll back up
- [ ] Swiper `lazy` prop enabled if images are added
- [ ] Images (if any): `loading="lazy"` + custom LazyImage wrapper (section 9)
- [ ] `prefers-reduced-motion` media query in global CSS (section 1.2) disables all animations
- [ ] `document.body.style.overflow = 'hidden'` restored on modal close
- [ ] Lenis `destroy()` called in `useEffect` cleanup
- [ ] GSAP `ScrollTrigger.kill()` called in cleanup
- [ ] No `useEffect` without cleanup for event listeners
- [ ] Custom cursor hidden on touch devices: `@media (hover: none) { [cursor element] { display: none } }` and `body { cursor: auto }`
- [ ] All interactive elements have `data-cursor="hover"` for cursor scale-up
- [ ] `tabIndex`, `aria-label` on icon-only buttons for keyboard/a11y

---

## 14. App.tsx — Final assembly

```tsx
import { CursorFollower } from './components/ui/CursorFollower'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'
import { useLenis } from './hooks/useLenis'

export default function App() {
  useLenis()
  return (
    <>
      <CursorFollower />
      <ScrollProgress />
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="skills"><Skills /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </>
  )
}
```

---

## Summary of Techniques Demonstrated

| Technique | Where | Library |
|---|---|---|
| Custom spring cursor | Global overlay | Framer Motion `useSpring` |
| Scroll progress bar | Fixed top | Framer Motion `useScroll` |
| Smooth scroll | Global | Lenis |
| Typewriter effect | Hero name | Custom `useEffect` hook |
| Entrance stagger | Hero, all sections | Framer Motion `variants` |
| Floating animation | Hero code card | Framer Motion `animate` keyframes |
| Scroll-reveal | Every section | Framer Motion `whileInView` |
| Card hover glow | Project cards | Framer Motion `whileHover` |
| Animated modal | Project detail | Framer Motion `AnimatePresence` |
| Horizontal swiper | Projects (mobile) | Swiper.js |
| Tag spring animation | Skills section | Framer Motion `staggerChildren` |
| Number counter | About stats | Framer Motion `useMotionValue` + `animate` |
| Parallax ghost text | Section labels | GSAP ScrollTrigger |
| Lazy image load | Images | IntersectionObserver + custom hook |
| Reduced motion | Global | CSS `prefers-reduced-motion` |
