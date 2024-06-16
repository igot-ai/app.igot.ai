import { Builder } from "@/types";
import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

interface ListWithImagesProps {
  items: Builder[];
}

interface ImageListItemProps {
  item: Builder;
}

const ImageListItem: React.FC<ImageListItemProps> = ({ item }) => {
  return (
    <Link
      href={{
        pathname: "assistant/[context_id]",
        params: {
          context_id: item.context_id,
        },
      }}
      asChild
    >
      <TouchableOpacity className="flex-row items-start	mb-5">
        <Image src={item.snapshot.logo} style={styles.image} />
        <View className="flex-1 pr-2.5">
          <Text
            className="text-base font-semibold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text
            className=" text-gray-600 text-sm font-normal"
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {item.query}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export const ListWithImages: React.FC<ListWithImagesProps> = ({ items }) => {
  return (
    <View>
      {items &&
        items?.map((item, index) => <ImageListItem key={index} item={item} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,
    marginRight: 10,
    marginTop: 4,
    borderRadius: 3,
  },
});
