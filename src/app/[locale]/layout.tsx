import { IBM_Plex_Mono } from "next/font/google";

import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-mono",
});

interface MetadataParams {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: MetadataParams) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "Common.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

interface LayoutProps {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(`${plexMono.variable} antialiased`)}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
