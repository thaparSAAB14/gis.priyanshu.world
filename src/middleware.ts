import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
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

  // Inject Production Grade Sec Headers matching industry strict-origin requirements.
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  return response;
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
