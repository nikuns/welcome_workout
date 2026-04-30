import { count, eq, sql } from "drizzle-orm";
import { ExpoSQLiteDatabase, useLiveQuery } from "drizzle-orm/expo-sqlite";
import {
  exercise,
  newWorkout,
  newWorkoutExercise,
  newWorkoutExerciseSetTarget,
  Workout,
  workoutExercise,
  WorkoutExercise,
  WorkoutExerciseListItem,
  WorkoutExerciseSetTarget,
  workoutExerciseSetTarget,
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
      return useLiveQuery<WorkoutExerciseListItem[]>(
        db
          .select({
            weId: workoutExercise.id,
            position: workoutExercise.position,
            notes: workoutExercise.notes,
            exerciseId: exercise.id,
            exerciseName: exercise.name,
          })
          .from(workoutExercise)
          .innerJoin(exercise, eq(workoutExercise.exerciseId, exercise.id))
          .where(eq(workoutExercise.workoutTemplateId, workoutId))
          .orderBy(workoutExercise.position),
      );
    },

    useExercisesInWorkoutWithSets(workoutId: number) {
      return useLiveQuery<WorkoutExerciseListItem[]>(
        db
          .select({
            weId: workoutExercise.id,
            position: workoutExercise.position,
            notes: workoutExercise.notes,
            exerciseId: exercise.id,
            exerciseName: exercise.name,
            setNumber: workoutExerciseSetTarget.setNumber,
            targetReps: workoutExerciseSetTarget.targetReps,
            targetWeight: workoutExerciseSetTarget.targetWeight,
          })
          .from(workoutExercise)
          .innerJoin(exercise, eq(workoutExercise.exerciseId, exercise.id))
          .leftJoin(
            workoutExerciseSetTarget,
            eq(workoutExerciseSetTarget.workoutExerciseId, workoutExercise.id),
          )
          .where(eq(workoutExercise.workoutTemplateId, workoutId))
          .orderBy(workoutExercise.position),
      );
    },

    useSetsForWorkout(workoutId: number) {
      return useLiveQuery(
        db
          .select({
            weId: workoutExerciseSetTarget.workoutExerciseId,
            setNumber: workoutExerciseSetTarget.setNumber,
            targetReps: workoutExerciseSetTarget.targetReps,
            targetWeight: workoutExerciseSetTarget.targetWeight,
          })
          .from(workoutExerciseSetTarget)
          .innerJoin(
            workoutExercise,
            eq(workoutExercise.id, workoutExerciseSetTarget.workoutExerciseId),
          )
          .where(eq(workoutExercise.workoutTemplateId, workoutId)),
      );
    },

    // Used for counting number of sets in workout exercise
    async countSetsInWorkoutExercise(WeId: number): Promise<number> {
      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(workoutExerciseSetTarget)
        .where(eq(workoutExerciseSetTarget.workoutExerciseId, WeId));
      return result[0]?.count ?? 0;
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

    async deleteExerciseFromWorkout(id: number): Promise<void> {
      await db.delete(workoutExercise).where(eq(workoutExercise.id, id));
    },

    async addExerciseToWorkout(
      data: newWorkoutExercise,
    ): Promise<WorkoutExercise> {
      const [inserted] = await db
        .insert(workoutExercise)
        .values({ ...data })
        .returning();
      return inserted;
    },

    async addSetToWorkoutExecise(
      data: newWorkoutExerciseSetTarget,
    ): Promise<WorkoutExerciseSetTarget> {
      const [inserted] = await db
        .insert(workoutExerciseSetTarget)
        .values({ ...data })
        .returning();
      return inserted;
    },
  };
};
