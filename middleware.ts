import { auth } from "@/auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Protect admin routes
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", nextUrl))
    }
  }

  // Redirect logged-in users away from login page
  if (nextUrl.pathname.startsWith("/login") && isLoggedIn) {
    return Response.redirect(new URL("/admin", nextUrl))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|uploads).*)"],
}
