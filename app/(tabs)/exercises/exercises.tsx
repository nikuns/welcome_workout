import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getExercises, Exercise } from "@/db/schema";

export default function ExercisesScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filtered, setFiltered] = useState<Exercise[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadExercises = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getExercises();
      setExercises(data);
      setFiltered(data);
    } catch (err) {
      alert("Exercise load error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (search.trim() === "") {
        setFiltered(exercises);
      } else {
        const results = await searchExercises(search);
        setFiltered(results);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [search, exercises]);

  const renderItem = ({ item }: { item: Exercise }) => (
    <View>
      <View></View>
      <View>
        <Text>{item.name}</Text>
        <Text>{item.instruction}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <View>
        <Text>Ćwiczenia</Text>
      </View>

      {/* Wyszukiwarka */}
      <View>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Szukaj ćwiczeń..."
          value={search}
          onChangeText={setSearch}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Lista */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#E7AD48"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>Brak ćwiczeń do wyświetlenia</Text>}
        />
      )}
    </SafeAreaView>
  );
}
