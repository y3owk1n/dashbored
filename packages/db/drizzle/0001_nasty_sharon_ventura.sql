ALTER TABLE "dashbored_workspace" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "dashbored_workspace" ADD CONSTRAINT "dashbored_workspace_slug_unique" UNIQUE("slug");