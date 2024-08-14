import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

const GradientNavIcon = (
  focused: boolean,
  logo: any,
  height: number,
  size: number
) => {
  return (
    <MaskedView
      style={{ height: height, width: 35 }}
      maskElement={
        <Text className="text-center">
          <TabBarIcon name={focused ? logo : `${logo}-outline`} size={size} />
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
            : ["#1F2A37", "#1F2A37"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }} // Gradient background
      />
    </MaskedView>
  );
};

export default GradientNavIcon;
