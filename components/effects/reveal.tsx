"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealDirection = "up" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  id?: string;
};

const hiddenPosition: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 50 },
  left: { x: -50, y: 0 },
  right: { x: 50, y: 0 },
};

export function Reveal({
  children,
  className,
  direction = "up",
  id,
}: RevealProps) {
  return (
    <motion.div
      className={`transform-gpu ${className ?? ""}`}
      id={id}
      initial={{ opacity: 0, ...hiddenPosition[direction] }}
      style={{ willChange: "opacity, transform" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.15 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
