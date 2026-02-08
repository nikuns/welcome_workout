import { View, Text, FlatList } from "react-native";
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

export default function Index() {
  const { workouts } = useWorkouts();

  return (
    <View className="flex-1 bg-background">
      <FlatList
        className="bg-background"
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <WorkoutItem workout_template={item} />}
      />
    </View>
  );
}
