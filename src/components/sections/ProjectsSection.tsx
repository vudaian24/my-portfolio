"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { EASE_OUT } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { PROJECTS, SECTION_IDS } from "@/config/site";

const CARD_BASE =
  "group flex h-full flex-col rounded-2xl border border-border bg-surface-elevated/50 p-6 shadow-sm transition-colors duration-300 hover:border-brand/35 md:p-8";

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
        {PROJECTS.map((project, index) => {
          const hasPublicLink = Boolean(project.href);

          return (
            <motion.div
              key={project.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariants}
            >
              <Link href={`/projects/${project.id}`} className={cn(CARD_BASE)}>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold text-foreground transition-colors group-hover:text-brand md:text-2xl">
                      {t(`items.${project.id}.title`)}
                    </h3>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all group-hover:border-brand/40 group-hover:bg-brand-muted/30 group-hover:text-brand">
                      <ArrowUpRight size={18} strokeWidth={2} aria-hidden />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`items.${project.id}.role`)} ·{" "}
                    {t(`items.${project.id}.period`)}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {t(`items.${project.id}.summary`)}
                  </p>
                  {project.tags?.length ? (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <span className="inline-flex items-center rounded-md border border-border/70 bg-background/60 px-2 py-1 text-xs font-medium text-text-secondary">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="mt-6 text-sm font-medium text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {t("viewCaseStudy")}
                  </p>
                  {!hasPublicLink ? (
                    <p className="mt-2 text-sm font-medium text-text-muted">
                      {t("noPublicLink")}
                    </p>
                  ) : null}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
