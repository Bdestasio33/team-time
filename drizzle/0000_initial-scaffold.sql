CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"state" text DEFAULT 'voting' NOT NULL,
	"team_id" integer NOT NULL,
	"creator_id" integer NOT NULL,
	"finalized_time_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"team_id" integer NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposed_times" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"proposer_id" integer NOT NULL,
	"proposed_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "time_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"proposed_time_id" integer NOT NULL,
	"voter_id" integer NOT NULL,
	"vote" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "time_votes_proposed_time_id_voter_id_unique" UNIQUE("proposed_time_id","voter_id")
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_creator_id_members_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposed_times" ADD CONSTRAINT "proposed_times_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposed_times" ADD CONSTRAINT "proposed_times_proposer_id_members_id_fk" FOREIGN KEY ("proposer_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "time_votes" ADD CONSTRAINT "time_votes_proposed_time_id_proposed_times_id_fk" FOREIGN KEY ("proposed_time_id") REFERENCES "public"."proposed_times"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "time_votes" ADD CONSTRAINT "time_votes_voter_id_members_id_fk" FOREIGN KEY ("voter_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;