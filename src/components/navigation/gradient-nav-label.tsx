import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";

const GradientNavLabel = (focused: boolean, text: string, width: number) => {
  return (
    <MaskedView
      style={{ height: 25, width: width }}
      maskElement={
        <Text
          className={`text-center ${
            focused ? "font-semibold" : "font-normal"
          } text-xs`}
        >
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={
          focused
            ? [
                "rgba(48, 190, 147, 1)",
                "rgba(42, 164, 174, 1)",
                "rgba(34, 149, 213, 1)",
                "rgba(30, 111, 231, 1)",
              ]
            : ["#4B5563", "#4B5563"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }} // Gradient background
      />
    </MaskedView>
  );
};

export default GradientNavLabel;
