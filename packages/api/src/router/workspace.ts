import { desc, ensureSingleItemOrNull, eq, schema } from "@dashbored/db";
import {
  insertWorkspaceSchema,
  workspaces,
} from "@dashbored/db/schema/workspace";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workspaceRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return await ctx.db.query.workspaces.findMany({
      orderBy: desc(workspaces.id),
    });
  }),

  byId: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return await ctx.db.query.workspaces.findFirst({
        where: eq(workspaces.slug, input.slug),
      });
    }),

  pollSessionWithWorkspace: protectedProcedure
    .input(z.object({ workspaceSlug: z.string() }))
    .mutation(({ ctx, input }) => {
      const foundWorkspaceInSession = ctx.session.user.workspaces.findIndex(
        (ws) => ws.slug === input.workspaceSlug,
      );

      if (foundWorkspaceInSession === -1)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workspace not found in session",
        });

      return { success: true, workspaceSlug: input.workspaceSlug };
    }),

  checkUniqueSlug: protectedProcedure
    .input(z.object({ slug: z.string().toLowerCase() }))
    .mutation(async ({ ctx, input }) => {
      const matchedSlugs = await ctx.db.query.workspaces.findMany({
        where: eq(workspaces.slug, input.slug),
      });

      return matchedSlugs.length > 0 ? false : true;
    }),

  create: protectedProcedure
    .input(insertWorkspaceSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const newWorkspace = await tx
          .insert(schema.workspaces)
          .values(input)
          .returning({
            id: workspaces.id,
            slug: workspaces.slug,
          });

        const parsedNewWorkspace = ensureSingleItemOrNull(newWorkspace);

        if (!parsedNewWorkspace) {
          tx.rollback();
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred, please try again later.",
          });
        }

        await tx.insert(schema.usersToWorkspaces).values({
          userId: ctx.session.user.id,
          workspaceId: parsedNewWorkspace.id,
        });

        return parsedNewWorkspace;
      });
    }),

  // delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(schema.post).where(eq(schema.post.id, input));
  // }),
});
