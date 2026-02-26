import useWorkouts from "@/hooks/useWorkout";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import WorkoutExerciseItem from "@/components/WorkoutExerciseItem";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import useExercises from "@/hooks/useExercise";
import ExerciseItem from "@/components/ExerciseItem";
import { exercise } from "@/db/schema";

export default function workoutDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { useExercisesInWorkout, addExerciseToWorkout } = useWorkouts();
  const { exercises } = useExercises();
  const [modalVisible, setModalVisible] = useState(false);
  const { data: workoutExercises, error } = useExercisesInWorkout(Number(id));

  const handleNewExerciseInWorkout = async (
    exerciseId: number,
  ): Promise<void> => {
    try {
      await addExerciseToWorkout({
        workoutTemplateId: Number(id),
        exerciseId: exerciseId,
        position: workoutExercises.length + 1,
      });
      setModalVisible(false);
      Alert.alert("Dodano cwiczenie do treningu");
    } catch (e) {
      console.log(e);
      Alert.alert("Blad wczytywania cwiczenia");
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
          <WorkoutExerciseItem workoutExercise={item} />
        )}
      />
      <Button
        onPress={() => setModalVisible(true)}
        title="Add exercise"
      ></Button>

      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView className="bg-slate 300 flex-1">
          <FlatList
            className="bg-background"
            data={exercises}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleNewExerciseInWorkout(item.id)}>
                <ExerciseItem exercise={item} />
              </Pressable>
            )}
          />
          <Button onPress={() => setModalVisible(false)} title="Close"></Button>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
