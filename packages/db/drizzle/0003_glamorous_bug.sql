ALTER TABLE "dashbored_users_to_workspaces" DROP CONSTRAINT "dashbored_users_to_workspaces_user_id_dashbored_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dashbored_space" ADD CONSTRAINT "dashbored_space_workspace_id_dashbored_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "dashbored_workspace"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dashbored_users_to_workspaces" ADD CONSTRAINT "dashbored_users_to_workspaces_user_id_dashbored_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "dashbored_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
