"use client"

import Link from "next/link"
import { Linkedin, Menu, X } from "lucide-react"
import { useTranslations } from "next-intl"
import LanguageSelector from "./LanguageSelector"
import { useState } from "react"

const Navbar = () => {
  const t = useTranslations("HomePage")
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "#home", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
    { href: "#resume", label: t("nav.resume") },
  ]

  return (
    <nav className="w-full border-b border-border bg-foreground sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-primary md:hidden lg:block block"
        >
          {t("nav.brand")}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-normal text-muted hover:text-primary transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="https://www.linkedin.com/in/v%C5%A9-%C4%91%E1%BA%A1i-an-75110137b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary transition-colors"
          >
            <Linkedin size={20} strokeWidth={1.5} />
          </Link>

          <LanguageSelector />
        </div>

        <button
          className="md:hidden text-muted hover:text-primary transition-colors cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-foreground">
          <div className="flex flex-col gap-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-normal text-muted hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/in/v%C5%A9-%C4%91%E1%BA%A1i-an-75110137b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
              >
                <Linkedin size={20} strokeWidth={1.5} />
              </Link>
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
