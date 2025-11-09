import { bigint, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
  inquiry_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().notNull(),
  phone: text(),
  message: text().notNull(),
  status: text().default("submitted").notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
