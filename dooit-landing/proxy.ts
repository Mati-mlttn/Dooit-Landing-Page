import { NextResponse, type NextRequest } from "next/server";
import { isLocale, type Locale } from "@/lib/i18n";

const localeCookie = "dooit-locale";

function detectLocale(request: NextRequest): Locale {
  const savedLocale = request.cookies.get(localeCookie)?.value;

  if (savedLocale && isLocale(savedLocale)) return savedLocale;

  const acceptedLanguages = request.headers
    .get("accept-language")
    ?.split(",")
    .map((entry) => entry.split(";")[0].trim().split("-")[0]);

  return acceptedLanguages?.find(isLocale) ?? "en";
}

export function proxy(request: NextRequest) {
  const pathLocale = request.nextUrl.pathname.split("/")[1];

  if (isLocale(pathLocale)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-dooit-locale", pathLocale);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.cookies.set(localeCookie, pathLocale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  const locale = detectLocale(request);
  const destination = request.nextUrl.clone();
  destination.pathname = `/${locale}`;

  const response = NextResponse.redirect(destination);
  response.cookies.set(localeCookie, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/", "/en", "/es"],
};
