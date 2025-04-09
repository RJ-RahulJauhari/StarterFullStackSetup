CREATE TYPE "public"."user_role" AS ENUM('admin', 'staff', 'student');--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "role" SET DATA TYPE user_role;--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "role" SET DEFAULT 'student';