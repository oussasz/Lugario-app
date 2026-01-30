import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

import { defaultLocale, locales, type Locale } from "./i18n/routing";

const LOCALE_COOKIE = "NEXT_LOCALE";

function getLocaleFromRequest(request: NextRequest): Locale {
  // 1. Check cookie
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get("Accept-Language");
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

const authMiddleware = withAuth({
  pages: {
    signIn: "/",
  },
});

const protectedRoutes = [
  "/favorites",
  "/properties",
  "/reservations",
  "/trips",
];

function isProtectedPath(pathname: string) {
  return protectedRoutes.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  const locale = getLocaleFromRequest(request);

  // Create response (just pass through, no rewriting)
  let response = NextResponse.next();

  // Set the locale cookie if not already set
  if (!request.cookies.has(LOCALE_COOKIE)) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      sameSite: "lax",
    });
  }

  // Handle auth for protected routes
  if (isProtectedPath(request.nextUrl.pathname)) {
    const authResponse = await authMiddleware(request as any, event);
    if (authResponse) {
      const authLocation = authResponse.headers.get("location");
      if (authLocation) return authResponse;
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
