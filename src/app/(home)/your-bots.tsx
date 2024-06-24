import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useBot } from "@/hooks";
import ListWithImages from "@/components/list-with-image";

export default function YourBots() {
  const { bots } = useBot();

  return (
    <ScrollView className="flex-1">
      <View className="pt-2 ml-3">
        <ListWithImages items={bots.data || []} />
      </View>
    </ScrollView>
  );
}

