import { View, Text } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";

const Planner = () => {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Link href={"/workout"}>
        <Text className="text-primary text-3xl font-semibold">
          <Ionicons size={30} color={"#E7AD48"} name="add-outline" />
          Start workout
        </Text>
      </Link>
    </View>
  );
};

export default Planner;
