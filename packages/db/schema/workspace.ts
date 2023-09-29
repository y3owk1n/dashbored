import { relations } from "drizzle-orm";
import { primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";

export const workspace = pgTable("workspace", {
  id: serial("id").primaryKey(),
  title: text("name").notNull(),
  description: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const groupsRelations = relations(workspace, ({ many }) => ({
  usersToGroups: many(usersToWorkspaces),
}));

export const usersToWorkspaces = pgTable(
  "users_to_workspaces",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.workspaceId),
  }),
);

export const usersToGroupsRelations = relations(
  usersToWorkspaces,
  ({ one }) => ({
    group: one(workspace, {
      fields: [usersToWorkspaces.workspaceId],
      references: [workspace.id],
    }),
    user: one(users, {
      fields: [usersToWorkspaces.userId],
      references: [users.id],
    }),
  }),
);
