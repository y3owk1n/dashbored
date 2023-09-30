import Google from "@auth/core/providers/google";
import type { DefaultSession } from "@auth/core/types";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, eq, tableCreator } from "@dashbored/db";
import type { Workspaces } from "@dashbored/db/schema/workspace";
import { usersToWorkspaces, workspaces } from "@dashbored/db/schema/workspace";
import type { Session } from "next-auth";
import NextAuth from "next-auth";

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
    session: async ({ session, user }) => {
      let currentWorkspaces: Session["user"]["workspaces"] = [];
      if (user) {
        const userWithWorkspace = await db
          .select()
          .from(usersToWorkspaces)
          .leftJoin(
            workspaces,
            eq(usersToWorkspaces.workspaceId, workspaces.id),
          )
          .where(eq(usersToWorkspaces.userId, user.id));

        if (userWithWorkspace.length === 0) {
          currentWorkspaces = [];
        } else {
          currentWorkspaces = userWithWorkspace.map((ws) => {
            return {
              id: ws.workspace!.id,
              slug: ws.workspace!.slug,
            };
          });
        }
      }

      return {
        ...session,
        user: {
          ...session.user,
          workspaces: currentWorkspaces,
          id: user.id,
        },
      };
    },

    // @TODO - if you wanna have auth on the edge
    // jwt: ({ token, profile }) => {
    //   if (profile?.id) {
    //     token.id = profile.id;
    //     token.image = profile.picture;
    //   }
    //   return token;
    // },

    // @TODO
    // authorized({ request, auth }) {
    //   return !!auth?.user
    // }
  },
});
