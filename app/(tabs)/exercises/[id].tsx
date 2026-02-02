import useExercises from "@/hooks/useExercise";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Alert, Button } from "react-native";

export default function ExerciseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { useExerciseById, deleteExercise } = useExercises();

  const handleDelete = () => {
    try {
      deleteExercise(Number(id));
      router.back();
    } catch (e) {
      Alert.alert("Error");
      console.log(e);
    }
  };

  const deleteAlert = () => {
    Alert.alert("Are you sure?", "", [
      {
        text: "yes",
        onPress: handleDelete,
      },
      {
        text: "No",
      },
    ]);
  };

  const { data: exercise, error } = useExerciseById(Number(id));
  if (!exercise) {
    return null; // lub <Text>Nie znaleziono</Text> – nie crashuje
  }
  if (error) return <Text>{error.message}</Text>;
  return (
    <View className="bg-background flex-1">
      <Text className="text-3xl text-secondary">{exercise.name}</Text>
      <Text className="text-2xl text-secondary">{exercise.description}</Text>
      <Button title="Delete" onPress={deleteAlert} />
    </View>
  );
}
