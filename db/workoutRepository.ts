import { ExpoSQLiteDatabase, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { workout_template, Workout, newWorkout } from "./schema";
import useWorkouts from "@/hooks/useWorkout";
import { eq } from "drizzle-orm";

type DB = ExpoSQLiteDatabase<{ workout_template: typeof workout_template }>;

export const createWorkoutRepository = (db: DB) => {
  return {
    useAllWorkouts() {
      return useLiveQuery(db.select().from(workout_template));
    },

    useWorkoutById(id: number) {
      return useLiveQuery(
        db.query.workout_template.findFirst({
          where: eq(workout_template.id, id),
        }),
      );
    },

    async createWorkout(data: newWorkout): Promise<Workout> {
      const [inserted] = await db
        .insert(workout_template)
        .values({ ...data })
        .returning();
      return inserted;
    },

    async deleteWorkout(id: number): Promise<void> {
      await db.delete(workout_template).where(eq(workout_template.id, id));
    },
  };
};
