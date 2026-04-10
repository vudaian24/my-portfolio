"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const t = useTranslations("HomePage.HeroSection");

  return (
    <section
      id="home"
      className="relative flex min-h-[min(100dvh,900px)] flex-col items-center justify-center gap-12 py-16 md:flex-row md:gap-16 md:py-24"
    >
      <div className="section-shell flex w-full flex-col items-center gap-12 md:flex-row md:items-center md:justify-between md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 flex max-w-xl flex-1 flex-col items-center text-center md:order-1 md:items-start md:text-left"
        >
          <p className="section-label mb-4">{t("eyebrow")}</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            <span className="text-gradient-brand">{t("title")}</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("description")}
          </p>

          <div className="marquee mt-8 w-full max-w-xl overflow-hidden py-1 md:max-w-none">
            <div className="marquee-track gap-12 pr-12 text-sm font-medium text-text-muted">
              <span className="shrink-0 whitespace-nowrap">
                {t("marqueeText")}
              </span>
              <span className="shrink-0 whitespace-nowrap" aria-hidden>
                {t("marqueeText")}
              </span>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link
              href="#projects"
              className="font-display inline-flex h-12 items-center justify-center rounded-lg bg-brand px-8 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              {t("ctaProjects")}
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-transparent px-8 text-sm font-semibold text-foreground transition-colors hover:border-brand/40 hover:bg-brand-muted/30"
            >
              {t("ctaContact")}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex flex-1 justify-center md:order-2 md:justify-end"
        >
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-muted via-transparent to-brand-subtle opacity-80 blur-2xl"
              aria-hidden
            />
            <div className="relative aspect-square w-56 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl sm:w-64 md:w-72">
              <Image
                src="https://placehold.co/400"
                alt={t("photoAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 224px, 288px"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
