"use client";

import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("HomePage.HeroSection");

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center space-y-6 px-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
