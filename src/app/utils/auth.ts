import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/lib/prisma/prismadb";
import * as bcrypt from "bcrypt";
import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

import type { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text", placeholder: "login" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.login || !credentials.password)
          return null;

        const user = await prismadb.user.findUnique({
          where: {
            login: credentials.login,
          },
        });

        if (!user?.passwordHash) return null;

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (isCorrectPassword)
          return {
            id: user.id,
            login: user.login,
            avatarUrl: user.avatarUrl,
            githubUrl: user.githubUrl,
            ratingPoints: user.ratingPoints,
            location: user.location,
          };

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          login: (user as AdapterUser).name,
          avatarUrl: (user as AdapterUser).image,
          email: (user as AdapterUser).email,
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          login: token.login,
          avatarUrl: token.avatarUrl,
          email: token.email,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: true,
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
} satisfies NextAuthOptions;

export default authOptions;
