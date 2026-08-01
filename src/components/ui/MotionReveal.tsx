"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, fadeUpTransition, viewportOnce } from "@/lib/animation";
import { cn } from "@/lib/utils";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  viewportAmount?: number;
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  viewportAmount = viewportOnce.amount,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={fadeUp}
      transition={fadeUpTransition(delay)}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
