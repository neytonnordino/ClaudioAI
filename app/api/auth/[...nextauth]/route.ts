import { handlers } from "@/auth"; // Referring to the auth.ts we just created
// import NextAuth from "next-auth";

// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID!,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET!,
//     }),
//   ],
// });

export const { GET, POST } = handlers;
