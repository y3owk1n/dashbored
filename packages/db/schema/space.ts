import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { pgTable } from "./_table";
import { workspaces } from "./workspace";

export const spaces = pgTable("space", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  workspaceId: text("id").notNull(),
  title: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Spaces = typeof spaces.$inferSelect;

export const insertSpaceSchema = createInsertSchema(spaces, {
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
});

export const spacesRelation = relations(spaces, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [spaces.workspaceId],
    references: [workspaces.id],
  }),
}));
