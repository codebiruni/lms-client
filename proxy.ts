/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import LogedUser from "./app/default/functions/LogedUser";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Get logged-in user data
  const userData: any = await LogedUser();

  // 1️⃣ If no user or no role → Redirect to login with callback
  if (!userData || !userData.role) {
    const loginUrl = new URL("/login", request.url);
    // Optional: Add the current page as a callback so they return here after login
    loginUrl.searchParams.set("callbackUrl", pathname); 
    return NextResponse.redirect(loginUrl);
  }

  // 2️⃣ Role-based access logic
  const isStudent = userData.role === "student";
  const isStaff = ["instructor", "admin", "staff"].includes(userData.role);

  if (isStudent && pathname.startsWith("/profile")) {
    return NextResponse.next();
  } 
  
  if (isStaff && pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // 3️⃣ If role doesn't match the path → Send back to login (or an unauthorized page)
  const fallbackUrl = new URL("/login", request.url);
  return NextResponse.redirect(fallbackUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*" , "/course/enroll/:path*"],
};