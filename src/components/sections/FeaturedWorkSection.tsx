"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FEATURED_PROJECT_ID, PROJECTS } from "@/config/site";
import { MotionReveal } from "@/components/ui/MotionReveal";

export default function FeaturedWorkSection() {
  const t = useTranslations("HomePage.FeaturedWork");
  const tp = useTranslations("HomePage.Projects");
  const project = PROJECTS.find((p) => p.id === FEATURED_PROJECT_ID)!;

  return (
    <Section id="featured">
      <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
      <MotionReveal className="mt-10 border-t border-border pt-10">
        <p className="font-display text-2xl font-semibold md:text-3xl">
          {tp(`items.${project.id}.title`)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {tp(`items.${project.id}.role`)} · {tp(`items.${project.id}.period`)}
        </p>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
          {tp(`items.${project.id}.summary`)}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/projects/${project.id}`}
            className="font-display inline-flex h-11 items-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            {t("cta")}
          </Link>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-lg border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand/40 hover:bg-brand-muted/25"
            >
              {t("live")}
            </a>
          ) : null}
        </div>
      </MotionReveal>
    </Section>
  );
}
