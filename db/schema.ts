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

export const workout_template = sqliteTable("workout_template", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
});

export const workout_exercise = sqliteTable("workout_exercise", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workout_template_id: integer("workout_template_id")
    .notNull()
    .references(() => workout_template.id),
  exercise_id: integer("exercise_id")
    .notNull()
    .references(() => exercise.id),
  position: integer("position").notNull(),
  notes: text("notes"),
});

export type Exercise = typeof exercise.$inferSelect;
export type newExercise = typeof exercise.$inferInsert;

export type Workout = typeof workout_template.$inferInsert;
export type newWorkout = typeof workout_template.$inferInsert;

export const schema = {
  exercise,
  workout_template,
  workout_exercise,
} as const;
