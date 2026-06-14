"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ParallaxLabel({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { xPercent: -5 },
        {
          xPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, element);

    return () => context.revert();
  }, []);

  return (
    <p
      aria-hidden="true"
      className="pointer-events-none absolute -top-5 left-0 whitespace-nowrap font-mono text-[clamp(4rem,12vw,9rem)] font-bold leading-none text-foreground/[0.025] select-none"
      ref={ref}
    >
      {text}
    </p>
  );
}
