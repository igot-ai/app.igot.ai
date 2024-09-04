import { Image, View, Text, TextInput } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import React from "react";
import YourBots from "../(home)/your-bots";
import { router } from "expo-router";
import Explore from "../(home)/explore";
import { cn } from "@/utils";
import { useBot } from "@/hooks";
import LeftAlignCarousel from "@/components/left-align-carousel";

export default function HomeScreen() {
  const {
    builders: { data: operations = [] },
  } = useBot({
    fetchBuilders: true,
    query: { category: "operation" },
  });

  return (
    <View className="h-full bg-white pt-10">
      {/* BACKGROUND IMAGE */}
      <Image
        source={require("../../../assets/home-page-background.png")}
        resizeMode="cover"
        style={{ width: "100%", position: "absolute", height: 140 }}
      />
      {/* INTRODUCTION */}
      <View className="flex flex-row justify-between items-center w-100 mt-2 px-5 mb-3">
        <View>
          <View className="flex flex-row items-center gap-1">
            <Image
              source={require("../../../assets/welcome-logo.png")}
              style={{ width: 32, height: 33 }}
            />
            <Text className="font-medium text-gray-900 text-base">
              Hi Jimmy !
            </Text>
          </View>
        </View>
        <Image
          className="items-end"
          source={require("../../../assets/company-logo.png")}
          style={{ width: 30, height: 30 }}
        />
      </View>

      {/* SEARCH BAR */}
      <View
        className="mx-5 mt-1 bg-white rounded-lg p-4"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: -2, height: -2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <View
          className="py-1"
          style={{
            borderBottomColor: "rgba(229, 231, 235, 1)",
            borderBottomWidth: 1,
          }}
        >
          <View className="flex flex-row gap-1 items-center">
            <MaterialIcons
              name="search"
              size={24}
              color="rgba(107, 114, 128, 1)"
            />
            <TextInput className="text-sm" placeholder="Search by name" />
          </View>
        </View>
      </View>

      {/* CONTENT */}
      <View className="px-5 pt-4">
        <View className="flex flex-row items-center gap-2 mb-3">
          <Text className="text-gray-900 text-base font-semibold">
            ✨ My virtual assistant
          </Text>
          <FontAwesome5 name="arrow-right" size={12} color="black" />
        </View>
        <LeftAlignCarousel items={operations} />
      </View>

      <View className="px-5 pt-4">
        <View className="flex flex-row items-center gap-2">
          <Text className="text-gray-900 text-base font-semibold">
            Research
          </Text>
          <FontAwesome5 name="arrow-right" size={12} color="black" />
        </View>
      </View>

      <View className="px-5 pt-4">
        <View className="flex flex-row items-center gap-2">
          <Text className="text-gray-900 text-base font-semibold">Content</Text>
          <FontAwesome5 name="arrow-right" size={12} color="black" />
        </View>
      </View>

      <View className="px-5 py-2 mt-2 bg-gray-50">
        <View className="flex flex-row items-center gap-2 bg-">
          <Text className="text-gray-900 text-base font-semibold">Image</Text>
          <FontAwesome5 name="arrow-right" size={12} color="black" />
        </View>
      </View>

      <View className="px-5 pt-2">
        <View className="flex flex-row items-center gap-2">
          <Text className="text-gray-900 text-base font-semibold">Chatbot</Text>
          <FontAwesome5 name="arrow-right" size={12} color="black" />
        </View>
      </View>
    </View>
  );
}
