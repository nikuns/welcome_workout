import { ImageSourcePropType } from "react-native";
const icons = {
  home: require("./home.png"),
  workout: require("./workout.png"),
  exercises: require("./exercises.png"),
  user: require("./user.png"),
} as const satisfies Record<string, ImageSourcePropType>;
export { icons };
