import { View, Text, FlatList, Button, Alert, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Workout, workout_template } from "@/db/schema";
import useWorkouts from "@/hooks/useWorkout";

type WorkoutItemProps = {
  workout_template: typeof workout_template.$inferSelect;
};

function WorkoutItem({ workout_template }: WorkoutItemProps) {
  return (
    <View>
      <Text className="text-3xl font-bold text-secondary">
        {workout_template.name}
      </Text>
      <Text className="text-secondary">{workout_template.description}</Text>
    </View>
  );
}
// Uzyj modal do zrobienia options menu
export default function Index() {
  const { workouts, createWorkout, deleteWorkout } = useWorkouts();

  const handleNewWorkout = async () => {
    try {
      await createWorkout({
        name: "test new workout",
        description: "test new workout from button",
      });
      Alert.alert("New workout created");
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteWorkout(id);
      Alert.alert("Workout has been deleted");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <FlatList
        className="bg-background"
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleDelete(item.id)}>
            <WorkoutItem workout_template={item} />
          </Pressable>
        )}
      />
      <Button title="New workout" onPress={handleNewWorkout} />
    </View>
  );
}
