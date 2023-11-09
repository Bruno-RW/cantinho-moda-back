import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { compare } from "bcrypt";

import db from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {},

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "E-mail",   type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email }
        });

        if (!existingUser) return null;

        const passwordMatch = await compare(credentials.password, existingUser.password);

        if (!passwordMatch) return null;

        return {
          id: String(existingUser.id),
          type: existingUser.type,
          fullName: existingUser.fullName
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          type: user.type,
          fullName: user.fullName
        }
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          type: token.type,
          fullName: token.fullName
        }
      }
    }
  }
};
