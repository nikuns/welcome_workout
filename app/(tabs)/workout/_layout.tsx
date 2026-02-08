import { Stack } from "expo-router";
import { StackScreen } from "react-native-screens";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Workouts" }} />
    </Stack>
  );
}
