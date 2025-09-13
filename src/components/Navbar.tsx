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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: t("home"), icon: Home },
    { href: "#about", label: t("about"), icon: User },
    { href: "#projects", label: t("projects"), icon: Briefcase },
    { href: "#contact", label: t("contact"), icon: Mail },
    { href: "#resume", label: t("resume"), icon: FileText },
  ];

  const socialLinks = [
    { href: "https://github.com/vudaian24", icon: Github, label: "GitHub" },
    {
      href: "https://www.linkedin.com/in/v%C5%A9-%C4%91%E1%BA%A1i-an-75110137b/",
      icon: Linkedin,
      label: "LinkedIn",
    },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5"
            : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              href="/"
              className="group relative flex items-center space-x-2 text-xl font-bold tracking-tight"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-lg blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to right, var(--accent-green), var(--accent-teal))",
                  }}
                />
                <div
                  className="relative font-bold"
                  style={{
                    background:
                      "linear-gradient(to right, var(--accent-green), var(--accent-teal))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t("brand")}
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2 rounded-full text-sm font-medium text-foreground hover:text-foreground transition-all duration-300 ease-out"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <item.icon
                      size={16}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <span>{item.label}</span>
                  </span>
                  <div
                    className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out opacity-10"
                    style={{
                      background:
                        "linear-gradient(to right, var(--accent-green), var(--accent-teal))",
                    }}
                  />
                  <div className="absolute inset-0 bg-surface/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out delay-75" />
                </Link>
              ))}
              <LanguageSelector />
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-2">
                {socialLinks.map((social, index) => (
                  <Link
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2 rounded-full text-foreground hover:text-foreground transition-all duration-300"
                    style={{
                      animationDelay: `${(navItems.length + index) * 100}ms`,
                    }}
                  >
                    <social.icon
                      size={18}
                      className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                    />
                    <div
                      className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 opacity-20"
                      style={{
                        background:
                          "linear-gradient(to right, var(--accent-orange), var(--accent-teal))",
                      }}
                    />
                  </Link>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative p-2 rounded-full text-foreground hover:text-foreground transition-all duration-300 hover:bg-surface/50 cursor-pointer"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100",
                    )}
                  />
                  <X
                    size={24}
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      isOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0",
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "lg:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-out",
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none",
          )}
        >
          <div className="bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-xl">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group flex items-center space-x-3 px-4 py-3 rounded-xl text-foreground hover:text-foreground hover:bg-surface/50 transition-all duration-300",
                      "transform transition-all duration-500 ease-out",
                      isOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-8 opacity-0",
                    )}
                    style={{
                      transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
                    }}
                  >
                    <item.icon
                      size={20}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                <LanguageSelector />

                <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border/50">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group p-3 rounded-full text-foreground hover:text-foreground hover:bg-surface/50 transition-all duration-300",
                        "transform transition-all duration-500 ease-out",
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0",
                      )}
                      style={{
                        transitionDelay: isOpen
                          ? `${(navItems.length + index) * 100}ms`
                          : "0ms",
                      }}
                    >
                      <social.icon
                        size={20}
                        className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
