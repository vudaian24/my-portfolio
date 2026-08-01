"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { CV_PATH, SECTION_IDS, SOCIAL_LINKS } from "@/config/site";
import { EASE_OUT } from "@/lib/animation";

export type HeroContent = {
  brand: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaProjects: string;
  ctaContact: string;
  ctaResume: string;
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
          <p className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {content.brand}
          </p>
          <h1 className="mt-4 font-display text-2xl font-semibold text-text-secondary sm:text-3xl md:text-4xl">
            {content.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {content.description}
          </p>

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
            <a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-lg px-6 text-sm font-semibold text-brand underline-offset-4 transition-colors hover:underline"
            >
              {content.ctaResume}
            </a>
          </div>

          <ul className="mt-8 flex items-center gap-1">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-surface hover:text-brand"
                  aria-label={social.label}
                >
                  <social.icon size={20} strokeWidth={1.75} />
                </a>
              </li>
            ))}
          </ul>
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
