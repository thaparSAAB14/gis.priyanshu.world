import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Vercel mapping actively exposes the fundamental environment host request header
  const hostname = request.headers.get("host") || "";

  /**
   * 1. Next.js Sandbox Routing 
   * Transparently proxies incoming traffic natively aimed towards lab.priyanshu.world
   * straight into the deeply-nested /lab experimental route without UI redirects.
   */
  if (hostname.includes("lab.priyanshu.world")) {
    if (url.pathname === "/") {
      url.pathname = "/lab";
      return NextResponse.rewrite(url);
    }
  }

  /**
   * 2. Geographic Portfolio Routing 
   * Strictly enforces standard traffic stays within the primary root component tree.
   * Directly protects /lab experimental routes from creeping into professional search results
   * by violently dropping them into a cross-origin redirect back to the lab subdomain.
   */
  if (hostname.includes("gis.priyanshu.world")) {
    if (url.pathname.startsWith("/lab")) {
      return NextResponse.redirect(`https://lab.priyanshu.world${url.pathname.replace('/lab', '') || '/'}`);
    }
  }

  /**
   * 3. Root Domain Blackhole 
   * The user deliberately requested the bare domain (and www) inherently fail
   * resolving into the deeply-styled 404 interactive error component.
   */
  if (hostname === "priyanshu.world" || hostname === "www.priyanshu.world") {
    url.pathname = "/void-404-unmapped";
    return NextResponse.rewrite(url);
  }

  // Security headers are now managed globally in next.config.ts
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Intercept all operational request trees barring explicit API pipelines, 
     * core Next static artifacts, image chunks, and raw icon requests.
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
