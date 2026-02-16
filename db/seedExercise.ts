import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { exercise, workout_template, workoutExercise } from "./schema";

//const db = drizzle(SQLite.openDatabaseAsync("WWdb.db"));

export const seedExercise = async (dbName: string) => {
  const db = drizzle(SQLite.openDatabaseSync(dbName));

  try {
    /*await db.insert(workoutExercise).values([
      {
        workoutTemplateId: 8,
        exerciseId: 1,
        position: 1,
        notes: "pierwsze cwiczenie",
      },
      {
        workoutTemplateId: 8,
        exerciseId: 2,
        position: 2,
        notes: "drugie cwiczenie",
      },
      {
        workoutTemplateId: 8,
        exerciseId: 3,
        position: 3,
      },
    ]);
*/
    const existingSeed = await db.select().from(exercise);

    if (existingSeed.length > 0) {
      return;
    }
    await db.insert(exercise).values([
      {
        name: "Squat",
        description:
          "Basic compound exercise for legs and glutes with a barbell on the back",
      },
      {
        name: "Bench Press",
        description: "Exercise targeting chest, shoulders, and triceps",
      },
      {
        name: "Deadlift",
        description: "Full-body exercise focusing on back and legs",
      },
      {
        name: "Pull-up",
        description: "Bodyweight exercise for back and biceps",
      },
      { name: "Barbell Row", description: "Builds upper back and biceps" },
      {
        name: "Overhead Press",
        description: "Standing exercise for shoulders and triceps",
      },
      {
        name: "Push-up",
        description: "Bodyweight exercise for chest, shoulders, and triceps",
      },
      {
        name: "Lunges",
        description: "Exercise for legs and glutes, can be done with dumbbells",
      },
      { name: "Dumbbell Flyes", description: "Isolation exercise for chest" },
      { name: "Barbell Curl", description: "Basic exercise for biceps" },
    ]);
  } catch (error) {
    console.error("error during seeding");
  }
  try {
    const existingWorkoutSeed = await db.select().from(workout_template);
    if (existingWorkoutSeed.length > 0) {
      return;
    }
    await db.insert(workout_template).values([
      {
        name: "Testowy workout",
        description: "Testowy workout_template description",
      },
    ]);
  } catch (e) {
    console.error("error during workout seeding");
  }
};
