import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons from expo vector icons
import { useRouter } from "expo-router";
import LeftAlignCarousel from "@/components/left-align-carousel";
import ListWithImages from "@/components/list-with-image";
import { useBot } from "@/hooks";
import { Builder } from "@/types";

export default function Explore() {
  const {
    builders: { data: operations = [] },
  } = useBot({
    fetchBuilders: true,
    category: "operations",
  });

  const {
    builders: { data: marketings = [] },
  } = useBot({
    fetchBuilders: true,
    category: "marketing",
  });
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

  const handleBotSelected = () => {
    router.push("(chat)/many-chats");
  };

  const router = useRouter();

  return (
    <ScrollView className="flex-1 pt-2 text-gray-900">
      <View className="flex-row justify-between px-5 mb-4">
        <Text className="font-bold">Operation</Text>
        {/* <TouchableOpacity onPress={handleBotSelected}>
          <View className="flex-row items-center">
            <Text>See more </Text>
            <MaterialIcons name="arrow-forward" size={14} color="black" />
          </View>
        </TouchableOpacity> */}
      </View>
      <LeftAlignCarousel items={operations} />

      <View className="flex-row justify-between px-5 mb-3 mt-5">
        <Text className="font-bold">Marketings</Text>
        {/* <View className="flex-row items-center">
          <Text>See more </Text>
          <MaterialIcons name="arrow-forward" size={14} color="black" />
        </View> */}
      </View>
      <LeftAlignCarousel items={marketings} />

      {/* <View className="bg-gray-50 px-5 py-4 mt-5">
        <Text className="font-bold mb-3">Image</Text>

        <ListWithImages items={[]} />
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
      <LeftAlignCarousel items={exploreData} /> */}
    </ScrollView>
  );
}
