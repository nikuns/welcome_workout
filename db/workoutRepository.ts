import { ExpoSQLiteDatabase, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { workout_template, Workout } from "./schema";

type DB = ExpoSQLiteDatabase<{ workout_template: typeof workout_template }>;

export const createWorkoutRepository = (db: DB) => {
  return {
    useAllWorkouts() {
      return useLiveQuery(db.select().from(workout_template));
    },
  };
};
