"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FEATURED_PROJECT_ID, PROJECTS } from "@/config/site";
import { staggerContainer, staggerItem } from "@/lib/animation";

export default function FeaturedWorkSection() {
  const t = useTranslations("HomePage.FeaturedWork");
  const tp = useTranslations("HomePage.Projects");
  const project = PROJECTS.find((p) => p.id === FEATURED_PROJECT_ID)!;
  const reduceMotion = useReducedMotion();

  return (
    <Section id="featured">
      <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
      <motion.div
        className="mt-10 border-t border-border pt-10"
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={
          reduceMotion
            ? undefined
            : {
                ...staggerContainer,
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.05 },
                },
              }
        }
      >
        <motion.p
          variants={reduceMotion ? undefined : staggerItem}
          className="font-display text-2xl font-semibold md:text-3xl"
        >
          {tp(`items.${project.id}.title`)}
        </motion.p>
        <motion.p
          variants={reduceMotion ? undefined : staggerItem}
          className="mt-2 text-sm text-muted-foreground"
        >
          {tp(`items.${project.id}.role`)} · {tp(`items.${project.id}.period`)}
        </motion.p>
        <motion.p
          variants={reduceMotion ? undefined : staggerItem}
          className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg"
        >
          {tp(`items.${project.id}.summary`)}
        </motion.p>
        <motion.div
          variants={reduceMotion ? undefined : staggerItem}
          className="mt-8 flex flex-wrap gap-3"
        >
          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={`/projects/${project.id}`}
              className="font-display inline-flex h-11 items-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              {t("cta")}
            </Link>
          </motion.div>
          {project.href ? (
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-lg border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand/40 hover:bg-brand-muted/25"
              >
                {t("live")}
              </a>
            </motion.div>
          ) : null}
        </motion.div>
      </motion.div>
    </Section>
  );
}
