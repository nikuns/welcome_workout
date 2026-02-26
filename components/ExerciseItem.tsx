import { exercise } from "@/db/schema";
import { View, Text } from "react-native";

type ExerciseItemProps = {
  exercise: typeof exercise.$inferSelect;
};

export default function ExerciseItem({ exercise }: ExerciseItemProps) {
  return (
    <View>
      <Text className="text-3xl font-bold text-secondary">
        {exercise.id}. {exercise.name}
      </Text>
      <Text className="text-secondary">{exercise.description}</Text>
    </View>
  );
}
