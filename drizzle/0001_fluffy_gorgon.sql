CREATE TYPE "public"."plan" AS ENUM('free', 'pro', 'business');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "plan" "plan" DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "subscription_expires_at" timestamp with time zone;