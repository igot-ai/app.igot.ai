import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useBot } from "@/hooks";
import { ListWithImages } from "@/components";

export default function YourBots() {
  const { bots } = useBot();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageListContainer}>
        <ListWithImages items={bots.data || []} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageListContainer: {
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
});
