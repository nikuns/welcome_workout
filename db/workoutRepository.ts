import { eq } from "drizzle-orm";
import { ExpoSQLiteDatabase, useLiveQuery } from "drizzle-orm/expo-sqlite";
import {
  exercise,
  newWorkout,
  Workout,
  workoutExercise,
  WorkoutExercise,
  workoutTemplate,
} from "./schema";

type DB = ExpoSQLiteDatabase<{ workoutTemplate: typeof workoutTemplate }>;

export const createWorkoutRepository = (db: DB) => {
  return {
    useAllWorkouts() {
      return useLiveQuery(db.select().from(workoutTemplate));
    },

    useWorkoutById(id: number) {
      return useLiveQuery(
        db.query.workoutTemplate.findFirst({
          where: eq(workoutTemplate.id, id),
        }),
      );
    },

    useExercisesInWorkout(workoutId: number) {
      return useLiveQuery(
        db
          .select({
            // pola z workout_exercise
            weId: workoutExercise.id,
            position: workoutExercise.position,
            notes: workoutExercise.notes,
            // pola z exercise
            exerciseId: exercise.id,
            exerciseName: exercise.name,
            exerciseDescription: exercise.description,
          })
          .from(workoutExercise)
          .innerJoin(exercise, eq(workoutExercise.exerciseId, exercise.id))
          .where(eq(workoutExercise.workoutTemplateId, workoutId))
          .orderBy(workoutExercise.position),
      );
    },

    async createWorkout(data: newWorkout): Promise<Workout> {
      const [inserted] = await db
        .insert(workoutTemplate)
        .values({ ...data })
        .returning();
      return inserted;
    },

    async deleteWorkout(id: number): Promise<void> {
      await db.delete(workoutTemplate).where(eq(workoutTemplate.id, id));
    },

    async addExerciseToWorkout(
      data: WorkoutExercise,
    ): Promise<WorkoutExercise> {
      const [inserted] = await db
        .insert(workoutExercise)
        .values({ ...data })
        .returning();
      return inserted;
    },
  };
};
