import type { MetadataRoute } from "next";
import { PROJECT_IDS, SITE_URL } from "@/config/site";
import { routing } from "@/i18n/routing";

function localizedPath(locale: string, path = "") {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    routes.push({
      url: localizedPath(locale),
      changeFrequency: "monthly",
      priority: 1,
    });

    for (const id of PROJECT_IDS) {
      routes.push({
        url: localizedPath(locale, `/projects/${id}`),
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
