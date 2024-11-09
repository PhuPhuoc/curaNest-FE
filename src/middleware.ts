// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { toast } from "react-toastify";

// Define role-based paths
const roleBasedPaths = {
  admin: ["/admin"],
  user: ["/user"],
  nurse: ["/nurse"],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const userRole = req.cookies.get("userRole")?.value;

  if (!userRole) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const hasAccess = roleBasedPaths[
    userRole as keyof typeof roleBasedPaths
  ]?.some((path) => pathname.startsWith(path));

  if (!hasAccess) {
    switch (userRole) {
      case "admin":
        return NextResponse.redirect(new URL("/admin", req.url));
      case "nurse":
        return NextResponse.redirect(new URL("/nurse", req.url));
      case "user":
        return NextResponse.redirect(new URL("/user", req.url));
      default:
        return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/nurse/:path*", "/user/:path*"],
};
