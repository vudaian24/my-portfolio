import { IBM_Plex_Mono } from "next/font/google";

import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

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
      <head>
        <meta
          name="google-site-verification"
          content="LgXbQ8fD2jVE3_t2QErjCrFi6SxC8NEYaRC-jGwXLgU"
        />
      </head>
      <body
        className={cn(`${plexMono.variable} antialiased`)}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale}>
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
            <BackToTopButton />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
