"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import type { AvailableLocale } from "@/lib/types";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

interface Language {
  code: AvailableLocale;
  flag: string;
  label: string;
}

export default function LanguageSelector() {
  const t = useTranslations("Common.Languages");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages: Language[] = [
    {
      code: "vi",
      flag: "🇻🇳",
      label: t("vi"),
    },
    {
      code: "en",
      flag: "🇺🇸",
      label: t("en"),
    },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const handleLanguageChange = (newLocale: AvailableLocale) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div className="relative group">
      <button
        className="relative flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-foreground hover:text-foreground transition-all duration-300 ease-out"
        aria-haspopup="true"
      >
        <span className="relative z-10 flex items-center gap-2 cursor-pointer">
          <span className="hidden sm:inline">
            {currentLanguage?.flag} {currentLanguage?.label}
          </span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
          <ChevronDown
            size={14}
            className="transition-transform duration-200 group-hover:rotate-180"
          />
        </span>
        <div
          className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out opacity-10"
          style={{
            background:
              "linear-gradient(to right, var(--accent-green), var(--accent-teal))",
          }}
        />
        <div className="absolute inset-0 bg-surface/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out delay-75" />
      </button>
      <div className="absolute top-full left-0 right-0 h-2"></div>
      <div
        className="absolute top-full mt-2 md:right-0 left-0 z-20 min-w-[180px] 
          bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-xl shadow-black/10 
          opacity-0 scale-95 pointer-events-none 
          group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto 
          transition-all duration-200 ease-out origin-top"
      >
        <div className="p-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center gap-3 cursor-pointer px-3 py-2.5 text-sm rounded-lg transition-all duration-200 
                hover:bg-[linear-gradient(to_right,rgba(63,142,0,0.2),rgba(42,176,144,0.2))] 
                ${
                  language.code === locale
                    ? "bg-surface/30 text-foreground font-medium"
                    : "text-foreground/80 hover:text-foreground"
                }`}
            >
              <span className="text-base">{language.flag}</span>
              <span className="flex-1 text-left">{language.label}</span>
              {language.code === locale && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--accent-green)" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
