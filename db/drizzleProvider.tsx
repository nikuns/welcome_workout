import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle, type ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import * as appSchema from "@/db/schema";

type DB = ExpoSQLiteDatabase<typeof appSchema>;

const DrizzleContext = createContext<DB | null>(null);

export function DrizzleProvider({ children }: PropsWithChildren) {
  const sqlite = useSQLiteContext(); // pobiera surową bazę z SQLiteProvider

  const db = useMemo(() => {
    return drizzle(sqlite, { schema: appSchema });
  }, [sqlite]);

  return (
    <DrizzleContext.Provider value={db}>{children}</DrizzleContext.Provider>
  );
}

export function useDrizzle() {
  const db = useContext(DrizzleContext);
  if (!db) {
    throw new Error("useDrizzle musi być użyty wewnątrz DrizzleProvider");
  }
  return db as DB;
}
