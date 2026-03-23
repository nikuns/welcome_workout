import ExerciseListModal from "@/components/ExerciseListModal";
import WorkoutExerciseItem from "@/components/WorkoutExerciseItem";
import useWorkouts from "@/hooks/useWorkout";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Button, FlatList, Modal, Pressable, Text, View } from "react-native";

export default function workoutDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { useExercisesInWorkout, deleteExerciseFromWorkout } = useWorkouts();
  const { data: workoutExercises, error } = useExercisesInWorkout(Number(id));

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
        keyExtractor={(item) => item.weId.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => openOptionsModal(item.weId)}>
            <WorkoutExerciseItem workoutExercise={item} />
          </Pressable>
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
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
      <ExerciseListModal id={id} workoutExercises={workoutExercises} />
    </View>
  );
}
