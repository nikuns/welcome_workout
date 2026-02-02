import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Exercises" }} />
      <Stack.Screen name="newExercise" options={{ title: "New Exercise" }} />
    </Stack>
  );
}
