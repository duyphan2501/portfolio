"use client";

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

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
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
              className="text-sm text-muted transition-colors hover:text-foreground"
              href={link.href}
              key={link.href}
            >
              {link.label}
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

      {open ? (
        <div
          className="border-t border-border bg-background px-4 py-5 md:hidden"
          id="mobile-menu"
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
        </div>
      ) : null}
    </header>
  );
}
