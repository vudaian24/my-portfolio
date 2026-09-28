import { getTranslations } from "next-intl/server";
import FeaturedWorkSectionClient, {
  type FeaturedWorkContent,
} from "./FeaturedWorkSectionClient";
import { FEATURED_PROJECT_ID, PROJECTS } from "@/config/site";

export default async function FeaturedWorkSection() {
  const t = await getTranslations("HomePage.FeaturedWork");
  const tp = await getTranslations("HomePage.Projects");
  const project = PROJECTS.find((p) => p.id === FEATURED_PROJECT_ID)!;

  const content: FeaturedWorkContent = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    cta: t("cta"),
    live: t("live"),
    projectsLabel: tp("title"),
    project: {
      id: project.id,
      href: project.href,
      title: tp(`items.${project.id}.title`),
      role: tp(`items.${project.id}.role`),
      period: tp(`items.${project.id}.period`),
      summary: tp(`items.${project.id}.summary`),
    },
  };

  return <FeaturedWorkSectionClient content={content} />;
}
