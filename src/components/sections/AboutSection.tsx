"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function AboutSection() {
  const t = useTranslations("HomePage.AboutSection");

  const skills = [
    t("skills.react"),
    t("skills.nextjs"),
    t("skills.typescript"),
    t("skills.node"),
    t("skills.tailwind"),
    t("skills.framer"),
    t("skills.git"),
  ];

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-border/60 py-20 md:py-28"
    >
      <div className="section-shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <p className="section-label mb-3">{t("eyebrow")}</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("description")}
            </p>
            <Link
              href="#projects"
              className="font-display mt-8 inline-flex h-11 items-center rounded-lg border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand/40 hover:bg-brand-muted/25"
            >
              {t("cta")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-6"
          >
            <div className="rounded-2xl border border-border bg-surface-elevated/60 p-6 shadow-sm backdrop-blur-sm md:p-8">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-text-secondary">
                {t("skillsTitle")}
              </h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {skills.map((name) => (
                  <li key={name}>
                    <span className="inline-flex items-center rounded-lg border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground md:text-sm">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
