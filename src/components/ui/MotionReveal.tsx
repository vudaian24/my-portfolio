"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, fadeUpTransition, viewportOnce } from "@/lib/animation";
import { cn } from "@/lib/utils";

type MotionRevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  viewportAmount?: number;
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  viewportAmount = viewportOnce.amount,
  ...props
}: MotionRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={fadeUp}
      transition={fadeUpTransition(delay)}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
