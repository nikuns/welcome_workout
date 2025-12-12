import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("workout.db");

export type Exercise = {
  id: number;
  name: string;
  instruction: string;
};

//drop table na testy
export const initDatabase = () => {
  db.execSync(`
    PRAGMA journal_mode = WAL; 
    DROP TABLE exercises;  
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      instruction TEXT
    );
    
    -- Seed kilka ćwiczeń, jeśli tabela pusta
    INSERT OR IGNORE INTO exercises (id, name, instruction) VALUES (1, 'Przysiad', 'siadasz i wstajesz');
    INSERT OR IGNORE INTO exercises (id, name, instruction) VALUES (2, 'Wyciskanie leżąc', 'napierdalasz');
  `);
};

//===============CRUD===================================================

export const addExercise = async (name: string): Promise<number> => {
  const result = await db.runAsync(
    "INSERT INTO exercises (name, instruction) VALUES (?, ?)",
    name,
  );
  return result.lastInsertRowId!; // zwraca ID nowego rekordu
};

export const getExercises = async (): Promise<Exercise[]> => {
  return await db.getAllAsync("SELECT * FROM exercises ORDER BY name");
};
