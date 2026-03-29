import { Many, relations } from "drizzle-orm";
import { float } from "drizzle-orm/mysql-core";
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

export const workoutExerciseSetTarget = sqliteTable(
  "workout_exercise_set_target",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    workoutExerciseId: integer("workout_exercise_id")
      .notNull()
      .references(() => workoutExercise.id),
    setNumber: integer("set_number").notNull(),
    targetReps: integer("target_set"),
    targetWeight: float("target_weight"),
    setType: text("set_type"),
  },
);

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

export const WorkoutExerciseSetTargetRelations = relations(
  workoutExercise,
  ({ many }) => ({
    WorkoutExerciseSetTarget: many(workoutExerciseSetTarget),
  }),
);

// TYPES

export type Exercise = typeof exercise.$inferSelect;
export type newExercise = typeof exercise.$inferInsert;

export type Workout = typeof workoutTemplate.$inferSelect;
export type newWorkout = typeof workoutTemplate.$inferInsert;

export type WorkoutExercise = typeof workoutExercise.$inferSelect;
export type newWorkoutExercise = typeof workoutExercise.$inferInsert;

export type WorkoutExerciseSetTarget =
  typeof workoutExerciseSetTarget.$inferSelect;
export type newWorkoutExerciseSetTarget =
  typeof workoutExerciseSetTarget.$inferInsert;

export const schema = {
  exercise,
  workoutTemplate,
  workoutExercise,
  workoutExerciseSetTarget,
} as const;

export type WorkoutExerciseListItem = {
  weId: number;
  position: number;
  notes: string | null;
  exerciseId: number;
  exerciseName: string;
  // Sets fields
  setNumber: number | null;
  targetReps: number | null;
  targetWeight: number | null;
};
