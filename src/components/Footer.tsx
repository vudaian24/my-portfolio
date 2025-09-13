"use client";

import { Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("footer");

  const links = [
    {
      href: "#about",
      label: t("links.about"),
      hover: "hover:text-accent-green",
    },
    {
      href: "#projects",
      label: t("links.projects"),
      hover: "hover:text-accent-blue",
    },
    {
      href: "#contact",
      label: t("links.contact"),
      hover: "hover:text-accent-orange",
    },
    {
      href: "#resume",
      label: t("links.resume"),
      hover: "hover:text-accent-teal",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-surface via-surface/95 to-background border-t border-border/50 mt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-green/5 via-transparent to-accent-teal/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-blue/3 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-orange/3 rounded-full blur-3xl translate-y-1/2" />

      <div className="relative container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-accent-green to-accent-teal bg-clip-text">
                {t("brand")}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
                {t("about")}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6 relative">
              {t("links.title")}
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-accent-blue to-accent-teal rounded-full" />
            </h3>
            <ul className="space-y-3">
              {links.map((item, _index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group text-text-secondary transition-all duration-300 ${item.hover} flex items-center gap-2 hover:translate-x-1`}
                  >
                    <div className="w-1 h-1 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6 relative">
              {t("socials.title")}
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-accent-green to-accent-orange rounded-full" />
            </h3>
            <div className="flex gap-4">
              <Link
                href="https://github.com/vudaian24"
                target="_blank"
                className="group p-3 rounded-xl bg-surface/50 border border-border/50 text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 hover:bg-accent-blue/5 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <Github
                  size={20}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/in/v%C5%A9-%C4%91%E1%BA%A1i-an-75110137b/"
                target="_blank"
                className="group p-3 rounded-xl bg-surface/50 border border-border/50 text-text-secondary hover:text-accent-green hover:border-accent-green/30 hover:bg-accent-green/5 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <Linkedin
                  size={20}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm">© 2025 {t("brand")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
