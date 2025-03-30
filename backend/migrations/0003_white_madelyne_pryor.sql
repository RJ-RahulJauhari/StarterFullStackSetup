ALTER TABLE "users_table" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "deleted_at" timestamp;