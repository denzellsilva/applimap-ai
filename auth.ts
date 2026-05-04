import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;
      const isAuthRoute = ["/login", "/register"].includes(path);
      const isOauthRoute = path.startsWith("/oauth");

      if (isLoggedIn && isAuthRoute) {
        return Response.redirect(new URL("/oauth", nextUrl));
      }

      if (!isLoggedIn && isOauthRoute) {
        return false;
      }

      return true;
    },
  },
});
