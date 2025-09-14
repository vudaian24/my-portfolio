"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ResumeSection() {
  const t = useTranslations("HomePage.ResumeSection");

  return (
    <section
      id="resume"
      className="min-h-screen flex items-center justify-center px-6 bg-muted/5"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          {t("title")}
        </h2>

        <p className="text-muted-foreground text-lg">{t("description")}</p>

        <motion.a
          href="/cv.pdf"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-yellow-500 text-yellow-500 font-semibold overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
            <Download className="w-5 h-5" />
            {t("button")}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
        </motion.a>
      </motion.div>
    </section>
  );
}
