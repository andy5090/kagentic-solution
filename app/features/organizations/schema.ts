import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "../users/schema";
import { agents } from "../agents/schema";

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
}).enableRLS();

export const orgsToUsers = pgTable(
  "organizations_to_users",
  {
    organizationId: integer("organization_id").references(
      () => organizations.id,
      { onDelete: "cascade" }
    ),
    userId: text("user_id").references(() => user.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [
    primaryKey({
      columns: [table.organizationId, table.userId],
    }),
  ]
).enableRLS();

export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  name: text().notNull(),
  apiKey: text("api_key").notNull(),
  organizationId: serial("organization_id").references(() => organizations.id, {
    onDelete: "cascade",
  }),
  created_at: timestamp().notNull().defaultNow(),
});

export const apiUseLogs = pgTable("api_use_logs", {
  id: serial("id").primaryKey(),
  status: text("status").default("success").notNull(),
  message: text("message"),
  apiKeyId: serial("api_key_id").references(() => apiKeys.id, {
    onDelete: "set null",
  }),
  agentId: serial("agent_id").references(() => agents.id, {
    onDelete: "set null",
  }),
  userId: text("user_id").references(() => user.id, {
    onDelete: "set null",
  }),
  organizationId: serial("organization_id").references(() => organizations.id, {
    onDelete: "set null",
  }),
  loggedAt: timestamp("logged_at").notNull().defaultNow(),
});
