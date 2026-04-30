import { WorkoutExerciseListItem, workoutExerciseSetTarget } from "@/db/schema";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

type WorkoutExerciseItemProps = {
  workoutExercise: WorkoutExerciseListItem;
  allSets: WorkoutExerciseListItem[];
  showMenu: boolean;
  onMenuPress?: () => void;
};
export default function WorkoutExerciseItem({
  workoutExercise,
  allSets,
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
    <View className="bg-zinc-800 mx-3 my-3 p-5 rounded-2xl">
      {/* Nagłówek */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-[#E5DDBB] text-2xl font-bold flex-1">
          {workoutExercise.exerciseName}
        </Text>

        {showMenu && (
          <Pressable onPress={onMenuPress} className="p-2 -mr-2">
            <Ionicons name="ellipsis-horizontal" color="#E5DDBB" size={26} />
          </Pressable>
        )}
      </View>

      {/* Notes */}
      {workoutExercise.notes && (
        <Text className="text-zinc-400 mb-4 italic">
          Notes: {workoutExercise.notes}
        </Text>
      )}

      {/* Lista serii */}
      <View className="space-y-2">
        <Text className="text-zinc-300 font-semibold mb-2">Serie:</Text>

        {allSets.map((set, index) => (
          <View
            key={index}
            className="bg-zinc-700 px-4 py-3 rounded-xl flex-row justify-between items-center"
          >
            <Text className="text-blue-400 text-lg font-bold">
              Set {set.setNumber}
            </Text>
            <Text className="text-white text-lg">
              {set.targetReps} powt. × {set.targetWeight} kg
            </Text>
          </View>
        ))}
      </View>

      {/* Debug (możesz usunąć później) */}
      <Text className="text-zinc-500 text-xs mt-4">
        weId: {workoutExercise.weId}
      </Text>
    </View>
  );
}
