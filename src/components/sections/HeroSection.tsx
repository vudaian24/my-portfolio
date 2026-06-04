import { getTranslations } from "next-intl/server";
import HeroSectionClient, { type HeroContent } from "./HeroSectionClient";

export default async function HeroSection() {
  const t = await getTranslations("HomePage.HeroSection");

  const content: HeroContent = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    description: t("description"),
    marqueeText: t("marqueeText"),
    ctaProjects: t("ctaProjects"),
    ctaContact: t("ctaContact"),
    photoAlt: t("photoAlt"),
  };

  return <HeroSectionClient content={content} />;
}
