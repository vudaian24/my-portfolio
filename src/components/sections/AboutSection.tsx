"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { Section } from "@/components/ui/Section";
import { chipCascade } from "@/lib/animation";
import { SECTION_IDS, SKILL_GROUPS } from "@/config/site";

export default function AboutSection() {
  const t = useTranslations("HomePage.AboutSection");
  const reduceMotion = useReducedMotion();
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
          <motion.div
            whileHover={reduceMotion ? undefined : { x: 4 }}
            className="mt-8 inline-block"
          >
            <Link
              href={`#${SECTION_IDS.projects}`}
              className="font-display inline-flex h-11 items-center rounded-lg border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand/40 hover:bg-brand-muted/25"
            >
              {t("cta")}
            </Link>
          </motion.div>
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
                        initial={reduceMotion ? false : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={reduceMotion ? undefined : chipCascade}
                        whileHover={
                          reduceMotion
                            ? undefined
                            : { y: -3, scale: 1.04, transition: { duration: 0.2 } }
                        }
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
