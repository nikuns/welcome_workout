import exercises from "@/app/(tabs)/exercises";
import {
  Modal,
  SafeAreaView,
  FlatList,
  Pressable,
  Button,
  Alert,
} from "react-native";
import ExerciseItem from "./ExerciseItem";
import { useState } from "react";
import useExercises from "@/hooks/useExercise";
import useWorkouts from "@/hooks/useWorkout";
import { WorkoutExercise } from "@/db/schema";

type ExerciseListModalProps = {
  id: string;
  workoutExercises: WorkoutExercise[];
};

// TODO
// Popraw ten modal, zeby stan mogl byc kontrolowany z zewnatrz
export default function ExerciseListModal({
  id,
  workoutExercises,
}: ExerciseListModalProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const { addExerciseToWorkout } = useWorkouts();
  const { exercises } = useExercises();

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

  return (
    <>
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView className="bg-background ">
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
      <Button
        onPress={() => setModalVisible(true)}
        title="Add exercise"
      ></Button>
    </>
  );
}
