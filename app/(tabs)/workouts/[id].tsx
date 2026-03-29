import ExerciseListModal from "@/components/ExerciseListModal";
import WorkoutExerciseItem from "@/components/WorkoutExerciseItem";
import {
  workoutExerciseSetTarget,
  WorkoutExerciseSetTarget,
} from "@/db/schema";
import useWorkouts from "@/hooks/useWorkout";
import { index } from "drizzle-orm/gel-core";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Button, FlatList, Modal, Pressable, Text, View } from "react-native";

export default function workoutDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    addSetToWorkoutExercise,
    useExercisesInWorkoutWithSets,
    deleteExerciseFromWorkout,
  } = useWorkouts();
  const { data: workoutExercises, error } = useExercisesInWorkoutWithSets(
    Number(id),
  );

  const [selected, setselected] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openOptionsModal = (id: number): void => {
    setselected(id);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteExerciseFromWorkout(id);
      setIsModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddSet = async (weId: number): Promise<void> => {
    try {
      const setsForThisExercise = workoutExercises.filter(
        (item) => item.weId === weId && item.setNumber !== null,
      );

      const nextSetNumber = setsForThisExercise.length + 1;

      await addSetToWorkoutExercise({
        workoutExerciseId: weId,
        setNumber: nextSetNumber,
        targetReps: 5,
        targetWeight: 60,
        setType: "W",
      });

      setIsModalVisible(false);
    } catch (e) {
      console.error("Błąd dodawania serii:", e);
    }
  };

  if (!workoutExercises) {
    return null;
  }
  if (error)
    return (
      <View className="bg-background flex-1">
        <Text className="text-xl text-secondary justify-center">
          {error.message}
        </Text>
      </View>
    );

  return (
    <View className="bg-background flex-1">
      <FlatList
        className="bg-background"
        data={workoutExercises}
        keyExtractor={(item, index) =>
          `${item.weId}-${item.setNumber ?? "no-set"}-${index}`
        }
        renderItem={({ item }) => (
          <WorkoutExerciseItem
            showMenu={true}
            onMenuPress={() => openOptionsModal(item.weId)}
            workoutExercise={item}
          />
        )}
      />
      <Modal visible={isModalVisible}>
        <View
          className="items-center justify-center px-3 bg-slate-950 w-full rounded-xl
          flex-auto"
        >
          <Button
            title="Delete exercise from workout"
            onPress={() => handleDelete(selected)}
          />
          <Button title="add set" onPress={() => handleAddSet(selected)} />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
      <ExerciseListModal id={id} workoutExercises={workoutExercises} />
    </View>
  );
}
