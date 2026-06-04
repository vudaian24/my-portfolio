export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;

export const fadeUpTransition = (delay = 0) => ({
  duration: 0.5,
  delay,
  ease: EASE_OUT,
});

export const viewportOnce = { once: true, amount: 0.25 } as const;
