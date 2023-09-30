import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { primaryKey, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";

export const workspaces = pgTable("workspace", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  title: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Workspaces = typeof workspaces.$inferSelect;

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  usersToWorkspaces: many(usersToWorkspaces),
}));

export const usersToWorkspaces = pgTable(
  "users_to_workspaces",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspaces.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.workspaceId),
  }),
);

export const usersToWorkspacessRelations = relations(
  usersToWorkspaces,
  ({ one }) => ({
    workspace: one(workspaces, {
      fields: [usersToWorkspaces.workspaceId],
      references: [workspaces.id],
    }),
    user: one(users, {
      fields: [usersToWorkspaces.userId],
      references: [users.id],
    }),
  }),
);
