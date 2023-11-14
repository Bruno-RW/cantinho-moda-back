import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    type: string;
    name: string;
  }

  interface Session {
    user: User & {
      type: string;
      name: string;
    };
    token: {
      type: string;
      name: string;
    };
  }
}

// import { DefaultSession, DefaultUser } from "next-auth";
// import { DefaultJWT } from "next-auth/jwt";

// declare module "next-auth" {
//   interface User extends DefaultUser {
//     type: string;
//     fullName: string;
//   }

//   interface Session {
//     user: {
//       type: string;
//       fullName: string;
//     } & DefaultSession;

//     token: {
//       type: string;
//       fullName: string;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     type: string;
//     fullName: string;
//   }
// }
