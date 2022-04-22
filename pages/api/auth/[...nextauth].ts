import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  LoginDto,
  TokenResponse,
} from "../../../components/auth/login-form/types";
import { authenticate } from "../../../services/auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "bug-tracker",
      credentials: {
        username: {
          label: "username",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload: LoginDto = {
          username: credentials?.username,
          password: credentials?.password,
        };

        try {
          const user = await authenticate(payload);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && user.data) {
        token.accessToken = user.accessToken as TokenResponse;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
