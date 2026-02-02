import {
  sqliteTable,
  text,
  integer,
  SQLiteTable,
} from "drizzle-orm/sqlite-core";

export const exercise = sqliteTable("exercise", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
});

export type Exercise = typeof exercise.$inferSelect;
export type newExercise = typeof exercise.$inferInsert;
