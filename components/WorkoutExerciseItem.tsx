import { WorkoutExerciseListItem } from "@/db/schema";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type WorkoutExerciseItemProps = {
  workoutExercise: WorkoutExerciseListItem;
  showMenu: boolean;
  onMenuPress?: () => void;
};
export default function WorkoutExerciseItem({
  workoutExercise,
  showMenu,
  onMenuPress,
}: WorkoutExerciseItemProps) {
  const menuIcon = showMenu ? (
    <Pressable onPress={onMenuPress}>
      <Ionicons name="reorder-two-sharp" color="#E5DDBB" size={24} />
    </Pressable>
  ) : (
    <></>
  );

  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-secondary text-3xl font-bold">
        {workoutExercise.position}. {workoutExercise.exerciseName}
        {"\n"}
        {workoutExercise.notes}
      </Text>
      {menuIcon}
    </View>
  );
}
