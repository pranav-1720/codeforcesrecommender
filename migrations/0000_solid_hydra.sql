CREATE TABLE IF NOT EXISTS "problems" (
	"id" serial PRIMARY KEY NOT NULL,
	"contest_id" integer NOT NULL,
	"problemset_name" text NOT NULL,
	"index" text NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"points" integer,
	"rating" integer,
	"tags" json NOT NULL,
	"solved_count" integer NOT NULL
);
