"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { SECTION_IDS } from "@/config/site";
import { EASE_OUT } from "@/lib/animation";

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  marqueeText: string;
  ctaProjects: string;
  ctaContact: string;
  photoAlt: string;
};

type HeroSectionClientProps = {
  content: HeroContent;
};

export default function HeroSectionClient({ content }: HeroSectionClientProps) {
  return (
    <section
      id={SECTION_IDS.home}
      className="relative flex min-h-[min(100dvh,900px)] flex-col items-center justify-center gap-12 py-16 lg:flex-row lg:gap-16 lg:py-24"
    >
      <div className="section-shell flex w-full flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="order-2 flex w-full max-w-xl flex-1 flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
        >
          <p className="section-label mb-4">{content.eyebrow}</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            <span className="text-gradient-brand">{content.title}</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {content.description}
          </p>

          <div className="marquee mt-8 w-full max-w-xl overflow-hidden py-1 lg:max-w-none">
            <div className="marquee-track gap-12 pr-12 text-sm font-medium text-text-muted">
              <span className="shrink-0 whitespace-nowrap">
                {content.marqueeText}
              </span>
              <span className="shrink-0 whitespace-nowrap" aria-hidden>
                {content.marqueeText}
              </span>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href={`#${SECTION_IDS.projects}`}
              className="font-display inline-flex h-12 items-center justify-center rounded-lg bg-brand px-8 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              {content.ctaProjects}
            </Link>
            <Link
              href={`#${SECTION_IDS.contact}`}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-transparent px-8 text-sm font-semibold text-foreground transition-colors hover:border-brand/40 hover:bg-brand-muted/30"
            >
              {content.ctaContact}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT }}
          className="order-1 flex flex-1 justify-center lg:order-2 lg:justify-end"
        >
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-muted via-transparent to-brand-subtle opacity-80 blur-2xl"
              aria-hidden
            />
            <div className="relative aspect-[779/1280] w-48 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl sm:w-56 md:w-64">
              <Image
                src="/avatar.jpg"
                alt={content.photoAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
