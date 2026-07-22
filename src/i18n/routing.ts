import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "vi"],

  // Used when no locale matches
  defaultLocale: "en",

  // Optional: define a custom locale prefix
  localePrefix: {
    mode: "as-needed",
  },

  // Always resolve strictly from the URL/defaultLocale. With this left on
  // (the default), a stale NEXT_LOCALE cookie from a previous visit to a
  // non-default locale takes priority over the current URL, so switching
  // locale client-side and then triggering another navigation (e.g. a nav
  // link) makes the middleware redirect back to the old locale.
  localeDetection: false,
});
