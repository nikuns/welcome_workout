import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-5xl font-bold text-primary">Welcome Golden</Text>
      <Text className="text-primary">
        Daje jakis text, zeby zobaczyc jak sie czyta
      </Text>
    </View>
  );
}
