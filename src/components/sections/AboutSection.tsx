"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS, SKILL_KEYS } from "@/config/site";

export default function AboutSection() {
  const t = useTranslations("HomePage.AboutSection");

  return (
    <Section id={SECTION_IDS.about}>
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <MotionReveal className="lg:col-span-6">
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

        <MotionReveal delay={0.08} className="lg:col-span-6">
          <div className="rounded-2xl border border-border bg-surface-elevated/60 p-6 shadow-sm backdrop-blur-sm md:p-8">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-text-secondary">
              {t("skillsTitle")}
            </h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SKILL_KEYS.map((key) => (
                <li key={key}>
                  <span className="inline-flex items-center rounded-lg border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground md:text-sm">
                    {t(`skills.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}
