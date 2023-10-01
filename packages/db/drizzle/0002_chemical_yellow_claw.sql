ALTER TABLE "dashbored_space" ALTER COLUMN "created_at" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "dashbored_space" ALTER COLUMN "updated_at" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "dashbored_workspace" ALTER COLUMN "created_at" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "dashbored_workspace" ALTER COLUMN "updated_at" SET DATA TYPE timestamp (6) with time zone;