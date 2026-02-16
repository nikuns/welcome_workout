import SearchBar from "@/components/SearchBar";
import { exercise } from "@/db/schema";
import useExercises from "@/hooks/useExercise";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, FlatList, Pressable, Text, View } from "react-native";

type ExerciseItemProps = {
  exercise: typeof exercise.$inferSelect;
};

function ExerciseItem({ exercise }: ExerciseItemProps) {
  return (
    <View>
      <Text className="text-3xl font-bold text-secondary">
        {exercise.id}. {exercise.name}
      </Text>
      <Text className="text-secondary">{exercise.description}</Text>
    </View>
  );
}
// TODO
// zmien new exercise na modal
export default function Index() {
  const { exercises } = useExercises();

  const [search, setSearch] = useState("");

  const filteredExercises = exercises.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <View className="bg-background flex-1">
      <SearchBar value={search} onChangeText={setSearch} />

      <Link href="/exercises/newExercise" push asChild>
        <Button title="Create new exercise" />
      </Link>

      <FlatList
        className="bg-background"
        data={filteredExercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/exercises/${item.id}`} asChild>
            <Pressable>
              <ExerciseItem exercise={item} />
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
