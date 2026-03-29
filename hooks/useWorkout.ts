import { useDrizzle } from "@/db/drizzleProvider";
import { createWorkoutRepository } from "@/db/workoutRepository";
import { useMemo } from "react";

export default function useWorkouts() {
  const db = useDrizzle();
  const repo = useMemo(() => createWorkoutRepository(db), [db]);

  const { data: workouts = [] } = repo.useAllWorkouts();

  return {
    workouts,
    useExercisesInWorkout: repo.useExercisesInWorkout,
    useExercisesInWorkoutWithSets: repo.useExercisesInWorkoutWithSets,
    useWorkoutById: repo.useWorkoutById,
    createWorkout: repo.createWorkout,
    deleteWorkout: repo.deleteWorkout,
    deleteExerciseFromWorkout: repo.deleteExerciseFromWorkout,
    addExerciseToWorkout: repo.addExerciseToWorkout,
    addSetToWorkoutExercise: repo.addSetToWorkoutExecise,
  };
}
