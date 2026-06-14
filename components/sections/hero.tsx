"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

function TerminalText({ text, speed = 65 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [speed, text]);

  useEffect(() => {
    if (!done) return;
    const timeout = window.setTimeout(() => setShowCursor(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [done]);

  return (
    <>
      {displayed}
      {showCursor ? (
        <span className="ml-1 inline-block animate-pulse text-accent">|</span>
      ) : null}
    </>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-18">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="page-shell relative grid min-h-[calc(100dvh-4.5rem)] items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-8">
        <motion.div
          animate="show"
          className="relative z-10 max-w-3xl"
          initial="hidden"
          variants={container}
        >
          <motion.p className="section-kicker mb-5" variants={item}>
            Fullstack Engineer Intern
          </motion.p>
          <motion.h1
            className="text-balance max-w-[12ch] text-[clamp(3.6rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.075em]"
            variants={item}
          >
            <TerminalText text="Phan Nhut " />
            <span className="text-accent">Duy</span>
          </motion.h1>
          <motion.p
            className="mt-7 max-w-[34rem] text-balance text-lg leading-8 text-muted sm:text-xl"
            variants={item}
          >
            I build reliable web systems for concurrency, distributed state, and
            real-time communication.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            variants={item}
          >
            <a
              data-cursor="hover"
              className="rounded-full bg-accent px-6 py-3.5 text-center font-semibold text-[#041412] transition-transform hover:-translate-y-0.5 active:translate-y-px"
              href="#projects"
            >
              View projects
            </a>
            <a
              data-cursor="hover"
              className="rounded-full border border-border bg-surface/60 px-6 py-3.5 text-center font-semibold transition-colors hover:border-accent/60 hover:text-accent"
              href="https://github.com/duyphan2501"
              rel="noreferrer"
              target="_blank"
            >
              GitHub profile
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="hero-art relative mx-auto aspect-[4/5] w-full max-w-[29rem] overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_100px_rgb(0_0_0/0.4)]"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            alt="Abstract visualization of distributed data paths and message queues"
            className="object-cover"
            fill
            priority
            sizes="(max-width: 1024px) 80vw, 38vw"
            src="/images/distributed-systems-hero.png"
          />
          <div className="absolute inset-x-5 bottom-5 z-10 rounded-xl border border-white/10 bg-background/75 p-4 backdrop-blur">
            <p className="font-mono text-xs text-accent">SYSTEM FOCUS</p>
            <p className="mt-2 text-sm leading-6 text-foreground/85">
              Race conditions, network failures, reconnection flows, and the
              edge cases after the happy path.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
