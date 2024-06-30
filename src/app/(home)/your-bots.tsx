import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useBot } from "@/hooks";
import ListWithImages from "@/components/list-with-image";

export default function YourBots() {
  const { bots } = useBot();

  return (
    <View className="pt-2 ml-3 flex-1">
      <ListWithImages items={bots.data || []} />
    </View>
  );
}
