import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "./routing";

import en from "../messages/en.json";
import fr from "../messages/fr.json";
import ar from "../messages/ar.json";

const messagesMap: Record<Locale, typeof en> = { en, fr, ar };
const LOCALE_COOKIE = "NEXT_LOCALE";

function getLocale(): Locale {
  // 1. Check cookie
  const cookieStore = cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // 2. Check Accept-Language header
  const headersList = headers();
  const acceptLanguage = headersList.get("Accept-Language");
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().split("-")[0]);

    for (const lang of preferredLocales) {
      if (locales.includes(lang as Locale)) {
        return lang as Locale;
      }
    }
  }

  // 3. Default locale
  return defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = getLocale();

  return {
    locale,
    messages: messagesMap[locale],
  };
});
