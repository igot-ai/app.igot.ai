import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons from expo vector icons
import LeftAlignCarousel from "../../components/LeftAlignCarousel";
import ListWithImages from "../../components/ListWithImages";
import { useRouter } from "expo-router";

export default function explore() {
  // Dummy Data
  const exploreData = [
    {
      title: "Virtual Assistant for Sale",
      imageSource: require("@/assets/dumpData/1.png"),
      description:
        "You are a Product Spec Writer. Ask users about neccessary information, then write a product spec with sample as below: 1. Introduction Product scope:",
    },
    {
      title: "Virtual Assistant for Sale",
      imageSource: require("@/assets/dumpData/2.png"),
      description:
        "You are a Product Spec Writer. Ask users about neccessary information, then write a product spec with sample as below: 1. Introduction Product scope:",
    },
    {
      title: "Virtual Assistant for Sale",
      imageSource: require("@/assets/dumpData/3.png"),
      description:
        "You are a Product Spec Writer. Ask users about neccessary information, then write a product spec with sample as below: 1. Introduction Product scope:",
    },
  ];

  const router = useRouter();

  return (
    <ScrollView className="flex-1 mt-4 pt-1 text-gray-900">
      <View className="flex-row justify-between px-5 mb-4">
        <Text className="font-bold">Research</Text>
        <TouchableOpacity
          onPress={() => {
            // router.push("ChatScreens");
          }}
        >
          <View className="flex-row items-center">
            <Text>See more </Text>
            <MaterialIcons name="arrow-forward" size={14} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <LeftAlignCarousel items={exploreData}></LeftAlignCarousel>

      <View className="flex-row justify-between px-5 mb-3 mt-5">
        <Text className="font-bold">Content</Text>
        <View className="flex-row items-center">
          <Text>See more </Text>
          <MaterialIcons name="arrow-forward" size={14} color="black" />
        </View>
      </View>
      <LeftAlignCarousel items={exploreData}></LeftAlignCarousel>

      <View className="bg-gray-50 px-5 py-4 mt-5">
        <Text className="font-bold mb-3">Image</Text>

        <ListWithImages items={exploreData}></ListWithImages>
        <View className="flex-row items-center">
          <Text>See more </Text>
          <MaterialIcons name="arrow-forward" size={14} color="black" />
        </View>
      </View>

      <View className="flex-row justify-between px-5 mt-6 mb-5">
        <Text className="font-bold">Chatbot</Text>
        <View className="flex-row items-center">
          <Text>See more </Text>
          <MaterialIcons name="arrow-forward" size={14} color="black" />
        </View>
      </View>
      <LeftAlignCarousel items={exploreData}></LeftAlignCarousel>
    </ScrollView>
  );
}
