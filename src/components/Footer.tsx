"use client"

import { Github, Linkedin } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

const Footer = () => {
  const t = useTranslations("footer")

  const links = [
    { href: "#about", label: t("links.about"), hover: "hover:text-accent-green" },
    { href: "#projects", label: t("links.projects"), hover: "hover:text-accent-blue" },
    { href: "#contact", label: t("links.contact"), hover: "hover:text-accent-orange" },
    { href: "#resume", label: t("links.resume"), hover: "hover:text-accent-teal" }
  ]

  return (
    <footer className="bg-surface border-t border-border mt-16">
      <div className="container mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">
            {t("brand")}
          </h2>
          <p className="text-secondary text-sm leading-relaxed">
            {t("about")}
          </p>
        </div>

        <div>
          <h3 className="text-base font-medium text-primary mb-4">
            {t("links.title")}
          </h3>
          <ul className="space-y-2">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-secondary transition-colors ${item.hover}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-medium text-primary mb-4">
            {t("socials.title")}
          </h3>
          <div className="flex gap-4">
            <Link
              href="https://github.com/vudaian24"
              target="_blank"
              className="text-muted hover:text-accent-blue transition-colors"
            >
              <Github size={22} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/v%C5%A9-%C4%91%E1%BA%A1i-an-75110137b/"
              target="_blank"
              className="text-muted hover:text-accent-green transition-colors"
            >
              <Linkedin size={22} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
