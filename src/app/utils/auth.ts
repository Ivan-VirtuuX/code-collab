import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/lib/prisma/prismadb";
import * as bcrypt from "bcrypt";
import { getServerSession, NextAuthOptions } from "next-auth";

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
          select: {
            pointsHistory: {
              select: {
                author: true,
                eventType: true,
                points: true,
              },
            },
            id: true,
            login: true,
            passwordHash: true,
            bio: true,
            avatarUrl: true,
            githubUrl: true,
            location: true,
            ratingPoints: true,
          },
        });

        if (!user?.passwordHash) throw new Error("Неверный логин или пароль");

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isCorrectPassword) throw new Error("Неверный логин или пароль");

        return {
          id: user.id,
          login: user.login,
          bio: user.bio,
          avatarUrl: user.avatarUrl,
          githubUrl: user.githubUrl,
          ratingPoints: user.ratingPoints,
          location: user.location,
          pointsHistory: user.pointsHistory,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update" && session.avatarUrl)
        token.avatarUrl = session.avatarUrl;

      if (trigger === "update" && session.ratingPoints)
        token.ratingPoints = session.ratingPoints;

      if (
        trigger === "update" &&
        (session.login || session.githubUrl || session.location || session.bio)
      ) {
        token.login = session.login;
        token.githubUrl = session.githubUrl;
        token.location = session.location;
        token.bio = session.bio;
      }

      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      session.user = token as any;

      return session;
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
export const auth = () => getServerSession(authOptions);
export default authOptions;
