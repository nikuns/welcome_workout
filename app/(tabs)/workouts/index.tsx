import { workoutTemplate } from "@/db/schema";
import useWorkouts from "@/hooks/useWorkout";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

type WorkoutItemProps = {
  workout_template: typeof workoutTemplate.$inferSelect;
};

function WorkoutItem({ workout_template }: WorkoutItemProps) {
  return (
    <View>
      <Text className="text-3xl font-bold text-secondary">
        {workout_template.id}. {workout_template.name}
      </Text>
      <Text className="text-secondary">{workout_template.description}</Text>
    </View>
  );
}
// Uzyj modal do zrobienia options menu
export default function Index() {
  const { workouts, createWorkout, deleteWorkout } = useWorkouts();

  const [selected, setselected] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openOptionsModal = (id: number): void => {
    setselected(id);
    setIsModalVisible(true);
  };

  const handleNewWorkout = async () => {
    try {
      await createWorkout({
        name: "New workout",
        description: "New workout description",
      });
      Alert.alert("New workout created");
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteWorkout(id);
      setIsModalVisible(false);
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
          <Link href={`/workouts/${item.id}`} asChild>
            <Pressable onLongPress={() => openOptionsModal(item.id)}>
              <WorkoutItem workout_template={item} />
            </Pressable>
          </Link>
        )}
      />
      <Button title="New workout" onPress={handleNewWorkout} />
      <Modal visible={isModalVisible}>
        <View
          className="items-center justify-center px-3 bg-slate-950 w-full rounded-xl
          flex-auto"
        >
          <Button
            title="Delete workout"
            onPress={() => handleDelete(selected)}
          />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}
