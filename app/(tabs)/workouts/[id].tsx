import useWorkouts from "@/hooks/useWorkout";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";

export default function workoutDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { useExercisesInWorkout } = useWorkouts();

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
          <Text className="text-secondary">
            {item.position}. weId: {item.weId}. exId: {item.exerciseId}{" "}
            {item.exerciseName}
            {item.notes}
          </Text>
        )}
      />
    </View>
  );
}
