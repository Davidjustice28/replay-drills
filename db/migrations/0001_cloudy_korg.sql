ALTER TABLE "drills" ALTER COLUMN "date_created" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "drills" ALTER COLUMN "last_updated" SET DEFAULT now();