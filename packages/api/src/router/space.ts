import { and, desc, ensureSingleItemOrNull, eq, schema } from "@dashbored/db";
import { insertSpaceSchema, spaces } from "@dashbored/db/schema/space";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const spaceRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return await ctx.db.query.spaces.findMany({
      orderBy: desc(spaces.id),
    });
  }),

  byId: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return await ctx.db.query.spaces.findFirst({
        where: eq(spaces.slug, input.slug),
      });
    }),

  checkUniqueSlug: protectedProcedure
    .input(z.object({ slug: z.string().toLowerCase() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.currentWorkspace) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Unable to get current workspace",
        });
      }

      if (["create", "edit"].includes(input.slug)) {
        return false;
      }

      const matchedSlugs = await ctx.db.query.spaces.findMany({
        where: and(
          eq(spaces.slug, input.slug),
          eq(spaces.workspaceId, ctx.currentWorkspace?.id),
        ),
      });

      return matchedSlugs.length > 0 ? false : true;
    }),

  create: protectedProcedure
    .input(insertSpaceSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        if (!ctx.currentWorkspace) {
          tx.rollback();
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Unable to get current workspace",
          });
        }

        const newSpace = await tx
          .insert(schema.spaces)
          .values({
            workspaceId: ctx.currentWorkspace.id,
            ...input,
          })
          .returning();

        const parsedNewSpace = ensureSingleItemOrNull(newSpace);

        if (!parsedNewSpace) {
          tx.rollback();
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred, please try again later.",
          });
        }

        return parsedNewSpace;
      });
    }),

  // delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(schema.post).where(eq(schema.post.id, input));
  // }),
});
