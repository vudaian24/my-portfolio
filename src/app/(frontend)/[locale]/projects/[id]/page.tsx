import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { isProjectId, PROJECTS } from "@/config/site";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECTS.map((p) => ({ locale, id: p.id })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params;
  if (!isProjectId(id)) return {};
  const t = await getTranslations({ locale, namespace: "HomePage.Projects" });
  return { title: t(`items.${id}.title`) };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  if (!isProjectId(id)) notFound();

  const project = PROJECTS.find((p) => p.id === id)!;
  const t = await getTranslations("HomePage.CaseStudy");
  const tp = await getTranslations("HomePage.Projects");
  const bullets = tp.raw(`items.${id}.bullets`) as string[];

  return (
    <article className="section-shell py-12 md:py-16">
      <Link
        href={{ pathname: "/", hash: "projects" }}
        className="text-sm font-medium text-brand underline-offset-4 hover:underline"
      >
        {t("back")}
      </Link>
      <h1 className="font-display mt-6 text-3xl font-semibold md:text-5xl">
        {tp(`items.${id}.title`)}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        {tp(`items.${id}.summary`)}
      </p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-xs uppercase tracking-wider text-text-muted">
            {t("role")}
          </dt>
          <dd className="mt-1 font-medium">{tp(`items.${id}.role`)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-text-muted">
            {t("period")}
          </dt>
          <dd className="mt-1 font-medium">{tp(`items.${id}.period`)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-text-muted">
            {t("team")}
          </dt>
          <dd className="mt-1 font-medium">{tp(`items.${id}.team`)}</dd>
        </div>
      </dl>
      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold">{t("approach")}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {bullets.map((b) => (
            <li key={b.slice(0, 32)}>{b}</li>
          ))}
        </ul>
      </section>
      {project.tags?.length ? (
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">{t("stack")}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-border px-2.5 py-1 text-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <div className="mt-12 flex flex-wrap gap-3">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            {project.id === "portfolio" ? t("repo") : t("live")}
          </a>
        ) : (
          <p className="text-sm text-text-muted">{t("noPublicLink")}</p>
        )}
      </div>
    </article>
  );
}
