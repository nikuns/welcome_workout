import { useDrizzle } from "@/db/drizzleProvider";
import { createExerciseRepository } from "@/db/exerciseRepository";
import { useMemo } from "react";

export default function useExercises() {
  const db = useDrizzle();
  const repo = useMemo(() => createExerciseRepository(db), [db]);

  const { data: exercises = [] } = repo.useAllExercises();

  return {
    exercises,

    useExerciseById: repo.useExerciseById,
    createExercise: repo.createExercise,
    deleteExercise: repo.deleteExercise,
  };
}
