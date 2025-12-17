import migrations from "../drizzle/migrations.js";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import "./globals.css";
import { exercises } from "../db/schema.ts";
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

          //for test below
          await db.delete(exercises);
          await db.insert(exercises).values([
            { name: "klatowa", note: "lezysz i podnosisz" },
            { name: "siady", note: "kucasz" },
          ]);

          console.log("Migration success");
        } catch (error) {
          console.error("Migration error", error);
        }
      }}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
