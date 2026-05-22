import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { SupabaseAdapter } from "./supabase-adapter";

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter(),
  providers: [
    EmailProvider({
      server: {
        host: "smtp.resend.com",
        port: 465,
        secure: true,
        auth: {
          user: "resend",
          pass: process.env.RESEND_API_KEY!,
        },
      },
      from: process.env.EMAIL_FROM!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async session({ session, user }) {
      // Attach user.id to the session so we can use it in API routes
      if (session.user) {
        (session.user as any).id = user.id;
      }
      return session;
    },
  },
  session: {
    strategy: "database",
  },
};
