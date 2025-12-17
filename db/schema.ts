//import * as SQLite from "expo-sqlite";
import {
  sqliteTable,
  text,
  integer,
  SQLiteTable,
} from "drizzle-orm/sqlite-core";

export const exercises = sqliteTable("exercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  note: text("note"),
});

export const Exercise = typeof exercises.$inferSelect;
