import ExerciseItem from "@/components/ExerciseItem";
import WorkoutExerciseItem from "@/components/WorkoutExerciseItem";
import useExercises from "@/hooks/useExercise";
import useWorkouts from "@/hooks/useWorkout";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import ExerciseListModal from "@/components/ExerciseListModal";

export default function workoutDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { useExercisesInWorkout, addExerciseToWorkout } = useWorkouts();
  const { data: workoutExercises, error } = useExercisesInWorkout(Number(id));

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
          <WorkoutExerciseItem workoutExercise={item} />
        )}
      />
      <ExerciseListModal id={id!} workoutExercises={workoutExercises} />
    </View>
  );
}
