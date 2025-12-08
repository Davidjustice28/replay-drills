ALTER TABLE "drill_objection_answers" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "drill_objection_answers" ADD COLUMN "score" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "drill_sessions" ADD COLUMN "score" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "drill_objection_answers" ADD CONSTRAINT "drill_objection_answers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;