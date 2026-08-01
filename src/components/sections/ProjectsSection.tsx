"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { EASE_OUT } from "@/lib/animation";
import {
  PROJECTS,
  SECTION_IDS,
  projectAnchorId,
} from "@/config/site";

const entryVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: EASE_OUT },
  }),
};

export default function ProjectsSection() {
  const t = useTranslations("HomePage.Projects");
  const reduceMotion = useReducedMotion();

  return (
    <Section id={SECTION_IDS.projects}>
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-14 flex flex-col gap-16 md:gap-20">
        {PROJECTS.map((project, index) => {
          const bullets = t.raw(`items.${project.id}.bullets`) as string[];
          const hasPublicLink = Boolean(project.href);
          const linkLabel =
            project.id === "portfolio" ? t("repo") : t("live");

          return (
            <motion.article
              key={project.id}
              id={projectAnchorId(project.id)}
              custom={index}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={reduceMotion ? undefined : entryVariants}
              className="scroll-mt-28 border-t border-border pt-10"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <h3 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                    {t(`items.${project.id}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    {t(`items.${project.id}.role`)} ·{" "}
                    {t(`items.${project.id}.team`)} ·{" "}
                    {t(`items.${project.id}.period`)}
                  </p>
                </div>
                {hasPublicLink ? (
                  <motion.a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-brand/40 hover:bg-brand-muted/25 hover:text-brand"
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                  >
                    {linkLabel}
                    <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
                  </motion.a>
                ) : (
                  <p className="text-sm font-medium text-text-muted">
                    {t("noPublicLink")}
                  </p>
                )}
              </div>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t(`items.${project.id}.summary`)}
              </p>

              <h4 className="mt-8 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("approach")}
              </h4>
              <ul className="mt-3 max-w-3xl list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                {bullets.map((bullet) => (
                  <li key={bullet.slice(0, 48)}>{bullet}</li>
                ))}
              </ul>

              {project.tags?.length ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <span className="inline-flex items-center rounded-md border border-border/70 bg-background/60 px-2.5 py-1 text-xs font-medium text-text-secondary">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
