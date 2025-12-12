import { Stack } from "expo-router";
import "./globals.css";
import { useEffect } from "react";
import { initDatabase } from "../db/schema";

export default function RootLayout() {
  useEffect(() => {
    initDatabase(); // synchroniczne – działa od razu
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
