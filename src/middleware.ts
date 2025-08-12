import { type NextRequest, NextResponse } from "next/server";
import RoleMenu from "./models/system/role-menu";

const allowAnonymous = ["/login"];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  //if (process.env.NODE_ENV !== "development") {
    if (!allowAnonymous.some((value) => request.nextUrl.pathname.startsWith(value))) {
      // #region authentication
      let accessToken = request.cookies.get("access_token");
      let refreshToken = request.cookies.get("refresh_token");
      if (accessToken === undefined && refreshToken === undefined) {
        const url = request.nextUrl.clone();
        url.pathname = `/login`;
        if (request.nextUrl.pathname !== "/") {
          url.search = `path=${encodeURIComponent(request.nextUrl.pathname)}`;
        }
        return NextResponse.redirect(url);
      } else if (accessToken === undefined && refreshToken !== undefined) {
        try {
          const responseRefreshToken = await fetch(`${process.env.BACKEND_HOST}/api/system/authentication/refresh-token`, {
            method: "GET",
            cache: "no-cache",
            headers: {
              authorization: `Bearer ${refreshToken.value}`,
            },
          });

          if (responseRefreshToken.ok) {
            const json = await responseRefreshToken.json();

            response.cookies.set({
              name: "access_token",
              value: json["access_token"],
              expires: new Date(json["access_token_expires"]),
              path: "/",
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              priority: "high",
            });
            response.cookies.set({
              name: "refresh_token",
              value: json["refresh_token"],
              expires: new Date(json["refresh_token_expires"]),
              path: "/",
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              priority: "high",
            });

            accessToken = response.cookies.get("access_token");
            refreshToken = response.cookies.get("refresh_token");
          } else {
            const url = request.nextUrl.clone();
            url.pathname = `/login`;
            if (request.nextUrl.pathname !== "/") {
              url.search = `path=${encodeURIComponent(request.nextUrl.pathname)}`;
            }
            return NextResponse.redirect(url);
          }
        } catch (error) {
          console.error(error);
          return;
        }
      }
      // #endregion

      // #region authorization
      const unauthorizeUrl = new URL(`/unauthorize`, request.url);
      try {
        const responsePagePermission = await fetch(
          `${process.env.BACKEND_HOST}/api/system/authentication/page-permission`,
          {
            method: "GET",
            cache: "no-cache",
            headers: {
              authorization: `Bearer ${accessToken?.value}`,
            },
          },
        );

        if (responsePagePermission.ok) {
          const data = (await responsePagePermission.json()) as RoleMenu[];
          const result = data.some(
            (item) =>
              request.nextUrl.pathname.toLowerCase().startsWith(item.menu!.path!.toLowerCase()) && item.isRead === true,
          );
          if (!result) {
            return NextResponse.redirect(unauthorizeUrl);
          }
        } else {
          const url = request.nextUrl.clone();
          url.pathname = `/login`;
          if (request.nextUrl.pathname !== "/") {
            url.search = `path=${encodeURIComponent(request.nextUrl.pathname)}`;
          }
          return NextResponse.redirect(url);
        }
      } catch (error) {
        console.error(error);

        return NextResponse.redirect(unauthorizeUrl);
      }
      // #endregion
    }
  //}
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
