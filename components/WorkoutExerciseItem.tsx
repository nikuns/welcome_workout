import { WorkoutExerciseListItem } from "@/db/schema";
import { View, Text } from "react-native";

type WorkoutExerciseItemProps = {
  workoutExercise: WorkoutExerciseListItem;
};
export default function WorkoutExerciseItem({
  workoutExercise,
}: WorkoutExerciseItemProps) {
  return (
    <View>
      <Text className="text-secondary">
        {workoutExercise.position}. weId: {workoutExercise.weId}. exId:{" "}
        {workoutExercise.exerciseId}
        {"\n"}
        {workoutExercise.exerciseName} {workoutExercise.notes}
      </Text>
    </View>
  );
}
