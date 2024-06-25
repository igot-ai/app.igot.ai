import React from "react";
import { View, Text, ScrollView } from "react-native";

import LeftAlignCarousel from "@/components/left-align-carousel";

import { useBot } from "@/hooks";

export default function Explore() {
  const {
    builders: { data: operations = [] },
  } = useBot({
    fetchBuilders: true,
    query: { category: "operation" },
  });

  const {
    builders: { data: marketings = [] },
  } = useBot({
    fetchBuilders: true,
    query: { category: "marketing" },
  });
  return (
    <ScrollView className="flex-1 pt-2 text-gray-900">
      {operations.length > 0 && (
        <React.Fragment>
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
        </React.Fragment>
      )}

      {marketings.length > 0 && (
        <React.Fragment>
          <View className="flex-row justify-between px-5 mb-3 mt-5">
            <Text className="font-bold">Marketings</Text>
            {/* <View className="flex-row items-center">
          <Text>See more </Text>
          <MaterialIcons name="arrow-forward" size={14} color="black" />
        </View> */}
          </View>
          <LeftAlignCarousel items={marketings} />
        </React.Fragment>
      )}

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
