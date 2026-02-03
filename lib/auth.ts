import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/lib/validators/login.schema";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User.model";
import { Session } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        const data = LoginSchema.parse(credentials);
        await connectToDatabase();
        const user = await User.findOne({ email: data.email });
        if (!user) throw new Error("Invalid credentials");
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          profileImg: user.profileImg,
        };
      },
    }),
  ],
  callbacks: {
    // @ts-expect-error NextAuth callback params are not explicitly typed
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.profileImg = user.profileImg;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: Record<string, unknown>;
    }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.profileImg = token.profileImg as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
