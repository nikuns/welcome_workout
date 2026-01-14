import * as schema from "@/db/schema";
import { exercise } from "@/db/schema";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import SearchBar from "@/components/SearchBar";

type ExerciseItemProps = {
  exercise: typeof exercise.$inferSelect;
};

function ExerciseItem({ exercise }: ExerciseItemProps) {
  return (
    <View>
      <Text className="text-3xl font-bold text-secondary">{exercise.name}</Text>
      <Text className="text-secondary">{exercise.description}</Text>
    </View>
  );
}

export default function Index() {
  const db = useSQLiteContext();
  const drizzleDB = drizzle(db, { schema });
  const { data: exercises = [] } = useLiveQuery(
    drizzleDB.select().from(exercise),
  );

  const [search, setSearch] = useState("");

  const filteredExercises = exercises.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <View className="bg-background flex-1">
      <SearchBar value={search} onChangeText={setSearch} />

      <FlatList
        className="bg-background"
        data={filteredExercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExerciseItem exercise={item} />}
      />
    </View>
  );
}
