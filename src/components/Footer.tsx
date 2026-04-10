"use client";

import { Github, Linkedin, PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("footer");

  const links = [
    { href: "#about", label: t("links.about") },
    { href: "#projects", label: t("links.projects") },
    { href: "#resume", label: t("links.resume") },
    { href: "#contact", label: t("links.contact") },
  ];

  const socials = [
    {
      href: "https://github.com/vudaian24",
      icon: Github,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/v%C5%A9-%C4%91%E1%BA%A1i-an-75110137b/",
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "https://zalo.me/0398270233",
      icon: PhoneCall,
      label: "Zalo",
    },
  ];

  return (
    <footer className="relative z-10 mt-24 border-t border-border bg-surface/40">
      <div className="section-shell py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-display text-xl font-semibold tracking-tight text-foreground">
              {t("brand")}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
              {t("about")}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="section-label mb-4">{t("links.title")}</p>
            <ul className="space-y-2.5">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="section-label mb-4">{t("socials.title")}</p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-elevated/80 px-3 py-2 text-sm text-text-secondary transition-all hover:border-brand/40 hover:text-brand"
                  aria-label={s.label}
                >
                  <s.icon size={16} strokeWidth={1.75} />
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/80 pt-8 text-center text-xs text-text-muted sm:text-left">
          <p>
            © {new Date().getFullYear()} {t("brand")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
