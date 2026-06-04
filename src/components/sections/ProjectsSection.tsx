"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { EASE_OUT } from "@/lib/animation";
import { PROJECTS, SECTION_IDS } from "@/config/site";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.45, ease: EASE_OUT },
  }),
};

export default function ProjectsSection() {
  const t = useTranslations("HomePage.Projects");

  return (
    <Section id={SECTION_IDS.projects}>
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <motion.article
            key={project.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariants}
            className="group relative"
          >
            <a
              href={project.href}
              target={project.external ? "_blank" : undefined}
              rel={project.external ? "noopener noreferrer" : undefined}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface-elevated/50 p-6 shadow-sm transition-all duration-300 hover:border-brand/35 hover:shadow-md md:p-8"
            >
              <div className="mb-6 flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-border/80 bg-surface/80 text-xs font-medium uppercase tracking-wider text-text-muted transition-colors group-hover:border-brand/25 group-hover:text-brand">
                {t("previewPlaceholder")}
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-foreground transition-colors group-hover:text-brand md:text-2xl">
                    {t(`items.${project.id}.title`)}
                  </h3>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all group-hover:border-brand/40 group-hover:bg-brand-muted/30 group-hover:text-brand">
                    <ArrowUpRight size={18} strokeWidth={2} aria-hidden />
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t(`items.${project.id}.description`)}
                </p>
                <p className="mt-6 text-sm font-medium text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {t("viewDetail")}
                </p>
              </div>
            </a>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
