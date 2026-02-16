import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// TABLES
export const exercise = sqliteTable("exercise", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const workoutTemplate = sqliteTable("workout_template", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
});

export const workoutExercise = sqliteTable("workout_exercise", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workoutTemplateId: integer("workout_template_id")
    .notNull()
    .references(() => workoutTemplate.id),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercise.id),
  position: integer("position").notNull(),
  notes: text("notes"),
});

// RELATIONS

export const exercisesRelations = relations(exercise, ({ many }) => ({
  workoutExercises: many(workoutExercise),
}));

export const workoutRelations = relations(workoutTemplate, ({ many }) => ({
  workoutExercises: many(workoutExercise),
}));

export const workoutExercisesRelations = relations(
  workoutExercise,
  ({ one }) => ({
    workoutTemplate: one(workoutTemplate, {
      fields: [workoutExercise.workoutTemplateId],
      references: [workoutTemplate.id],
    }),
    exercise: one(exercise, {
      fields: [workoutExercise.exerciseId],
      references: [exercise.id],
    }),
  }),
);

// TYPES

export type Exercise = typeof exercise.$inferSelect;
export type newExercise = typeof exercise.$inferInsert;

export type Workout = typeof workoutTemplate.$inferSelect;
export type newWorkout = typeof workoutTemplate.$inferInsert;

export type WorkoutExercise = typeof workoutExercise.$inferSelect;
export type newWorkoutExercise = typeof workoutExercise.$inferInsert;

export const schema = {
  exercise,
  workoutTemplate,
  workoutExercise,
} as const;
