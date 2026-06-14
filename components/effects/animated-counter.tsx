"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

export function AnimatedCounter({
  decimals = 0,
  value,
}: {
  decimals?: number;
  value: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (current) =>
    current.toFixed(decimals),
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return () => controls.stop();
  }, [count, inView, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}
