"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { Section } from "@/components/ui/Section";
import { EASE_OUT } from "@/lib/animation";
import { SECTION_IDS, SKILL_GROUPS } from "@/config/site";

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.15 + i * 0.03, duration: 0.3, ease: EASE_OUT },
  }),
};

export default function AboutSection() {
  const t = useTranslations("HomePage.AboutSection");
  let chipIndex = 0;

  return (
    <Section id={SECTION_IDS.about}>
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <MotionReveal className="lg:col-span-5">
          <p className="section-label mb-3">{t("eyebrow")}</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("description")}
          </p>
          <Link
            href={`#${SECTION_IDS.projects}`}
            className="font-display mt-8 inline-flex h-11 items-center rounded-lg border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand/40 hover:bg-brand-muted/25"
          >
            {t("cta")}
          </Link>
        </MotionReveal>

        <MotionReveal delay={0.08} className="lg:col-span-7">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-text-secondary">
            {t("skillsTitle")}
          </h3>
          <div className="mt-2">
            {SKILL_GROUPS.map((group) => (
              <div key={group.id} className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  {t(`groups.${group.id}`)}
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.keys.map((key) => {
                    const index = chipIndex++;
                    return (
                      <motion.li
                        key={key}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={chipVariants}
                      >
                        <span className="inline-flex items-center rounded-md border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground transition-colors duration-300 hover:border-brand/40 hover:text-brand md:text-sm">
                          {t(`skills.${key}`)}
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}
