import { and, desc, ensureSingleItemOrNull, eq, schema } from "@dashbored/db";
import { insertSpaceSchema, spaces } from "@dashbored/db/schema/space";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedureWithWorkspace } from "../trpc";

export const spaceRouter = createTRPCRouter({
  all: protectedProcedureWithWorkspace.query(async ({ ctx }) => {
    return await ctx.db.query.spaces.findMany({
      where: eq(spaces.workspaceId, ctx.currentWorkspace.id),
      orderBy: desc(spaces.updatedAt),
    });
  }),

  byId: protectedProcedureWithWorkspace
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.spaces.findFirst({
        where: and(
          eq(spaces.slug, input.slug),
          eq(spaces.workspaceId, ctx.currentWorkspace.id),
        ),
      });
    }),

  checkUniqueSlug: protectedProcedureWithWorkspace
    .input(z.object({ slug: z.string().toLowerCase() }))
    .mutation(async ({ ctx, input }) => {
      if (["create", "edit"].includes(input.slug)) {
        return false;
      }

      const matchedSlugs = await ctx.db.query.spaces.findMany({
        where: and(
          eq(spaces.slug, input.slug),
          eq(spaces.workspaceId, ctx.currentWorkspace.id),
        ),
      });

      return matchedSlugs.length > 0 ? false : true;
    }),

  create: protectedProcedureWithWorkspace
    .input(insertSpaceSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
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

  update: protectedProcedureWithWorkspace
    .input(
      z.object({
        data: insertSpaceSchema,
        spaceId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(schema.spaces)
        .set({
          ...input.data,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(spaces.workspaceId, ctx.currentWorkspace.id),
            eq(spaces.id, input.spaceId),
          ),
        )
        .returning();
    }),

  deleteBySlug: protectedProcedureWithWorkspace
    .input(
      z.object({
        spaceSlug: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.spaces)
        .where(
          and(
            eq(spaces.workspaceId, ctx.currentWorkspace.id),
            eq(spaces.slug, input.spaceSlug),
          ),
        )
        .returning();
    }),
});
