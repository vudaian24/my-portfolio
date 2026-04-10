"use client";

import Link from "next/link";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Mail,
  FileText,
  Github,
  Linkedin,
  PhoneCall,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const t = useTranslations("Common.nav");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { href: "#home", label: t("home"), icon: Home },
    { href: "#about", label: t("about"), icon: User },
    { href: "#projects", label: t("projects"), icon: Briefcase },
    { href: "#resume", label: t("resume"), icon: FileText },
    { href: "#contact", label: t("contact"), icon: Mail },
  ];

  const socialLinks = [
    { href: "https://github.com/vudaian24", icon: Github, label: "GitHub" },
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
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[box-shadow,background-color,border-color] duration-300",
          scrolled
            ? "border-b border-border/80 bg-background/85 shadow-sm backdrop-blur-md"
            : "border-b border-transparent bg-background/70 backdrop-blur-sm",
        )}
      >
        <nav
          className="section-shell flex h-16 items-center justify-between md:h-[4.25rem]"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-brand md:text-xl"
          >
            {t("brand")}
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                <item.icon
                  size={15}
                  className="text-brand opacity-80 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                {item.label}
              </Link>
            ))}
            <div className="ml-2 h-6 w-px bg-border" aria-hidden />
            <div className="flex items-center gap-0.5 pl-1">
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-surface hover:text-brand"
                  aria-label={social.label}
                >
                  <social.icon size={18} strokeWidth={1.75} />
                </Link>
              ))}
            </div>
            <LanguageSelector />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSelector />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-surface/80 text-foreground transition-colors hover:border-brand/30 hover:bg-brand-muted/30"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-nav"
          className={cn(
            "fixed inset-x-0 top-16 z-40 border-b border-border bg-background/95 backdrop-blur-lg transition-[opacity,visibility] duration-200 lg:hidden",
            isOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0",
          )}
        >
          <div className="section-shell max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto py-6">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-surface"
                  >
                    <item.icon size={18} className="text-brand" aria-hidden />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center gap-4 border-t border-border pt-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border bg-surface/50 p-3 text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
                  aria-label={social.label}
                >
                  <social.icon size={20} strokeWidth={1.75} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-[2px] lg:hidden"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
