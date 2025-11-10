import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "../users/schema";

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const orgsToUsers = pgTable(
  "organizations_to_users",
  {
    organizationId: integer("organization_id").references(
      () => organizations.id,
      { onDelete: "cascade" }
    ),
    userId: integer("user_id").references(() => user.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [
    primaryKey({
      columns: [table.organizationId, table.userId],
    }),
  ]
);

export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  api_key: text().notNull(),
  organization_id: serial("organization_id").references(
    () => organizations.id,
    { onDelete: "cascade" }
  ),
  created_at: timestamp().notNull().defaultNow(),
});
