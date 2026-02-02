import { seedExercise } from "@/db/seedExercise";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import migrations from "../drizzle/migrations";
import "./globals.css";
import { DrizzleProvider } from "@/db/drizzleProvider";
export const DATABASE_NAME = "WWdb.db";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true }}
      onInit={async (database) => {
        try {
          const db = drizzle(database);
          await migrate(db, migrations);
          await seedExercise(DATABASE_NAME);

          console.log("Migration success");
        } catch (error) {
          console.error("Migration error", error);
        }
      }}
    >
      <DrizzleProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </DrizzleProvider>
    </SQLiteProvider>
  );
}
