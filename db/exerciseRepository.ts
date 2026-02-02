import { ExpoSQLiteDatabase, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { exercise, Exercise, newExercise } from "./schema";
import { eq } from "drizzle-orm";

type DB = ExpoSQLiteDatabase<{ exercise: typeof exercise }>;

export const createExerciseRepository = (db: DB) => {
  return {
    useAllExercises() {
      return useLiveQuery(db.select().from(exercise));
    },

    useExerciseById(id: number) {
      return useLiveQuery(
        db.query.exercise.findFirst({
          where: eq(exercise.id, id),
        }),
      );
    },

    async createExercise(data: newExercise): Promise<Exercise> {
      const [inserted] = await db
        .insert(exercise)
        .values({ ...data })
        .returning();
      return inserted;
    },

    async deleteExercise(id: number): Promise<Void> {
      await db.delete(exercise).where(eq(exercise.id, id));
    },
  };
};
