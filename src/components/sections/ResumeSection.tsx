"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { Section } from "@/components/ui/Section";
import { CV_PATH, SECTION_IDS } from "@/config/site";

export default function ResumeSection() {
  const t = useTranslations("HomePage.ResumeSection");

  return (
    <Section id={SECTION_IDS.resume}>
      <MotionReveal viewportAmount={0.3}>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-elevated/90 via-surface/80 to-brand-muted/20 px-8 py-12 text-center md:px-14 md:py-16">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-muted/50 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-brand-subtle blur-3xl"
            aria-hidden
          />

          <p className="section-label mb-3">{t("eyebrow")}</p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground md:text-base">
            {t("description")}
          </p>

          <motion.a
            href={CV_PATH}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="font-display mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" strokeWidth={2} aria-hidden />
            {t("button")}
          </motion.a>
        </div>
      </MotionReveal>
    </Section>
  );
}
