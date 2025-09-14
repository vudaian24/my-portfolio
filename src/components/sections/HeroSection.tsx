"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const t = useTranslations("HomePage.HeroSection");

  return (
    <section
      id="home"
      className="relative container min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-4 sm:px-6 lg:px-8 mx-auto overflow-hidden py-10"
    >
      <div className="flex-1 order-2 md:order-1 text-center md:text-left space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          <motion.span
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block"
            style={{
              backgroundSize: "200% auto",
            }}
            animate={{
              backgroundPosition: ["0% center", "200% center"],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "linear",
            }}
          >
            {t("title")}
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0"
        >
          {t("description")}
        </motion.p>
        <div className="overflow-hidden relative h-10 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="overflow-hidden relative h-10 mt-6"
          >
            <span className="mr-8">{t("marqueeText")}</span>
            <span>{t("marqueeText")}</span>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mt-8"
        >
          <Link
            href="#projects"
            className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg overflow-hidden group"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 inline-block">
              {t("ctaProjects")}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 blur-md transition duration-500"></span>
          </Link>
          <Link
            href="#contact"
            className="relative px-6 py-3 rounded-xl border border-border text-foreground font-semibold overflow-hidden group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              {t("ctaContact")}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
          </Link>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="md:flex-1 order-1 md:order-2 flex justify-center"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-accent">
          <Image
            src="https://placehold.co/400"
            alt="Portrait"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
