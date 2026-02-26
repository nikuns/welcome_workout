import useExercises from "@/hooks/useExercise";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, ScrollView, TextInput, View } from "react-native";

export default function newExercise() {
  const { createExercise } = useExercises();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    if (name == null) {
      Alert.alert(`Brak nazwy ćwiczenia`);
      return;
    }

    try {
      await createExercise({
        name: name.trim(),
        description: description.trim(),
      });

      Alert.alert("udalo sie");
      router.back();
    } catch (e) {
      console.log(e);
      Alert.alert("Blad!");
    }
  };
  return (
    <ScrollView className="bg-background flex-1" keyboardDismissMode="on-drag">
      <TextInput
        className="bg-background text-4xl text-secondary"
        placeholder="name"
        onChangeText={setName}
        placeholderTextColor={"text-secondary"}
      />
      <TextInput
        className="
    rounded-xl bg-surface text-xl text-secondary 
    placeholder:text-secondary/60 border border-gray-700/40
    min-h-[220px] max-h-[380px]"
        onChangeText={setDescription}
        multiline
        placeholder="description"
        placeholderTextColor={"text-secondary"}
        numberOfLines={10}
      />
      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
}
