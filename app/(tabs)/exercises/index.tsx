import ExerciseItem from "@/components/ExerciseItem";
import SearchBar from "@/components/SearchBar";
import useExercises from "@/hooks/useExercise";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Button, FlatList, Pressable, View } from "react-native";

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
