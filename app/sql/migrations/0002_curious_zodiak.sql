CREATE TABLE "api_use_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" text DEFAULT 'success' NOT NULL,
	"message" text,
	"api_key_id" serial NOT NULL,
	"agent_id" serial NOT NULL,
	"user_id" text,
	"organization_id" serial NOT NULL,
	"logged_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "agents" RENAME COLUMN "agent_id" TO "id";--> statement-breakpoint
ALTER TABLE "api_use_logs" ADD CONSTRAINT "api_use_logs_api_key_id_api_keys_id_fk" FOREIGN KEY ("api_key_id") REFERENCES "public"."api_keys"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_use_logs" ADD CONSTRAINT "api_use_logs_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_use_logs" ADD CONSTRAINT "api_use_logs_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_use_logs" ADD CONSTRAINT "api_use_logs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
