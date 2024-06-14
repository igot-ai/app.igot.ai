import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useBot } from "@/hooks";
import ListWithImages from "@/components/list-with-image";

export default function YourBots() {
  const { bots } = useBot();

  // DummyData
  const yourBotsData = [
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagelistContainer}>
        <ListWithImages items={bots.data || []} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagelistContainer: {
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
});
