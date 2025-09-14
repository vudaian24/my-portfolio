"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("HomePage.AboutSection");

  const skills = [
    { name: t("skills.react") },
    { name: t("skills.nextjs") },
    { name: t("skills.typescript") },
    { name: t("skills.node") },
    { name: t("skills.tailwind") },
    { name: t("skills.framer") },
    { name: t("skills.git") },
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-20 bg-background"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("description")}
          </p>
          <div className="flex justify-start">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition"
            >
              {t("cta")}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-muted/5 p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4">{t("skillsTitle")}</h3>
          <ul className="space-y-3">
            {skills.map((skill) => (
              <li key={skill.name} className="flex justify-between">
                <span>{skill.name}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
