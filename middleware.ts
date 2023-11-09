import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (request.nextUrl.pathname.startsWith("/users") && request.nextauth.token?.type !== "M") {
      return NextResponse.redirect( new URL("/", request.url) );
    }

    if (request.nextUrl.pathname.startsWith("/companies") && request.nextauth.token?.type !== "M") {
      return NextResponse.redirect( new URL("/", request.url) );
    }

    const origin = request.nextUrl.origin;
    const pathname = request.nextUrl.pathname;
    const requestHeaders = new Headers(request.headers);
    
    requestHeaders.set("x-url", request.url);
    requestHeaders.set("x-origin", origin);
    requestHeaders.set("x-pathname", pathname);

    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/((?!api/).*)"],
};