import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  ...routing,
  localeDetection: true,
});

export const config = {
  matcher: [
    // Match all pathnames except:
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /mockups (iframe mockup files)
    // - files with extensions (static assets)
    "/((?!api|_next|mockups|.*\\..*).*)",
  ],
};
