CREATE TABLE IF NOT EXISTS "snoc_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"file_size" text,
	"description" text,
	"tags" text
);
