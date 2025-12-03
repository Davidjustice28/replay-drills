CREATE TABLE "drill_objection_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"drill_session_id" uuid NOT NULL,
	"drill_objection_id" uuid NOT NULL,
	"answer" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drill_objections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"drill_id" uuid NOT NULL,
	"position" integer NOT NULL,
	"objection" text NOT NULL,
	"ideal_response" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drill_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"drill_id" uuid NOT NULL,
	"date_started" timestamp NOT NULL,
	"date_completed" timestamp,
	"duration" integer,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"date_created" timestamp NOT NULL,
	"last_updated" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "drill_objection_answers" ADD CONSTRAINT "drill_objection_answers_drill_session_id_drill_sessions_id_fk" FOREIGN KEY ("drill_session_id") REFERENCES "public"."drill_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drill_objection_answers" ADD CONSTRAINT "drill_objection_answers_drill_objection_id_drill_objections_id_fk" FOREIGN KEY ("drill_objection_id") REFERENCES "public"."drill_objections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drill_objections" ADD CONSTRAINT "drill_objections_drill_id_drills_id_fk" FOREIGN KEY ("drill_id") REFERENCES "public"."drills"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drill_sessions" ADD CONSTRAINT "drill_sessions_drill_id_drills_id_fk" FOREIGN KEY ("drill_id") REFERENCES "public"."drills"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drill_sessions" ADD CONSTRAINT "drill_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drills" ADD CONSTRAINT "drills_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;