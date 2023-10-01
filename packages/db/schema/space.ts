import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { text, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { pgTable } from "./_table";
import { workspaces } from "./workspace";

export const spaces = pgTable(
  "space",
  {
    id: text("id")
      .$defaultFn(() => createId())
      .primaryKey()
      .notNull(),
    workspaceId: text("workspace_id").notNull(),
    title: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (spaces) => ({
    unq: unique().on(spaces.slug, spaces.workspaceId),
  }),
);

export type Spaces = typeof spaces.$inferSelect;

export const insertSpaceSchema = createInsertSchema(spaces, {
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
}).omit({
  workspaceId: true,
});

export const spacesRelation = relations(spaces, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [spaces.workspaceId],
    references: [workspaces.id],
  }),
}));
