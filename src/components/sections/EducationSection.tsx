"use client";

import { useTranslations } from "next-intl";
import { Section, SectionHeader } from "@/components/ui/Section";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SECTION_IDS } from "@/config/site";

export default function EducationSection() {
  const t = useTranslations("HomePage.EducationSection");

  return (
    <Section id={SECTION_IDS.education}>
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <MotionReveal className="mt-10 max-w-2xl border-t border-border pt-8">
        <h3 className="font-display text-xl font-semibold md:text-2xl">
          {t("school")}
        </h3>
        <p className="mt-2 text-muted-foreground">{t("degree")}</p>
        <p className="mt-1 text-sm text-text-muted">{t("meta")}</p>
      </MotionReveal>
    </Section>
  );
}
