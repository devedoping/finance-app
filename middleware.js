import { getToken } from "next-auth/jwt";
import {NextResponse} from "next/server";

export async function middleware(req, res) {
    let params = {
        req,
        secret: process.env.AUTH_SECRET ?? "secret",
    }

    if(process.env.NODE_ENV === "production") {
        params.cookieName = "__Secure-authjs.session-token";
    }

    const token = await getToken(params);
    const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

    if(isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
}