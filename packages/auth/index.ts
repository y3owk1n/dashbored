import Google from "@auth/core/providers/google";
import type { DefaultSession } from "@auth/core/types";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { db, tableCreator } from "@dashbored/db";
import type { Workspaces } from "@dashbored/db/schema/workspace";

import { env } from "./env.mjs";

export type { Session } from "next-auth";

// Update this whenever adding new providers so that the client can
export const providers = ["google"] as const;
export type OAuthProviders = (typeof providers)[number];

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      workspaces: Pick<Workspaces, "id" | "slug">[];
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental,
} = NextAuth({
  adapter: DrizzleAdapter(db, tableCreator),
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
});
