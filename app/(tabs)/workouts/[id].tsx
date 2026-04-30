import ExerciseListModal from "@/components/ExerciseListModal";
import WorkoutExerciseItem from "@/components/WorkoutExerciseItem";
import useWorkouts from "@/hooks/useWorkout";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, Button, FlatList, Modal, Text, View } from "react-native";

export default function workoutDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const workoutId = Number(id);

  const {
    addSetToWorkoutExercise,
    useExercisesInWorkout,
    useSetsForWorkout,
    deleteExerciseFromWorkout,
    countSetsInWorkoutExercise,
  } = useWorkouts();

  const exercisesQuery = useExercisesInWorkout(workoutId);
  const setsQuery = useSetsForWorkout(workoutId);

  const exercises = exercisesQuery.data ?? [];
  const sets = setsQuery.data ?? [];
  const error = exercisesQuery.error ?? setsQuery.error;

  const [selectedWeId, setSelectedWeId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const groupedExercises = useMemo(() => {
    const setsMap = new Map<number, typeof sets>();

    sets.forEach((set) => {
      if (!setsMap.has(set.weId)) {
        setsMap.set(set.weId, []);
      }
      setsMap.get(set.weId)!.push(set);
    });

    return exercises.map((exercise) => {
      const setsForExercise = setsMap.get(exercise.weId) || [];

      return setsForExercise.length > 0
        ? setsForExercise
            .sort((a, b) => a.setNumber - b.setNumber)
            .map((set) => ({
              ...exercise,
              ...set,
            }))
        : [
            {
              ...exercise,
              setNumber: null,
              targetReps: null,
              targetWeight: null,
            },
          ];
    });
  }, [exercises, sets]);

  const openOptionsModal = (weId: number) => {
    setSelectedWeId(weId);
    setIsModalVisible(true);
  };

  const handleDelete = async (weId: number) => {
    try {
      await deleteExerciseFromWorkout(weId);
      setIsModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  };
  const handleAddSet = async (weId: number): Promise<void> => {
    try {
      const nextSetNumber = (await countSetsInWorkoutExercise(weId)) + 1;

      await addSetToWorkoutExercise({
        workoutExerciseId: weId,
        setNumber: nextSetNumber,
        targetReps: 5,
        targetWeight: 60,
        setType: "W",
      });
      Alert.alert("dodano set");
      setIsModalVisible(false);
    } catch (e) {
      console.error("Błąd dodawania serii:", e);
    }
  };

  if (error) {
    return (
      <View className="bg-background flex-1 justify-center items-center">
        <Text className="text-red-500">Błąd: {error.message}</Text>
      </View>
    );
  }

  return (
    <View className="bg-background flex-1">
      <FlatList
        data={groupedExercises}
        keyExtractor={(group) => group[0].weId.toString()} // teraz bezpiecznie
        renderItem={({ item: setsGroup }) => (
          <WorkoutExerciseItem
            workoutExercise={setsGroup[0]} // pierwszy element jako reprezentant
            allSets={setsGroup} // wszystkie sety tego ćwiczenia
            showMenu={true}
            onMenuPress={() => openOptionsModal(setsGroup[0].weId)}
          />
        )}
        ListEmptyComponent={
          <Text className="text-center text-zinc-400 mt-10">
            Brak ćwiczeń w tym treningu
          </Text>
        }
      />

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/70">
          <View className="bg-zinc-900 p-6 rounded-2xl w-11/12">
            <Button
              title="Delete exercise from workout"
              onPress={() => selectedWeId && handleDelete(selectedWeId)}
            />
            <Button
              title="Add set"
              onPress={() => selectedWeId && handleAddSet(selectedWeId)}
            />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <ExerciseListModal id={id} workoutExercises={exercises} />
    </View>
  );
}
