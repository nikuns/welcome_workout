import { WorkoutExerciseListItem, workoutExerciseSetTarget } from "@/db/schema";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const hasSet = workoutExercise.setNumber != null;
  return (
    <View className="bg-zinc-800 mx-3 my-2 p-5 rounded-2xl">
      {/* Nagłówek - nazwa ćwiczenia + menu */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[#E5DDBB] text-2xl font-bold flex-1">
          {workoutExercise.exerciseName}
        </Text>

        {showMenu && (
          <Pressable onPress={onMenuPress} className="p-2">
            <Ionicons name="ellipsis-horizontal" color="#E5DDBB" size={26} />
          </Pressable>
        )}
      </View>

      {/* Notes */}
      {workoutExercise.notes && (
        <Text className="text-zinc-400 text-base mb-4 italic">
          Notes: {workoutExercise.notes}
        </Text>
      )}

      {/* Set */}
      <View className="bg-zinc-700 p-4 rounded-xl">
        {hasSet ? (
          <View className="flex-row justify-between items-center">
            <Text className="text-blue-400 text-xl font-bold">
              Set {workoutExercise.setNumber}
            </Text>
            <Text className="text-white text-xl font-medium">
              {workoutExercise.targetReps} powt. ×{" "}
              {workoutExercise.targetWeight} kg
            </Text>
          </View>
        ) : (
          <Text className="text-zinc-500 text-lg italic">Brak serii</Text>
        )}
      </View>

      {/* Debug info (do testów - później możesz usunąć lub zakomentować) */}
      <Text className="text-zinc-500 text-xs mt-3">
        weId: {workoutExercise.weId} • position: {workoutExercise.position}
      </Text>
    </View>
  );
}
