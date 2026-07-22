"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section, SectionHeader } from "@/components/ui/Section";
import { EASE_OUT } from "@/lib/animation";
import { EXPERIENCE_ITEMS, SECTION_IDS } from "@/config/site";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: EASE_OUT },
  }),
};

export default function ExperienceSection() {
  const t = useTranslations("HomePage.ExperienceSection");

  return (
    <Section id={SECTION_IDS.experience}>
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="relative mt-14 pl-8 md:pl-10">
        <div
          className="absolute bottom-1 left-[7px] top-1 w-px bg-border md:left-[9px]"
          aria-hidden
        />

        <ol className="flex flex-col gap-10">
          {EXPERIENCE_ITEMS.map((item, index) => (
            <motion.li
              key={item.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={itemVariants}
              className="relative"
            >
              <span
                className="absolute -left-8 top-1.5 flex h-3.5 w-3.5 items-center justify-center md:-left-10"
                aria-hidden
              >
                {item.current ? (
                  <>
                    <motion.span
                      className="absolute h-full w-full rounded-full bg-brand/40"
                      animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    <span className="h-2 w-2 rounded-full bg-brand" />
                  </>
                ) : (
                  <span className="h-2 w-2 rounded-full border-2 border-border bg-background" />
                )}
              </span>

              <div className="rounded-2xl border border-border bg-surface-elevated/50 p-6 shadow-sm transition-colors duration-300 hover:border-brand/30 md:p-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display text-lg font-semibold text-foreground md:text-xl">
                    {t(`items.${item.id}.role`)}
                  </h3>
                  {item.current ? (
                    <span className="inline-flex items-center rounded-full bg-brand-muted/60 px-2.5 py-0.5 text-xs font-medium text-brand">
                      {t("current")}
                    </span>
                  ) : null}
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  <span className="font-medium text-text-secondary">
                    {t(`items.${item.id}.company`)}
                  </span>
                  <span aria-hidden>•</span>
                  <span>{t(`items.${item.id}.period`)}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t(`items.${item.id}.description`)}
                </p>
                {item.tags?.length ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <span className="inline-flex items-center rounded-lg border border-border/80 bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
