import { exercise } from "@/db/schema";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type ExerciseItemProps = {
  exercise: typeof exercise.$inferSelect;
  showMenu: boolean;
  onMenuPress?: () => void;
};

export default function ExerciseItem({
  exercise,
  showMenu,
  onMenuPress,
}: ExerciseItemProps) {
  const menuIcon = showMenu ? (
    <Pressable onPress={onMenuPress}>
      <Ionicons name="reorder-two-sharp" color="#E5DDBB" size={24} />
    </Pressable>
  ) : (
    <></>
  );
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-3xl font-bold text-secondary">
        {exercise.id}. {exercise.name}
      </Text>
      {menuIcon}
    </View>
  );
}
