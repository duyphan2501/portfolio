"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 50);
  });

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.split("#")[1]))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? "rgb(8 12 20 / 0.88)" : "rgb(8 12 20 / 0.5)",
        borderColor: scrolled ? "rgb(40 53 72 / 0.7)" : "rgb(40 53 72 / 0.25)",
      }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
      transition={{ duration: 0.25 }}
    >
      <nav
        aria-label="Primary navigation"
        className="page-shell flex h-18 items-center justify-between"
      >
        <Link className="font-mono text-sm font-semibold tracking-tight" href="/">
          <span className="text-accent">Duy</span>.dev
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              className={`relative py-2 text-sm transition-colors hover:text-foreground ${
                activeSection === link.href.split("#")[1]
                  ? "text-foreground"
                  : "text-muted"
              }`}
              data-cursor="hover"
              href={link.href}
              key={link.href}
            >
              {link.label}
              <motion.span
                animate={{ scaleX: activeSection === link.href.split("#")[1] ? 1 : 0 }}
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
              />
            </Link>
          ))}
          <a
            className="rounded-full border border-accent/45 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-[#041412]"
            href="https://drive.google.com/file/d/1NWMuecpu0fJ-wzidevoXUplRZkfGg1WB/view?usp=drive_link"
            target="_blank"
          >
            Request resume
          </a>
        </div>

        <button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="rounded-lg border border-border px-3 py-2 text-sm md:hidden"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-background px-4 py-5 md:hidden"
          exit={{ opacity: 0, y: -16 }}
          id="mobile-menu"
          initial={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.2 }}
        >
          <div className="page-shell flex flex-col gap-1">
            {links.map((link) => (
              <Link
                className="rounded-lg px-3 py-3 text-lg text-muted hover:bg-surface hover:text-foreground"
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              className="mt-3 rounded-full bg-accent px-4 py-3 text-center font-semibold text-[#041412]"
              href="mailto:duyphan2501@gmail.com?subject=Resume request"
              onClick={() => setOpen(false)}
            >
              Request resume
            </a>
          </div>
        </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
