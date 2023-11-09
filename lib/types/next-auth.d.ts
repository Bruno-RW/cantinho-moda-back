import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    type: string;
    fullName: string;
  }

  interface Session {
    user: User & {
      type: string;
      fullName: string;
    };
    token: {
      type: string;
      fullName: string;
    };
  }
}
