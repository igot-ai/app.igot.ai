import React from "react";
import { View, Text, FlatList } from "react-native";

import LeftAlignCarousel from "@/components/left-align-carousel";

import { useBot } from "@/hooks";
import { Builder } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import ListWithImages from "@/components/list-with-image";

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

  const data = [
    { type: "operations", items: operations },
    { type: "marketings", items: marketings },
  ];

  const renderHeader = () => (
    <View>
      {operations.length > 0 && (
        <React.Fragment>
          <View className="flex-row justify-between px-5 mb-4">
            <Text className="font-bold">Operation</Text>
          </View>
          <LeftAlignCarousel items={operations} />
        </React.Fragment>
      )}

      {marketings.length > 0 && (
        <React.Fragment>
          <View className="flex-row justify-between px-5 mb-3 mt-5">
            <Text className="font-bold">Marketings</Text>
          </View>
          <LeftAlignCarousel items={marketings} />
        </React.Fragment>
      )}
    </View>
  );

  const renderItem = ({ item }: any) => {
    if (item.type === "operations" || item.type === "marketings") {
      return null; // Operations and Marketings are already handled in the header
    }
    return (
      <View className="bg-gray-50 px-5 py-4 mt-5">
        <Text className="font-bold mb-3">Bots</Text>
        <ListWithImages items={operations} />
        <View className="flex-row items-center">
          <Text>See more </Text>
          <MaterialIcons name="arrow-forward" size={14} color="black" />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.type}
      ListHeaderComponent={renderHeader}
      renderItem={renderItem}
    />
  );
}
