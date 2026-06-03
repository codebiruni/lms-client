/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import LogedUser from "./app/default/functions/LogedUser";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userData: any = await LogedUser();

  // Not logged in
  if (!userData || !userData?.role) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  const isStudent = userData.role === "student";
  const isStaff = ["admin", "staff", "instructor"].includes(
    userData.role
  );

  // Student Routes
  if (
    isStudent &&
    (
      pathname.startsWith("/profile") ||
      pathname.startsWith("/course/enrollment")
    )
  ) {
    return NextResponse.next();
  }

  // Staff Routes
  if (
    isStaff &&
    pathname.startsWith("/dashboard")
  ) {
    return NextResponse.next();
  }

  // Logged in user trying to access login page
  if (pathname === "/login") {
    return NextResponse.redirect(
      new URL(
        isStudent ? "/profile" : "/dashboard",
        request.url
      )
    );
  }

  // Unauthorized
  return NextResponse.redirect(
    new URL(
      isStudent ? "/profile" : "/dashboard",
      request.url
    )
  );
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/course/enrollment/:path*",
  ],
};