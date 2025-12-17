import * as schema from "@/db/schema";
import { exercises } from "@/db/schema";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { Button, Text, TextInput, View } from "react-native";

export default function Index() {
  //const [data, setData] = useState<Exercise[]>([]);

  const db = useSQLiteContext();
  const drizzleDB = drizzle(db, { schema });
  const { data } = useLiveQuery(drizzleDB.select().from(exercises));

  const addexercise = async () => {
    try {
      await drizzleDB.insert(exercises).values({
        name: "klatowa",
        note: "nakurwiaj",
      });
      console.log("klatowe dodano");
    } catch (error) {
      console.error("error adding klatowa", error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {data?.map((exercises) => (
        <View key={exercises.id}>
          <Text>{exercises.name}</Text>
          <Text>{exercises.note}</Text>
        </View>
      ))}
    </View>
  );
}
