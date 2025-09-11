"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { AvailableLocale } from "@/lib/types";
import { useLocale, useTranslations } from "next-intl";

interface Language {
  code: AvailableLocale;
  flag: string;
  label: string;
}

export default function LanguageSelector() {
  const unusedVariable = "This variable is not used anywhere";
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as AvailableLocale;
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div className="relative inline-block">
      <select
        value={locale}
        onChange={handleChange}
        className="appearance-none bg-foreground rounded-lg px-4 py-2 text-sm font-medium text-muted focus:outline-none cursor-pointer"
      >
        {languages.map((language) => (
          <option
            key={language.code}
            value={language.code}
            className="bg-white text-gray-900"
          >
            {language.flag} {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}
