"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { Section } from "@/components/ui/Section";
import { CV_DEVOPS_PATH, CV_PATH, SECTION_IDS } from "@/config/site";

export default function ResumeSection() {
  const t = useTranslations("HomePage.ResumeSection");

  return (
    <Section id={SECTION_IDS.resume}>
      <MotionReveal viewportAmount={0.3}>
        <div className="relative border-t border-border px-2 py-10 text-center md:py-14">
          <p className="section-label mb-3">{t("eyebrow")}</p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground md:text-base">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="font-display inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" strokeWidth={2} aria-hidden />
              {t("buttonFullstack")}
            </motion.a>
            <motion.a
              href={CV_DEVOPS_PATH}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="font-display inline-flex h-12 items-center gap-2 rounded-lg border border-border bg-transparent px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand/40 hover:bg-brand-muted/30"
            >
              <Download className="h-4 w-4" strokeWidth={2} aria-hidden />
              {t("buttonDevops")}
            </motion.a>
          </div>
        </div>
      </MotionReveal>
    </Section>
  );
}
